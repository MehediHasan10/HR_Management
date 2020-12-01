const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require("./middleware/authMiddleware");


//reference of express module
const app = express();

//parsing the json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//mongo config and connection
const url = "mongodb+srv://el06:test1234@cluster0.a9rlb.mongodb.net/hrmSoftwareRPGCL";
// const url = "mongodb://localhost:27017/hRDataBase";
mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
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

//Checking the user
app.get("*", checkUser);

//bring all routes
const hrRouter = require('./routes/hrDb');
const leaveRouter = require('./routes/leaveDb');
const divisionRouter = require('./routes/divisionDb');
const authRouter = require('./routes/auth');
const orgRouter = require('./routes/organogram');
const staffRouter = require('./routes/staffHrDb');

//routes handler
app.use('/', hrRouter);
app.use('/leave', leaveRouter);
app.use('/division', divisionRouter);
app.use('/auth', authRouter);
app.use('/organogram', orgRouter);
app.use('/staff', staffRouter);

//set up the public folder
app.use(express.static('./public'));

//server listener
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server listening on port " + port + "..."));