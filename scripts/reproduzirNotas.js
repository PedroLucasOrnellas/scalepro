const audios = document.querySelectorAll('.audios audio');
const audiosArray = Array.from(audios).map(audio => audio.getAttribute('id'));
let audioInstance = null;

// audios.forEach(audio => {
//     audio.play(); // Força o carregamento
//     // audio.addEventListener('canplaythrough', () => {
//     //     console.log(`Áudio ${audio.id} carregado`);
//     // });
// });

function reproduzirNotas(notaElement) {
    let indexAudios;

    // Obtém o nome da nota do elemento
    let nota = notaElement.getAttribute('data-name').replace('b', 'ant').toLowerCase().replace('#', 'Sus');

    if(nota.includes('ant')) {
        let notaX = nota.toUpperCase().replace('ANT', 'b');
        indexAudios = notasArray.indexOf(notaX) !== -1 ? notasArray.indexOf(notaX) - 1 : 'not-found';
        nota = notasArray[indexAudios].toLowerCase().replace('#', 'Sus');
    }

    // Para o áudio anterior se houver
    if (audioInstance) {
        audioInstance.pause();
        audioInstance.currentTime = 0;
    }

    // Toca o novo áudio e armazena a instância atual
    audioInstance = document.querySelector(`audio[id="${nota}"]`);
    if (audioInstance) {
        audioInstance.play();
    }

    console.log(nota);
}
