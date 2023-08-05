class Category {
  constructor(name) {
    this.name = name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateName(newName) {
    this.name = newName;
    this.updatedAt = new Date();
  }
}

module.exports = Category;
