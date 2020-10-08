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

//route  -  GET /addInfoForm
router.get('/addInfoForm', async (req, res) => {
    try{
        res.render('pages/infoForm');
    } catch(err){
        console.log(err);
    }

});

//route  -  POST /addInfoForm
router.post('/addInfoForm', async (req, res, next) => {

    console.log("hi");
    //instance of "BasicInfo" class(1)
    const basicInfo = new BasicInfo({
        employee_name: req.body.emp_name,
        emp_father_name: req.body.f_name,
        emp_mother_name: req.body.m_name,
        designation: req.body.emp_deg,
        national_id: req.body.n_id,
        religion: req.body.reg,
        gender: req.body.gen,
        date_of_birth: req.body.dob,
        blood_group: req.body.blood,
        district: req.body.district,
        marital_Status: req.body.marital_Status,
        email: req.body.email,
        phone: req.body.phone
    });

    //instance of "Spouse" class(2)
    const spouse = new Spouse({
        spouse_name: req.body.emp_spouse_name,
        spouse_occupation: req.body.ocp,
        spouse_designation: req.body.s_deg,
        spouse_organization: req.body.s_org,
        organization_address: req.body.org_address,
        spouse_district: req.body.s_district,
        spouse_phone: req.body.s_phone
    });

    //instance of "Address" class(3)
    const address = new Address({
        //present address
        pre_house: req.body.pre_house,
        pre_post_office: req.body.pre_postOffice,
        pre_police_station: req.body.pre_policeStation,
        pre_district: req.body.pre_district,
        pre_upazilla: req.body.pre_upazilla,
        pre_telephone: req.body.pre_telephone,

        // permanent Address
        per_house: req.body.per_house,
        per_post_office: req.body.per_postOffice,
        per_police_station: req.body.per_policeStation,
        per_district: req.body.per_district,
        per_upazilla: req.body.per_upazilla,
        per_telephone: req.body.per_telephone

    });

    //instance of "Children" class(4)
    const children = new Children({
        name: req.body.c_name,
        gender: req.body.c_gender,
        date_of_birth: req.body.c_dob
    });

    //instance of "FirstJoinInfo" class(5)
    const firstJoinInfo = new FirstJoinInfo({
        joining_date: req.body.j_date,
        rank: req.body.j_rank,
        first_designation: req.body.first_deg,
        joining_district: req.body.j_district,
        joining_upazilla: req.body.j_upazilla,
        job_nature: req.body.job_nature,
        joining_grade: req.body.j_grade,
        prl_date: req.body.prl,
        go_date: req.body.j_go,
        cconfirmation_date: req.body.confirmation_date
    });

    //instance of "edu info" class(6)
    const eduInfo = new Education({
        edu_degree: req.body.e_deg,
        edu_group: req.body.e_grp,
        institute: req.body.e_institution,
        board: req.body.e_board,
        result: req.body.e_result,
        passing_years: req.body.pass_year
    });

    //instance of "Training" class(7)
    const training = new Training({
        training_type: req.body.t_type,
        training_course: req.body.t_course,
        training_institution: req.body.t_institution,
        training_country: req.body.t_country,
        starting_date: req.body.t_start,
        ending_date: req.body.t_end,
        grade: req.body.t_grade,
        position: req.body.t_position
    });

    //

    try {
        const empData = await basicInfo.save();
        console.log(empData);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;