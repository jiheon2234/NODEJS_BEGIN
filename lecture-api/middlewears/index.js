const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/user');
const Domain = require('../models/domain');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('login require');
    }
};

exports.isNotLoggedIn = ((req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
});

exports.verifyToken = (req, res, next) => {
    try {
        res.locals.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (e) {
        console.error(e);
        if (e.name === 'TokenExpiredError') {
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.'
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다'
        });
    }
};


exports.apiLimiter = async (req, res, next) => {
    let user;
    if (res.locals.decoded.id) {
        user = await User.findOne({where: {id: res.locals.decoded.id}});
    }
    rateLimit({
        windowMs: 30 * 500,
        max: user?.type === 'premium' ? 1000 : 10,
        handler(req, res) {
            res.status(this.statusCode).json({
                code: this.statusCode,
                message: '1분에 10번만 만 요청 가능'
            });
        }
    })(req, res, next);
};

exports.deprecated = (req, res) => {
    res.status(410).json({
        code: 410,
        message: '새로운 버전을 사용하세요;'
    });
};

exports.corsWhenDomainMatches = async (req, res, next) => {
    const domain = await Domain.findOne({
        where: {host: new URL(req.get('origin').host)},
    });
    if (domain) {
        cors({
            origin: req.get('origin'),
            credentials: true,
        })(req, res, next);
    }
};
