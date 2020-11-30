const mongoose = require('mongoose');

const division_schema = new mongoose.Schema({
    divisionName : String,
    officers : Number,
    staffs : Number,
    totalEmployees : Number
});

module.exports = mongoose.model('divisiontDetails', division_schema);
