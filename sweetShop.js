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
}

module.exports = SweetShop; 