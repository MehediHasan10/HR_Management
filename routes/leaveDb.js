const router = require('express').Router();

const OfficialsLeave = require('../schema/officials/leaveType');

//Officials Leave information

//route  - GET /addLeaveType
router.get('/addLeaveType', (req, res) => {
    try{
        res.render('pages/leaveManagement/officials/leaveType');
    } catch(err){
        console.log(err);
    }
}) ;

//route  -  POST  /addLeaveType
router.post('/addLeaveType', async (req,res) => {
    const leaveType = new OfficialsLeave({
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

module.exports = router; 