const audios = document.querySelectorAll('.audios audio');
const audiosArray = Array.from(audios);

function reproduzirNotas(notaElement){
    let indexAudios;
    const nota = notaElement.getAttribute('data-name');

     if(nota.includes('b')) {
        indexAudios = audiosArray.indexOf(nota) !== -1 ? audiosArray.indexOf(nota) - 1 : 'not-found';
    }
    console.log(indexAudios);
    
    // Obter o nome da nota a partir do atributo data-name
    // let notaSymbol = nota.getAttribute('data-name').toLowerCase().replace('#', 'Sus');
    // if(indexAudios)
    //     notaSymbol = notasArray[indexAudios].toLowerCase().replace('#', 'Sus');
    console.log(nota);
    console.log(audios)
}