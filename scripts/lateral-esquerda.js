const abrirNotas = document.getElementById('abrir-notas');
const limparNotas = document.getElementById('limpar-notas');

salvarPadrao.addEventListener('click', () => {
    salvaSequencias();
    handleMenu(menuEsquerdo);
})

limparNotas.addEventListener("click", () => {
    selecionarNotas([]);
    criarNotas();
})

abrirNotas.addEventListener('click', () => {
    handleMenu(menuEsquerdo);
})