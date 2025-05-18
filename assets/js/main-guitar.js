import Guitar from './guitar.js';
import SongPlayer from './songPlayer.js';

const guitar = new Guitar();
const songPlayer = new SongPlayer(guitar);

let currentVolume = 0.8;

const guitarContainer = document.getElementById('guitar-container');
const volumeRange = document.getElementById('volume-range');
const btnBack = document.getElementById('btn-back');
const btnStop = document.getElementById('btn-stop');
const btnHold = document.getElementById('btn-hold');
const btnPick = document.getElementById('btn-pick');

// Render guitarra
guitar.render(guitarContainer, (idx) => {
	guitar.play(idx, currentVolume);
});

// Botón volver
btnBack.onclick = () => window.location.href = '../index.html';

// Volumen
volumeRange.oninput = e => currentVolume = parseFloat(e.target.value);

// STOP y HOLD
btnStop.onclick = () => songPlayer.stop();
btnHold.onclick = () => alert("Funcionalidad HOLD pendiente");

// Botón púa
btnPick.onclick = () => {
	for (let i = 0; i < guitar.notes.length; i++) {
		setTimeout(() => guitar.play(i, currentVolume), i * 160);
	}
};

// Canciones de ejemplo
const songs = [
	{name: "Cumpleaños Feliz", song: [0, 1, 2, 1, 3, 4, 3, 1, 2, 1, 0]},
	{name: "Demo", song: [0, 1, 2, 3, 4, 5]}
];

const songList = document.getElementById('song-list');
songs.forEach(({name, song}, idx) => {
	const li = document.createElement('li');
	li.textContent = name;
	li.onclick = () => songPlayer.playSong(song, 80, i => highlightString(i));
	songList.appendChild(li);
});

function highlightString(idx) {
	const strings = document.querySelectorAll('.guitar-string');
	strings.forEach((s, i) => s.classList.toggle('active', i === idx));
	setTimeout(() => strings[idx].classList.remove('active'), 300);
}