const router = require('express').Router();

//route  -  GET/org
//Office Organogram  
router.get('/org', (req, res) => {
    res.render("pages/organogram/org");
});

module.exports = router;
