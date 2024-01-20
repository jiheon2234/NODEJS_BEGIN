const express = require('express')
const {isLoggedIn} = require('../middlewears');
const {follow, unfollow} = require('../controllers/user')

const router = express.Router();

router.post('/:id/follow',isLoggedIn, follow);
router.post('/:id/unfollow',isLoggedIn, unfollow)

module.exports = router;