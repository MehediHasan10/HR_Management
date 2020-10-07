const mongoose = require('mongoose');

const discipline_Schema = new mongoose.Schema({
    //employee discipline action
    occurance: String,
    occuring_date: Date,
    action: String,
    memo_No: String,
    memo_date: Date,
});

var emp_discipline = mongoose.model('emp_discipline', discipline_Schema);
module.exports = emp_discipline;