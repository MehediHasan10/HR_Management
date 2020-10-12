const mongoose = require('mongoose');

const empAddress_Schema = new mongoose.Schema({

        //address info(3)
        present_address: String,
    
        permanent_address: String,

});

var empAddress = mongoose.model('empAddress', empAddress_Schema);
module.exports = empAddress;