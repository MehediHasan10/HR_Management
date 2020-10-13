const router = require('express').Router();

const OfficialsInfo = require('../schema/officials/officials')

//route  -  GET  / (landing page)
router.get('/', (req, res) => {
    // res.send("all ok");
    res.render("pages/landing");
});

//route  -  GET /addInfoForm (Officials)
router.get('/addInfoForm',(req, res) => {
    // console.log("get route");
    try{
        res.render('pages/offInfoForm');
    } catch(err){
        console.log(err);
    }
});

//route  -  POST /addInfoForm (Officials)
router.post('/addInfoForm', async (req, res) => {
    
    const officialsInfo = new OfficialsInfo({
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

        spouseInfo: {
            spouseName: req.body.emp_spouse_name,
            spouseOccupation: req.body.s_ocp,
            spouseDesignation: req.body.s_deg,
            spouseOrganization: req.body.s_org,
            spouseOrganizationAddress: req.body.org_address,
            spouseHomeDistrict: req.body.s_district,
            spousePhoneNo: req.body.s_phone
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

        trainingInfo: [{
            training_type: req.body.t_type,
            course_title: req.body.t_course,
            institution_name: req.body.t_institution,
            country: req.body.t_country,
            start_date: req.body.t_start,
            end_date: req.body.t_end,
            grade: req.body.t_grade,
            position: req.body.t_position
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

        publicationInfo: [{
            pub_type: req.body.pub_type,
            date: req.body.pub_date,
            description: req.body.pub_des
        }],

        disciplineInfo: [{
            occurance: req.body.occurance,
            occuring_date: req.body.occ_date,
            action: req.body.occ_action,
            memo_No: req.body.memo_no,
            memo_date: req.body.memo_date
        }]

    });

    console.log(officialsInfo);
    try{
        const officialsData = await officialsInfo.save();
        res.render('pages/offInfoForm');
    } catch(err){
        console.log(err);
    }
});


//route  -  GET /staffInfoForm (stuff)
router.get('/staffInfoForm', async (req, res) => {
    // console.log("get route");
    try{
        res.render('pages/staffInfoForm');
    } catch(err){
        console.log(err);
    }
});

//route  -  GET /officialsTable (Officials)
router.get('/officialsTable', async (req, res) => {
    // console.log("get route");
    try{
        const tableData = await OfficialsInfo.find();
        res.render('pages/table/officialsTable', {output:tableData});
    } catch(err){
        console.log(err);
    }
});

module.exports = router;

