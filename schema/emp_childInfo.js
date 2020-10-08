const mongoose = require('mongoose');

const childInfo_Schema = mongoose.Schema({

    //employee child info(4)
    child_name: String,
    child_gender: String,
    child_dateOfBirth: Date,

});

var emp_child = mongoose.model('empChildInfo', childInfo_Schema);
module.exports = emp_child;