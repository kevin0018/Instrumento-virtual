import Instrument from './instrument.js';

export default class Piano extends Instrument {
    constructor(type = "piano") {
        const noteNames = [
            "DO", "DO-RE", "RE", "RE-MI", "MI",
            "FA", "FA-SOL", "SOL", "SOL-LA", "LA",
            "LA-SI", "SI", "DO-2", "DO-RE-2", "RE-2",
            "RE-MI-2", "MI-2", "FA-2", "FA-SOL-2", "SOL-2",
            "SOL-LA-2", "LA-2", "LA-SI-2", "SI-2", "DO-3",
            "DO-RE-3", "RE-3", "RE-MI-3", "MI-3", "FA-3",
            "FA-SOL-3", "SOL-3", "SOL-LA-3", "LA-3", "LA-SI-3",
            "SI-3",
        ];
        const pathParts = window.location.pathname.split("/pages/");
        const basePath = pathParts[0] ? pathParts[0] : "";
        const soundPath = `${basePath}/assets/sounds/piano`;
        super("Piano", noteNames, soundPath);
        this.type = type;
    }

    getNoteDisplayName(note) {
        // Remove octave suffix
        return note.replace(/-\d+$/, "");
    }

    render(onPlayString) {
        const pianoBody = document.getElementById('piano');
        pianoBody.innerHTML = "";

        // Set of black notes
        const blackNotes = new Set([
            "DO-RE", "RE-MI", "FA-SOL", "SOL-LA", "LA-SI",
            "DO-RE-2", "RE-MI-2", "FA-SOL-2", "SOL-LA-2", "LA-SI-2",
            "DO-RE-3", "RE-MI-3", "FA-SOL-3", "SOL-LA-3", "LA-SI-3"
        ]);

        let i = 0;
        while (i < this.notes.length) {
            const note = this.notes[i];
            if (!blackNotes.has(note)) {
                const li = document.createElement("li");
                li.className = "key white-key";
                li.setAttribute("data-note", note);

                const whiteText = document.createElement("span");
                whiteText.className = "note-text";
                whiteText.textContent = this.getNoteDisplayName(note);
                li.appendChild(whiteText);

                if (blackNotes.has(this.notes[i + 1])) {
                    const blackNote = this.notes[i + 1];
                    const blackDiv = document.createElement("div");
                    blackDiv.className = "black-key";
                    blackDiv.setAttribute("data-note", blackNote);
                    const blackText = document.createElement("span");
                    blackText.className = "note-text";
                    blackText.textContent = this.getNoteDisplayName(blackNote);
                    blackDiv.appendChild(blackText);
                    li.appendChild(blackDiv);

                    i++;
                }

                pianoBody.appendChild(li);
            }
            i++;
        }

        pianoBody.addEventListener("click", (event) => {
            let key = event.target.closest(".black-key, .white-key");
            if (key && key.hasAttribute("data-note")) {
                onPlayString(key.getAttribute("data-note"));
            }
        });
    }
}