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
  document.getElementById('media-description').textContent = mediaItem.description;
} else {
  document.getElementById('item-details').innerHTML = "<p>Media not found.</p>";
}

// Review system (localStorage)
const reviewsKey = `reviews_${id}`;
const reviewsList = document.getElementById('reviews-list');
const form = document.getElementById('add-review-form');
const textarea = form.querySelector('textarea');

function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem(reviewsKey)) || [];
  reviewsList.innerHTML = '';
  reviews.forEach((r, i) => {
    const div = document.createElement('div');
    div.className = 'review';
    // support legacy string reviews and new object reviews {text, rating}
    let text = '';
    let rating = null;
    if (typeof r === 'string') {
      text = r;
    } else if (r && typeof r === 'object') {
      text = r.text || '';
      rating = r.rating != null ? r.rating : null;
    }
    div.innerHTML = `
      <div class="review-row">
        <p class="review-text">${text}</p>
        ${rating != null ? `<span class="review-rating">${Number(rating).toFixed(1)} / 5.0</span>` : ''}
        <button onclick="deleteReview(${i})">Delete</button>
      </div>
    `;
    reviewsList.appendChild(div);
  });
}

function deleteReview(index) {
  const reviews = JSON.parse(localStorage.getItem(reviewsKey)) || [];
  reviews.splice(index, 1);
  localStorage.setItem(reviewsKey, JSON.stringify(reviews));
  loadReviews();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = textarea.value.trim();
  if (!text) return;
  const reviews = JSON.parse(localStorage.getItem(reviewsKey)) || [];
  // include rating if present
  const formRating = Number(document.getElementById('form-rating-value')?.textContent) || 0.0;
  reviews.push({ text, rating: formRating });
  localStorage.setItem(reviewsKey, JSON.stringify(reviews));
  textarea.value = '';
  // reset form rating
  document.getElementById('form-rating-value').textContent = '0.0';
  // restore display rating if desired (keeps same average display saved)
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

// --------------------------
// Display rating (non-interactive stars)
// --------------------------
function initDisplayRating(){
  const displayStars = Array.from(document.querySelectorAll('#display-star-rating .star'));
  const ratingValueEl = document.getElementById('rating-value');
  if (!displayStars.length || !ratingValueEl) return;
  const ratingKey = `rating_${id || 'unknown'}`;
  const saved = Number(localStorage.getItem(ratingKey) || '0.0');

  function renderStarsSet(stars, val){
    const v = Number(val) || 0;
    stars.forEach((star, i) => {
      const index = i + 1;
      let fill = Math.max(0, Math.min(1, v - (index - 1)));
      star.style.setProperty('--fill', (fill * 100) + '%');
    });
  }

  ratingValueEl.textContent = saved.toFixed(1);
  renderStarsSet(displayStars, saved);
}

// --------------------------
// Form rating (interactive)
// --------------------------
function initFormRating(){
  const formStars = Array.from(document.querySelectorAll('#review-star-rating .star'));
  const formRatingValue = document.getElementById('form-rating-value');
  if (!formStars.length || !formRatingValue) return;
  let currentFormRating = 0.0;

  function renderStarsForm(val){
    const v = Number(val) || 0;
    formStars.forEach((star, i) => {
      const index = i + 1;
      let fill = Math.max(0, Math.min(1, v - (index - 1)));
      star.style.setProperty('--fill', (fill * 100) + '%');
    });
  }

  // initialize the form so it shows current rating
  formRatingValue.textContent = currentFormRating.toFixed(1);
  renderStarsForm(currentFormRating);

  formStars.forEach(star => {
    star.addEventListener('click', (e) => {
      const idx = Number(star.dataset.index) || 0;
      const rect = star.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      let v = (idx - 1) + pct;
      v = Math.round(v * 10) / 10;
      currentFormRating = v;
      formRatingValue.textContent = v.toFixed(1);
      renderStarsForm(v);
    });
    star.addEventListener('mousemove', (e) => {
      const idx = Number(star.dataset.index) || 0;
      const rect = star.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      let preview = (idx - 1) + pct; preview = Math.round(preview * 10) / 10;
      renderStarsForm(preview);
    });
    star.addEventListener('mouseleave', () => {
      renderStarsForm(currentFormRating);
    });
  });

  // expose currentFormRating to submission (read from DOM on submit)
}
