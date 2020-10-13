const mongoose = require('mongoose');

const officials_schema = new mongoose.Schema({
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
    spouseInfo: {
        spouseName: String,
        spouseHomeDistrict: String,
        spouseOccupation: String,
        spouseDesignation: String,
        spouseOrganization: String,
        spouseOrganizationAddress: String,
        spousePhoneNo: String
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
    trainingInfo: [{
        training_type: String,
        course_title: String,
        institution_name: String,
        country: String,
        start_date: Date,
        end_date: Date,
        grade: String,
        position: String
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
    publicationInfo: [{
        pub_type: String,
        date: Date,
        description: String
    }],
    disciplineInfo: [{
        occurance: String,
        occuring_date: Date,
        action: String,
        memo_No: String,
        memo_date: Date
    }]
});

module.exports = mongoose.model("officialsInfo", officials_schema);