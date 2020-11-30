const mongoose = require('mongoose');

const staffs_schema = new mongoose.Schema({
    basicInfo: {
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
        email: String,
        phone: String
    },
    nomineeInfo: {
        nomineeName: String,
        nomineeHomeDistrict: String,
        nomineeOccupation: String,
        nomineeRelation: String,
        nomineeOrganization: String,
        nomineeOrganizationAddress: String,
        nomineePhoneNo: String
    },
    address: {
        present_address: String,  
        permanent_address: String
    }, 
    childInfo: [{
        child_name: String,
        child_gender: String,
        child_dateOfBirth: Date
    }],
    firstJoinInfo:{
        first_joining_date: Date,
        rank: String,
        first_designation: String,
        first_posting_district: String,
        first_posting_upazilla: String,
        job_nature: String,
        grade: String,
        PRL_date: Date,
        GO_date: Date,
        confirmation_date: Date
    },
    eduInfo: [{
        degree: String,
        group: String,
        institute: String,
        board: String,
        results: String,
        passing_years: String
    }],
    postingInfo: [{
        designation: String,
        office_name: String,
        from_date: Date,
        to_date: Date,
        upazilla: String,
        district: String
    }],
    promotionInfo: [{
        promoted_designation: String,
        promotion_nature: String,
        promotion_date: Date,
        GO_number: String,
        GO_date: Date
    }],
    disciplineInfo: [{
        occurance: String,
        occuring_date: Date,
        action: String,
        memo_No: String,
        memo_date: Date
    }]
});

module.exports = mongoose.model("staffsInfo", staffs_schema);