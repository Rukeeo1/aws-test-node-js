const mysql = require('mysql');

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// connect my node app mysql
// seed the shoe data...

con.connect((error, result) => {
  if (error) {
    console.error('Error connecting to the database: ', error);
  } else {
    console.log('Connected to the MySQL database!');
    con.query('CREATE DATABASE IF NOT EXISTS node_express_db', (error) => {
      if (error) {
        console.error('Error creating database: ', error);
      } else {
        console.log('Database created or already exists!');
      }
    });

    con.query('USE node_express_db;');

    // create show tables;
    const shoes = `CREATE TABLE IF NOT EXISTS shoes (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(255),
        shoeCategory VARCHAR(255),
        rating DECIMAL(3, 1),
        reviews INT,
        availability BOOLEAN
      )`;

      con.query(shoes, function (err, result) {
        if (err) throw err;
        console.log("shoes table created");
      });
  }
});


module.exports = con;
