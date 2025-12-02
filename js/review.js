// Parse URL parameters
const params = new URLSearchParams(window.location.search);
const category = params.get('category');
const id = params.get('id');

// Find the media entry
function findMedia(id, category) {
  if (category && mediaData.popular[category]) {
    return mediaData.popular[category].find(item => item.id === id);
  }

  // Search all categories and new list if unspescified
  for (const cat in mediaData.popular) {
    const found = mediaData.popular[cat].find(item => item.id === id);
    if (found) return found;
  }
  return mediaData.new.find(item => item.id === id);
}

const mediaItem = findMedia(id, category);

if (mediaItem) {
  document.getElementById('media-title').textContent = mediaItem.title;
  document.getElementById('media-image').src = mediaItem.image;
  document.getElementById('media-description').textContent = mediaItem.description || '';
  // Show media summary if present; otherwise keep placeholder text.
  // If this media item has an empty summary but another collection entry with the same id has a non-empty summary, prefer that.
  const summaryEl = document.getElementById('media-summary');
  if (summaryEl) {
    let s = (mediaItem.summary != null) ? String(mediaItem.summary).trim() : '';
    if (!s) {
      // check new list first
      const altNew = (Array.isArray(mediaData.new) && mediaData.new.find(it => it.id === id));
      if (altNew && altNew.summary && String(altNew.summary).trim()) s = String(altNew.summary).trim();
    }
    if (!s) {
      // search all popular categories
      for (const cat in mediaData.popular) {
        const found = mediaData.popular[cat].find(it => it.id === id && it.summary && String(it.summary).trim());
        if (found) { s = String(found.summary).trim(); break; }
      }
    }
    summaryEl.textContent = s.length ? s : 'No summary available.';
  }
} else {
  document.getElementById('item-details').innerHTML = "<p>Media not found.</p>";
}

// Review system (localStorage)
const reviewsKey = `reviews_${id}`;
const reviewsList = document.getElementById('reviews-list');
const form = document.getElementById('add-review-form');
const textarea = form.querySelector('textarea');

// current filter/sort state
let filterRating = 0; // 0 = all, 1..5 filter
let sortOrder = 'newest'; // 'newest' or 'oldest'
let searchTerm = '';

function renderStarsElements(starElements, value){
  const v = Number(value) || 0;
  starElements.forEach((star, i) => {
    const index = i + 1;
    const fill = Math.max(0, Math.min(1, v - (index - 1)));
    star.style.setProperty('--fill', (fill * 100) + '%');
  });
}

function loadReviews() {
  const raw = JSON.parse(localStorage.getItem(reviewsKey)) || [];
  // normalize to array of {name,text,rating,ts}
  const normalized = raw.map((r, i) => {
    if (typeof r === 'string') return { name: 'Anonymous', text: r, rating: null, ts: 0, __idx: i };
    return { name: r.name || 'Anonymous', text: r.text || '', rating: (r.rating != null ? r.rating : null), ts: (r.ts || 0), __idx: i };
  });

  // compute average rating (across all reviews that have a rating)
  const rated = normalized.filter(x => x.rating != null && x.rating > 0);
  const avg = rated.length ? (rated.reduce((s,x)=>s+Number(x.rating),0) / rated.length) : 0;
  // update display rating (and persist)
  const ratingKey = `rating_${id || 'unknown'}`;
  localStorage.setItem(ratingKey, avg.toFixed(1));
  const displayStars = Array.from(document.querySelectorAll('#display-star-rating .star'));
  const ratingValueEl = document.getElementById('rating-value');
  if (displayStars.length && ratingValueEl) {
    ratingValueEl.textContent = Number(avg).toFixed(1);
    renderStarsElements(displayStars, avg);
  }

  // filter by rating
  let pairs = normalized.map((x)=>x);
  if (filterRating && filterRating > 0) pairs = pairs.filter(p => Number(p.rating) === Number(filterRating));
  // search
  if (searchTerm && searchTerm.trim()){
    const q = searchTerm.trim().toLowerCase();
    pairs = pairs.filter(p => (p.name && p.name.toLowerCase().includes(q)) || (p.text && p.text.toLowerCase().includes(q)));
  }
  // sort
  pairs.sort((a,b)=> {
    if (sortOrder === 'newest') return (b.ts || 0) - (a.ts || 0);
    return (a.ts || 0) - (b.ts || 0);
  });

  // render
  reviewsList.innerHTML = '';
  if (pairs.length === 0) {
    document.getElementById('no-reviews-message').style.display = 'block';
  } else {
    document.getElementById('no-reviews-message').style.display = 'none';
  }

  pairs.forEach((p, displayIndex) => {
    const div = document.createElement('div');
    div.className = 'review-card';
    // header: name and rating
    const header = document.createElement('div'); header.className = 'review-header';
    const nameEl = document.createElement('div'); nameEl.className = 'review-name'; nameEl.textContent = p.name || 'Anonymous';
    const dateEl = document.createElement('div'); dateEl.className = 'review-date';
    // Show only the date (no time)
    dateEl.textContent = p.ts ? new Date(p.ts).toLocaleDateString() : '';
    const ratingEl = document.createElement('div'); ratingEl.className = 'review-rating';
    if (p.rating != null) {
      ratingEl.textContent = `${Number(p.rating).toFixed(0)}★`;
    } else {
      ratingEl.textContent = '';
    }
    // append in order: name | date(center) | rating
    header.appendChild(nameEl);
    header.appendChild(dateEl);
    header.appendChild(ratingEl);

    const textEl = document.createElement('div'); textEl.className = 'review-text'; textEl.textContent = p.text || '';

    const del = document.createElement('button'); del.className = 'delete-btn'; del.textContent = 'Delete';
    del.addEventListener('click', ()=>{ deleteReview(p.__idx); });

    div.appendChild(header);
    if (p.text) div.appendChild(textEl);
    div.appendChild(del);
    reviewsList.appendChild(div);
  });
}

function deleteReview(index) {
  const reviews = JSON.parse(localStorage.getItem(reviewsKey)) || [];
  reviews.splice(index, 1);
  localStorage.setItem(reviewsKey, JSON.stringify(reviews));
  loadReviews();
}

// Submit button handler
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name-text')?.value.trim();
  const text = textarea.value.trim();
  if (!name) {
    alert('Name is required');
    return;
  }
  const reviews = JSON.parse(localStorage.getItem(reviewsKey)) || [];
  const formRating = Number(document.getElementById('form-rating-value')?.textContent) || 0;
  const ratingVal = formRating > 0 ? Math.round(formRating) : null; // integer rating or null
  const obj = { name: name, text: text || '', rating: ratingVal, ts: Date.now() };
  reviews.push(obj);
  localStorage.setItem(reviewsKey, JSON.stringify(reviews));
  textarea.value = '';
  // reset form rating
  document.getElementById('form-rating-value').textContent = '0.0';
  // reset visual stars for form
  initFormRating();
  loadReviews();
});

window.deleteReview = deleteReview;

// Auto-resize textarea when content grows beyond current height
function autoResizeTextarea() {
  if (!textarea) return;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

// Attach input handler
if (textarea) {
  textarea.addEventListener('input', autoResizeTextarea);
}

window.onload = () => {
  loadReviews();
  initDisplayRating();
  initFormRating();
  autoResizeTextarea();
};

// ----- Filter / sort / search control wiring -----
const filterButtons = Array.from(document.querySelectorAll('.filter-star'));
const relevanceSelect = document.getElementById('review-sort-relevance');
const searchInput = document.getElementById('review-sort-search');
if (filterButtons.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index) || 0;
      // toggle
      if (filterRating === idx) filterRating = 0; else filterRating = idx;
      filterButtons.forEach(b => b.classList.toggle('active', Number(b.dataset.index) === filterRating));
      loadReviews();
    });
  });
}
if (relevanceSelect) {
  relevanceSelect.addEventListener('change', (e)=>{
    sortOrder = e.target.value || 'newest';
    loadReviews();
  });
}
if (searchInput) {
  searchInput.addEventListener('input', (e)=>{
    searchTerm = e.target.value || '';
    loadReviews();
  });
}

// --------------------------
// Display rating (non-interactive stars)
// --------------------------
function initDisplayRating(){
  const displayStars = Array.from(document.querySelectorAll('#display-star-rating .star'));
  const ratingValueEl = document.getElementById('rating-value');
  if (!displayStars.length || !ratingValueEl) return;
  const ratingKey = `rating_${id || 'unknown'}`;
  const saved = Number(localStorage.getItem(ratingKey) || '0.0');
  renderStarsElements(displayStars, saved);
  ratingValueEl.textContent = saved.toFixed(1);
}

// --------------------------
// Form rating (interactive)
// --------------------------
function initFormRating(){
  const formStars = Array.from(document.querySelectorAll('#review-star-rating .star'));
  const formRatingValue = document.getElementById('form-rating-value');
  if (!formStars.length || !formRatingValue) return;
  let currentFormRating = 0;

  function renderStarsForm(val){
    const v = Number(val) || 0;
    formStars.forEach((star, i) => {
      const index = i + 1;
      // full fill for stars <= v, empty otherwise
      const fill = v >= index ? 1 : 0;
      star.style.setProperty('--fill', (fill * 100) + '%');
    });
  }

  // initialize the form so it shows current rating
  formRatingValue.textContent = currentFormRating.toFixed(1);
  renderStarsForm(currentFormRating);

  formStars.forEach(star => {
    star.addEventListener('click', () => {
      const idx = Number(star.dataset.index) || 0;
      currentFormRating = idx;
      formRatingValue.textContent = Number(currentFormRating).toFixed(1);
      renderStarsForm(currentFormRating);
    });
    // hover shows full-star preview
    star.addEventListener('mouseenter', () => {
      const idx = Number(star.dataset.index) || 0;
      renderStarsForm(idx);
    });
    star.addEventListener('mouseleave', () => {
      renderStarsForm(currentFormRating);
    });
  });

  // expose currentFormRating to submission (read from DOM on submit)
}
