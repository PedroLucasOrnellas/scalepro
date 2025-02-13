const salvarPadrao = document.getElementById('salvar_padrao');
const sequenciasSalvasDiv = document.getElementById('sequencias-salvas');
const abrirSequenciasSlavas = document.getElementById('abrir-sequencias');
let sequenciasSalvas;

function getSequenciasSalvas(){
    return JSON.parse(localStorage.getItem('sequenciasSalvas'));
}

function salvaSequencias(){
    const notasSelecionadas = obterNotasSelecionadas();
    const sequenciasSalvas = getSequenciasSalvas();

    if(!sequenciasSalvas){
        sequenciasSalvas = JSON.parse(localStorage.getItem('sequenciasSalvas')) || [];
    }
    if(sequenciasSalvas.length >= 5) sequenciasSalvas.shift();
    
    if(notasSelecionadas.length > 2) sequenciasSalvas.push(notasSelecionadas);
    else alert('Pelo menos três notas devem estar selecionadas');
    
    localStorage.setItem('sequenciasSalvas', JSON.stringify(sequenciasSalvas));
    console.log(sequenciasSalvas);
    exibirNotasSalvas();
}

function exibirNotasSalvas(){
    sequenciasSalvasDiv.innerHTML = '';
    sequenciasSalvas = JSON.parse(localStorage.getItem('sequenciasSalvas'));
    if(!sequenciasSalvas){
        sequenciasSalvasDiv.innerHTML = 'Não há sequências salvas'
    }else{
        sequenciasSalvas.forEach((sequencia, i) => {
            sequenciaASerInserida = document.createElement('div');
            sequenciaASerInserida.classList= 'sequencia-salvas-item';
            sequenciaASerInserida.setAttribute('data-id', i);
            sequencia.forEach(nota =>{
                notaDiv = document.createElement('div')
                notaDiv.classList = 'sequencia-salvas-nota'
                notaDiv.innerHTML = nota;
                sequenciaASerInserida.append(notaDiv);

                sequenciasSalvasDiv.append(sequenciaASerInserida)
                // sequenciasSalvasDiv.innerHTML += nota + " "
            })
        });
        // sequenciasSalvasDiv.innerHTML = 'Suas sequências'
    }
}

function carregaSequenciaEscolhida(seqClicada){
    const idSequencia = seqClicada.getAttribute('data-id');
    const sequenciasSalvas = getSequenciasSalvas();
    const sequenciaEscolhida = sequenciasSalvas[idSequencia];

    criarNotas(sequenciaEscolhida);
    selecionarNotas(sequenciaEscolhida);
}

function selecionarNotas(sequenciaEscolhida){
    const checkboxs = notasGrid.querySelectorAll('.nota-checkbox input');

    //desmarcar todas
    checkboxs.forEach( letraCheckbox => {
        letraCheckbox.checked = false;
        letraCheckbox.parentElement.classList = 'nota-checkbox'
    });

    sequenciaEscolhida.forEach((letra) => {
        // console.log(letra);
        checkboxs.forEach( letraCheckbox => {
            if(letra === letraCheckbox.value) {
                letraCheckbox.click()
            }
            
            // console.log(letraCheckbox) 
        })
    })
}

sequenciasSalvasDiv.addEventListener('click', ({target}) => {
    let seqClicada;
    if(target.parentElement.classList[0] === 'sequencia-salvas-item') seqClicada = target.parentElement;
    else if(target.classList[0] === 'sequencia-salvas-item') seqClicada = target;
    else return

    carregaSequenciaEscolhida(seqClicada);
})

salvarPadrao.addEventListener('click', () => {
    salvaSequencias();
})

abrirSequenciasSlavas.addEventListener('click', () => {
        document.querySelector('.lateral-direita').classList.toggle('aberto');
})