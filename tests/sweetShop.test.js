const SweetShop = require('../sweetShop');

describe('SweetShop', () => {

    test('should add a sweet', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Lollipop', price: 1.5, type: 'candy', quantity: 10 });
    expect(shop.getSweets().length).toBe(1);
  });

   test('should delete a sweet', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Lollipop', price: 1.5, type: 'candy', quantity: 10 });
    shop.deleteSweet('Lollipop');
    expect(shop.getSweets().length).toBe(0);
  });

  test('should purchase a sweet and reduce quantity', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Lollipop', price: 1.5, type: 'candy', quantity: 10 });
    shop.purchaseSweet('Lollipop', 3);
    const sweet = shop.getSweets().find(s => s.name === 'Lollipop');
    expect(sweet.quantity).toBe(7);
  });

  test('should restock a sweet and increase quantity', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Lollipop', price: 1.5, type: 'candy', quantity: 10 });
    shop.restockSweet('Lollipop', 5);
    const sweet = shop.getSweets().find(s => s.name === 'Lollipop');
    expect(sweet.quantity).toBe(15);
  });

  test('should search sweets by name', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Lollipop', price: 1.5, type: 'candy', quantity: 10 });
    shop.addSweet({ name: 'Chocolate', price: 2.0, type: 'chocolate', quantity: 5 });
    const results = shop.searchByName('Lolli');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Lollipop');
  });

  test('should search sweets by price range', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Lollipop', price: 1.5, type: 'candy', quantity: 10 });
    shop.addSweet({ name: 'Chocolate', price: 2.0, type: 'chocolate', quantity: 5 });
    shop.addSweet({ name: 'Gum', price: 0.5, type: 'candy', quantity: 20 });
    const results = shop.searchByPrice(1.0, 2.0);
    expect(results.length).toBe(2);
    expect(results.map(s => s.name)).toEqual(expect.arrayContaining(['Lollipop', 'Chocolate']));
  });

  test('should search sweets by type', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Lollipop', price: 1.5, type: 'candy', quantity: 10 });
    shop.addSweet({ name: 'Chocolate', price: 2.0, type: 'chocolate', quantity: 5 });
    const results = shop.searchByType('candy');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Lollipop');
  });

   test('should sort sweets by name ascending', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Chocolate', price: 2.0, type: 'chocolate', quantity: 5 });
    shop.addSweet({ name: 'Lollipop', price: 1.5, type: 'candy', quantity: 10 });
    shop.addSweet({ name: 'Gum', price: 0.5, type: 'candy', quantity: 20 });
    const results = shop.sortSweets('name', 'asc');
    expect(results.map(s => s.name)).toEqual(['Chocolate', 'Gum', 'Lollipop']);
  });

  test('should sort sweets by price ascending', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Gum', price: 0.5, type: 'candy', quantity: 20 });
    shop.addSweet({ name: 'Lollipop', price: 1.5, type: 'candy', quantity: 10 });
    shop.addSweet({ name: 'Chocolate', price: 2.0, type: 'chocolate', quantity: 5 });
    const results = shop.sortSweets('price', 'asc');
    expect(results.map(s => s.price)).toEqual([0.5, 1.5, 2.0]);
  });

  test('should get low stock sweets', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Lollipop', price: 1.5, type: 'candy', quantity: 3 });
    shop.addSweet({ name: 'Chocolate', price: 2.0, type: 'chocolate', quantity: 6 });
    const lowStock = shop.getLowStock();
    expect(lowStock.length).toBe(1);
    expect(lowStock[0].name).toBe('Lollipop');
  });

  test('should delete a sweet by ID', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Lollipop', price: 1.5, type: 'candy', quantity: 10 });
    const id = shop.getSweets()[0].id;
    shop.deleteSweet(String(id));
    expect(shop.getSweets().length).toBe(0);
  });

  test('should purchase a sweet by ID', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Barfi', price: 3.0, type: 'mithai', quantity: 8 });
    const id = shop.getSweets()[0].id;
    shop.purchaseSweet(String(id), 3);
    expect(shop.getSweets()[0].quantity).toBe(5);
  });

  test('should restock a sweet by ID', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Jalebi', price: 2.5, type: 'mithai', quantity: 4 });
    const id = shop.getSweets()[0].id;
    shop.restockSweet(String(id), 6);
    expect(shop.getSweets()[0].quantity).toBe(10);
  });

  test('should search by price range with string input', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Rasgulla', price: 5, type: 'mithai', quantity: 10 });
    shop.addSweet({ name: 'Kaju Katli', price: 10, type: 'mithai', quantity: 5 });
    // Simulate string input as from query params
    const results = shop.searchByPrice('4', '6');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Rasgulla');
  });

  test('should search by type case-insensitive', () => {
    const shop = new SweetShop();
    shop.addSweet({ name: 'Peda', price: 2, type: 'Mithai', quantity: 10 });
    const results = shop.searchByType('mithai');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Peda');
  });

}); 