const router = require('express').Router();

const moment = require('moment');
const multer = require('multer');
const path = require('path');

let pdf = require("html-pdf");
let ejs = require("ejs");

const StaffsInfo = require('../schema/staffs/staffs');
const DivDetails = require('../schema/organogram/division');

//multer setup for news image
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/myUploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });  
  var upload = multer({
    storage: storage,
 }).single("dpUp");

//@route  -  GET /staffInfoForm
//Route to get the staffs information form
router.get('/addStaffInfoForm', async (req, res) => {
    try{
        res.render('pages/forms/staffInfoForm');
    } catch(err){
        console.log(err);
    }
});

//@route  -  POST /staffInfoForm
//Form to post the staffs information
router.post('/staffInfoForm', upload, async (req, res) => {

    const path = req.file && req.file.path;
    if(path){
        const staffsInfo = new StaffsInfo({
            basicInfo: {
                employeeName: req.body.emp_name,
                fatherName: req.body.f_name,
                motherName: req.body.m_name,
                designation: req.body.emp_deg,
                nationalID: req.body.n_id,
                religion: req.body.reg,
                gender: req.body.gen,
                dateOfbirth: req.body.dob,
                bloodGroup: req.body.blood,
                homeDistrict: req.body.district,
                maritalStatus: req.body.marital_Status,
                email: req.body.email,
                phone: req.body.phone
            },
    
            nomineeInfo: {
                nomineeName: req.body.emp_nominee_name,
                nomineeOccupation: req.body.n_ocp,
                nomineeRelation: req.body.n_rel,
                nomineeOrganization: req.body.n_org,
                nomineeOrganizationAddress: req.body.org_address,
                nomineeHomeDistrict: req.body.n_district,
                nomineePhoneNo: req.body.n_phone
            },
    
            address: {
                //present address
                present_address: req.body.presentAddress,
                // permanent Address
                permanent_address: req.body.permanentAddress
            },
    
            childInfo: [{
                child_name: req.body.c_name,
                child_gender: req.body.c_gender,
                child_dateOfBirth: req.body.c_dob
            }],
    
            firstJoinInfo:{
                first_joining_date: req.body.j_date,
                rank: req.body.j_rank,
                first_designation: req.body.first_deg,
                first_posting_district: req.body.j_district,
                first_posting_upazilla: req.body.j_upazilla,
                job_nature: req.body.job_nature,
                grade: req.body.j_grade,
                PRL_date: req.body.prl,
                GO_date: req.body.j_go,
                confirmation_date: req.body.confirmation_date
            },
    
            eduInfo: [{
                degree: req.body.e_deg,
                group: req.body.e_grp,
                institute: req.body.e_institution,
                board: req.body.e_board,
                results: req.body.e_result,
                passing_years: req.body.pass_year
            }],
    
            postingInfo: [{
                designation: req.body.p_deg,
                office_name: req.body.p_office,
                from_date: req.body.p_from_date,
                to_date: req.body.p_to_date,
                upazilla: req.body.p_upazilla,
                district: req.body.p_district
            }],
    
            promotionInfo: [{
                promoted_designation: req.body.pro_deg,
                promotion_nature: req.body.pro_nature,
                promotion_date: req.body.pro_date,
                GO_date: req.body.go_date,
                GO_number: req.body.go_number
            }],
    
            disciplineInfo: [{
                occurance: req.body.occurance,
                occuring_date: req.body.occ_date,
                action: req.body.occ_action,
                memo_No: req.body.memo_no,
                memo_date: req.body.memo_date
            }]
        });
    
        try {
            const staffsData = await staffsInfo.save();
            res.redirect('/staff/addStaffInfoForm');
        } catch (err) {
            console.log(err);
        }

        } else {        
            console.log("File not uploaded successfully");        
    }

})

//@route  -  GET /staffsTable (Staffs)
router.get('/staffsTable', async (req, res) => {
    try{
        const tableData = await StaffsInfo.find();
        res.render('pages/table/staffsTable', {output:tableData});
    } catch(err){
        console.log(err);
    }
});

module.exports = router;
