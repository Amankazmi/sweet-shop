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

}); 