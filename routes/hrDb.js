const router = require('express').Router();

const BasicInfo = require('../schema/emp_basicInfo');
const Training = require('../schema/emp_training');
const Posting = require('../schema/emp_posting');
const Promotion = require('../schema/emp_promotion');
const Publication = require('../schema/emp_publication');
const Discipline = require('../schema/emp_discipline');
const Address = require('../schema/emp_address');
const Spouse = require('../schema/emp_spouse');
const Children = require('../schema/emp_childInfo');
const Education = require('../schema/emp_edu.js');
const FirstJoinInfo = require('../schema/emp_f_join');

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

//route  -  POST /addInfoForm
router.post('/addInfoForms', async (req, res, next) => {

    console.log(req.body);
    console.log("hi");
    //instance of "BasicInfo" class(1)
    const basicInfo = new BasicInfo({
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
    });

    //instance of "Spouse" class(2)
    const spouse = new Spouse({
        spouseName: req.body.emp_spouse_name,
        spouseOccupation: req.body.s_ocp,
        spouseDesignation: req.body.s_deg,
        spouseOrganization: req.body.s_org,
        spouseOrganizationAddress: req.body.org_address,
        spouseHomeDistrict: req.body.s_district,
        spousePhoneNo: req.body.s_phone
    });

    //instance of "Address" class(3)
    const address = new Address({
        //present address
        present_address: req.body.presentAddress,

        // permanent Address
        permanent_address: req.body.permanentAddress,

    });

    //instance of "Children" class(4)
    const children = new Children({
        child_name: req.body.c_name,
        child_gender: req.body.c_gender,
        child_dateOfBirth: req.body.c_dob
    });

    //instance of "FirstJoinInfo" class(5)
    const firstJoinInfo = new FirstJoinInfo({
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
    });

    //instance of "edu info" class(6)
    const eduInfo = new Education({
        degree: req.body.e_deg,
        group: req.body.e_grp,
        institute: req.body.e_institution,
        board: req.body.e_board,
        results: req.body.e_result,
        passing_years: req.body.pass_year
    });

    //instance of "Training" class(7)
    const training = new Training({
        type: req.body.t_type,
        course_title: req.body.t_course,
        institution_name: req.body.t_institution,
        country: req.body.t_country,
        start_date: req.body.t_start,
        end_date: req.body.t_end,
        grade: req.body.t_grade,
        position: req.body.t_position
    });

    //instance of "Posting" class(8)
    const posting = new Posting({
        designation: req.body.p_deg,
        office_name: req.body.p_office,
        from_date: req.body.p_from_date,
        to_date: req.body.p_to_date,
        upazilla: req.body.p_upazilla,
        district: req.body.p_district,
    });

    //instance of "Promotion" class(9)
    const promotion = new Promotion({
        promoted_designation: req.body.pro_deg,
        promotion_nature: req.body.pro_nature,
        promotion_date: req.body.pro_date,
        GO_date: req.body.go_date,
        GO_number: req.body.go_number

    });

    //instance of "Publication" class(10)
    const publictional = new Publication({
        type: req.body.pub_type,
        date: req.body.pub_date,
        description: req.body.pub_des
    });

    //instance of "Discipline" class(11)
    const discipline = new Discipline({
        occurance: req.body.occurance,
        occuring_date: req.body.occ_date,
        action: req.body.occ_action,
        memo_No: req.body.memo_no,
        memo_date: req.body.memo_date
    });

    try {
        const empData = await basicInfo.save();
        const spouseData = await spouse.save();
        const addressData = await address.save();
        const childrenData = await children.save();
        const firstJoinInfoData = await firstJoinInfo.save();
        const eduInfoData = await eduInfo.save(); 
        const trainingData = await training.save();
        const postingData = await posting.save();
        const promotionData = await promotion.save();
        const publictionalData = await publictional.save();
        const disciplineData = await discipline.save();

        //console.log(empData);

        res.render('pages/offInfoForm');

    } catch (err) {
        console.log(err);
    }
})



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
        res.render('pages/table/officialsTable');
    } catch(err){
        console.log(err);
    }
});

//route  -  GET /test
router.get('/test', async (req, res) => {
    console.log("get route");
    try{
        res.render('pages/test');
    } catch(err){
        console.log(err);
    }
});

//route  -  POST /test
router.post('/test', async (req, res) => {
    console.log("post route");
    console.log(req.body);

    const basicInfo = new BasicInfo({
        employee_name: req.body.emp_name,
    });

    try{
        const empData = await basicInfo.save();
        console.log(empData);
        res.render('pages/test');
        // res.send("hello");
    } catch(err){
        console.log(err);
    }
});


module.exports = router;