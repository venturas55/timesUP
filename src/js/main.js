// Declaración de variables
cargarConfiguracion();
var gameStarted = false;
var duracionRonda=document.getElementById("duracionRonda").value;
var num_peliculas_series=document.getElementById("duracionRonda").value, num_personajes_contemporaneos=document.getElementById("num_personajes_contemporaneos").value, num_personajes_ficticios=document.getElementById("num_personajes_ficticios").value , num_personajes_historicos=document.getElementById("num_personajes_historicos").value , num_artistas=document.getElementById("num_artistas").value , num_deportistas=document.getElementById("num_deportistas").value ;
var currentTeam = '';
var currentWord = '';
var currentRound = 1;
var wordsTotal = {
  "peliculas_series": [
    "Titanic",
    "Juego de Tronos",
    "Friends",
    "Harry Potter",
    "El Señor de los Anillos",
    "Breaking Bad",
    "Stranger Things",
    "Los Vengadores",
    "Cadena Perpetua",
    "Los Simpson",
    "Matrix",
    "Black Mirror",
    "The Crown",
    "La La Land",
    "The Walking Dead",
    "The Office",
    "Pulp Fiction",
    "The Big Bang Theory",
    "Star Wars",
    "El Padrino",
    "Sherlock",
    "El Caballero Oscuro",
    "Forrest Gump",
    "Los Soprano",
    "The Witcher",
    "Friends",
    "Mulán",
    "Parque Jurásico",
    "El Cuento de la Criada",
    "Stranger Things",
    "Avatar",
    "El Rey León",
    "Narcos",
    "La Casa de Papel",
    "Gambito de Dama",
    "Bajo la Misma Estrella",
    "Black Panther",
    "El Silencio de los Corderos",
    "House of Cards",
    "Interstellar",
    "El Gran Gatsby",
    "The Office",
    "Origen",
    "El Diario de Noa",
    "La Red Social",
    "Los Juegos del Hambre",
    "The Mandalorian",
    "Mad Men",
    "Gossip Girl"
  ],
  "personajes_ficticios": [
    "Superman",
    "Harry Potter",
    "Batman",
    "Spider-Man",
    "Wonder Woman",
    "Luke Skywalker",
    "Hermione Granger",
    "Iron Man",
    "Sherlock Holmes",
    "James Bond"
  ],
  "deportistas": [
    "Michael Jordan",
    "Serena Williams",
    "Lionel Messi",
    "Usain Bolt",
    "Cristiano Ronaldo",
    "Muhammad Ali",
    "Rafael Nadal",
    "LeBron James",
    "Roger Federer",
    "Simone Biles"
  ],
  "artistas": [
    "Vincent van Gogh",
    "Leonardo da Vinci",
    "Pablo Picasso",
    "Frida Kahlo",
    "Salvador Dalí",
    "Andy Warhol",
    "Claude Monet",
    "Georgia O'Keeffe",
    "Leonardo DiCaprio",
    "Angelina Jolie"
  ],
  "personajes_contemporaneos": [
    "Barack Obama",
    "Elon Musk",
    "Oprah Winfrey",
    "Emma Watson",
    "Tom Hanks",
    "Jennifer Lawrence",
    "Mark Zuckerberg",
    "Michelle Obama",
    "Brad Pitt",
    "Angelina Jolie"
  ],
  "personajes_historicos": [
    "Albert Einstein",
    "Nelson Mandela",
    "Marie Curie",
    "Winston Churchill",
    "Mahatma Gandhi",
    "Cleopatra",
    "George Washington",
    "William Shakespeare",
    "Alexander Graham Bell",
    "Cristóbal Colón"
  ]
};
let words = [];
let wordsGameInitial = [];

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var btn = document.getElementById("myBtn");
//modal.style.display = "none";
btn.onclick = function () {
  modal.style.display = "flex";
}
span.onclick = function () {
  modal.style.display = "none";
}

//FUNCION PARA BARAJAR UN ARRAY
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

//FUNCION PARA ESCOGER 20 CARTAS DE LAS 100
function repartirCartas() {
  let words = [];
  for (var i = 0; i < num_peliculas_series; i++) {
    words.push(wordsTotal.peliculas_series.splice(Math.floor(Math.random() * wordsTotal.peliculas_series.length), 1));
  }
  for (var i = 0; i < num_personajes_contemporaneos; i++) {
    words.push(wordsTotal.personajes_contemporaneos.splice(Math.floor(Math.random() * wordsTotal.personajes_contemporaneos.length), 1));
  }
  for (var i = 0; i < num_personajes_ficticios; i++) {
    words.push(wordsTotal.personajes_ficticios.splice(Math.floor(Math.random() * wordsTotal.personajes_ficticios.length), 1));
  }
  for (var i = 0; i < num_personajes_historicos; i++) {
    words.push(wordsTotal.personajes_historicos.splice(Math.floor(Math.random() * wordsTotal.personajes_historicos.length), 1));
  }
  for (var i = 0; i < num_artistas; i++) {
    words.push(wordsTotal.artistas.splice(Math.floor(Math.random() * wordsTotal.artistas.length), 1));
  }
  for (var i = 0; i < num_deportistas; i++) {
    words.push(wordsTotal.deportistas.splice(Math.floor(Math.random() * wordsTotal.deportistas.length), 1));
  }
  shuffleArray(words);
  return words;
}

var currentIndex = 0;
var timeRemaining = duracionRonda;
var timerInterval = null;
var teams = ['Equipo 1', 'Equipo 2'];
var scores = {};
var paused = false;
var pauseButton = document.querySelector('.pause-button');
var nextButton = document.querySelector('.next-button');
var correctButton = document.querySelector('.correct-button');
var menuPlay = document.getElementById("botonesPlay");
var nextRoundBtn = document.getElementById("nextRound");
document.getElementById("currentRound").innerHTML = currentRound;

wordsGameInitial = repartirCartas();
words = [...wordsGameInitial];
// Función para iniciar el juego
function startRound() {
  console.log(words);
  document.getElementById("logo").style.display = "none";
  gameStarted = true;
  currentTeam = teams[0];
  currentWord = words[currentIndex];
  document.getElementById("currentRound").innerHTML = currentRound;
  if (currentRound == 1) {
    scores = teams.reduce(function (obj, team) {
      obj[team] = 0;
      return obj;
    }, {});
  }

  startTimer();
  nextRoundBtn.style.display = "none";
  document.getElementById('game-container').style.display = 'block';
  document.getElementById('current-team').textContent = currentTeam;
  document.getElementById('current-word').textContent = currentWord;
  document.getElementById('time-remaining').textContent = timeRemaining;
  updateScores();
}
// Función para iniciar el temporizador
function startTimer() {
  timerInterval = setInterval(function () {
    if (timeRemaining > 0) {
      timeRemaining--;
    } else {
      nextTurn();
    }
    document.getElementById('time-remaining').textContent = timeRemaining;
  }, 1000);
}
// Función para avanzar a la siguiente palabra
function nextWord() {
  //console.log(words.length);
  if (words.length > 0) {
    currentIndex = Math.floor(Math.random() * words.length);
    currentWord = words[currentIndex];
    document.getElementById('current-word').textContent = currentWord;
  } else {
    clearInterval(timerInterval);
    document.getElementById('current-word').textContent = "TIME`S UP";
    alert("Se acabo la ronda");
    nextRoundBtn.style.display = "block";
  }
}
// Función para avanzar al siguiente turno
function nextTurn() {
  clearInterval(timerInterval);
  togglePause();
  var currentIndex = teams.indexOf(currentTeam);
  var nextIndex = (currentIndex + 1) % teams.length;
  currentTeam = teams[nextIndex];
  currentIndex = Math.floor(Math.random() * words.length);
  currentWord = words[currentIndex];
  timeRemaining = duracionRonda;
  //startTimer();
  document.getElementById('current-team').textContent = currentTeam;
  document.getElementById('current-word').textContent = "TIME`S UP";
  updateScores();
}
// Función para actualizar los puntajes en la lista
function updateScores() {
  var scoresList = document.getElementById('scores-list');
  scoresList.innerHTML = '';
  teams.forEach(function (team) {
    var scoreItem = document.createElement('li');
    scoreItem.textContent = team + ': ' + scores[team];
    if (team === currentTeam) {
      scoreItem.classList.add('current-team');
    }
    scoresList.appendChild(scoreItem);
  });
}
// Función para marcar la palabra como correcta
function markCorrect() {
  words.splice(currentIndex, 1);
  scores[currentTeam]++;
  updateScores();
  //console.log(words);
  nextWord();
}
function nextRound() {
  currentRound++;
  //iinicio la baraja
  words = [...wordsGameInitial];
  //console.log(words);
  startRound();

}
// Función para pausar o reanudar el juego
function togglePause() {
  paused = !paused;
  if (paused) {
    document.getElementById('current-word').textContent = "TIME`S UP";
    pauseButton.textContent = 'Continuar';
    menuPlay.style.display = "none";
    clearInterval(timerInterval);
    nextButton.disabled = true;
    correctButton.disabled = true;
  } else {
    document.getElementById('current-word').textContent = currentWord;
    pauseButton.textContent = 'Pausar';
    menuPlay.style.display = "block";
    startTimer();
    nextButton.disabled = false;
    correctButton.disabled = false;
  }
}
//funcion para guardar la configuracion . Basicamente solo el tiempo actualmente.
function guardarConfiguracion() {
  var obj = {
    duracionRonda,
    num_peliculas_series, num_personajes_contemporaneos, num_personajes_ficticios, num_personajes_historicos, num_artistas, num_deportistas
  };
  localStorage.setItem("configuracion", JSON.stringify(obj));
  console.log("guardado:" + JSON.stringify(obj));
  modal.style.display = "none";
}
//funcion para cargar la configuracion .
function cargarConfiguracion() {
  var configuracion = localStorage.getItem("configuracion");
  //console.log("Cargar:" + configuracion);
  if (configuracion) {
    var obj = JSON.parse(configuracion);
    duracionRonda = obj.duracionRonda;
    num_peliculas_series = obj.num_peliculas_series,
    num_personajes_contemporaneos = obj.num_personajes_contemporaneos,
    num_personajes_ficticios = obj.num_personajes_ficticios,
    num_personajes_historicos = obj.num_personajes_historicos,
    num_artistas = obj.num_artistas,
    num_deportistas = obj.num_deportistas
  }
}