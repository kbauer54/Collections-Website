// categories.js

function renderCategory(categoryKey) {
  const grid = document.getElementById('category-grid');
  const items = mediaData.popular[categoryKey];
  grid.innerHTML = '';

  if (!items) {
    grid.innerHTML = `<p>Category not found.</p>`;
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'grid-item';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h4>${item.title}</h4>
    `;
    card.onclick = () => {
      window.location.href = `review.html?id=${item.id}&category=${categoryKey}`;
    };
    grid.appendChild(card);
  });
}

// Detect current category
function getCategoryFromPage() {
  const page = window.location.pathname.split('/').pop().toLowerCase();
  if (page.includes('movie')) return 'movies';
  if (page.includes('tv')) return 'tv';
  if (page.includes('game')) return 'games';
  if (page.includes('music')) return 'music';
  if (page.includes('book')) return 'books';
  return null;
}

window.onload = () => {
  const categoryKey = getCategoryFromPage();
  if (categoryKey) {
    renderCategory(categoryKey);
  } else {
    document.getElementById('category-grid').innerHTML = `<p>Unknown category.</p>`;
  }
};

