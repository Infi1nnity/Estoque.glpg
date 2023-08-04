const stockForm = document.getElementById('stockForm');
const itemList = document.getElementById('itemList');
const saveButton = document.createElement('button');
saveButton.textContent = 'Salvar';
stockForm.appendChild(saveButton);
saveButton.addEventListener('click', saveItems);

// Array para armazenar os itens do estoque
let stockItems = [];

// Verifica se já há dados salvos no localStorage e os carrega
if (localStorage.getItem('stockItems')) {
  stockItems = JSON.parse(localStorage.getItem('stockItems'));
  renderItems();
}

stockForm.addEventListener('submit', addItem);

function addItem(event) {
  event.preventDefault();
  const itemNameInput = document.getElementById('itemName');
  const itemQuantityInput = document.getElementById('itemQuantity');

  const itemName = itemNameInput.value.trim();
  const itemQuantity = parseInt(itemQuantityInput.value);

  if (itemName === '' || isNaN(itemQuantity) || itemQuantity <= 0) {
    alert('Preencha os campos corretamente.');
    return;
  }

  const newItem = { name: itemName, quantity: itemQuantity };
  stockItems.push(newItem);
  renderItems();

  itemNameInput.value = '';
  itemQuantityInput.value = '';
}

function renderItems() {
  itemList.innerHTML = '';
  stockItems.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${item.name}</span>
      <span>
        <button class="quantity-button" onclick="decreaseQuantity(${index})">-</button>
        ${item.quantity}
        <button class="quantity-button" onclick="increaseQuantity(${index})">+</button>
      </span>
      <span class="delete-button" onclick="deleteItem(${index})">Excluir</span>
    `;
    itemList.appendChild(listItem);
  });
}

function deleteItem(index) {
  stockItems.splice(index, 1);
  renderItems();
}

function increaseQuantity(index) {
  stockItems[index].quantity += 1;
  renderItems();
}

function decreaseQuantity(index) {
  if (stockItems[index].quantity > 1) {
    stockItems[index].quantity -= 1;
    renderItems();
  }
}

function saveItems() {
  localStorage.setItem('stockItems', JSON.stringify(stockItems));
  alert('Os itens do estoque foram salvos.');
}
