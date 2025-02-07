const salvarPadrao = document.getElementById('salvar_padrao');
const sequenciasSalvasDiv = document.getElementById('sequencias-salvas');
let sequenciasSalvas;


function salvaSequencias(){
    if(!sequenciasSalvas){
        sequenciasSalvas = JSON.parse(localStorage.getItem('sequenciasSalvas')) || [];
    }
    const notasSelecionadas = obterNotasSelecionadas();
    if(notasSelecionadas.length > 2) sequenciasSalvas.push(notasSelecionadas);
    else alert('Pelo menos três notas devem estar selecionadas');
    
    localStorage.setItem('sequenciasSalvas', JSON.stringify(sequenciasSalvas));
    console.log(sequenciasSalvas);
}

function exibirNotasSalvas(){
    sequenciasSalvas = JSON.parse(localStorage.getItem('sequenciasSalvas'));
    if(!sequenciasSalvas){
        sequenciasSalvasDiv.innerHTML = 'Não há sequências salvas'
    }else{
        sequenciasSalvas.forEach(sequencia => {
            sequencia.forEach(nota =>{
                sequenciasSalvasDiv.innerHTML += nota + " "
            })
            sequenciasSalvasDiv.innerHTML += '<br>'
        });
        // sequenciasSalvasDiv.innerHTML = 'Suas sequências'
    }
}

salvarPadrao.addEventListener('click', () => {
    salvaSequencias();
})