const express = require('express')
const {isLoggedIn, isNotLoggedIn} = require('../middlewears')
const {renderLogin , createDomain} = require('../controllers')
const router =express.Router()


router.get('/',renderLogin);
router.post('/domain',createDomain)

module.exports = router;