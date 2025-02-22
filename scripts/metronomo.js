const btn_metronomo = document.getElementById('btn-metronomo');//botao para abrir modal metronomo
const modal_metronomo = document.getElementById('modal_metronomo');//modal metronomo

const play_metronomo = document.getElementById('playMetronomo');
const stop_metronomo = document.getElementById('stopMetronomo');
const bpm = document.getElementById('bpm');

let metronomoAudioInstance = null;
let metronomoIsPlaying = false;
let cronometroIntervaloId = null;

function reproduzirMetronomo(bpm) {
    const intervalo = (60 / bpm) * 1000; // Intervalo entre batidas em milissegundos
    let count = 0; // Contador para saber quando é o tempo forte

    // Definir o som do metrônomo
    const somMetronomo = new Audio('../src/metronome/metronome.mp3'); // Defina o caminho correto do arquivo de áudio
    metronomoAudioInstance = somMetronomo; // Inicializa a variável do áudio

    // Função que toca o som
    function tocar() {
        if (metronomoAudioInstance && !metronomoAudioInstance.paused) {
            metronomoAudioInstance.pause(); // Parar o áudio se estiver tocando
            metronomoAudioInstance.currentTime = 0; // Resetar o tempo do áudio
        }

        // Se for o primeiro tempo ou múltiplos de 4, toque um som diferente (tempo forte)
        if (count === 0 || count % 4 === 0) {
            const somForte = new Audio('../src/metronome/metronome.mp3  '); // Som diferente para tempo forte
            somForte.play();
        } else {
            metronomoAudioInstance.play();
        }

        count++;
    }

    // Começar a tocar o metrônomo
    if (!metronomoIsPlaying) {
        metronomoIsPlaying = true;
        tocar(); // Toca o primeiro som imediatamente
        cronometroIntervaloId = setInterval(tocar, intervalo); // Usar setInterval para chamadas repetidas
    }
}

// Parar o metrônomo
function pararMetronomo() {
    metronomoIsPlaying = false;
    clearInterval(cronometroIntervaloId); // Usar clearInterval para parar
    if (metronomoAudioInstance) {
        metronomoAudioInstance.pause(); // Pause o áudio atual se necessário
        metronomoAudioInstance.currentTime = 0; // Reset o tempo
    }
    console.log("Metrônomo parado.");
}

play_metronomo.addEventListener('click', () => {
    pararMetronomo();
    reproduzirMetronomo(bpm.value);       
})

stop_metronomo.addEventListener('click', () => {
    pararMetronomo();
})

function toggleModalMetronomo() {
    modal_metronomo.classList.toggle('aberto');
    btn_metronomo.classList.toggle('aberto');
}

btn_metronomo.addEventListener('click', () => {
    toggleModalMetronomo();
})

// reproduzirMetronomo(120); // Começar o metrônomo a 120 BPM
// Para parar, você pode chamar a função pararMetronomo().