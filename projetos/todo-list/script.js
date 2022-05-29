const buttonAdd = document.getElementById('criar-tarefa');
const listaOrdenada = document.getElementById('lista-tarefas');

function selectItem(e) {
  const { target } = e;
  const selected = document.querySelector('.selected');
  if ((target.tagName = 'LI')) {
    if (selected) {
      if (target !== selected) {
        selected.classList.remove('selected');
      }
    }
    target.classList.add('selected');
  }
}

function markCompleted(e) {
  const { target } = e;
  target.classList.toggle('completed');
}

function addItemLista() {
  const texto = document.getElementById('texto-tarefa');
  if (Number(texto.value) !== 0) {
    const itemLista = document.createElement('li');
    itemLista.className = 'item';
    itemLista.innerHTML = texto.value;
    texto.value = '';
    listaOrdenada.appendChild(itemLista);
  }
}
buttonAdd.addEventListener('click', addItemLista);

function cleanList() {
  listaOrdenada.innerHTML = '';
}

const buttonCleanList = document.getElementById('apaga-tudo');
buttonCleanList.addEventListener('click', cleanList);

function cleanCompleted() {
  const CompletedList = document.querySelectorAll('.completed');
  if (CompletedList) {
    for (let i = CompletedList.length - 1; i >= 0; i -= 1) {
      CompletedList[i].remove();
    }
  }
}
const buttonsCleanCompleted = document.getElementById('remover-finalizados');
buttonsCleanCompleted.addEventListener('click', cleanCompleted);

function loadTasks() {
  const storedvalue = JSON.parse(localStorage.getItem('items'));
  console.log(storedvalue);
  listaOrdenada.addEventListener('click', selectItem);
  listaOrdenada.addEventListener('dblclick', markCompleted);
  if (storedvalue) {
    listaOrdenada.innerHTML = storedvalue;
  }
}

function saveTasks() {
  const values = document.getElementById('lista-tarefas').innerHTML;

  console.log(values);
  localStorage.setItem('items', JSON.stringify(values));
  console.log(localStorage);
}
const buttonsSaveTasks = document.getElementById('salvar-tarefas');
buttonsSaveTasks.addEventListener('click', saveTasks);

function moveUp() {
  const selected = document.querySelector('.selected');
  if (selected) {
    const acima = selected.previousElementSibling;
    if (acima) {
      selected.parentElement.insertBefore(selected, acima);
    }
  }
}
const buttonsUp = document.getElementById('mover-cima');
buttonsUp.addEventListener('click', moveUp);

function moveDown() {
  const selected = document.querySelector('.selected');
  if (selected) {
    const abaixo = selected.nextElementSibling;
    if (abaixo) {
      selected.parentElement.insertBefore(abaixo, selected);
    }
  }
}
const buttonsDown = document.getElementById('mover-baixo');
buttonsDown.addEventListener('click', moveDown);

function deleteItem() {
  const selected = document.querySelector('.selected');
  if (selected) selected.remove();
}
const buttonsDeleteItem = document.getElementById('remover-selecionado');
buttonsDeleteItem.addEventListener('click', deleteItem);

window.onload = loadTasks;
