const connect = require('../config/db');


const catProducts = async (req, res) => {
    const { name, page } = req.params;
    const perPage = 12;
    const skip = (page - 1) * perPage;
    try {

        const client = await connect();
        const productCollection = client.db('ecommerce').collection('product');

        const cursor = productCollection.find({ category: name }).skip(skip).limit(perPage).sort({ updatedAt: -1 }); // Cursor handling.
        const response = await cursor.toArray();
        const count = response.length;
        return res.status(200).json({ perPage, count, products: response });

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { catProducts }