const {isLoggedIn, isNotLoggedIn} = require('./');

describe('isLoggedIn', () => {
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    };
    const next = jest.fn();

    test('로그인되어있으면 isLoggedIn이 next를 호출해야 함', () => {

        const req = {
            isAuthenticated: jest.fn(() => true)
        };

        isLoggedIn(req, res, next);
        expect(next).toBeCalledTimes(1);

    });


    test('로그인되어 있지 않으면, isLoggedIn이 에러를 응답해야 함', () => {
        const req = {
            isAuthenticated: jest.fn(() => false)
        };

        isLoggedIn(req, res, next);
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalledWith('login require');
    });

});

describe(`isNotLoogedIn`, () => {

    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
        redirect : jest.fn()
    };
    const next = jest.fn();

    test('로그인되어있으면 isNotLoggedIn이 에러를  웅덥햐여 함', () => {

        const req = {
            isAuthenticated: jest.fn(() => true)
        };

        isNotLoggedIn(req, res, next);
        expect(res.redirect).toHaveBeenCalled();
    });

    test('로그인되어 있지 않으면, isNotLoggedIn이 에러를 응답해야 함', () => {
        const req = {
            isAuthenticated: jest.fn(() => false)
        };

        isNotLoggedIn(req, res, next);
        expect(next).toBeCalled()
    });

});