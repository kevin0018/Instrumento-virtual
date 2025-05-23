import Instrument from './instrument.js';

export default class Guitar extends Instrument {
	constructor(type = "classic") {
		const noteNames = ["DO", "RE", "MI", "FA", "SOL", "LA"];
        const pathParts = window.location.pathname.split("/pages/");
        const basePath = pathParts[0] ? pathParts[0] : "";
        const soundPath = `${basePath}/assets/sounds/guitar`;
        super("Guitar", noteNames, soundPath);
		this.type = type;
	}

	render(container, onPlayString) {
		container.innerHTML = "";
		const guitarBody = document.createElement("div");
		guitarBody.className = "guitar-body";

		this.notes.forEach((note, idx) => {
			const stringRow = document.createElement("div");
			stringRow.className = "guitar-string-row";

			const noteLabelLeft = document.createElement("span");
			noteLabelLeft.className = "note-label left";
			noteLabelLeft.textContent = idx + 1;

			// Cuerda
			const stringElem = document.createElement("button");
			stringElem.className = "guitar-string";
			stringElem.setAttribute('data-string', idx);
			stringElem.onclick = () => onPlayString(idx);

			const noteLabelRight = document.createElement("span");
			noteLabelRight.className = "note-label right";
			noteLabelRight.textContent = note;

			

			stringRow.appendChild(noteLabelLeft);
			stringRow.appendChild(stringElem);
			stringRow.appendChild(noteLabelRight);

			guitarBody.appendChild(stringRow);
		});

		container.appendChild(guitarBody);
	}
}