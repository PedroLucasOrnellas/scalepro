const audios = document.querySelectorAll('.audios audio');
const audiosArray = Array.from(audios).map(audio => audio.getAttribute('id'));
let audioInstance = null;

const audioBuffers = {};
let audioContextInitialized = false;

async function carregarBuffersDeNotas() {
    if (!audioContextInitialized) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextInitialized = true;
    }

    const promises = audiosArray.map(async id => {
        const url = document.querySelector(`audio[id="${id}"]`).src;
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBuffers[id] = audioBuffer;
    });

    await Promise.all(promises);
    console.log('Buffers carregados');
}

document.addEventListener('click', () => {
    audios.forEach(audio => {
        audio.load(); // força o carregamento
    });
    console.log('audios carregados');
}, { once: true });

let currentNoteSource = null; // fonte de áudio atual

function reproduzirNotas(notaElement, time) {
    let nota = notaElement.getAttribute('data-name')
        .replace('b', 'ant')
        .toLowerCase()
        .replace('#', 'Sus');

    if (nota.includes('ant')) {
        let notaX = nota.toUpperCase().replace('ANT', 'b');
        let indexAudios = notasArray.indexOf(notaX) !== -1 ? notasArray.indexOf(notaX) - 1 : -1;
        if (indexAudios !== -1) {
            nota = notasArray[indexAudios].toLowerCase().replace('#', 'Sus');
        } else {
            console.warn('Nota não encontrada:', notaX);
            return;
        }
    }

    const buffer = audioBuffers[nota];
    if (buffer) {
        // Para o som anterior, se estiver tocando
        if (currentNoteSource) {
            try {
                currentNoteSource.stop(); // força parar
            } catch (e) {
                console.warn("Erro ao parar nota anterior:", e);
            }
            currentNoteSource.disconnect();
        }

        // Cria nova instância e toca a nota atual
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(time);

        currentNoteSource = source;
    } else {
        console.warn('Buffer não encontrado para a nota:', nota);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await carregarBuffersDeNotas();
});
