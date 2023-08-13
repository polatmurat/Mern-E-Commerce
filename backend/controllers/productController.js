const formidable = require("formidable");
const { validationResult } = require('express-validator');
const connect = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const Product = require("../models/Product");
const { ObjectId } = require("mongodb");

class ProductController {
    async create(req, res) {
        const form = new formidable.IncomingForm({ multiples: true });

        form.parse(req, async (err, fields, files) => {
            if (!err) {

                const parsedData = JSON.parse(fields.data);

                const errors = [];

                if (parsedData.title.trim().length === 0) {
                    errors.push({ msg: 'The title field cannot be left blank!' });
                }

                if (parseInt(parsedData.price) < 1) {
                    errors.push({ msg: 'The price must be above $1' });
                }

                if (parseInt(parsedData.discount) < 0) {
                    errors.push({ msg: 'The discount mustn\'t be negative !' });
                }

                if (parseInt(parsedData.stock) < 0) {
                    errors.push({ msg: 'The stock mustn\'t be negative !' });
                }

                if (parsedData.category.trim().length === 0) {
                    errors.push({ msg: 'The category field cannot be left blank!' });
                }

                if (fields.description.length === 0) {
                    errors.push({ msg: 'The description field cannot be left blank!' })
                }

                if (errors.length === 0) {
                    if (!files['image1']) {
                        errors.push({ msg: 'Image 1 is required!' });
                    }
                    if (!files['image2']) {
                        errors.push({ msg: 'Image 2 is required!' });
                    }
                    if (!files['image3']) {
                        errors.push({ msg: 'Image 3 is required!' });
                    }

                    if (errors.length === 0) {

                        const images = {};

                        for (let i = 1; i <= Object.keys(files).length; i++) {
                            const mimeType = files[`image${i}`][0].mimetype;
                            const extension = mimeType.split('/')[1].toLowerCase();
                            if (extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
                                const imageName = uuidv4() + `.${extension}`;
                                const __dirname = path.resolve();
                                const newPath = __dirname + `/../client/public/images/${imageName}`;
                                images[`image${i}`] = imageName;
                                fs.copyFile(files[`image${i}`][0].filepath, newPath, (err) => {
                                    if (!err) {

                                    }
                                })
                            } else {
                                const error = {};
                                error['msg'] = `image${i} has invalid ${extension} type!`;
                                errors.push(error);
                            }
                        }
                        if (errors.length === 0) {
                            const client = await connect();
                            const productCollection = client.db('ecommerce').collection('product');
                            try {
                                const product = new Product(parsedData.title, parseInt(parsedData.price), parseInt(parsedData.discount), parseInt(parsedData.stock), parsedData.category, parsedData.colors, JSON.parse(fields.sizes), (fields.description)[0], images['image1'], images['image2'], images['image3'])

                                await productCollection.insertOne(product);

                                res.status(201).json({ msg: 'Product has been created.', product });

                            } catch (error) {
                                console.log(error);
                                res.status(500).json(error);
                            }
                        } else {
                            return res.status(400).json({ errors });
                        }
                    } else {
                        return res.status(400).json({ errors });
                    }
                } else {
                    return res.status(400).json({ errors });
                }
            } else {
                console.error("Error parsing form:", err);
            }
        });
    }

    async get(req, res) {
        const { page } = req.params;
        const perPage = 5;
        const skip = (page - 1) * perPage;
        try {

            const client = await connect();
            const productCollection = client.db('ecommerce').collection('product');

            const count = await productCollection.countDocuments();
            const cursor = productCollection.find({}).skip(skip).limit(perPage).sort({ updatedAt: -1 }); // Cursor handling.
            const response = await cursor.toArray();
            return res.status(200).json({ perPage, count, products: response });

        } catch (error) {
            console.log(error.message);
        }
    }

    async fetch(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Category ID is missing in the request.' });
        }

        try {
            const objID = new ObjectId(id);
            const client = await connect();
            const productCollection = client.db('ecommerce').collection('product');

            const response = await productCollection.findOne({ _id: objID });

            if (!response) {
                return res.status(404).json({ error: 'Product not found.' });
            }

            return res.status(200).json({ product: response });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: 'Server internal error!' });
        }
    };

    async updateProduct(req, res) {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            try {
                const { _id, title, price, stock, discount, colors, sizes, description, category } = req.body;
                const objID = new ObjectId(_id);
                const client = await connect();
                const productCollection = client.db('ecommerce').collection('product');

                const response = await productCollection.updateOne({ _id: objID }, { $set: { title, price, discount, category, stock, colors, sizes, description, updatedAt: new Date() } });
                return res.status(200).json({ msg: 'The product has been updated successfully.', response });
            } catch (error) {
                console.log(error.message);
                return res.status(500).json({ errors: error });
            }

        } else {

            return res.status(400).json({ errors: errors.array() });
        }

    };

    async deleteProduct(req, res) {
        const {id} = req.params;
        try {
            const objID = new ObjectId(id);
            const client = await connect();
            const productCollection = client.db('ecommerce').collection('product');
            const product = await productCollection.findOne({_id: objID});
            
            [1,2,3].forEach((number) => {
                let key = `image${number}`;
                let image = product[key];
                let __dirname = path.resolve();
                let imagePath = __dirname + `/../client/public/images/${image}`;
                fs.unlink(imagePath, (err) => {
                    if(err) {
                        throw new Error(err);

                    }
                })
            })
            
            await productCollection.deleteOne({_id: objID});
            return res.status(200).json({msg: 'Product has been deleted successfully'});
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new ProductController;
