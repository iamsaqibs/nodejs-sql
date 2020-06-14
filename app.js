const express = require('express');
const mysql = require('mysql');

//Ceate connection to MySql

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node-mysql'
});


db.connect((err) => {
    if(err){
        throw err;
    }

    console.log('Connection Established');
})



const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.get('/createposttable', (req, res) => {
    let sql = 'CREATE TABLE post(id int AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body VARCHAR(255))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table Created');
    })
});

app.get('/addpost', (req, res) => {
    let post = {
        title: 'This is post title',
        body: 'this is a post body',
    }


    let sql = 'INSERT INTO post SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post Created');
    });
});

app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM post';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post Logged');
    });
})


app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM post WHERE id=${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post Logged');
    });
})

app.listen('3000', () => {
    console.log('server running at 3000');
})