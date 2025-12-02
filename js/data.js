
const mediaData = {
  new: [
    { id:"0030", title: "Queen - Bohemian Rhapsody", image: "media/bohemian-rapsody.jpg", summary: "Testing" },
    { id: "0002", title: "The Last of Us", image: "media/the-last-of-us.png", summary: "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope." },
    { id: "0025", title: "Where Winds Meet", image: "media/wwm.jpg", summary: "" },
    { id: "0014", title: "The Dark Knight", image: "media/dark-knight.jpg", summary: "" },
    { id: "0020", title: "Avatar: The last airbender", image: "media/atla.jpg", summary: "" },
    { id: "0038", title: "The False Prince", image: "media/tfp.jpg", summary: "" },
    { id: "0017",title: "The Matrix", image: "media/matrix.jpg", summary: "" },
  ],
    
  popular: {
    movies: [
      { id: "0004", title: "Interstellar", image: "media/interstellar.jpg", summary: "" },
      { id: "0005", title: "Inception", image: "media/inception.jpg", summary: "" },
      { id: "0014", title: "The Dark Knight", image: "media/dark-knight.jpg", summary: "" },
      { id: "0015", title: "Twelve Angry Men", image: "media/12-angry-men.jpg", summary: "" },
      { id: "0016", title: "Fight Club", image: "media/fight-club.jpg", summary: "" },
      { id: "0001", title: "Dune: Part Two", image: "media/dune-part-two.png", summary: "After the massacre of house atreides the son of the late duke Leto atreides Paul and his mother lady Jessica travel with the fremen and learn their ways. While Paul starts getting closer to the fremen girl Chani the rest of the fremen either despise him or worship him as the Lisan al Gaib. Paul is torn between his compassion for Chani and the desire to lead the fremen as their messiah. Meanwhile the Baron Harkonnen recovering from his wounds takes control over arrakis away from Rabban and gifts it to his psychotic nephew Feyd Rautha Harkonnen. Paul is left with the choice of staying at his current position with the fremen or rising up as the Lisan al gaib and challenging the emperor and house harkonnen." },
      { id: "0018", title: "Spiderman: Across the spiderverse", image: "media/spiderman-atsv.jpg", summary: "" },
      { id: "0017",title: "The Matrix", image: "media/matrix.jpg", summary: "" },
    ],
    
    tv: [
      { id: "0006", title: "Breaking Bad", image: "media/breaking-bad.jpg", summary: "" },
      { id: "0007", title: "Stranger Things", image: "media/stranger-things.jpg", summary: "" },
      { id: "0019", title: "Chernobyl", image: "media/chernobyl.jpg", summary: "" },
      { id: "0002", title: "The Last of Us", image: "media/the-last-of-us.png", summary: "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope." },
      { id: "0020", title: "Avatar: The last airbender", image: "media/atla.jpg", summary: "" },
      { id: "0021", title: "Game of Thrones", image: "media/game-of-thrones.jpg", summary: "" },
      { id: "0022", title: "Attack on Titan", image: "media/attack-on-titan.jpg", summary: "" },
      { id: "0023", title: "Rick and Morty", image: "media/rick-and-morty.jpg", summary: "" },
    ],
    
    games: [
      { id: "0008", title: "Elden Ring", image: "media/elden-ring.jpg", summary: "" },
      { id: "0009", title: "Zelda: Tears of the Kingdom", image: "media/zelda-totk.jpg", summary: "" },
      { id: "0024", title: "Red Dead Redemption 2", image: "media/red-dead-2.jpg", summary: "" },
      { id: "0025", title: "Where Winds Meet", image: "media/wwm.jpg", summary: "" },
      { id: "0003", title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png", summary: "In 2077, America is in pieces. Megacorps control life in all its aspects from the top floors of their sky-high fortresses. Down below, drug-pushing gangs, dirty-tech hustlers, and slingers of illicit braindances run the streets. The world in between is where decadence, sex, and pop culture mix with violent crime, extreme poverty, and the unattainable promise of the American Dream. In Cyberpunk 2077 you play as V-a hired gun on the rise and you just got your first serious contract. In a world of cyberenhanced street warriors, tech-savvy netrunners, and corporate lifehackers, today you take your first step towards becoming an urban legend." },
      { id: "0026", title: "Baldur's Gate 3", image: "media/baldurs-3.jpg", summary: "" },
      { id: "0027", title: "Zelda: Ocarina of Time", image: "media/zelda-ocarina.jpg", summary: "" },
      { id: "0028", title: "Grand Theft Auto V", image: "media/gta5.jpg", summary: "" },
    ],
  
    music: [
      { id: "0010", title: "The Beatles - Abbey Road", image: "media/the-beatles-abbey-road.jpg", summary: "" },
      { id: "0011", title: "Taylor Swift - 1989", image: "media/taylor-swift-1989.jpg", summary: "" },
      { id:"0029", title: "Coldplay - Viva La Vida", image: "media/viva-la-vida.jpg", summary: "" },
      { id:"0030", title: "Queen - Bohemian Rhapsody", image: "media/bohemian-rapsody.jpg", summary: "" },
      { id:"0031", title: "Michael Jackson - Bad", image: "media/bad.jpg", summary: "" },
      { id:"0032", title: "One Republic - Counting Stars", image: "media/counting-stars.jpg", summary: "" },
      { id:"0033", title: "Bastille - Pompeii", image: "media/pompeii.jpg", summary: "" },
      { id:"0034", title: "The Neighbourhood - Sweater Weather", image: "media/sweater-weather.jpg", summary: "" },
    ],
  
    books: [
      { id: "0012", title: "Dune", image: "media/dune.jpg", summary: "" },
      { id: "0013", title: "1984", image: "media/1984.jpg", summary: "" },
      { id: "0035", title: "The Great Gatsby", image: "media/tgg.jpg", summary: "" },
      { id: "0036", title: "The Catcher in the Rye", image: "media/catcher-rye.jpg", summary: "" },
      { id: "0037", title: "To Kill a Mockingbird", image: "media/tkamb.jpg", summary: "" },
      { id: "0038", title: "The False Prince", image: "media/tfp.jpg", summary: "" },
      { id: "0039", title: "The Last of Us", image: "media/the-last-of-us.png", summary: "" },
      { id: "0040", title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png", summary: "" },
    ],
  } 
};

