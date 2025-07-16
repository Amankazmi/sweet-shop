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

}); 