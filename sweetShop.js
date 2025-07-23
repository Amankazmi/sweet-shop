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
    const originalLength = this.sweets.length;
    this.sweets = this.sweets.filter(s => String(s.id) !== identifier && s.name !== identifier);
    return this.sweets.length < originalLength;
  }

   purchaseSweet(identifier, amount) {
    const sweet = this.sweets.find(s => String(s.id) === identifier || s.name === identifier);

    if (!sweet) {
      throw new Error('Sweet not found');
    }

    if (sweet.quantity === 0) {
      throw new Error(`Sweet "${sweet.name}" is out of stock`);
    }

    if (sweet.quantity < amount) {
      throw new Error(`Only ${sweet.quantity} of "${sweet.name}" left in stock`);
    }

    sweet.quantity -= amount;
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