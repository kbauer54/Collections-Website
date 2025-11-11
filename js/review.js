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
    div.innerHTML = `
      <p>${r}</p>
      <button onclick="deleteReview(${i})">Delete</button>
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
  reviews.push(text);
  localStorage.setItem(reviewsKey, JSON.stringify(reviews));
  textarea.value = '';
  loadReviews();
});

window.deleteReview = deleteReview;
window.onload = loadReviews;
