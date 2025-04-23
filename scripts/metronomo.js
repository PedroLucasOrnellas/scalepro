const btn_metronomo = document.getElementById('btn-metronomo');
const modal_metronomo = document.getElementById('modal_metronomo');

const play_metronomo = document.getElementById('playMetronomo');
const stop_metronomo = document.getElementById('stopMetronomo');
const bpm = document.getElementById('tempo');

let audioContext = null;
let metronomoIsPlaying = false;
let schedulerId = null;
let indexMusica = 0;

let nextNoteTime = 0; // tempo da próxima batida
let current16thNote = 0; // posição do compasso
const lookahead = 25.0; // tempo entre chamadas de agendamento (ms)
const scheduleAheadTime = 0.1; // quanto tempo antes agendar os sons (segundos)

function tocarClick(time) {
    const osc = audioContext.createOscillator();
    const envelope = audioContext.createGain();

    osc.connect(envelope);
    envelope.connect(audioContext.destination);

    if (current16thNote % 4 === 0) {
        osc.frequency.value = 1000; // tempo forte
    } else {
        osc.frequency.value = 700; // tempo fraco
    }

    envelope.gain.setValueAtTime(1, time);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.start(time);
    osc.stop(time + 0.05);
}

function scheduler() {
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
        // tempo forte? toca nota
        if (current16thNote % 4 === 0) {
            if (indexMusica >= obterNotasSelecionadas().length)
                indexMusica = 0;

            const nota = document.querySelector(`.nota[data-name="${obterNotasSelecionadas()[indexMusica]}"]`);
            if (nota) {
                reproduzirNotas(nota, nextNoteTime);
                tocarClick(nextNoteTime); 
            }

            indexMusica++;
        } else {
            tocarClick(nextNoteTime); // tempo fraco
        }

        nextNote(); // agenda próxima batida
    }

    schedulerId = setTimeout(scheduler, lookahead);
}

function nextNote() {
    const secondsPerBeat = 60.0 / bpm.value;
    nextNoteTime += secondsPerBeat;
    current16thNote++;
}

function reproduzirMetronomo() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    metronomoIsPlaying = true;
    nextNoteTime = audioContext.currentTime + 0.05;
    current16thNote = 0;
    indexMusica = 0;
    scheduler();
}

function pararMetronomo() {
    metronomoIsPlaying = false;
    clearTimeout(schedulerId);
    indexMusica = 0;
}

// play_metronomo.addEventListener('click', () => {
//     pararMetronomo();
//     reproduzirMetronomo();
// });

// stop_metronomo.addEventListener('click', () => {
//     pararMetronomo();
// });

// function toggleModalMetronomo() {
//     modal_metronomo.classList.toggle('aberto');
//     btn_metronomo.classList.toggle('aberto');
// }
