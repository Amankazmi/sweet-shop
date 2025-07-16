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
}

module.exports = SweetShop; 