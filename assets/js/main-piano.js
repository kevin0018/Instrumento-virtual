import Piano from "./piano.js";
// import SongPlayer from "./songPlayer.js";

const piano = new Piano();
// const songPlayer = new SongPlayer(piano);

let currentVolume = 0.8;

const pianoContainer = document.getElementById("piano");
const volumeRange = document.getElementById("volume-slider");
const btnBack = document.getElementById("btn-back");

// Render piano
piano.render(pianoContainer, (idx) => {
    piano.play(idx, currentVolume);
});

// Volume
volumeRange.oninput = (e) => (currentVolume = parseFloat(e.target.value));

// Button back
btnBack.onclick = () => (window.location.href = "../index.html");


