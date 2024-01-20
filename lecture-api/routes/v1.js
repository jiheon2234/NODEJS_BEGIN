const express = require('express')
const {verifyToken} = require('../middlewears');
const {createToken, tokenTest} = require('../controllers/v1')


const router = express.Router();

// router.use((req, res, next) => {
//     console.log('ancdefg\nancdefg\nancdefg\nancdefg\nancdefg\nancdefg\nancdefg\nancdefg\nancdefg\n');
//     next(); // 다음 미들웨어나 라우트 핸들러로 제어를 넘깁니다.
// });


// /v1/token
router.post('/token',createToken)
router.get('/test',verifyToken,tokenTest);

module.exports = router;