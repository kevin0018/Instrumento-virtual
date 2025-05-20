import Instrument from './instrument.js';

export default class Piano extends Instrument {
	constructor(type = "piano") {
		const noteNames = [ 
			"DO",
			"DO-RE",
			"RE",
			"RE-MI",
			"MI",
			"FA",
			"FA-SOL",
			"SOL",
			"SOL-LA",
			"LA",
			"LA-SI",
			"SI",
			"DO-2",
			"DO-RE-2",
			"RE-2",
			"RE-MI-2",
			"MI-2",
			"FA-2",
			"FA-SOL-2",
			"SOL-2",
			"SOL-LA-2",
			"LA-2",
			"LA-SI-2",
			"SI-2",
			"DO-3",
			"DO-RE-3",
			"RE-3",
			"RE-MI-3",
			"MI-3",
			"FA-3",
			"FA-SOL-3",
			"SOL-3",
			"SOL-LA-3",
			"LA-3",
			"LA-SI-3",
			"SI-3",
		];
		const pathParts = window.location.pathname.split("/pages/");
		const basePath = pathParts[0] ? pathParts[0] : "";
		const soundPath = `${basePath}/assets/sounds/piano`;
		super("Piano", noteNames, soundPath);
		this.type = type;
	}
	getNoteDisplayName(note) {
		const displayName = note.replace(/-\d+$/, "");
		return displayName;
	}

	render(container, onPlayString) {
		container.innerHTML = "";
		const pianoBody = document.getElementById('piano')

		const blackKeys = [
			"DO-RE", "RE-MI", "FA-SOL", "SOL-LA", "LA-SI",
			"DO-RE-2", "RE-MI-2", "FA-SOL-2", "SOL-LA-2", "LA-SI-2",
			"DO-RE-3", "RE-MI-3", "FA-SOL-3", "SOL-LA-3", "LA-SI-3"
		];

		this.notes.forEach((note, i) => {
			const isBlack = blackKeys.includes(note);

			if (isBlack) {
				// Añadir la tecla negra a la última tecla blanca creada
				const lastWhiteKey = pianoBody.lastElementChild;
				if (lastWhiteKey) {
					const blackKeyDiv = document.createElement("div");
					blackKeyDiv.classList.add("black-key");
					const noteText = document.createElement("span");
					noteText.className = "note-text";
					noteText.textContent = this.getNoteDisplayName(note);
					blackKeyDiv.appendChild(noteText);
					lastWhiteKey.appendChild(blackKeyDiv);
					lastWhiteKey.classList.add("has-black-key");
				}
			} else {
				// Crear una nueva tecla blanca
				const noteLabel = document.createElement("li");
				noteLabel.className = "key";
				noteLabel.setAttribute("data-note-index", i);
				noteLabel.setAttribute("data-note", note);

				const noteText = document.createElement("span");
				noteText.className = "note-text";
				noteText.textContent = this.getNoteDisplayName(note);
				noteLabel.appendChild(noteText);

				pianoBody.appendChild(noteLabel);
			}
		});

		pianoBody.addEventListener("click", (event) => {
			const key = event.target.closest(".key");
			if (key && key.hasAttribute("data-note")) {
				const note = key.getAttribute("data-note");
				onPlayString(note);
			}
		});

		container.appendChild(pianoBody);
	}
}
