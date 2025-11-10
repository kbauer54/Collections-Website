const mediaData = {
  new: [
    { title: "Dune: Part Two", image: "media/dune-part-two.png" },
    { title: "The Last of Us", image: "media/the-last-of-us.png" },
    { title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png" },
    { title: "Dune: Part Two", image: "media/dune-part-two.png" },
    { title: "The Last of Us", image: "media/the-last-of-us.png" },
    { title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png" },
    { title: "Dune: Part Two", image: "media/dune-part-two.png" },
  ],
    
  popular: {
    movies: [
      { title: "Interstellar", image: "media/dune-part-two.png" },
      { title: "Inception", image: "media/dune-part-two.png" },
      { title: "Dune: Part Two", image: "media/dune-part-two.png" },
      { title: "The Last of Us", image: "media/the-last-of-us.png" },
      { title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png" },
      { title: "Dune: Part Two", image: "media/dune-part-two.png" },
      { title: "The Last of Us", image: "media/the-last-of-us.png" },
      { title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png" },
    ],
    
    tv: [
      { title: "Breaking Bad", image: "media/dune-part-two.png" },
      { title: "Stranger Things", image: "media/dune-part-two.png" },
      { title: "Dune: Part Two", image: "media/dune-part-two.png" },
      { title: "The Last of Us", image: "media/the-last-of-us.png" },
      { title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png" },
      { title: "Dune: Part Two", image: "media/dune-part-two.png" },
      { title: "The Last of Us", image: "media/the-last-of-us.png" },
      { title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png" },
    ],
    
    games: [
      { title: "Elden Ring", image: "media/dune-part-two.png" },
      { title: "Zelda: TOTK", image: "media/dune-part-two.png" },
      { title: "Dune: Part Two", image: "media/dune-part-two.png" },
      { title: "The Last of Us", image: "media/the-last-of-us.png" },
      { title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png" },
      { title: "Dune: Part Two", image: "media/dune-part-two.png" },
      { title: "The Last of Us", image: "media/the-last-of-us.png" },
      { title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png" },
    ],
  
    music: [
      { title: "The Beatles - Abbey Road", image: "media/dune-part-two.png" },
      { title: "Taylor Swift - 1989", image: "media/dune-part-two.png" },
      { title: "Dune: Part Two", image: "media/dune-part-two.png" },
      { title: "The Last of Us", image: "media/the-last-of-us.png" },
      { title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png" },
      { title: "Dune: Part Two", image: "media/dune-part-two.png" },
      { title: "The Last of Us", image: "media/the-last-of-us.png" },
      { title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png" },
    ],
  
    books: [
      { title: "Dune", image: "media/dune-part-two.png" },
      { title: "1984", image: "media/dune-part-two.png" },
      { title: "Dune: Part Two", image: "media/dune-part-two.png" },
      { title: "The Last of Us", image: "media/the-last-of-us.png" },
      { title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png" },
      { title: "Dune: Part Two", image: "media/dune-part-two.png" },
      { title: "The Last of Us", image: "media/the-last-of-us.png" },
      { title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png" },
    ],
  } 
};

function renderMedia(list, containerId) {
  const container = document.getElementById(containerId);
  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'media-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h4>${item.title}</h4>
    `;
    container.appendChild(card);
  });
}

window.onload = () => {
  renderMedia(mediaData.new, 'new-media-list');
  renderMedia(mediaData.popular.movies, 'popular-movies');
  renderMedia(mediaData.popular.tv, 'popular-tv');
  renderMedia(mediaData.popular.games, 'popular-games');
  renderMedia(mediaData.popular.music, 'popular-music');
  renderMedia(mediaData.popular.books, 'popular-books');
};

// Theme toggle
const toggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') toggleBtn.textContent = 'Light Mode';
}

toggleBtn.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  toggleBtn.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
});
