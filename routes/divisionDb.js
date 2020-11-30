const router = require('express').Router();

const DivDetails = require('../schema/organogram/division');

//route  -  GET /addDiv
router.get('/addDiv', (req, res)=> {
    res.render("pages/division/addDiv",
        {
            page_name: 'addDiv'
        });
});

//route  - POST /addDiv
router.post('/addDiv', async (req, res)=> {
    const divisionDetails = new DivDetails({
        divisionName: req.body.divName,
        officers: req.body.offNum,
        staffs: req.body.staffNum,
        totalEmployees: req.body.totalEmp
    });
    try{
        const divisionData = await divisionDetails.save();
        res.redirect("/division/addDiv");
    }catch(err){
        console.log(err);
    }
})

module.exports = router;
