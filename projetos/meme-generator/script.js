const inputText = document.getElementById('text-input');
const memeText = document.getElementById('meme-text');
const inputImg = document.getElementById('meme-insert');
const image = document.getElementById('meme-image');
const preview = document.getElementById('meme-preview');
const brnContainer = document.getElementById('btn-container');
const memeContainer = document.getElementById('meme-image-container');

inputText.addEventListener('keyup', (e) => {
  const { target } = e;
  memeText.innerHTML = target.value;
});

inputImg.addEventListener('change', (e) => {
  const { target } = e;
  const curFiles = target.files;
  if (curFiles.length !== 0) {
    image.src = URL.createObjectURL(curFiles[0]);
  }
});

preview.addEventListener('click', (e) => {
  const { target } = e;
  if (target.tagName === 'IMG') {
    image.src = target.src;
  }
});

brnContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    memeContainer.style.border = e.target.className;
  }
});
