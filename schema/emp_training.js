const mongoose = require('mongoose');

const training_schema = new mongoose.Schema({ 

    //employee training info(7)
    type: String,
    course_title: String,
    institution_name: String,
    country: String,
    start_date: Date,
    end_date: Date,
    grade: String,
    position: String,

});

var emp_training = mongoose.model('empTraining', training_schema);
module.exports = emp_training;