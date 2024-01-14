const express = require('express');
const router = express.Router();
const {renderJoin , renderMain, renderProfile} = require('../controllers/page')

router.use((req,res,next) => {
    console.log(11111)
    res.locals.user = null;
    res.locals.followCount = 0;
    res.locals.followingIdList = [];
    next()
})

router.get('/profile', renderProfile);
router.get('/join', renderJoin);
router.get('/', renderMain);


module.exports = router;