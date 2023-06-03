require('dotenv').config();

const express = require('express');
const app = express();
const fs = require('fs');
const db = require('./db');

// seed database...
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
  // Add more shoe varieties here...
];

const jsonData = JSON.stringify(shoes);

// Write the JSON data to a file
fs.writeFile('shoes.json', jsonData, 'utf8', (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
    return;
  }
  console.log('JSON file has been saved successfully.');
});

app.get('/', (req, res) => {
  res.send('Hello, Rukees experess');
});

app.get('/shoes', (req, res) => {
    const insertQuery = 'INSERT INTO shoes (id, name, brand, price, image, description, category, shoeCategory, rating, reviews, availability) VALUES ?';
    const shoes = [
        {
          "id": 1,
          "name": "Running Shoes",
          "brand": "Nike",
          "price": 59.99,
          "image": "running_shoes.jpg",
          "description": "These running shoes provide excellent cushioning and support.",
          "category": "Sports",
          "shoeCategory": "Running",
          "rating": 4.5,
          "reviews": 10,
          "availability": true
        },
        {
          "id": 2,
          "name": "Sneakers",
          "brand": "Adidas",
          "price": 49.99,
          "image": "sneakers.jpg",
          "description": "Casual and comfortable sneakers for everyday wear.",
          "category": "Fashion",
          "shoeCategory": "Casual",
          "rating": 4.2,
          "reviews": 8,
          "availability": true
        },
        {
          "id": 3,
          "name": "High Heels",
          "brand": "Gucci",
          "price": 79.99,
          "image": "high_heels.jpg",
          "description": "Elegant high heels that will make you stand out.",
          "category": "Fashion",
          "shoeCategory": "Formal",
          "rating": 4.7,
          "reviews": 15,
          "availability": true
        },
        {
          "id": 4,
          "name": "Basketball Shoes",
          "brand": "Air Jordan",
          "price": 89.99,
          "image": "basketball_shoes.jpg",
          "description": "Designed for optimal performance on the basketball court.",
          "category": "Sports",
          "shoeCategory": "Basketball",
          "rating": 4.8,
          "reviews": 12,
          "availability": false
        }
      ];
    const values = shoes.map(shoe => Object.values(shoe));
    console.log(values,'I am checking values', )
    db.query(insertQuery, [values], (err, result) => {
      if (err) {
          console.log(err)
        console.log('there was an error inserting values');
      } else {
          console.log("inserted values")
          console.log(result,'this is result')
        res.json(result);

      }
    });
});

app.get('/people', (req, res) => {
//   const newShoe = req.body;
const sql = 'SELECT * FROM shoes';

db.query(sql, (err, result) => {
    if (err) {
        console.log(err)
      console.log('there was an error inserting values');
    } else {
        console.log("inserted values")
        console.log(result,'this is result')
      res.json(result);

    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
