const express = require('express')
const {verifyToken,apiLimiter, corsWhenDomainMatches} = require('../middlewears');
const {createToken, tokenTest, getMyPosts, getPostsByHashtag} = require('../controllers/v2')
const cors = require('cors')

const router = express.Router();

// router.use((req, res, next) => {
//     console.log('ancdefg\nancdefg\nancdefg\nancdefg\nancdefg\nancdefg\nancdefg\nancdefg\nancdefg\n');
//     next(); // 다음 미들웨어나 라우트 핸들러로 제어를 넘깁니다.
// });

// router.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','http://localhost:4000')
//     res.setHeader('Access-Control-Allow-Headers','content-type')
//     next()
// }) 대신 corsWhenDomainMatches사용

// router.use(cors({
//     origin : 'http://localhost:4000',
//     credentials : true,
// }))

router.use(corsWhenDomainMatches);


// /v2/token
router.post('/token',createToken,apiLimiter)
router.get('/test',verifyToken,apiLimiter,tokenTest);

router.get('/posts/my',verifyToken,apiLimiter,getMyPosts)
router.get('/posts/hashtag/:title',verifyToken,apiLimiter, getPostsByHashtag)

module.exports = router;