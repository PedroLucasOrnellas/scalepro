let touchStartX = 0;
let touchEndX = 0;

const swipeThreshold = 150; // Distância mínima para considerar como swipe

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX; // Captura a posição inicial do toque
}

function handleTouchEnd(event) {
  touchEndX = event.changedTouches[0].clientX; // Captura a posição final do toque

  // Verifica se o movimento foi da esquerda para a direita
  if (touchEndX - touchStartX > swipeThreshold) {
    console.log('Deslizou da esquerda para a direita!');
    abrirMenuEsquerdo();
    // Aqui você pode adicionar o que deve acontecer quando detectar o swipe
  }

  // Verifica se o movimento foi da direita para a esquerda
  if (touchStartX - touchEndX > swipeThreshold) {
    console.log('Deslizou da direita para a esquerda!');
    abrirMenuDireito();  // Função para abrir o menu direito
  }

}

// Adiciona os event listeners para os eventos de toque
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleTouchEnd);
