const salvarPadrao = document.getElementById('salvar_padrao');
const sequenciasSalvasDiv = document.getElementById('sequencias-salvas');
let sequenciasSalvas;


function salvaSequencias(){
    const notasSelecionadas = obterNotasSelecionadas();

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
        sequenciasSalvas.forEach(sequencia => {
            sequenciaASerInserida = document.createElement('div');
            sequenciaASerInserida.classList= 'sequencia-salvas-item';
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

salvarPadrao.addEventListener('click', () => {
    salvaSequencias();
})