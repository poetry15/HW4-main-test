var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();

db = new sqlite.Database("./db.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

router.post('/', (req, res) => {
    const {date, name, price}=req.body;
    sql = "INSERT INTO mango (日期, 商品名稱, 商品平均價格) VALUES (?, ?, ?)";
    db.run(sql, [ date, name, price], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
    });
    res.redirect('/index.html');
 })

router.get('/', function(req, res, next) {
    sql= "SELECT * FROM mango";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

module.exports = router;
