let audioInstance = null;

const audioCache = {};

// Função para pré-carregar os áudios das notas
function preCarregarAudios() {

    notasArray.forEach(nota => {
        let notaSymbol = nota;
        if(!notaSymbol.includes('b')) {
            notaSymbol = notaSymbol.toLowerCase().replace('#', 'Sus');
            const audio = new Audio(`${path}src/notes/${notaSymbol}.wav`);
            audio.preload = "auto";// Garantir que o áudio será pré-carregado
            audio.load();  
            audioCache[notaSymbol] = audio;
        }
    });
}

// Chamar a função para pré-carregar os áudios quando a página carregar
window.addEventListener('load', preCarregarAudios);

function reproduzirNotas(nota) {
    let indexarray;
    const symbolValue = nota.getAttribute('data-name');

    if(symbolValue  .includes('b')) {
        indexarray = notasArray.indexOf(symbolValue) !== -1 ? notasArray.indexOf(symbolValue) - 1 : 'not-found';
    }
    
    // Obter o nome da nota a partir do atributo data-name
    let notaSymbol = nota.getAttribute('data-name').toLowerCase().replace('#', 'Sus');
    if(indexarray)
        notaSymbol = notasArray[indexarray].toLowerCase().replace('#', 'Sus');
    
    console.log(notaSymbol);

    // Verificar se há uma instância de áudio em execução e parar se necessário
    if (audioInstance && !audioInstance.paused) {
        audioInstance.pause(); // Pausar a reprodução anterior
        audioInstance.currentTime = 0; // Resetar o tempo de reprodução
    }

    // Verificar se o áudio já foi carregado no cache e reproduzi-lo
    if (audioCache[notaSymbol]) {
        audioInstance = audioCache[notaSymbol]; // Usar o áudio carregado do cache
        audioInstance.play();
        console.log(`${path}/notes/${notaSymbol}.wav`);
    } else {
        console.warn(`Áudio não encontrado para a nota: ${notaSymbol}`);
    }

    // Criar uma nova instância de áudio e reproduzi-la
    // audioInstance = new Audio(`${path}src/notes/${notaSymbol}.wav`);
    // audioInstance.play();
    // console.log(`${path}/notes/${notaSymbol}.wav`);
}
