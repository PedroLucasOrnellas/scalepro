
const notes = {
    E2: 82.41,
    A2: 110.00,
    D3: 146.83,
    G3: 196.00,
    B3: 246.94,
    E4: 329.63
};

let audioContext;
let analyser;
let source;
let animationId;
let buffer = new Float32Array(2048);
let lastFrequencies = [];

const canvas = document.getElementById('needle');
const ctx = canvas.getContext('2d');

const noteDisplay = document.getElementById('note');
const freqDisplay = document.getElementById('freq');
const statusDisplay = document.getElementById('status');

document.getElementById('startButton').addEventListener('click', async () => {
    gtag_report_conversion();
    if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    source = audioContext.createMediaStreamSource(stream);

    const filter = audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 300;
    filter.Q.value = 1;

    source.connect(filter);

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    filter.connect(analyser);
    detectPitch();
});

document.getElementById('stopButton').addEventListener('click', () => {
    if (animationId) cancelAnimationFrame(animationId);
    if (source) source.disconnect();
    if (audioContext && audioContext.state !== 'closed') audioContext.close();

    audioContext = null;
    analyser = null;
    source = null;
    lastFrequencies = [];
    noteDisplay.textContent = '---';
    freqDisplay.textContent = '---';
    statusDisplay.textContent = 'Afinador parado';
    statusDisplay.style.color = '#8b949e';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function detectPitch() {
    analyser.getFloatTimeDomainData(buffer);
    const freq = autoCorrelate(buffer, audioContext.sampleRate);
    if (freq) {
    const smoothed = smoothFrequency(freq);
    const note = getClosestNote(smoothed);
    updateUI(note, smoothed);
    }
    animationId = requestAnimationFrame(detectPitch);
}

function smoothFrequency(freq) {
    lastFrequencies.push(freq);
    if (lastFrequencies.length > 5) lastFrequencies.shift();
    return lastFrequencies.reduce((a, b) => a + b, 0) / lastFrequencies.length;
}

function getClosestNote(freq) {
    let closest = null;
    let minDiff = Infinity;
    for (const note in notes) {
    const diff = Math.abs(notes[note] - freq);
    if (diff < minDiff) {
        closest = note;
        minDiff = diff;
    }
    }
    return closest;
}

function updateUI(note, freq) {
    const target = notes[note];
    const diff = freq - target;
    noteDisplay.textContent = `Nota: ${note}`;
    freqDisplay.textContent = `Detectado: ${freq.toFixed(2)} Hz | Correto: ${target} Hz | Diferença: ${diff.toFixed(2)} Hz`;

    if (Math.abs(diff) < 1.5) {
    statusDisplay.textContent = "Afinado!";
    statusDisplay.style.color = "#0f0";
    } else if (diff < 0) {
    statusDisplay.textContent = "Afinando para baixo";
    statusDisplay.style.color = "#1f6feb";
    } else {
    statusDisplay.textContent = "Afinando para cima";
    statusDisplay.style.color = "#f33";
    }

    drawNeedle(diff);
}

function drawNeedle(diff) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height);
    ctx.rotate((Math.max(-30, Math.min(30, diff)) * Math.PI) / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -80);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.restore();
}

function autoCorrelate(buf, sampleRate) {
    let SIZE = buf.length;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return null;

    let c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - i; j++) {
        c[i] += buf[j] * buf[j + i];
    }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;

    let maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) {
    if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
    }
    }

    const T0 = maxpos;

    // Interpolação parabólica
    const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    const shift = a ? -b / (2 * a) : 0;
    return sampleRate / (T0 + shift);
}

// configuração modal
document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('modalAviso').style.display = 'none';
});
