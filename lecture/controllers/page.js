const Post = require('../models/post')
const User = require('../models/user');

//라우터 => 컨트롤러 => 서비스
exports.renderProfile = ((req,res,next) => {
    res.render('profile',{title : '내 정보 - NodeBird'})
})
exports.renderJoin = ((req,res,next) => {
    res.render('join', {title: '회원 가입 - NodeBird'})
})
exports.renderMain = ( async (req,res,next) => {
    try{
        const posts = await Post.findAll({
            include : {
                model : User,
                attributes : ['id','nick']
            },
            order : [['createdAt','DESC']]
        })
        res.render('main',{
            title : 'NodeBird',
            twits : posts
        })
    }catch (e) {
        console.error(e)
        next(e)
    }

})