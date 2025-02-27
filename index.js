// Selecionando os elementos da página
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const tempoInput = document.getElementById('tempo');
const container = document.querySelector('.container');
const notasGrid = document.getElementById('notas-grid');
const menuEsquerdo = document.querySelector('.lateral-esquerda');
const menuDireito = document.querySelector('.lateral-direita');

let isPlaying = false;

// Array com todas as notas musicais
// const notasArray = [
//     'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'Fb', 'F', 'F#', 'Gb', 'G', 
//     'G#', 'Ab', 'A', 'A#', 'Bb', 'B', 'Cb'
// ];
const notasArray = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 
    'G#', 'A', 'A#', 'B', 'Cb'
];


// Função para criar dinamicamente as notas como checkboxes
function criarNotasCheckbox() {
    notasArray.forEach(nota => {
        // Cria o elemento de checkbox
        const label = document.createElement('label');
        label.classList.add('nota-checkbox');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = nota;

        const text = document.createTextNode(nota);

        label.appendChild(checkbox);
        label.appendChild(text);
        notasGrid.append(label);
    });
}

// Função para pegar as notas selecionadas
function obterNotasSelecionadas() {
    const notasSelecionadas = [];
    const checkboxes = notasGrid.querySelectorAll('input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        notasSelecionadas.push(checkbox.value);
    });

    return notasSelecionadas;
}

// Função que irá percorrer as notas no tempo determinado
function percorrerNotas(tempo) {
    const notasSelecionadas = obterNotasSelecionadas();
    
    // Se não houver notas selecionadas, retorna
    if (notasSelecionadas.length === 0) {
        alert('Por favor, selecione algumas notas!');
        return;
    }
    reproduzirMetronomo(tempo);

    const intervalo = ((60 / tempo) * 1000 * 4); // Transforma o tempo em bpm
    let index = 0; // Índice da nota que está sendo ativada

    // Limpa a classe 'active' de todas as notas antes de começar
    const notas = document.querySelectorAll('.nota');
    notas.forEach(nota => nota.classList.remove('active'));

    // Marca e toca a primeira nota imediatamente
    const primeiraNotaDiv = document.querySelector(`.nota[data-name="${notasSelecionadas[index]}"]`);
    if (primeiraNotaDiv) {
        primeiraNotaDiv.classList.add('active');
        reproduzirNotas(primeiraNotaDiv);
    }

    // Avança para a próxima nota
    index++;

    // Inicia o setInterval para as notas seguintes
    intervaloId = setInterval(() => {
        // Limpa a classe 'active' de todas as notas antes de marcar a próxima
        const notas = document.querySelectorAll('.nota');
        notas.forEach(nota => nota.classList.remove('active'));

        // Marca a nota atual
        const notaDiv = document.querySelector(`.nota[data-name="${notasSelecionadas[index]}"]`);
        if (notaDiv) notaDiv.classList.add('active');

        // Reproduz som
        reproduzirNotas(notaDiv);
        
        // Avança para a próxima nota
        index++;

        // Quando todas as notas forem percorridas, reinicia o loop
        if (index >= notasSelecionadas.length) {
            index = 0;
        }
    }, intervalo);

    isPlaying = true;
}


// Função que será chamada quando o botão Play for clicado
playBtn.addEventListener('click', () => {
    const tempo = parseInt(tempoInput.value);

    // Se o tempo não for válido ou não for um número positivo
    if (isNaN(tempo) || tempo <= 0) {
        alert('Por favor, insira um tempo válido (em segundos).');
        return;
    }
    if (isPlaying) stopMusic();
    
    // Inicia a animação
    percorrerNotas(tempo);
});

// Função que será chamada quando o botão Stop for clicado
stopBtn.addEventListener('click', stopMusic);

function stopMusic(){
    pararMetronomo();
    clearInterval(intervaloId); // Para o intervalo e a animação
    // Limpa a classe 'active' de todas as notas
    const notas = document.querySelectorAll('.nota');
    notas.forEach(nota => nota.classList.remove('active'));
    isPlaying = false;
}

// Função para criar as notas visíveis na tela
function criarNotas(notas) {
    let notasSelecionadas = obterNotasSelecionadas();
    if(notas) notasSelecionadas = notas;
    container.innerHTML = '';

    notasSelecionadas.forEach(nota => {
        const divNota = document.createElement('div');
        divNota.classList.add('nota');
        divNota.setAttribute('data-name', nota); // Armazena o nome da nota
        divNota.textContent = nota;
        container.appendChild(divNota);
    });
}

function estilizaNotasSelecionadas(){
    const notas = notasGrid.querySelectorAll('input');

    notas.forEach(e => {
        e.parentElement.classList = 'nota-checkbox'
    })

    notas.forEach(element => {
        if(element.checked){
            element.parentElement.classList = 'nota-checkbox checked';
        }
    });
}

function handleMenu(elemento){
    elemento.classList.toggle('aberto');
}

// Atualiza a interface de notas selecionadas ao mudar a seleção
notasGrid.addEventListener('change', ()=>{
    criarNotas();
    estilizaNotasSelecionadas();
});

// Chama a função para criar as notas quando a página carrega
window.onload = () => {
    criarNotasCheckbox();
    criarNotas();  // Para adicionar as notas selecionadas inicialmente
    exibirNotasSalvas();
};
