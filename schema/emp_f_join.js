const mongoose = require('mongoose');

const firstJoin_Schema = new mongoose.Schema({

        //first joining info(5)
        first_joining_date: Date,
        rank: String,
        first_designation: String,
        first_posting_district: String,
        first_posting_upazilla: String,
        job_nature: String,
        grade: String,
        PRL_date: Date,
        GO_date: Date,
        confirmation_date: Date,

});

var fJoinInfo = mongoose.model('empFirstJoiningInfo', firstJoin_Schema);
module.exports = fJoinInfo;
