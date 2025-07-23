async function fetchSweets() {
  const response = await fetch('/sweets');
  const sweets = await response.json();

  // Update table
  const tbody = document.querySelector('#sweetsTable tbody');
  tbody.innerHTML = '';
  sweets.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.id}</td><td>${s.name}</td><td>₹${s.price.toFixed(2)}</td><td>${s.type}</td><td>${s.quantity}</td>`;
    tbody.appendChild(tr);
  });

  // Populate purchase dropdown
  const select = document.getElementById('purchaseSweet');
  select.innerHTML = '<option value="">Select Sweet</option>';
  sweets.forEach(s => {
    const option = document.createElement('option');
    option.value = String(s.id);
    option.textContent = `${s.name} (ID: ${s.id}, Qty: ${s.quantity})`;
    select.appendChild(option);
  });
}

document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const sweet = {
    name: document.getElementById('addName').value,
    price: parseFloat(document.getElementById('addPrice').value),
    type: document.getElementById('addType').value === 'other' ? document.getElementById('customType').value : document.getElementById('addType').value,
    quantity: parseInt(document.getElementById('addQuantity').value)
  };
  try {
    await fetch('/sweets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sweet) });
    showAlert('Sweet added successfully', 'success');
  } catch (error) {
    showAlert(error.message, 'error');
  }
  fetchSweets();
});

async function deleteSweetById() {
  try {
    const id = document.getElementById('deleteId').value;
    if (!id) {
      showAlert('Please enter an ID', 'error');
      return;
    }
    const response = await fetch(`/sweets/${encodeURIComponent(id)}`, { method: 'DELETE' })
    if (!response.ok) {
      throw new Error(await response.text());
    }
    showAlert('Sweet deleted successfully', 'success');

  } catch (error) {
    showAlert(error.message || 'Failed to delete sweet', 'error');
  }
  fetchSweets();
}

async function purchaseSweet() {
  try {
    const identifier = document.getElementById('purchaseSweet').value;
    if (!identifier) {
      showAlert('Please select a sweet', 'error');
      return;
    }
    const amount = parseInt(document.getElementById('purchaseQuantity').value);
    if (isNaN(amount) || amount <= 0) {
      showAlert('Invalid quantity', 'error');
      return;
    }
    const response = await fetch(`/purchase/${encodeURIComponent(identifier)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount }) });
    const message = await response.text();

    if (!response.ok) {
      throw new Error('Sweet is out of stock');
    }
    showAlert(message, 'success');

  } catch (error) {
    showAlert(error.message, 'error');
  }
  fetchSweets();
}

async function restockSweet() {
  try {
    const name = document.getElementById('restockName').value;
    const amount = parseInt(document.getElementById('restockQuantity').value);
    await fetch(`/restock/${encodeURIComponent(name)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount }) })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to restock sweet');
        }
      })
    showAlert('Restocked successfully', 'success');
  } catch (error) {
    showAlert(error.message, 'error');
  }
  fetchSweets();
}

async function showLowStock() {
  const response = await fetch('/lowstock');
  const sweets = await response.json();
  const tbody = document.getElementById('lowStockBody');
  tbody.innerHTML = '';
  sweets.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.id || 'N/A'}</td><td>${s.name}</td><td>₹${s.price.toFixed(2)}</td><td>${s.type}</td><td>${s.quantity}</td>`;
    tbody.appendChild(tr);
  });
}

async function searchSweets() {
  const type = document.getElementById('searchType').value;
  let url = `/search/${type}?`;
  if (type === 'name' || type === 'type') {
    url += `${type === 'name' ? 'q' : 'type'}=${encodeURIComponent(document.getElementById('searchQuery').value)}`;
  } else if (type === 'price') {
    url += `min=${document.getElementById('searchMin').value}&max=${document.getElementById('searchMax').value}`;
  }
  const response = await fetch(url);
  const results = await response.json();
  const tbody = document.getElementById('searchResultsBody');
  tbody.innerHTML = '';
  results.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.id || 'N/A'}</td><td>${s.name}</td><td>₹${s.price.toFixed(2)}</td><td>${s.type}</td><td>${s.quantity}</td>`;
    tbody.appendChild(tr);
  });
}
document.getElementById('addType').addEventListener('change', (e) => {
  const customInput = document.getElementById('customType');
  customInput.style.display = e.target.value === 'other' ? 'block' : 'none';
  customInput.required = e.target.value === 'other';
});
document.getElementById('searchType').addEventListener('change', (e) => {
  const type = e.target.value;
  document.getElementById('searchQuery').style.display = (type === 'name' || type === 'type') ? 'block' : 'none';
  document.getElementById('searchMin').style.display = type === 'price' ? 'block' : 'none';
  document.getElementById('searchMax').style.display = type === 'price' ? 'block' : 'none';
});

async function sortSweets() {
  const by = document.getElementById('sortBy').value;
  const order = document.getElementById('sortOrder').value;

  try {
    const response = await fetch(`/sort?by=${by}&order=${order}`);
    const sorted = await response.json();

    const tbody = document.querySelector('#sweetsTable tbody');
    tbody.innerHTML = '';
    sorted.forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${s.id}</td><td>${s.name}</td><td>₹${s.price.toFixed(2)}</td><td>${s.type}</td><td>${s.quantity}</td>`;
      tbody.appendChild(tr);
    });
    showAlert(`Sorted by ${by} (${order})`, 'success');
  } catch (error) {
    showAlert('Failed to sort sweets', 'error');
  }
}

function showAlert(message, type) {
  const alert = document.createElement('div');
  alert.className = `alert ${type}`;
  alert.textContent = message;
  document.body.insertBefore(alert, document.body.firstChild);
  setTimeout(() => alert.remove(), 3000);
}
fetchSweets();