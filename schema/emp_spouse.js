const mongoose = require('mongoose');

const spouseInfo_Schema = mongoose.Schema({

    //spouse info(2)
    spouseName: String,
    spouseHomeDistrict: String,
    spouseOccupation: String,
    spouseDesignation: String,
    spouseOrganization: String,
    spouseOrganizationAddress: String,
    spousePhoneNo: String
    
});

var spouseInfo = mongoose.model('empSpouseInfo', spouseInfo_Schema);
module.exports = spouseInfo;