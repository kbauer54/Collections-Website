
const mediaData = {
  new: [
    { id:"0030", title: "Queen - Bohemian Rhapsody", image: "media/bohemian-rapsody.jpg", summary: "A genre-blending rock epic that follows a man's emotional turmoil as he confronts guilt, fate, and inner conflict." },
    { id: "0002", title: "The Last of Us", image: "media/the-last-of-us.png", summary: "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope." },
    { id: "0025", title: "Where Winds Meet", image: "media/wwm.jpg", summary: "An open-world action RPG set in ancient China where a wandering swordsman uncovers political secrets and shapes his own legend." },
    { id: "0014", title: "The Dark Knight", image: "media/dark-knight.jpg", summary: "Batman faces his greatest moral test when the Joker unleashes chaos across Gotham, forcing him to choose between justice and sacrifice." },
    { id: "0020", title: "Avatar: The last airbender", image: "media/atla.jpg", summary: "Aang, the last Airbender and only surviving Avatar, must master all four elements to stop a devastating war and restore balance." },
    { id: "0038", title: "The False Prince", image: "media/tfp.jpg", summary: "Several orphan boys are forced into a dangerous competition to impersonate a missing prince, but one contestant uncovers a deadly conspiracy." },
    { id: "0017",title: "The Matrix", image: "media/matrix.jpg", summary: "A hacker discovers that reality is a simulated world controlled by machines, pushing him to join a rebellion fighting for humanity’s freedom." },
  ],
    
  popular: {
    movies: [
      { id: "0004", title: "Interstellar", image: "media/interstellar.jpg", summary: "A team of explorers travels through a wormhole in search of a new home for humanity as Earth faces collapse." },
      { id: "0005", title: "Inception", image: "media/inception.jpg", summary: "A skilled thief enters people’s dreams to steal secrets, but his toughest mission requires planting an idea deep within a target’s mind." },
      { id: "0014", title: "The Dark Knight", image: "media/dark-knight.jpg", summary: "Batman struggles to stop the Joker’s reign of terror as Gotham descends into chaos and moral boundaries blur." },
      { id: "0015", title: "Twelve Angry Men", image: "media/12-angry-men.jpg", summary: "Twelve jurors debate the fate of a young defendant, revealing biases and tensions as they seek the truth." },
      { id: "0016", title: "Fight Club", image: "media/fight-club.jpg", summary: "A disillusioned man forms an underground fight club, sparking a radical movement that spirals far beyond his control." },
      { id: "0001", title: "Dune: Part Two", image: "media/dune-part-two.png", summary: "After the massacre of house atreides the son of the late duke Leto atreides Paul and his mother lady Jessica travel with the fremen and learn their ways. While Paul starts getting closer to the fremen girl Chani the rest of the fremen either despise him or worship him as the Lisan al Gaib. Paul is torn between his compassion for Chani and the desire to lead the fremen as their messiah. Meanwhile the Baron Harkonnen recovering from his wounds takes control over arrakis away from Rabban and gifts it to his psychotic nephew Feyd Rautha Harkonnen. Paul is left with the choice of staying at his current position with the fremen or rising up as the Lisan al gaib and challenging the emperor and house harkonnen." },
      { id: "0018", title: "Spiderman: Across the spiderverse", image: "media/spiderman-atsv.jpg", summary: "Miles Morales journeys across multiple universes, encountering new Spider-heroes while confronting a threat that could unravel the multiverse." },
      { id: "0017",title: "The Matrix", image: "media/matrix.jpg", summary: "A hacker learns his world is a simulation and joins a rebellion fighting against machine domination." },
    ],
    
    tv: [
      { id: "0006", title: "Breaking Bad", image: "media/breaking-bad.jpg", summary: "A high-school chemistry teacher turns to making meth after a cancer diagnosis, transforming into a ruthless criminal." },
      { id: "0007", title: "Stranger Things", image: "media/stranger-things.jpg", summary: "A group of kids uncovers supernatural forces and secret experiments after their friend mysteriously disappears." },
      { id: "0019", title: "Chernobyl", image: "media/chernobyl.jpg", summary: "A dramatization of the 1986 nuclear disaster, revealing the human cost and heroism behind preventing an even greater catastrophe." },
      { id: "0002", title: "The Last of Us", image: "media/the-last-of-us.png", summary: "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope." },
      { id: "0020", title: "Avatar: The last airbender", image: "media/atla.jpg", summary: "Aang must master the elements and defeat the Fire Nation to restore peace to a war-torn world." },
      { id: "0021", title: "Game of Thrones", image: "media/game-of-thrones.jpg", summary: "Noble houses clash for control of the Iron Throne as ancient threats rise beyond the realm’s borders." },
      { id: "0022", title: "Attack on Titan", image: "media/attack-on-titan.jpg", summary: "Humanity’s last survivors battle towering man-eating Titans while uncovering shocking truths about their world." },
      { id: "0023", title: "Rick and Morty", image: "media/rick-and-morty.jpg", summary: "A reckless genius scientist drags his grandson through bizarre, dangerous adventures across time and space." },
    ],
    
    games: [
      { id: "0008", title: "Elden Ring", image: "media/elden-ring.jpg", summary: "In the Lands Between, a Tarnished warrior journeys to restore the shattered Elden Ring and become Elden Lord." },
      { id: "0009", title: "Zelda: Tears of the Kingdom", image: "media/zelda-totk.jpg", summary: "Link explores sky islands and underground depths to stop a spreading darkness that threatens Hyrule." },
      { id: "0024", title: "Red Dead Redemption 2", image: "media/red-dead-2.jpg", summary: "Arthur Morgan navigates loyalty, survival, and the fading Wild West as his outlaw gang begins to crumble." },
      { id: "0025", title: "Where Winds Meet", image: "media/wwm.jpg", summary: "A martial-arts wanderer shapes his destiny in a war-torn ancient China filled with political intrigue." },
      { id: "0003", title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png", summary: "In 2077, America is in pieces. Megacorps control life in all its aspects from the top floors of their sky-high fortresses. Down below, drug-pushing gangs, dirty-tech hustlers, and slingers of illicit braindances run the streets. The world in between is where decadence, sex, and pop culture mix with violent crime, extreme poverty, and the unattainable promise of the American Dream. In Cyberpunk 2077 you play as V-a hired gun on the rise and you just got your first serious contract. In a world of cyberenhanced street warriors, tech-savvy netrunners, and corporate lifehackers, today you take your first step towards becoming an urban legend." },
      { id: "0026", title: "Baldur's Gate 3", image: "media/baldurs-3.jpg", summary: "A group of heroes infected with a mind-flayer parasite must fight fate, forge alliances, and shape the future of the realms." },
      { id: "0027", title: "Zelda: Ocarina of Time", image: "media/zelda-ocarina.jpg", summary: "Link travels through time to stop Ganondorf from plunging Hyrule into darkness." },
      { id: "0028", title: "Grand Theft Auto V", image: "media/gta5.jpg", summary: "Three criminals in Los Santos team up for high-stakes heists while dealing with chaos in their personal lives." },
    ],
  
    music: [
      { id: "0010", title: "The Beatles - Abbey Road", image: "media/the-beatles-abbey-road.jpg", summary: "A landmark album blending rock, harmony, and experimental sound, showcasing the band’s evolution." },
      { id: "0011", title: "Taylor Swift - 1989", image: "media/taylor-swift-1989.jpg", summary: "A synth-pop reinvention exploring themes of independence, love, and self-discovery." },
      { id:"0029", title: "Coldplay - Viva La Vida", image: "media/viva-la-vida.jpg", summary: "An orchestral pop album reflecting on power, loss, and redemption through vivid storytelling." },
      { id:"0030", title: "Queen - Bohemian Rhapsody", image: "media/bohemian-rapsody.jpg", summary: "A dramatic, operatic rock classic that delves into inner conflict and emotional release." },
      { id:"0031", title: "Michael Jackson - Bad", image: "media/bad.jpg", summary: "A high-energy pop album driven by confidence, catchy hooks, and groundbreaking production." },
      { id:"0032", title: "One Republic - Counting Stars", image: "media/counting-stars.jpg", summary: "A rhythmic pop track about chasing dreams while wrestling with the pressures of life." },
      { id:"0033", title: "Bastille - Pompeii", image: "media/pompeii.jpg", summary: "An upbeat anthem that uses ancient imagery to explore themes of regret and reflection." },
      { id:"0034", title: "The Neighbourhood - Sweater Weather", image: "media/sweater-weather.jpg", summary: "A moody indie-pop song centered on intimacy, comfort, and emotional vulnerability." },
    ],
  
    books: [
      { id: "0012", title: "Dune", image: "media/dune.jpg", summary: "Paul Atreides becomes entangled in political betrayal and prophetic destiny on the desert planet Arrakis." },
      { id: "0013", title: "1984", image: "media/1984.jpg", summary: "A man struggles to hold onto truth and identity under a totalitarian regime that controls every thought." },
      { id: "0035", title: "The Great Gatsby", image: "media/tgg.jpg", summary: "A mysterious millionaire’s pursuit of love reveals the illusions and decadence of the Jazz Age." },
      { id: "0036", title: "The Catcher in the Rye", image: "media/catcher-rye.jpg", summary: "Holden Caulfield wanders New York, wrestling with loneliness, growing up, and finding authenticity." },
      { id: "0037", title: "To Kill a Mockingbird", image: "media/tkamb.jpg", summary: "A young girl witnesses racial injustice in her Southern town as her father defends an innocent man." },
      { id: "0038", title: "The False Prince", image: "media/tfp.jpg", summary: "A cunning orphan competes in a dangerous scheme to impersonate a missing royal heir." },
      { id: "0039", title: "The Last of Us", image: "media/the-last-of-us.png", summary: "A world ravaged by infection forces two unlikely companions to rely on each other to survive." },
      { id: "0040", title: "Cyberpunk 2077", image: "media/cyberpunk-2077.png", summary: "A dive into Night City’s violent, neon-lit world where ambition, augmentation, and crime collide." },
    ],
  } 
};

