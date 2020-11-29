const router = require('express').Router();

const DepDetails = require('../schema/departments/department');

//route  -  GET /addDep
router.get('/addDep', (req, res)=> {
    res.render("pages/department/addDep",
        {
            page_name: 'addDept'
        });
});

//route  - POST /addDep
router.post('/addDep', async (req, res)=> {
    const departmentDetails = new DepDetails({
        departmentName: req.body.depName,
        officers: req.body.offNum,
        staffs: req.body.staffNum,
        totalEmployees: req.body.totalEmp
    });
    try{
        const departmentData = await departmentDetails.save();
        res.redirect("/department/addDep");
    }catch(err){
        console.log(err);
    }
})

module.exports = router;