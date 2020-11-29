const router = require('express').Router();

//route  -  GET/org
//Office Organogram  
router.get('/org', (req, res) => {
    res.render("pages/organogram/org", {page_name: 'org'});
});

module.exports = router;
