let metronomoAudioInstance = null;
let metronomoIsPlaying = false;
let cronometroIntervaloId = null;

function reproduzirMetronomo(bpm) {
    const intervalo = (60 / bpm) * 1000; // Intervalo entre batidas em milissegundos
    let count = 0; // Contador para saber quando é o tempo forte

    // Definir o som do metrônomo
    const somMetronomo = new Audio('../notes/29.wav'); // Defina o caminho correto do arquivo de áudio
    metronomoAudioInstance = somMetronomo; // Inicializa a variável do áudio

    // Função que toca o som
    function tocar() {
        if (metronomoAudioInstance && !metronomoAudioInstance.paused) {
            metronomoAudioInstance.pause(); // Parar o áudio se estiver tocando
            metronomoAudioInstance.currentTime = 0; // Resetar o tempo do áudio
        }

        // Se for o primeiro tempo ou múltiplos de 4, toque um som diferente (tempo forte)
        if (count === 0 || count % 4 === 0) {
            const somForte = new Audio('../notes/36.wav'); // Som diferente para tempo forte
            somForte.play();
        } else {
            metronomoAudioInstance.play();
        }

        count++;

        // Se o metrônomo deve continuar tocando, chame a função novamente
        if (metronomoIsPlaying) {
            cronometroIntervaloId = setTimeout(tocar, intervalo);
        }
    }

    // Começar a tocar o metrônomo
    if (!metronomoIsPlaying) {
        metronomoIsPlaying = true;
        tocar(); // Toca o primeiro som imediatamente
    }
}

// Parar o metrônomo
function pararMetronomo() {
    metronomoIsPlaying = false;
    clearTimeout(cronometroIntervaloId);
    if (metronomoAudioInstance) {
        metronomoAudioInstance.pause(); // Pause o áudio atual se necessário
        metronomoAudioInstance.currentTime = 0; // Reset o tempo
    }
    console.log("Metrônomo parado.");
}

// Exemplo de uso
// reproduzirMetronomo(120); // Começar o metrônomo a 120 BPM
// Para parar, você pode chamar a função pararMetronomo().
