const router = require('express').Router();

const BasicInfo = require('../schema/infoForm');
const Training = require('../schema/emp_training');
const Posting = require('../schema/emp_posting');
const Promotion = require('../schema/emp_promotion');
const Publication = require('../schema/emp_publication');
const Discipline = require('../schema/emp_discipline');

//route  -  GET /addInfoForm
router.get('/addInfoForm', async (req, res) => {
    try{
        res.render('pages/infoForm');
    } catch(err){
        console.log(err);
    }
});

module.exports = router;