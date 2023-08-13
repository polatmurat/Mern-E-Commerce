class Product {
    constructor(title, price, discount, stock, category, colors, sizes, description, image1, image2, image3) {
        this.title = title;
        this.price = price;
        this.discount = discount;
        this.stock = stock;
        this.category = category;
        this.colors = colors;
        this.sizes = sizes;
        this.description = description;
        this.image1 = image1,
        this.image2 = image2,
        this.image3 = image3,
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

module.exports = Product;