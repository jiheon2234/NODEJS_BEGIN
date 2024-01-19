const express = require('express');
const router = express.Router();
const {renderJoin, renderMain, renderProfile} = require('../controllers/page');
const {isLoggedIn, isNotLoggedIn} = require('../middlewears');

router.use((req, res, next) => {
    res.locals.user = req.user
    res.locals.followCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile',isLoggedIn, renderProfile);
router.get('/join',isNotLoggedIn, renderJoin);
router.get('/', renderMain);


module.exports = router;