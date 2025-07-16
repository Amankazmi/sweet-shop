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

}); 