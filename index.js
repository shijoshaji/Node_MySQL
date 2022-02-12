// NOTE: main file which gets called via node

// imports
const express = require('express');
const mysql = require('mysql');

const PORT = 3000;

const app = express();

// set DB connection
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'angcrud',
});

// connect to DB
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Mysql Connected');
});

app.listen(PORT, () => {
  console.log(`Server started in: http://localhost:${PORT}`);
});

// Home page router
app.get('', (req, res) => {
  res.send('Welcome Home');
});

// insert data to todolist table

app.get('/addpost', (req, res) => {
  // created an object of data
  let data = {
    title: 'viaNode',
    body: 'Sql Connect',
  };

  let sql = 'INSERT INTO todolist SET ?'; // here '?' is a placeholder where we pass the data
  let qry = db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.send('Inserted a data');
  });
});

// fetch all data
app.get('/fetchdata', (req, res) => {
  let sql = 'SELECT * FROM todolist';
  let qry = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
    console.log(results);
  });
});

// fetch single data based on id
app.get('/fetchdata/:id', (req, res) => {
  let sql = `SELECT * FROM todolist WHERE id=${req.params.id}`;
  let qry = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
    console.log(results);
  });
});

// update single data based on id
app.get('/updatedata/:id', (req, res) => {
  let newTitle = 'Updated Titles';
  let sql = `UPDATE todolist SET title='${newTitle}' WHERE id=${req.params.id}`;
  let qry = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send('updated');
    console.log(results);
  });
});

// delete single data based on id
app.get('/deletedata/:id', (req, res) => {
  let newTitle = 'Updated Titles';
  let sql = `DELETE FROM todolist WHERE id=${req.params.id}`;
  let qry = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send('deleted');
    console.log(results);
  });
});
