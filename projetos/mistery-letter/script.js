const buttonGenerate = document.getElementById('criar-carta');
const paragraph = document.getElementById('carta-gerada');
const counter = document.getElementById('carta-contador');

const style = ['newspaper', 'magazine1', 'magazine2'];
const size = ['medium', 'big', 'reallybig'];
const rotation = ['rotateleft', 'rotateright'];
const inclination = ['skewleft', 'skewright'];

let count = 0;

function randomStyle(vetor) {
  return Math.floor(Math.random() * vetor.length);
}
function generateClass() {
  let result = '';
  result = style[randomStyle(style)];
  result += ` ${size[randomStyle(size)]}`;
  result += ` ${rotation[randomStyle(rotation)]}`;
  result += ` ${inclination[randomStyle(inclination)]}`;
  return result;
}

function generateWord(father, word) {
  const spanText = document.createElement('span');
  spanText.className = generateClass();
  spanText.innerHTML = word;
  father.appendChild(spanText);
}

buttonGenerate.addEventListener('click', () => {
  count = 0;
  const phrase = document.getElementById('carta-texto');
  const desmembered = phrase.value.trim();
  if (!desmembered) {
    paragraph.innerHTML = 'Por favor, digite o conteúdo da carta.';
  } else {
    const splited = desmembered.split(' ');
    paragraph.innerHTML = '';
    for (let i = 0; i < splited.length; i += 1) {
      if (splited[i].length > 0) {
        count += 1;
        generateWord(paragraph, splited[i]);
      }
    }
    counter.innerHTML = count;
  }
});

paragraph.addEventListener('click', (e) => {
  const { target } = e;
  if (target.tagName === 'SPAN') {
    target.className = generateClass();
  }
});
