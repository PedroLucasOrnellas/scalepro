const abrirNotas = document.getElementById('abrir-notas');
const limparNotas = document.getElementById('limpar-notas');

salvarPadrao.addEventListener('click', () => {
    salvaSequencias();
    toggleMenu(menuEsquerdo);
})

limparNotas.addEventListener("click", () => {
    selecionarNotas([]);
    criarNotas();
})

abrirNotas.addEventListener('click', () => {
    abrirMenuEsquerdo();
})

function abrirMenuEsquerdo() {
    toggleMenu(menuEsquerdo);
    closeMenu(menuDireito);
}