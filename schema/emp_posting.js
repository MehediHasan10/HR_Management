const mongoose = require('mongoose');

const posting_schema = new mongoose.Schema({

    //employees posting workstation
    designation: String,
    office_name: String,
    from_date: Date,
    to_date: Date,
    upazilla: String,
    district: String,
});

var emp_posting = mongoose.model('empPosting', posting_schema);
module.exports = emp_posting;