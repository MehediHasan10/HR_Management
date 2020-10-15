const router = require('express').Router();

const OfficialsInfo = require('../schema/officials/officials')

//@route  -  GET  / (landing page)
router.get('/', (req, res) => {
    // res.send("all ok");
    res.render("pages/landing");
});


//Officials Information Form
//@route  -  GET /addInfoForm (Officials)
router.get('/addInfoForm',(req, res) => {
    // console.log("get route");
    try{
        res.render('pages/offInfoForm');
    } catch(err){
        console.log(err);
    }
});

//@route  -  POST /addInfoForm (Officials)
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

    // console.log(officialsInfo);
    try{
        const officialsData = await officialsInfo.save();
        // res.render('pages/offInfoForm');
    } catch(err){
        console.log(err);
    }
});


//Staffs Information Form
//@route  -  GET /staffInfoForm (stuff)
router.get('/staffInfoForm', async (req, res) => {
    // console.log("get route");
    try{
        res.render('pages/staffInfoForm');
    } catch(err){
        console.log(err);
    }
});


//Information Table
//@route  -  GET /officialsTable (Officials)
router.get('/officialsTable', async (req, res) => {
    // console.log("get route");
    try{
        const tableData = await OfficialsInfo.find();
        res.render('pages/table/officialsTable', {output:tableData});
    } catch(err){
        console.log(err);
    }
});


//Officials Actions
//@route  -  GET /showDetails/:id 
router.get('/showDetails/:id', async (req, res) => {
    try {
        const detailedData = await OfficialsInfo.findById(req.params.id);
        res.render('pages/actions/officials/showDetails', {output:detailedData});
    } catch (err) {
        console.log(err);
    }
});

//@route  -  GET /editDetails/:id
router.get('/editDetails/:id', async (req, res) => {
    try {
        const editData = await OfficialsInfo.findById(req.params.id);
        res.render('pages/actions/officials/editDetails', {output:editData});
    } catch (err) {
        console.log(err);
    }
});

//@route  -  POST /editDetails/:id
router.post('/editDetails/:id', async (req, res) => {
    try {
        const editData = await OfficialsInfo.findById(req.params.id);

        // Basic Info
        editData.basicInfo.employeeName = req.body.emp_name;
        editData.basicInfo.fatherName = req.body.f_name;
        editData.basicInfo.motherName = req.body.m_name;
        editData.basicInfo.designation = req.body.emp_deg;
        editData.basicInfo.nationalID = req.body.n_id;
        editData.basicInfo.religion = req.body.reg;
        editData.basicInfo.gender = req.body.gen;
        editData.basicInfo.dateOfbirth = req.body.dob;
        editData.basicInfo.bloodGroup = req.body.blood;
        editData.basicInfo.homeDistrict = req.body.district;
        editData.basicInfo.maritalStatus = req.body.marital_Status;
        editData.basicInfo.email = req.body.email;
        editData.basicInfo.phone = req.body.phone;

        // Spouse Info
        editData.spouseInfo.spouseName = req.body.emp_spouse_name;
        editData.spouseInfo.spouseOccupation = req.body.s_ocp;
        editData.spouseInfo.spouseDesignation = req.body.s_deg;
        editData.spouseInfo.spouseOrganization = req.body.s_org;
        editData.spouseInfo.spouseOrganizationAddress = req.body.org_address;
        editData.spouseInfo.spouseHomeDistrict = req.body.s_district;
        editData.spouseInfo.spousePhoneNo = req.body.s_phone;

        // Address Information
        editData.address.present_address = req.body.presentAddress;
        editData.address.permanent_address = req.body.permanentAddress;

        //Child Information
        editData.childInfo.forEach((entry) => {
            entry.child_name = req.body.c_name;
            entry.child_gender = req.body.c_gender;
            entry.child_dateOfBirth = req.body.c_dob;
        });

        //First Joining Info
        editData.firstJoinInfo.first_joining_date = req.body.j_date;
        editData.firstJoinInfo.rank = req.body.j_rank;
        editData.firstJoinInfo.first_designation = req.body.first_deg;
        editData.firstJoinInfo.first_posting_district = req.body.j_district;
        editData.firstJoinInfo.first_posting_upazilla = req.body.j_upazilla;
        editData.firstJoinInfo.job_nature = req.body.j_nature;
        editData.firstJoinInfo.grade = req.body.j_grade;
        editData.firstJoinInfo.PRL_date = req.body.prl;
        editData.firstJoinInfo.GO_date = req.body.j_go;
        editData.firstJoinInfo.confirmation_date = req.body.confirmation_date;

        //Education Information
        editData.eduInfo.forEach((entry) => {
            entry.degree = req.body.e_deg;
            entry.group =req.body.e_grp;
            entry.institute = req.body.e_institution;
            entry.board = req.body.e_board;
            entry.results = req.body.e_result;
            entry.passing_years = req.body.pass_year;
        });

        //Training Information
        editData.trainingInfo.forEach((entry) => {
            entry.training_type = req.body.t_type;
            entry.course_title = req.body.t_course;
            entry.institution_name = req.body.t_institution;
            entry.country = req.body.t_country;
            entry.start_date = req.body.t_start;
            entry.end_date = req.body.t_end;
            entry.grade = req.body.t_grade;
            entry.position = req.body.t_position;
        });

        //Posting Information
        editData.postingInfo.forEach((entry) => {
            entry.designation = req.body.p_deg;
            entry.office_name = req.body.p_office;
            entry.from_date = req.body.p_from_date;
            entry.to_date = req.body.p_to_date;
            entry.upazilla = req.body.p_upazilla;
            entry.district = req.body.p_district;
        });

        // Promotion Info
        editData.promotionInfo.forEach((entry) => {
            entry.promoted_designation = req.body.pro_deg;
            entry.promotion_nature = req.body.pro_nature;
            entry.promotion_date = req.body.pro_date;
            entry.GO_date = req.body.go_date;
            entry.GO_number = req.body.go_number;
        });

        // Publication Information
        editData.publicationInfo.forEach((entry) => {
            entry.pub_type = req.body.pub_type;
            entry.date = req.body.pub_date;
            entry.description = req.body.pub_des;
        });

        //Discipline Information
        editData.disciplineInfo.forEach((entry) => {
            entry.occurance = req.body.occurance;
            entry.occuring_date = req.body.occ_date;
            entry.action = req.body.occ_action;
            entry.memo_No = req.body.memo_no;
            entry.memo_date = req.body.memo_date;
        });

        const editDataById = await editData.save();

        res.redirect('/officialsTable');
    } catch (err) {
        console.log(err);
    }
})


module.exports = router;

