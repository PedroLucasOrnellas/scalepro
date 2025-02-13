const abrirNotas = document.getElementById('abrir-notas');

abrirNotas.addEventListener('click', () => {
    document.querySelector('.lateral-esquerda').classList.toggle('aberto');
})