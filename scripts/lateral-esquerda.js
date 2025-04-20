const abrirNotas = document.getElementById('abrir-notas');
const limparNotas = document.getElementById('limpar-notas');

salvarPadrao.addEventListener('click', () => {
    salvaSequencias();
    openMenu(menuEsquerdo);
})

limparNotas.addEventListener("click", () => {
    selecionarNotas([]);
    criarNotas();
})

abrirNotas.addEventListener('click', () => {
    abrirMenuEsquerdo();
})

function abrirMenuEsquerdo() {
    if (meOpen){
        closeMenu(menuEsquerdo);
        meOpen = false;
    }else{
        meOpen = true;
        openMenu(menuEsquerdo);
        closeMenu(menuDireito);
    }
}