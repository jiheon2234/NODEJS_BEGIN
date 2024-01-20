// const express = require('express')
// const router = express.Router();
// const passport = require('passport')
//
// router.post('/auth/login',passport.authenticate('local', () =>{
//     req.login();
// }))


const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../middlewears');
const {join, login, logout} = require('../controllers/auth');

const express = require('express');
const router = express.Router();

router.post('/join', isNotLoggedIn, join);
router.post('/login', isNotLoggedIn, login);
router.get('/logout', isLoggedIn, logout);

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
        failureRedirect: '/?loginError=카카오로그인 실패',
    }), (req, res) => {
        res.redirect('/');
    }
);


//
module.exports = router;