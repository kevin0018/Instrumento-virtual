export default class Instrument {
    constructor(name, notes, soundPath) {
        this.name = name;
        this.notes = notes;
        this.soundPath = soundPath;
    }

    play(noteIndex, volume = 1) {
        const audio = new Audio(`${this.soundPath}/${noteIndex + 1}.mp3`);
        audio.volume = volume;
        audio.play();
    }
}