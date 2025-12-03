function renderMedia(list, containerId, categoryKey = null) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const randomItems = list
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);

  randomItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "media-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h4>${item.title}</h4>
    `;
    card.onclick = () => {
      const categoryParam = categoryKey ? `&category=${categoryKey}` : "";
      window.location.href = `review.html?id=${item.id}${categoryParam}`;
    };
    container.appendChild(card);
  });
}

window.onload = () => {
  renderMedia(mediaData.new, "new-media-list");
  renderMedia(mediaData.popular.movies, "popular-movies", "movies");
  renderMedia(mediaData.popular.tv, "popular-tv", "tv");
  renderMedia(mediaData.popular.games, "popular-games", "games");
  renderMedia(mediaData.popular.music, "popular-music", "music");
  renderMedia(mediaData.popular.books, "popular-books", "books");
};
