const numCores = 4;
const idBoard = 'pixel-board';
let bgColor = 'black';
let tamGrid = 5;
let pixelSize = 40;

function randomColor() {
  const color1 = `rgb(${Math.round(Math.random() * 255)} `;
  const color2 = `, ${Math.round(Math.random() * 255)} `;
  const color3 = `, ${Math.round(Math.random() * 255)})`;
  return color1 + color2 + color3;
}

function changeColors() {
  const boxPalete = document.querySelectorAll('.color');
  for (let i = 1; i < numCores; i += 1) {
    boxPalete[i].style.background = randomColor();
  }
}

function selectColor(element) {
  const selected = document.querySelector('.selected');
  selected.classList.remove('selected');
  element.target.classList.add('selected');
  bgColor = window
    .getComputedStyle(element.target, null)
    .getPropertyValue('background-color');
}

function createBlockPalete(indice) {
  const boxColor = document.createElement('div');
  boxColor.classList.add('color');
  boxColor.classList.add('border1');
  if (indice === 0) {
    boxColor.style.background = 'black';
    boxColor.classList.add('selected');
  } else {
    boxColor.style.background = randomColor();
  }
  boxColor.addEventListener('click', selectColor);
  return boxColor;
}

function createPalete() {
  const colorPalete = document.getElementById('color-palette');
  for (let i = 0; i < numCores; i += 1) {
    const box = createBlockPalete(i);
    colorPalete.appendChild(box);
  }
}

function paintBox(element) {
  const obj = element.target;
  obj.style.background = bgColor;
}

function createGridBox() {
  const gridBox = document.createElement('div');
  gridBox.classList.add('pixel');
  gridBox.classList.add('border1');
  if (tamGrid === 5) pixelSize = 40;
  gridBox.style.width = `${pixelSize}px`;
  gridBox.style.height = `${pixelSize}px`;
  gridBox.addEventListener('click', paintBox);
  return gridBox;
}

function createGridLine() {
  const gridLine = document.createElement('div');
  for (let i = 0; i < tamGrid; i += 1) {
    const gridBox = createGridBox();
    gridLine.appendChild(gridBox);
  }
  gridLine.style.height = `${pixelSize}px`;
  return gridLine;
}

function setPixelSize() {
  let width = document.body.clientWidth;
  pixelSize = (width - tamGrid) / (tamGrid + 10);
}

function createGrid() {
  setPixelSize();
  const pixelBoard = document.getElementById(idBoard);
  for (let i = 0; i < tamGrid; i += 1) {
    const line = createGridLine();
    pixelBoard.appendChild(line);
  }
}

function clearGrid() {
  const grid = document.querySelectorAll('.pixel');
  for (let i = 0; i < grid.length; i += 1) {
    grid[i].style.background = 'white';
  }
}
const buttonClear = document.getElementById('clear-board');
buttonClear.addEventListener('click', clearGrid);

function checkInput(valor) {
  let result = true;
  if (valor === '') {
    alert('Board inválido!');
    result = false;
  }
  return result;
}

function removeBoard(element) {
  element.remove();
}

function createBoard() {
  const sibling = document.getElementById('interact');
  const newBoard = document.createElement('section');
  newBoard.id = 'pixel-board';
  if (sibling.nextSibling) {
    sibling.parentNode.insertBefore(newBoard, sibling.nextSibling);
  } else {
    sibling.parentNode.appendChild(newBoard);
  }
}

function generateGrid() {
  const value = document.getElementById('board-size');
  tamGrid = Number(value.value);
  if (value.value < 5) tamGrid = 5;
  if (value.value > 50) tamGrid = 50;
  if (checkInput(value.value)) {
    const Board = document.getElementById(idBoard);
    removeBoard(Board);
    createBoard();
    createGrid();
  }
}

const buttonGenerate = document.getElementById('generate-board');
buttonGenerate.addEventListener('click', generateGrid);

window.onload = function () {
  createPalete();
  createGrid();
};
