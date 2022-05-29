const qtdBalls = 6;
let position = -Infinity;
const container = document.getElementById('guess-colors');
const answer = document.getElementById('answer');
const score = document.getElementById('score');
const reset = document.getElementById('reset-game');

function randomColor() {
  const color1 = `rgb(${Math.round(Math.random() * 255)} `;
  const color2 = `, ${Math.round(Math.random() * 255)} `;
  const color3 = `, ${Math.round(Math.random() * 255)})`;
  console.log(color1 + color2 + color3);
  return color1 + color2 + color3;
}

function setRgbText(texto) {
  const str = texto.slice(3, texto.length);
  const setText = document.getElementById('rgb-color');
  setText.innerHTML = str;
}

function createBalls() {
  for (let i = 0; i < qtdBalls; i += 1) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.background = randomColor();
    if (i === position) {
      ball.classList.add('winner');
      setRgbText(ball.style.background);
    }
    container.appendChild(ball);
  }
}

function changeColors() {
  const balls = document.querySelectorAll('.ball');
  for (let i = 0; i < qtdBalls; i += 1) {
    balls[i].classList.remove('winner');
    balls[i].style.background = randomColor();
    if (i === position) {
      balls[i].classList.add('winner');
      setRgbText(balls[i].style.background);
      answer.innerHTML = 'Escolha uma cor';
    }
  }
}

function randomNumber(valor) {
  return Math.round(Math.random() * valor);
}

function setPoints(winner) {
  if (winner) {
    answer.innerHTML = 'Acertou!';
    score.innerHTML = Number(score.innerHTML) + 3;
  } else {
    answer.innerHTML = 'Errou! Tente novamente!';
  }
}

container.addEventListener('click', (e) => {
  const { target } = e;
  const { classList } = target;
  if (classList.contains('ball')) {
    setPoints(classList.contains('winner'));
  }
});

reset.addEventListener('click', () => {
  position = randomNumber(5);
  changeColors();
});

function start() {
  position = randomNumber(5);
  createBalls();
  return true;
}

window.onload = start();
