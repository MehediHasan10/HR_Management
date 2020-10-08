const mongoose = require('mongoose');

const empEdu_Schema = new mongoose.Schema({

    //educational information(6)
    degree: String,
    group: String,
    institute: String,
    board: String,
    results: String,
    passing_years: String,

});

var empEdu = mongoose.model('empEducationInfo', empEdu_Schema);
module.exports = empEdu;