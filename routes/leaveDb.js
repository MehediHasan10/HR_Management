const router = require('express').Router();

const OfficialsInfo = require('../schema/officials/officials');
const OfficialsLeaveType = require('../schema/officials/leaveType');
const OfficialsLeaveCount = require('../schema/officials/leaveCount');
const DepDetails = require('../schema/departments/department');

//---------------------Officials Leave Type----------------------------------- 

//route  - GET /addLeaveType
//API for adding Leave Types (Ex: Casual leave, Sick leave...)
router.get('/addLeaveType', (req, res) => {
    try{
        res.render('pages/leaveManagement/officials/leaveType');
    } catch(err){
        console.log(err);
    }
}) ;

//route  -  POST  /addLeaveType
//API for adding Leave Types (Ex: Casual leave, Sick leave...)
router.post('/addLeaveType', async (req,res) => {
    const leaveType = new OfficialsLeaveType({
        leaveType: req.body.lType,
        estimatedLeave: req.body.lDays
    });

    try{
        const leaveData = await leaveType.save()
        res.render('pages/leaveManagement/officials/leaveType');
    } catch(err){
        console.log(err);
    }
});


//-----------------------Officials Leave Count---------------------------------- 

//route  -  GET /officialsLeaveInfo
//This will get us to the "department" page to choose which dep's employee leave you're looking for.
router.get('/officialsLeaveInfo', async (req, res) => {
    try{
        const depDetails = await DepDetails.find();
        res.render('pages/department/showDepEmpLeave', {
            output : depDetails
        });
    } catch(err){
        console.log(err);
    }
});

//route  -  GET /depEmpLeave
// Department wise employee list (table).
router.get('/depEmpLeave/:id', async (req, res) => {
    try {
        const officialsInfo = await OfficialsInfo.find(
            {
                'basicInfo.department': req.params.id
            });

        res.render('pages/leaveManagement/officials/leaveInfo',
            {
                officialsInfoOutput: officialsInfo
            });
    } catch (err) {
        console.log(err);
    }
});

//route  -  GET /addLeaveInfo/:id
//API for adding Each employees leave information.
router.get('/addLeaveInfo/:id', async (req, res) => {
    try {
        const officialsInfo = await OfficialsInfo.findById(req.params.id);
        const officialsLeave = await OfficialsLeaveType.find();
        const officialsLeaveCount = await OfficialsLeaveCount.find(
            {
                employee: officialsInfo._id
            });
            
        res.render('pages/leaveManagement/officials/addLeave',
            { 
                offInfo : officialsInfo,
                offLeave: officialsLeave,
                offLeaveCount: officialsLeaveCount
            });
        
    } catch (err) {
        console.log(err);
    }
});

//route  -  POST /addLeaveInfo/:id
//API for adding Each employees leave information.
router.post('/addLeaveInfo/:id', async (req, res) => {
    // console.log(req.body.empId);
    const officialsLeaveCount = new OfficialsLeaveCount({
        employee: req.body.empId,
        leaveType: req.body.lType,
        startDate: req.body.sDate,
        endDate: req.body.eDate,
        duration: req.body.leaveDuration
    });
    // console.log(officialsLeaveCount);
    try {
        const leaveData = await officialsLeaveCount.save();
        // console.log("saved db data",leaveData);
        res.redirect('/leave/officialsLeaveInfo');
    } catch (err) {
        console.log(err);
    }
});

//route  -  GET /showLeaveInfo/:id
//Employee wise  leave info list (table).
router.get('/showLeaveInfo/:id', async (req, res) => {
    try{
        
        const officialsInfo = await OfficialsInfo.findById(req.params.id);
        const officialsLeaveCount = await OfficialsLeaveCount.find(
            {
                employee: officialsInfo._id
            })
            .populate('leaveType');

        res.render('pages/leaveManagement/officials/leaveDetails',
            {
                offInfo: officialsInfo,
                leaveCount: officialsLeaveCount
            });
      
    }catch(err){
        console.log(err);
    }
});

module.exports = router; 
