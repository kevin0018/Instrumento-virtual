import Piano from "./piano.js";
import SongPlayer from "./songPlayer.js";

// Instanciación del piano y el reproductor de canciones
const piano = new Piano();
const songPlayer = new SongPlayer(piano);

let currentVolume = 0.8;

// Elementos del DOM
const volumeRange = document.getElementById("volume-slider");
const btnBack = document.getElementById("btn-back");

// Renderizar piano
piano.render((note) => {
	piano.play(note, currentVolume);
});

// Botón volver
btnBack.onclick = () => window.location.href = '../index.html';

// Volumen
volumeRange.oninput = (e) => {
	currentVolume = parseFloat(e.target.value);
};

// Canciones de ejemplo
const songs = [
	{
        name: "Cumpleaños Feliz",
        song: ["DO", "DO", "RE", "DO", "FA", "MI", "DO", "DO", "RE", "DO", "SOL", "FA"]
    },
    {
        name: "Estrellita",
        song: ["DO", "DO", "SOL", "SOL", "LA", "LA", "SOL", "FA", "FA", "MI", "MI", "RE", "RE", "DO"]
    },
    {
        name: "Himno a la Alegría",
        song: ["MI", "MI", "FA", "SOL", "SOL", "FA", "MI", "RE", "DO", "DO", "RE", "MI", "MI", "RE", "RE"]
    },
    {
        name: "La Cucaracha",
        song: ["MI", "FA", "SOL", "SOL", "FA", "MI", "RE", "DO", "DO", "RE", "MI", "MI", "RE", "RE"]
    },
    {
        name: "El viejo MacDonald",
        song: ["DO", "DO", "DO", "SOL", "LA", "LA", "SOL", "MI", "RE", "RE", "DO"]
    },
    {
        name: "Jingle Bells",
        song: ["MI", "MI", "MI", "MI", "MI", "MI", "MI", "SOL", "DO", "RE", "MI"]
    },
    {
        name: "Oda a la Alegría (corta)",
        song: ["MI", "MI", "FA", "SOL", "SOL", "FA", "MI", "RE", "DO", "DO", "RE", "MI", "RE", "DO", "DO"]
    },
    {
        name: "Los Pollitos",
        song: ["DO", "DO", "DO", "RE", "MI", "MI", "RE", "MI", "FA", "FA", "MI", "RE", "DO"]
    }
];

const dropdownToggle = document.getElementById('dropdownMenuButton');
const dropdownMenu = document.getElementById('songsDropdownMenu');


function renderSongsDropdown() {
	dropdownMenu.innerHTML = "";
	songs.forEach(({name, song}, idx) => {
		const li = document.createElement('li');
		li.textContent = name;
		li.dataset.index = idx;
		dropdownMenu.appendChild(li);
	});
}

dropdownToggle.addEventListener('click', function (e) {
	dropdownMenu.classList.toggle('show');
	this.setAttribute('aria-expanded', dropdownMenu.classList.contains('show'));
});


document.addEventListener('click', function (e) {
	if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
		dropdownMenu.classList.remove('show');
		dropdownToggle.setAttribute('aria-expanded', 'false');
	}
});

dropdownMenu.addEventListener('click', function (e) {
	const li = e.target.closest('li');
	if (!li) return;
	const songIdx = li.dataset.index;
	playSongByNotes(songs[songIdx].song);
	dropdownMenu.classList.remove('show');
	dropdownToggle.setAttribute('aria-expanded', 'false');
});

function playSongByNotes(songNotes) {
	songPlayer.playSong(
		songNotes,
		350,
		noteName => highlightPianoKey(noteName)
	);
}

function highlightPianoKey(noteName) {
	const keys = document.querySelectorAll('.key.white-key, .black-key');
	keys.forEach(key => {
		key.classList.toggle('active', key.getAttribute('data-note') === noteName);
		if (key.getAttribute('data-note') === noteName) {
			setTimeout(() => key.classList.remove('active'), 250);
		}
	});
}

renderSongsDropdown();