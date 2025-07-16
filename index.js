const express = require('express');
const SweetShop = require('./sweetShop');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const shop = new SweetShop();

// Add sweet
app.post('/sweets', (req, res) => {
  shop.addSweet(req.body);
  res.send('Sweet added');
});

// Get all sweets
app.get('/sweets', (req, res) => {
  res.json(shop.getSweets());
});

// Delete sweet
app.delete('/sweets/:identifier', (req, res) => {
  shop.deleteSweet(req.params.identifier);
  res.send('Sweet deleted');
});

// Purchase
app.put('/purchase/:identifier', (req, res) => {
  shop.purchaseSweet(req.params.identifier, req.body.amount);
  res.send('Purchased');
});

// Restock
app.put('/restock/:identifier', (req, res) => {
  shop.restockSweet(req.params.identifier, req.body.amount);
  res.send('Restocked');
});

// Search by name
app.get('/search/name', (req, res) => {
  res.json(shop.searchByName(req.query.q));
});

// Search by price
app.get('/search/price', (req, res) => {
  const min = parseFloat(req.query.min) || 0;
  const max = parseFloat(req.query.max) || Infinity;
  res.json(shop.searchByPrice(min, max));
});

// Search by type
app.get('/search/type', (req, res) => {
  res.json(shop.searchByType(req.query.type));
});

// Sort
app.get('/sort', (req, res) => {
  res.json(shop.sortSweets(req.query.by, req.query.order));
});

// Low stock
app.get('/lowstock', (req, res) => {
  res.json(shop.getLowStock());
});

app.listen(3000, () => console.log('Server running on port 3000')); 