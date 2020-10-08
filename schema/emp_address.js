const mongoose = require('mongoose');

const empAddress_Schema = mongoose.Schema({

        //address info(3)
        present_house: String,
        present_postOffice: String,
        present_policeStation: String,
        present_district: String,
        present_upazila: String,
        present_residentTelephone: String,

        permanent_house: String,
        permanent_postOffice: String,
        permanent_policeStation: String,
        permanent_district: String,
        permanent_upazila: String,
        permanent_residentTelephone: String

});

var empAddress = mongoose.model('empAddress', empAddress_Schema);
module.exports = empAddress;