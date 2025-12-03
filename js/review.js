// ==============================
// Parse URL parameters
// ==============================
const params = new URLSearchParams(window.location.search);
const category = params.get('category');
const id = params.get('id');

// ==============================
// Find media entry
// ==============================
function findMedia(id, category) {
  if (category && mediaData.popular[category]) {
    return mediaData.popular[category].find(item => item.id === id);
  }
  for (const cat in mediaData.popular) {
    const found = mediaData.popular[cat].find(item => item.id === id);
    if (found) return found;
  }
  return mediaData.new.find(item => item.id === id);
}

const mediaItem = findMedia(id, category);

// ==============================
// Populate media details
// ==============================
if (mediaItem) {
  const aboveTitle = document.getElementById('media-title-above');
  if (aboveTitle) aboveTitle.textContent = mediaItem.title;

  const titleEl = document.getElementById('media-title');
  if (titleEl) titleEl.textContent = mediaItem.title;

  const imgEl = document.getElementById('media-image');
  if (imgEl) imgEl.src = mediaItem.image;

  const descEl = document.getElementById('media-description');
  if (descEl) descEl.textContent = mediaItem.description || '';

  const summaryEl = document.getElementById('media-summary');
  if (summaryEl) {
    let s = (mediaItem.summary != null) ? String(mediaItem.summary).trim() : '';
    if (!s) {
      const altNew = Array.isArray(mediaData.new) && mediaData.new.find(it => it.id === id);
      if (altNew && altNew.summary && String(altNew.summary).trim()) s = String(altNew.summary).trim();
    }
    if (!s) {
      for (const cat in mediaData.popular) {
        const found = mediaData.popular[cat].find(it => it.id === id && it.summary && String(it.summary).trim());
        if (found) { s = String(found.summary).trim(); break; }
      }
    }
    summaryEl.textContent = s.length ? s : 'No summary available.';
  }
} else {
  const container = document.getElementById('item-details');
  if (container) container.innerHTML = "<p>Media not found.</p>";
}

// ==============================
// Review system (localStorage)
// ==============================
const reviewsKey = `reviews_${id || 'unknown'}`;
const reviewsList = document.getElementById('reviews-list');
const form = document.getElementById('add-review-form');
const textarea = form?.querySelector('textarea');

let filterRating = 0; // 0 = all
let sortOrder = 'newest'; // 'newest' or 'oldest'
let searchTerm = '';

// ==============================
// Helpers
// ==============================
function renderStarsElements(starElements, value) {
  const v = Number(value) || 0;
  starElements.forEach((star, i) => {
    const index = i + 1;
    const fill = Math.max(0, Math.min(1, v - (index - 1)));
    star.style.setProperty('--fill', (fill * 100) + '%');
  });
}

function formatDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleDateString(); // simple, locale-friendly
}

// ==============================
// Load reviews
// ==============================
function loadReviews() {
  const raw = JSON.parse(localStorage.getItem(reviewsKey)) || [];
  const normalized = raw.map((r, i) => {
    if (typeof r === 'string') return { name: 'Anonymous', text: r, rating: null, ts: 0, __idx: i };
    return {
      name: r.name || 'Anonymous',
      text: r.text || '',
      rating: (r.rating != null ? Number(r.rating) : null),
      ts: (r.ts || 0),
      __idx: i
    };
  });

  // Average rating
  const rated = normalized.filter(x => x.rating != null && x.rating > 0);
  const avg = rated.length ? (rated.reduce((s, x) => s + Number(x.rating), 0) / rated.length) : 0;

  // Persist and render average
  const ratingKey = `rating_${id || 'unknown'}`;
  localStorage.setItem(ratingKey, avg.toFixed(1));

  const displayStars = Array.from(document.querySelectorAll('#display-star-rating .star'));
  const ratingValueEl = document.getElementById('rating-value');
  const ratingCountEl = document.getElementById('rating-count');

  if (displayStars.length && ratingValueEl) {
    ratingValueEl.textContent = Number(avg).toFixed(1);
    renderStarsElements(displayStars, avg);
  }
  if (ratingCountEl) {
    ratingCountEl.textContent = normalized.length ? `• ${normalized.length} reviews` : '';
  }

  // Filter
  let pairs = normalized.map(x => x);
  if (filterRating && filterRating > 0) {
    pairs = pairs.filter(p => Number(p.rating) === Number(filterRating));
  }

  // Search
  if (searchTerm && searchTerm.trim()) {
    const q = searchTerm.trim().toLowerCase();
    pairs = pairs.filter(p =>
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.text && p.text.toLowerCase().includes(q))
    );
  }

  // Sort
  pairs.sort((a, b) => {
    if (sortOrder === 'newest') return (b.ts || 0) - (a.ts || 0);
    return (a.ts || 0) - (b.ts || 0);
  });

  // Render list
  if (reviewsList) {
    reviewsList.innerHTML = '';
  }
  const emptyEl = document.getElementById('no-reviews-message');
  if (emptyEl) {
    emptyEl.style.display = pairs.length ? 'none' : 'block';
  }

  pairs.forEach((p) => {
    const div = document.createElement('div');
    div.className = 'review-card';

    const header = document.createElement('div');
    header.className = 'review-header';

    const nameEl = document.createElement('div');
    nameEl.className = 'review-name';
    nameEl.textContent = p.name || 'Anonymous';

    const dateEl = document.createElement('div');
    dateEl.className = 'review-date';
    dateEl.textContent = formatDate(p.ts);

    const ratingEl = document.createElement('div');
    ratingEl.className = 'review-rating';
    ratingEl.textContent = (p.rating != null) ? `${Number(p.rating).toFixed(0)}★` : '';

    header.appendChild(nameEl);
    header.appendChild(dateEl);
    header.appendChild(ratingEl);

    const textEl = document.createElement('div');
    textEl.className = 'review-text';
    textEl.textContent = p.text || '';

    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.textContent = 'Delete';
    del.addEventListener('click', () => { deleteReview(p.__idx); });

    div.appendChild(header);
    if (p.text) div.appendChild(textEl);
    div.appendChild(del);

    reviewsList.appendChild(div);
  });
}

// ==============================
// Delete review
// ==============================
function deleteReview(index) {
  const reviews = JSON.parse(localStorage.getItem(reviewsKey)) || [];
  reviews.splice(index, 1);
  localStorage.setItem(reviewsKey, JSON.stringify(reviews));
  loadReviews();
}
window.deleteReview = deleteReview;

// ==============================
// Form submit
// ==============================
form?.addEventListener('submit', e => {
  e.preventDefault();
  const statusEl = document.getElementById('form-status');
  const nameInput = document.getElementById('name-text');
  const name = nameInput?.value.trim();
  const text = textarea?.value.trim() || '';

  if (!name) {
    if (statusEl) statusEl.textContent = 'Name is required.';
    nameInput?.focus();
    return;
  }

  const reviews = JSON.parse(localStorage.getItem(reviewsKey)) || [];
  const formRating = Number(document.getElementById('form-rating-value')?.textContent) || 0;
  const ratingVal = formRating > 0 ? Math.round(formRating) : null;
  reviews.push({ name, text, rating: ratingVal, ts: Date.now() });

  localStorage.setItem(reviewsKey, JSON.stringify(reviews));

  if (textarea) textarea.value = '';
  const frv = document.getElementById('form-rating-value');
  if (frv) frv.textContent = '0.0';
  initFormRating();
  loadReviews();

  if (statusEl) {
    statusEl.textContent = 'Review submitted!';
    setTimeout(() => { statusEl.textContent = ''; }, 2000);
  }
});

// ==============================
// Auto-resize textarea
// ==============================
function autoResizeTextarea() {
  if (!textarea) return;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}
textarea?.addEventListener('input', autoResizeTextarea);

// ==============================
// Controls: filter / sort / search
// ==============================
const filterButtons = Array.from(document.querySelectorAll('.filter-star'));
const relevanceSelect = document.getElementById('review-sort-relevance');
const searchInput = document.getElementById('review-sort-search');

if (filterButtons.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index) || 0;
      filterRating = (filterRating === idx) ? 0 : idx;
      filterButtons.forEach(b => {
        const pressed = Number(b.dataset.index) === filterRating || (filterRating === 0 && Number(b.dataset.index) === 0);
        b.classList.toggle('active', pressed);
        b.setAttribute('aria-pressed', pressed ? 'true' : 'false');
      });
      loadReviews();
    });
  });
}

relevanceSelect?.addEventListener('change', (e) => {
  sortOrder = e.target.value || 'newest';
  loadReviews();
});

searchInput?.addEventListener('input', (e) => {
  searchTerm = e.target.value || '';
  loadReviews();
});

// ==============================
// Display rating (non-interactive)
// ==============================
function initDisplayRating() {
  const displayStars = Array.from(document.querySelectorAll('#display-star-rating .star'));
  const ratingValueEl = document.getElementById('rating-value');
  if (!displayStars.length || !ratingValueEl) return;
  const ratingKey = `rating_${id || 'unknown'}`;
  const saved = Number(localStorage.getItem(ratingKey) || '0.0');
  renderStarsElements(displayStars, saved);
  ratingValueEl.textContent = saved.toFixed(1);
}

// ==============================
// Form rating (interactive)
// ==============================
function initFormRating() {
  const formStars = Array.from(document.querySelectorAll('#review-star-rating .star'));
  const formRatingValue = document.getElementById('form-rating-value');
  if (!formStars.length || !formRatingValue) return;

  let currentFormRating = 0;

  function renderStarsForm(val) {
    const v = Number(val) || 0;
    formStars.forEach((star, i) => {
      const index = i + 1;
      const fill = v >= index ? 1 : 0; // full stars only for selection
      star.style.setProperty('--fill', (fill * 100) + '%');
    });
  }

  formRatingValue.textContent = currentFormRating.toFixed(1);
  renderStarsForm(currentFormRating);

  formStars.forEach(star => {
    star.addEventListener('click', () => {
      const idx = Number(star.dataset.index) || 0;
      currentFormRating = idx;
      formRatingValue.textContent = Number(currentFormRating).toFixed(1);
      renderStarsForm(currentFormRating);
    });
    star.addEventListener('mouseenter', () => {
      const idx = Number(star.dataset.index) || 0;
      renderStarsForm(idx);
    });
    star.addEventListener('mouseleave', () => {
      renderStarsForm(currentFormRating);
    });
  });
}

// ==============================
// Buy / Wishlist stubs
// ==============================
document.getElementById('buy-button')?.addEventListener('click', () => {
  alert('Purchase flow coming soon.');
});
document.getElementById('wishlist-button')?.addEventListener('click', () => {
  alert('Added to wishlist!');
});

// ==============================
// Initialize
// ==============================
window.onload = () => {
  loadReviews();
  initDisplayRating();
  initFormRating();
  autoResizeTextarea();
};
