//라우터 => 컨트롤러 => 서비스
exports.renderProfile = ((req,res,next) => {
    res.render('profile',{title : '내 정보 - NodeBird'})
})
exports.renderJoin = ((req,res,next) => {
    res.render('join', {title: '회원 가입 - NodeBird'})
})
exports.renderMain = ((req,res,next) => {
    console.log('als;efkajsewfl;ikaswfhl;eish')
    res.render('main',{
        title : 'NodeBird',
        twits : []
    })
})