class Category {
  constructor(name) {
    this.name = name;
    this.createdAt = new Date(); // CreatedAt için şu anki tarih atanıyor.
    this.updatedAt = new Date(); // UpdatedAt için de şu anki tarih atanıyor.
  }

  // Daha sonra gerekirse güncelleme yapıldığında updatedAt alanını güncellemek için bir fonksiyon ekleyebilirsiniz.
  updateName(newName) {
    this.name = newName;
    this.updatedAt = new Date(); // UpdatedAt'i güncel tarih ile değiştiriyoruz.
  }
}

module.exports = Category;
