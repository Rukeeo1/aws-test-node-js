require('dotenv').config();

const express = require('express');
const fs = require('fs');
const db = require('./db');
const logger = require('./logger');

const app = express();
// seed database...

// Middleware to log requests
app.use((req, res, next) => {
  logger.info(`Received ${req.method} request for ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  logger.info('Health check route');
  res.send('Hello, Rukees experess');
});

app.get('/add-shoes', (req, res) => {
  logger.info('adding shoes');
  const insertQuery =
    'INSERT INTO shoes (id, name, brand, price, image, description, category, shoeCategory, rating, reviews, availability) VALUES ?';
  const shoes = [
    {
      id: 1,
      name: 'Running Shoes',
      brand: 'Nike',
      price: 59.99,
      image: 'running_shoes.jpg',
      description:
        'These running shoes provide excellent cushioning and support.',
      category: 'Sports',
      shoeCategory: 'Running',
      rating: 4.5,
      reviews: 10,
      availability: true,
    },
    {
      id: 2,
      name: 'Sneakers',
      brand: 'Adidas',
      price: 49.99,
      image: 'sneakers.jpg',
      description: 'Casual and comfortable sneakers for everyday wear.',
      category: 'Fashion',
      shoeCategory: 'Casual',
      rating: 4.2,
      reviews: 8,
      availability: true,
    },
    {
      id: 3,
      name: 'High Heels',
      brand: 'Gucci',
      price: 79.99,
      image: 'high_heels.jpg',
      description: 'Elegant high heels that will make you stand out.',
      category: 'Fashion',
      shoeCategory: 'Formal',
      rating: 4.7,
      reviews: 15,
      availability: true,
    },
    {
      id: 4,
      name: 'Basketball Shoes',
      brand: 'Air Jordan',
      price: 89.99,
      image: 'basketball_shoes.jpg',
      description: 'Designed for optimal performance on the basketball court.',
      category: 'Sports',
      shoeCategory: 'Basketball',
      rating: 4.8,
      reviews: 12,
      availability: false,
    },
  ];
  const values = shoes.map((shoe) => Object.values(shoe));
  console.log(values, 'I am checking values');
  db.query(insertQuery, [values], (err, result) => {
    if (err) {
      logger.error('Error seeding data', JSON.stringify(err));
      res.status(400).json('Something went wrong with inserting data');
    } else {
      logger.info('adding shoes', JSON.stringify(result));
      res.json(result);
    }
  });
});

app.get('/get-shoes', (req, res) => {
  logger.info('getting people...');
  //   const newShoe = req.body;
  const sql = 'SELECT * FROM shoes';

  db.query(sql, (err, result) => {
    if (err) {
      res.status(400).json('Something went retreiveing data');
      logger.error('Error getting shoes', JSON.stringify(err));
    } else {
      logger.info('Shoes retrieved', JSON.stringify(result));
      res.json(result);
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  logger.info(`Server is running on port ${port}`);
});
