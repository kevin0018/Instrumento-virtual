import Guitar from './guitar.js';
import SongPlayer from './songPlayer.js';
import OrientationBanner from "../../components/OrientationBanner.js";

const guitar = new Guitar();
const songPlayer = new SongPlayer(guitar);

let currentVolume = 0.8;

const guitarContainer = document.getElementById('guitar-container');
const volumeRange = document.getElementById('volume-range');
const btnBack = document.getElementById('btn-back');
const btnPick = document.getElementById('btn-pick');

// Render guitarra
guitar.render(guitarContainer, (idx) => {
	guitar.play(idx, currentVolume);
});

// Botón volver
btnBack.onclick = () => window.location.href = '../index.html';

// Volumen
volumeRange.oninput = e => currentVolume = parseFloat(e.target.value);

// Botón púa
btnPick.onclick = () => {
	for (let i = 0; i < guitar.notes.length; i++) {
		setTimeout(() => guitar.play(i, currentVolume), i * 160);
	}
};

// Canciones de ejemplo
const songs = [
	{name: "Cumpleaños Feliz", song: [1, 1, 5, 1, 1, 5, 1, 1, 1, 5, 4, 3, 4, 5, 1, 1]},
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

const banner = new OrientationBanner({
    message: '¡Gira tu dispositivo para tocar la guitarra cómodamente!'
});

banner.mount();