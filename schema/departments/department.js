const mongoose = require('mongoose');

const department_schema = new mongoose.Schema({
    departmentName : String,
    officers : Number,
    staffs : Number,
    totalEmployees : Number
});

module.exports = mongoose.model('departmentDetails', department_schema);
