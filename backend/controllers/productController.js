const formidable = require("formidable");
const connect = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const Product = require("../models/Product");

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
                                console.log(__dirname);
                                const newPath = __dirname + `/../client/public/images/${imageName}`;
                                images[`image${i}`] = imageName;
                                fs.copyFile(files[`image${i}`][0].filepath, newPath, (err) => {
                                    if (!err) {
                                        console.log('image uploaded!');
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
                            console.log("SIZES: ", fields.sizes);
                            try {
                                const product = new Product(parsedData.title, parseInt(parsedData.price), parseInt(parsedData.discount), parseInt(parsedData.stock), parsedData.category, parsedData.colors, JSON.parse(fields.sizes), (fields.description)[0], images['image1'], images['image2'], images['image3'])
                                
                                await productCollection.insertOne(product);

                                console.log(product);

                                res.status(201).json({msg: 'Product has been created.', product});

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
}

module.exports = new ProductController;
