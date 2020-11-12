const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const fetch = require("node-fetch");
require("dotenv").config();

const port = process.env.SERVER_PORT || 3000;

let MasterTableData = [];

fetch("http://slekys.com/FormData.json")
  .then((res) => res.json())
  .then((data) => (MasterTableData = data));

const con = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASS,
  database: process.env.MYSQL_DB_NAME,
  port: process.env.MYSQL_DB_PORT,
});

con.connect((err) => {
  if (err) throw err;
  con.query(`SHOW TABLES LIKE 'data'`, (err, result) => {
    if (err) throw err;
    else if (result.length === 0) {
      fetch("http://slekys.com/FormData.json")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.map((item) => item.id).join("TEXT,"));
          con.query(
            `CREATE TABLE data (id INT PRIMARY KEY AUTO_INCREMENT, ${data
              .map((item) => item.id)
              .join(" TEXT,")} TEXT)`,
            (err, result) => {
              if (err) throw err;
              console.log(result);
            }
          );
        });
    } else {
      console.log("The db has been created previously");
    }
  });
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  con.query(`SELECT * FROM data`, (err, result) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

app.post("/", (req, res) => {
  const receivedData = req.body;

  con.query(
    `INSERT INTO data (${MasterTableData.map(
      (item) => item.id
    ).join()}) VALUES (${Object.entries(receivedData)
      .map((item) => `'${item[1]}'`)
      .join()})`,
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.json(result);
      }
    }
  );
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
