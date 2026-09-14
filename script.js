const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const buttonsArea = document.getElementById('buttonsArea');
const result = document.getElementById('result');
const subtitle = document.getElementById('subtitle');

// Frases que aparecem no corpo da carta quando tentam recusar
const mensagens = [
  "prometo que vai ser legal.",
  "por que você não quer?",
  "vamos fazer muitas coisas divertidas.",
  "tem certeza mesmo?",
  "só uma chance, vai...",
  "vai ser a melhor decisão do seu dia.",
  "eu prometo que não vou pisar no seu pé.",
  "pensa bem antes de recusar... 👀",
  "essa carta não aceita 'não' como resposta."
];

let ultimoIndex = -1;
let ultimaPosicao = { x: null, y: null };
let emTransicao = false;

const RAIO_FUGA = 110;     // distância (px) a partir da qual o botão foge do cursor/toque
const DURACAO_TRANSICAO = 420; // deve casar com a transição do CSS

function mudarMensagem() {
  let novoIndex;
  do {
    novoIndex = Math.floor(Math.random() * mensagens.length);
  } while (novoIndex === ultimoIndex && mensagens.length > 1);

  ultimoIndex = novoIndex;

  subtitle.style.opacity = 0;
  setTimeout(() => {
    subtitle.textContent = mensagens[novoIndex];
    subtitle.style.opacity = 1;
  }, 150);
}

// Move o botão "Não" para um lugar bem diferente da posição anterior,
// sempre dentro da área visível da tela.
function moverBotaoNao() {
  const margem = 16;
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const maxX = Math.max(margem, window.innerWidth - btnWidth - margem);
  const maxY = Math.max(margem, window.innerHeight - btnHeight - margem);

  // Distância mínima exigida em relação à posição anterior,
  // para garantir que o botão realmente "fuja" para outro canto da tela
  const distanciaMinima = Math.min(window.innerWidth, window.innerHeight) * 0.4;

  let novoX, novoY, tentativas = 0;

  do {
    novoX = margem + Math.random() * (maxX - margem);
    novoY = margem + Math.random() * (maxY - margem);
    tentativas++;
  } while (
    ultimaPosicao.x !== null &&
    tentativas < 16 &&
    Math.hypot(novoX - ultimaPosicao.x, novoY - ultimaPosicao.y) < distanciaMinima
  );

  ultimaPosicao = { x: novoX, y: novoY };

  noBtn.style.left = novoX + 'px';
  noBtn.style.top = novoY + 'px';
}

function fugir() {
  if (emTransicao) return;
  emTransicao = true;
  moverBotaoNao();
  mudarMensagem();
  setTimeout(() => { emTransicao = false; }, DURACAO_TRANSICAO);
}

function distanciaAteBotao(x, y) {
  const rect = noBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  return Math.hypot(x - cx, y - cy);
}

function dizerSim() {
  buttonsArea.style.display = 'none';
  noBtn.style.display = 'none';
  result.innerHTML = '🎉 Ebaaa, você não vai se arrepender! 🎉';
  result.classList.add('show');
}

// Corações e pétalas caindo atrás da carta
function criarQuedaDeCorações() {
  const container = document.getElementById('petalsBg');
  const emojis = ['🌹', '💌', '❤️', '💕', '🥀'];
  const quantidade = 26;

  for (let i = 0; i < quantidade; i++) {
    const item = document.createElement('span');
    item.className = 'falling-petal';
    item.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const tamanho = 14 + Math.random() * 18;
    const duracao = 7 + Math.random() * 9;
    const atraso = Math.random() * 16;
    const posicaoX = Math.random() * 100;
    const deriva = (Math.random() * 60 - 30) + 'px';

    item.style.left = posicaoX + 'vw';
    item.style.fontSize = tamanho + 'px';
    item.style.animationDuration = duracao + 's';
    item.style.animationDelay = '-' + atraso + 's';
    item.style.setProperty('--drift', deriva);

    container.appendChild(item);
  }
}

criarQuedaDeCorações();

// Botão "Sim"
yesBtn.addEventListener('click', dizerSim);

// Botão "Não": clique, foco (teclado) e toque disparam fuga direta
noBtn.addEventListener('click', fugir);
noBtn.addEventListener('focus', fugir);
noBtn.addEventListener('touchstart', function (e) {
  e.preventDefault();
  fugir();
}, { passive: false });

// Fuga por proximidade do mouse: o botão percebe o cursor chegando perto
window.addEventListener('mousemove', (e) => {
  if (result.classList.contains('show')) return;
  if (distanciaAteBotao(e.clientX, e.clientY) < RAIO_FUGA) {
    fugir();
  }
});

// Fuga por proximidade do toque, para quem arrasta o dedo perto do botão no celular
window.addEventListener('touchmove', (e) => {
  if (result.classList.contains('show')) return;
  const touch = e.touches[0];
  if (!touch) return;
  if (distanciaAteBotao(touch.clientX, touch.clientY) < RAIO_FUGA) {
    fugir();
  }
}, { passive: true });

// Reposiciona se a tela for redimensionada e o botão ficar fora da área visível
window.addEventListener('resize', () => {
  const maxX = window.innerWidth - noBtn.offsetWidth - 16;
  const maxY = window.innerHeight - noBtn.offsetHeight - 16;
  const atualX = parseFloat(noBtn.style.left) || 0;
  const atualY = parseFloat(noBtn.style.top) || 0;

  if (atualX > maxX || atualY > maxY) {
    moverBotaoNao();
  }
});

// Posição inicial do botão "Não", levemente deslocada
window.addEventListener('load', () => {
  const x = window.innerWidth * 0.68;
  const y = window.innerHeight * 0.62;
  ultimaPosicao = { x, y };
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
});
