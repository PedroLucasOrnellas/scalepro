let audioInstance = null;

const audioCache = {};

// Função para pré-carregar os áudios das notas
function preCarregarAudios() {

    notasArray.forEach(nota => {
        const notaSymbol = nota.toLowerCase().replace('#', 'Sus');
        const audio = new Audio(`${path}src/notes/${notaSymbol}.wav`);
        audioCache[notaSymbol] = audio;
    });
}

// Chamar a função para pré-carregar os áudios quando a página carregar
window.addEventListener('load', preCarregarAudios);

function reproduzirNotas(nota) {
    // Obter o nome da nota a partir do atributo data-name
    const notaSymbol = nota.getAttribute('data-name').toLowerCase().replace('#', 'Sus');
    console.log(notaSymbol);
    
    // Verificar se há uma instância de áudio em execução e parar se necessário
    if (audioInstance && !audioInstance.paused) {
        audioInstance.pause(); // Pausar a reprodução anterior
        audioInstance.currentTime = 0; // Resetar o tempo de reprodução
    }

    // Criar uma nova instância de áudio e reproduzi-la
    audioInstance = new Audio(`${path}src/notes/${notaSymbol}.wav`);
    audioInstance.play();
    console.log(`${path}/notes/${notaSymbol}.wav`);
}
