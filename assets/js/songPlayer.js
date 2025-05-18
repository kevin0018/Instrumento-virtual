export default class SongPlayer {
    constructor(instrument) {
        this.instrument = instrument;
        this.isPlaying = false;
        this.timeoutId = null;
    }

    playSong(songArray, bpm = 80, onStep) {
        this.isPlaying = true;
        let idx = 0;
        const interval = 60000 / bpm;

        const playNext = () => {
            if (!this.isPlaying || idx >= songArray.length) return;
            const noteIdx = songArray[idx];
            this.instrument.play(noteIdx);
            if (onStep) onStep(noteIdx);
            idx++;
            this.timeoutId = setTimeout(playNext, interval);
        };
        playNext();
    }

    stop() {
        this.isPlaying = false;
        if (this.timeoutId) clearTimeout(this.timeoutId);
    }
}