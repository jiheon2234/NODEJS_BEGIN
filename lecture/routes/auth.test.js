const app = require('../app');
const request = require('supertest');
const {sequelize} = require('../models');

beforeAll(async () => {
    await sequelize.sync();
});

beforeEach(() => {

});

describe('POST /join', () => {
    test('로그인 안 했으면 가입, ', (done) => {
        request(app).post('/auth/join')
            .send({
                email: 'i2234@naver.com',
                nick: 'i2234@naver.com',
                password: 'i2234@naver.com',
            })
            .expect('Location', '/')
            .end(done)
    });

    test('중복 회원가입, ', (done) => {
        request(app).post('/auth/join')
            .send({
                email: 'i2234@naver.com',
                nick: 'i2234@naver.com',
                password: 'i2234@naver.com',
            })
            .expect('Location', '/join?error=exist')
            .expect(302)
            .end(done)
    });


});

describe('POST /login', () => {
    const agent = request.agent(app)
    beforeEach((done) => { //로그인
        agent.post('/auth/login')
            .send({
                email: 'i2234@naver.com',
                password: 'i2234@naver.com'
            }).end(done);
    });

    test('로그인 했으면 회원가입 진행이 안됨', (done) => {
        const message = encodeURIComponent('로그인한 상태입니다.')

        agent.post('/auth/login')
            .send({
                email: 'i2234@naver.com',
                password: 'i2234@naver.com'
            })

        .expect('Location', `/?error=${message}`)
            .expect(302, done);
    });
});

describe('POST /login', () => {
    test('로그인 수행', (done) => {
        request(app).post('/auth/login')
            .send({
                email: 'i2234@naver.com',
                password: 'i2234@naver.com'
            })
            .expect('Location', '/')
            .expect(302, done);
    });
});


afterEach(() => {
});

afterAll(async () => {
    // console.log(this)
})