const mongoose = require('mongoose');

const info_Schema = mongoose.Schema({
    
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

    //spouse info(2)
    spouseName: String,
    spouseHomeDistrict: String,
    spouseOccupation: String,
    spouseDesignation: String,
    spouseOrganization: String,
    spouseOrganizationAddress: String,
    spousePhoneNo: String,

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
    permanent_residentTelephone: String,

    //employee child info(4)
    child_name: String,
    child_gender: String,
    child_dateOfBirth: Date,

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

    //educational information(6)
    degree: String,
    group: String,
    institute: String,
    board: String,
    results: String,
    passing_years: String,

});

var basicInfo = mongoose.model('basicInfo', info_Schema);
module.exports = basicInfo;