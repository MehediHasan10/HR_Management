const router = require('express').Router();
const moment = require('moment');

const OfficialsInfo = require('../schema/officials/officials');
const OfficialsLeaveType = require('../schema/officials/leaveType');
const OfficialsLeaveCount = require('../schema/officials/leaveCount');
const DivDetails = require('../schema/organogram/division');

//---------------------Officials Leave Type----------------------------------- 

//route  - GET /addLeaveType
//API for adding Leave Types (Ex: Casual leave, Sick leave...)
router.get('/addLeaveType', (req, res) => {
    try{
        res.render('pages/leaveManagement/officials/leaveType',
        {
            page_name: 'addLeaveType'
        });
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
//This will get us to the "division" page to choose which dep's employee leave you're looking for.
router.get('/officialsLeaveInfo', async (req, res) => {
    try{
        const divDetails = await DivDetails.find();
        res.render('pages/division/showDivEmpLeave', {
            output : divDetails,
            page_name: 'officialsLeaveInfo'
        });
    } catch(err){
        console.log(err);
    }
});

//route  -  GET /depEmpLeave
// Department wise employee list (table).
router.get('/divEmpLeave/:id', async (req, res) => {
    try {
        const officialsInfo = await OfficialsInfo.find(
            {
                'basicInfo.division': req.params.id
            });

        res.render('pages/leaveManagement/officials/leaveInfo',
            {
                officialsInfoOutput: officialsInfo,
                page_name: 'officialsLeaveInfo'

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
                offLeaveCount: officialsLeaveCount,
                page_name: 'officialsLeaveInfo'
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
                leaveCount: officialsLeaveCount,
                moment: moment,
                page_name: 'officialsLeaveInfo'
            });
      
    }catch(err){
        console.log(err);
    }
});

module.exports = router; 
