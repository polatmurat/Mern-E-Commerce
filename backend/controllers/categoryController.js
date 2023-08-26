const { validationResult } = require("express-validator");
const connect = require('../config/db');
const Category = require('../models/Category');
const { ObjectId } = require('mongodb');

const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name } = req.body;
    try {

      const client = await connect();
      const categoryCollection = client.db('ecommerce').collection('category');

      const categoryExist = await categoryCollection.findOne({ name });

      if (!categoryExist) {
        const newCategory = new Category(name);

        await categoryCollection.insertOne(newCategory);

        return res.status(201).json({ msg: 'The category has been created successfully.' });
      } else {
        return res.status(400).json({ errors: [{ msg: `${name} is already exists!` }] });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error!");
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

const categories = async (req, res) => {
  const page = req.params.page;
  const perPage = 3;
  const skip = (page - 1) * perPage;
  try {

    const client = await connect();
    const categoryCollection = client.db('ecommerce').collection('category');

    const count = await categoryCollection.countDocuments();
    const cursor = categoryCollection.find({}).skip(skip).limit(perPage).sort({ updatedAt: -1 }); // Cursor elde ediliyor.
    const response = await cursor.toArray();
    return res.status(200).json({ perPage, count, categories: response });

  } catch (error) {
    console.log(error.message);
  }
};

const fetchCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Category ID is missing in the request.' });
  }

  try {
    console.log('Requested ID:', id);
    const objID = new ObjectId(id);
    console.log('Converted ObjectId:', objID);
    const client = await connect();
    const categoryCollection = client.db('ecommerce').collection('category');

    const response = await categoryCollection.findOne({ _id: objID });

    if (!response) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    console.log('controller response : ', response);

    return res.status(200).json({ category: response });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: 'Server internal error!' });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const objID = new ObjectId(id);
  const { name } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const client = await connect();
      const categoryCollection = client.db('ecommerce').collection('category');

      const categoryExist = await categoryCollection.findOne({ name });

      if (!categoryExist) {
        await categoryCollection.updateOne({ _id: objID }, { $set: { name } });
        return res.status(201).json({ msg: 'The category has been updated successfully.' });
      } else {
        return res.status(400).json({ errors: [{ msg: `${name} is already exists!` }] });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error!");
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const objID = new ObjectId(id);
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const client = await connect();
      const categoryCollection = client.db('ecommerce').collection('category');

      const categoryExist = await categoryCollection.findOne({ _id: objID });

      if (categoryExist) {
        await categoryCollection.deleteOne({ _id: objID });
        return res.status(201).json({ msg: 'The category has been deleted successfully.' });
      } else {
        return res.status(400).json({ errors: [{ msg: `${objID} doesn't exists!` }] });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error!");
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const client = await connect();
    const categoryCollection = client.db('ecommerce').collection('category');
    const categoriesCursor = categoryCollection.find({}); // Get the cursor
    const categories = await categoriesCursor.toArray(); // Convert the cursor to an array, await is important :)
    return res.status(200).json({ categories });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server internal error!");
  }
};

const randomCategories = async (req, res) => {
  try {
    const client = await connect();
    const categoryCollection = client.db('ecommerce').collection('category');
    
    // Perform aggregation to sample categories
    const categories = await categoryCollection.aggregate([
      { $sample: { size: 3 } }
    ]).toArray();

    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json('Internal server error.');
  }
};
module.exports = { createCategory, fetchCategory, updateCategory, deleteCategory, categories, getAllCategories, randomCategories };
