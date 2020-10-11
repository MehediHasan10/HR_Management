const mongoose = require('mongoose');

const basicInfo_Schema = new mongoose.Schema({
    
    //basic info(1) 
    employeeName: String,
    fatherName: String,
    motherName: String,
    designation: String,
    nationalID: String,
    religion: String,
    gender: String,
    dateOfbirth: Date,
    bloodGroup: String,
    homeDistrict: String,
    maritalStatus: String,

});

var basicInfo = mongoose.model('empBasicInfo', basicInfo_Schema);
module.exports = basicInfo;