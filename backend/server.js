const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const connect = require('./config/db');
const userRoute = require('./routes/users/userRoute');
const app = express();

const PORT = process.env.PORT;


// Middleware setup
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, resp) => {
    try {
        const client = await connect();
        const productCollection = client.db("ecommerce").collection('product');
        const products = await productCollection.find({}).toArray();
        resp.json(products);
    } catch (error) {
        console.error(`Failed to fetch products from MongoDB: ${error.message}`.red.bold);
        resp.status(500).json({ error: 'Failed to fetch products.' });
    }
});

// User route setup
app.use('/api',userRoute);

app.listen(PORT, () => console.log(`Server is running at ${PORT} port!`.magenta.italic));


const startServer = async () => {
    try {
        const client = await connect();
        const databaseName = client.db('ecommerce').databaseName;

        console.log(`MongoDB has been connected --> ${databaseName}`.blue.inverse);
    } catch (error) {
        console.error(`Failed to connect to MongoDB or add product:: ${error.message}`.red.bold);
        // Optionally, you can handle the error further or gracefully terminate the server
        process.exit(1);
    }
}

startServer();