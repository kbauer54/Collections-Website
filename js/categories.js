let currentCategoryKey = null;

function renderCategory(categoryKey, sorted = false) {
  const grid = document.getElementById('category-grid');
  currentCategoryKey = categoryKey;
  const items = mediaData.popular[categoryKey];
  grid.innerHTML = '';

  if (!items) {
    grid.innerHTML = `<p>Category not found.</p>`;
    return;
  }

  let itemsToRender = [...items];
  if (sorted) {
    itemsToRender.sort((a, b) => a.title.localeCompare(b.title));
  }

  itemsToRender.forEach(item => {
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

    const sortBtn = document.getElementById('sort-button');
    if (sortBtn) {
      sortBtn.onclick = () => {
        renderCategory(categoryKey, true);
      };
    }
  } else {
    document.getElementById('category-grid').innerHTML = `<p>Unknown category.</p>`;
  }
};
