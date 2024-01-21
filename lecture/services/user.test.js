jest.mock('../models/user')
const User = require('../models/user')
const {follow} = require('./user')

describe('follow',() =>{
    test('사용자를 찾아 팔로잉을 추가하고 ok 반환', async () =>{
        User.findOne.mockReturnValue({
            addFollowing(id){
                return Promise.resolve(true)
            }
        })
        const result = await follow(1,2)
        expect(result).toEqual('ok');
    })
})