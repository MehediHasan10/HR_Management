const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

//reference of express module
const app = express();

//parsing the json data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//mongo config and connection
// const url = "mongodb+srv://el06:test1234@cluster0.a9rlb.mongodb.net/hrdb";
const url = "mongodb://localhost:27017/hRDataBase";
mongoose.connect(url, { 

    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).catch((err) => console.log(err)); //Handles initial connection error

const db = mongoose.connection;
db.on('error', () => {
    console.log('> Error occurred from database...');
});
db.once('open', () => {
    console.log('> Database is connected successfully...');
});

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//testing the server
// app.get('/', (req, res) => {
//     // res.send("all ok");
//     res.render("pages/dashboard");
// });

//bring all routes
const hrRouter = require('./routes/hrDb');
//routes handler
app.use('/', hrRouter);

//set up the public folder
app.use(express.static('./public'));

//server listener
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server listening on port " + port + "..."));