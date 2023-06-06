require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db');
const logger = require('./logger');
const shoes = require('./seedData');

const app = express();
// seed database...

app.use(cors({origin: '*'}));

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
    res.json(shoes)
  const values = shoes.map((shoe) => Object.values(shoe));
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
  res.json(shoes);

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
