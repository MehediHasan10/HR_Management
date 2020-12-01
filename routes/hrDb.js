const router = require('express').Router();

const moment = require('moment');
const multer = require('multer');
const path = require('path');

let pdf = require("html-pdf");
let ejs = require("ejs");

const OfficialsInfo = require('../schema/officials/officials');
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

//@route  -  GET  / 
//landing page
router.get('/', (req, res) => {
    res.render("pages/landing");
});

//@route  -  GET  /index 
//index page
router.get('/index', (req, res) => {
    res.render("pages/index");
});

//Officials Information Form ------------------------------------------

//@route  -  GET /addInfoForm
//Form to post the employee information
router.get('/addInfoForm',async (req, res) => {
    try{
        const divDetails = await DivDetails.find();
        
        res.render('pages/forms/offInfoForm',
        {
            output: divDetails,
            page_name: 'addInfoForm'
        });
    } catch(err){
        console.log(err);
    }
});

//@route  -  POST /addInfoForm
//Form to post the employee information
router.post('/addInfoForm', upload, async (req, res) => {

    const path = req.file && req.file.path;
    if(path){
        //console.log(req.body);

        var imagePath = "/myUploads/" + req.file.filename;
        //ChildInfo array for dynamic field                     
        const childInformation = [];
        for(var i = 0; i < req.body.c_name.length; i++){
            var newEntry = {
                child_name: req.body.c_name[i],
                child_gender: req.body.c_gender[i],
                child_dateOfBirth: req.body.c_dob[i]
            }
            childInformation.push(newEntry);
        };

        //EduInfo array for dynamic field
        const eduInformation = [];
        for(var i = 0; i < req.body.e_deg.length; i++) {
            var newEntry = {
                degree: req.body.e_deg[i],
                group: req.body.e_grp[i],
                institute: req.body.e_institution[i],
                board: req.body.e_board[i],
                results: req.body.e_result[i],
                passing_years: req.body.pass_year[i]
            }
            eduInformation.push(newEntry);
        };

        //TrainingInfo array for dynamic field
        const trainingInformation = [];
        for(var i = 0; i < req.body.t_course.length; i++){
            var newEntry = {
                training_type: req.body.t_type[i],
                course_title: req.body.t_course[i],
                institution_name: req.body.t_institution[i],
                country: req.body.t_country[i],
                start_date: req.body.t_start[i],
                end_date: req.body.t_end[i],
                grade: req.body.t_grade[i],
                position: req.body.t_position[i]
            }
            trainingInformation.push(newEntry);
            // console.log(trainingInformation);
        };

        //PostingInfo array for dynamic field
        const postingInfo = [];
        for (var i = 0; i < req.body.p_deg.length; i++){
            var newEntry = {
                designation: req.body.p_deg[i],
                office_name: req.body.p_office[i],
                from_date: req.body.p_from_date[i],
                to_date: req.body.p_to_date[i],
                upazilla: req.body.p_upazilla[i],
                district: req.body.p_district[i]
            }
            postingInfo.push(newEntry);
        };

        //PromotionInfo array for dynamic field
        const promotionInfo = [];
        for (var i = 0; i < req.body.pro_deg.length; i++){
            var newEntry = {
                promoted_designation: req.body.pro_deg[i],
                promotion_nature: req.body.pro_nature[i],
                promotion_date: req.body.pro_date[i],
                GO_number: req.body.go_number[i],
                GO_date: req.body.go_date[i]
            }
            promotionInfo.push(newEntry);
        };

        //Publication array for dynamic field
        const publicationInfo = [];
        for (var i = 0; i < req.body.pub_type.length; i++){
            var newEntry = {
                pub_type: req.body.pub_type[i],
                date: req.body.pub_date[i],
                description: req.body.pub_des[i]
            
            }
            publicationInfo.push(newEntry);
        };

        //Disciplinary Action array for dynamic field
        const disciplineInfo = [];
        for (var i = 0; i < req.body.occurance.length; i++){
            var newEntry = {
                occurance: req.body.occurance[i],
                occuring_date: req.body.occ_date[i],
                action: req.body.occ_action[i],
                memo_No: req.body.memo_no[i],
                memo_date: req.body.memo_date[i]
            
            }
            disciplineInfo.push(newEntry);
        };

        const retirementDate = moment(req.body.dob).add(59, 'y');
        // var retireTime = moment(officialsInfo.basicInfo.dateOfRetirement);
        var currentTime = moment();
        var remainingTime = retirementDate.diff(currentTime, 'days')


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
                phone: req.body.phone,
                division: req.body.division,
                department: req.body.department,
                section: req.body.section,
                dateOfRetirement: retirementDate,
                remainingRetiredTime: remainingTime,
                image: imagePath
            },

            nomineeInfo: {
                nomineeName: req.body.emp_nominee_name,
                nomineeOccupation: req.body.n_ocp,
                nomineeRelation: req.body.n_relation,
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

            childInfo: childInformation,

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

            eduInfo: eduInformation,

            trainingInfo: trainingInformation,

            postingInfo: postingInfo,

            promotionInfo: promotionInfo,

            publicationInfo: publicationInfo,

            disciplineInfo: disciplineInfo

        });

        try{
            const officialsData = await officialsInfo.save();
            //console.log(moment());
            // var retire = moment(officialsInfo.basicInfo.remainingRetiredTime);

            res.redirect('/addInfoForm');
        } catch(err){
            console.log(err);
        }
    } else {
        console.log("File not uploaded successfully");
    }
    
});


//Information Table ---------------------------------------------------

//@route  -  GET /officialsTable (Officials) 
//*** Modified route ***
//This route will lead to the RPGCL Division page 
router.get('/officialsTable', async (req, res) => {  
    try{
        const divDetails = await DivDetails.find();
        res.render('pages/division/showDivEmp',        
            {
                output : divDetails,
                page_name: 'officialsTable'
            });
    } catch(err){
        console.log(err);
    }
});

//@route  -  GET /depEmp
//This route will lead to the employee list table. Division wise. 
router.get('/divEmp/:id', async (req, res) => {
    
    try {
        const officialsInfo = await OfficialsInfo.find(
            {
                'basicInfo.division': req.params.id
            })
        res.render('pages/table/officialsTable', 
        {
            output:officialsInfo,
            divisionId: req.params.id,
            page_name: 'officialsTable'
        });
    } catch (err) {
        console.log(err);
    }
})

//@route  -  GET /generatePdf/:id
//This route is to create a PDF of the division page (Employee Table).
router.get('/generatePdf/:id', async (req,res) => {
    try{
        const officialsInfo = await OfficialsInfo.find(
            {
                'basicInfo.division': req.params.id
            })
        ejs.renderFile(path.join(__dirname, '../views/pages/table/', "pdf.ejs"), {output:officialsInfo, dirname:__dirname}, (err, data) => {

            if (err) {
                res.send(err);
            } else {
                var assesPath = path.join(__dirname,'../public/');
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), '/');

                var options = {
                    "height": "11.25in",
                    "width": "18.5in",
                    "header": {
                        "height": "20mm",
                    },
                    "footer": {
                        "height": "20mm",
                    },
                    "base": "file:///" + assesPath
                };

                pdf.create(data, options).toStream(function (err, stream) {
                    if (err) return res.send(err);
                    res.type('pdf');
                    stream.pipe(res);
                });
            }
        });
    }
    catch (e) {
        console.log(e)
    }
})

//@route  -  GET /employeeDetails/pdf/:id
//This route is to create a PDF of the Individual Employee page (Employee Details).
router.get('/employeeDetails/pdf/:id',async(req,res)=>{
    try{
        const detailedData = await OfficialsInfo.findById(req.params.id).populate('basicInfo.division');

        ejs.renderFile(path.join(__dirname, '../views/pages/actions/officials/', "pdf.ejs"), {output:detailedData, moment: moment, dirname:__dirname}, (err, data) => {

            if (err) {
                res.send(err);
            } else {
                var assesPath = path.join(__dirname,'../public/');
                // console.log(assesPath);
                assesPath = assesPath.replace(new RegExp(/\\/g), '/');

                var options = {
                    "height": "11.25in",
                    "width": "8.5in",
                    "header": {
                        "height": "20mm",
                    },
                    "footer": {
                        "height": "20mm",
                    },
                    "base": "file:///" + assesPath
                };

                pdf.create(data, options).toStream(function (err, stream) {
                    if (err) return res.send(err);
                    res.type('pdf');
                    stream.pipe(res);
                });
            }
        });
    }
    catch (e) {
        console.log(e)
    }
})

//Officials Actions  ------------------------------------------------------------

//@route  -  GET /showDetails/:id
//This route will show employee's individual detailed information
router.get('/showDetails/:id', async (req, res) => {
    try {
        const detailedData = await OfficialsInfo.findById(req.params.id)
            .populate('basicInfo.division');

        res.render('pages/actions/officials/showDetails', 
        {
            output:detailedData,
            moment: moment,
            page_name: 'officialsTable'
        });
    } catch (err) {
        console.log(err);
    }
});

//@route  -  GET /editDetails/:id
router.get('/editDetails/:id', async (req, res) => {
    try {
        const editData = await (await OfficialsInfo.findById(req.params.id))
            .populate('basicInfo.division');
        const divDetails = await DivDetails.find();
        res.render('pages/actions/officials/editDetails', 
            {
                output: editData,
                divDetails: divDetails,
                page_name: 'officialsTable',
                moment: moment
            });
    } catch (err) {
        console.log(err);
    }
});

//@route  -  POST /editDetails/:id
//*** This route needs to be corrected ***/
router.post('/editDetails/:id', upload, async (req, res) => {
    const path = req.file && req.file.path;

    if(path){
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
            editData.basicInfo.division = req.body.division;
            editData.basicInfo.department = req.body.department;
            editData.basicInfo.section = req.body.section;
            editData.basicInfo.dateOfRetirement = req.body.retirementDate;
            editData.basicInfo.image = req.body.imagePath;
    
            // Nominee Info
            editData.nomineeInfo.nomineeName = req.body.emp_nominee_name;
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
    } else {
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
            editData.basicInfo.division = req.body.division;
            editData.basicInfo.department = req.body.department;
            editData.basicInfo.section = req.body.section;
            editData.basicInfo.dateOfRetirement = req.body.retirementDate;            
    
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
    }
    
});

//@route  -  GET /DELETE /:id
router.get('/deleteOfficials/:id', async (req, res) => {
    try{
        const deleteData = await OfficialsInfo.findById(req.params.id);
        const deleteDataById = await deleteData.remove();
        res.redirect('/officialsTable');
    } catch (err) {
        console.log(err);
    }
});


//Staffs Actions  ------------------------------------------------------------

//@route  -  GET /showStaffDetails/:id
router.get('/showStaffDetails/:id', async (req, res) => {
    try {
        const detailedData = await StaffsInfo.findById(req.params.id);
        res.render('pages/actions/staffs/showStaffDetails', {output:detailedData});
    } catch (err) {
        console.log(err);
    }
});

//@route  -  GET /editStaffDetails/:id
router.get('/editStaffDetails/:id', async (req, res) => {
    try {
        const editData = await StaffsInfo.findById(req.params.id);
        res.render('pages/actions/staffs/editStaffDetails', {output:editData});
    } catch (err) {
        console.log(err);
    }
});

//@route  -  POST /editStaffDetails/:id
router.post('/editStaffDetails/:id', async (req, res) => {
    try {
        const editData = await StaffsInfo.findById(req.params.id);

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

        //Discipline Information
        editData.disciplineInfo.forEach((entry) => {
            entry.occurance = req.body.occurance;
            entry.occuring_date = req.body.occ_date;
            entry.action = req.body.occ_action;
            entry.memo_No = req.body.memo_no;
            entry.memo_date = req.body.memo_date;
        });

        const editDataById = await editData.save();

        res.redirect('/staffsTable');
    } catch (err) {
        console.log(err);
    }
});

//@route  -  GET /DELETE /:id
router.get('/deleteStaffs/:id', async (req, res) => {
    try{
        const deleteData = await StaffsInfo.findById(req.params.id);
        const deleteDataById = await deleteData.remove();
        res.redirect('/staffsTable');
    } catch (err) {
        console.log(err);
    }
});


//Retirement Calculations

//@route  -  GET /retirement
router.get('/retirement', async (req, res) => {
    try {
        const officialsInfo = await OfficialsInfo.find({ 
            'basicInfo.remainingRetiredTime': {
                $lt: 180
            } 
        });
        //console.log(officialsInfo);
        res.render('pages/retirement/offRetire', {
            output : officialsInfo,
            moment : moment,
            page_name: 'retirement'
        })
    } catch (err) {
        console.log(err);
    }
})



module.exports = router;
