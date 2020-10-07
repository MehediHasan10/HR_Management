const mongoose = require('mongoose');

const promotion_schema = new mongoose.Schema({

    //employee promotion statement(9)
    promoted_designation: String,
    promotion_nature: String,
    promotion_date: Date,
    GO_number: String,
    GO_date: Date,
});

var emp_promotion = mongoose.model('emp_promotion', promotion_schema);
module.exports = emp_promotion;