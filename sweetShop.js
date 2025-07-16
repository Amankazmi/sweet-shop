class SweetShop {
    constructor() {
    this.sweets = [];
    this.nextId = 1001;
  }

  addSweet(sweet) {
    sweet.id = this.nextId++;
    this.sweets.push(sweet);
  }

  getSweets() {
    return this.sweets;
  }

  deleteSweet(identifier) {
    this.sweets = this.sweets.filter(s => String(s.id) !== identifier && s.name !== identifier);
  }

   purchaseSweet(identifier, amount) {
    const sweet = this.sweets.find(s => String(s.id) === identifier || s.name === identifier);
    if (sweet && sweet.quantity >= amount) {
      sweet.quantity -= amount;
    } else {
      throw new Error('Not enough stock or sweet not found');
    }
  }

  restockSweet(identifier, amount) {
    const sweet = this.sweets.find(s => String(s.id) === identifier || s.name === identifier);
    if (sweet) {
      sweet.quantity += amount;
    } else {
      throw new Error('Sweet not found');
    }
  }

  searchByName(query) {
    return this.sweets.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
  }

  searchByPrice(min, max) {
    return this.sweets.filter(s => s.price >= min && s.price <= max);
  }

  searchByType(type) {
    return this.sweets.filter(s => s.type.toLowerCase() === type.toLowerCase());
  }

  sortSweets(by, order) {
    let sorted = [...this.sweets];
    sorted.sort((a, b) => {
      if (by === 'name') {
        return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (by === 'price') {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      }
    });
    return sorted;
  }

  getLowStock(threshold = 5) {
    return this.sweets.filter(s => s.quantity < threshold);
  }
}

module.exports = SweetShop; 