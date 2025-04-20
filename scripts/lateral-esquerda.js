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
    }else{
        meOpen = true;
        openMenu(menuEsquerdo);
        closeMenu(menuDireito);

        //adiciona o fundo para fechar o menu se clicar fora dele
        addFundoElemento(menuEsquerdo, () => {
            closeMenu(menuEsquerdo);
        });
    }
}