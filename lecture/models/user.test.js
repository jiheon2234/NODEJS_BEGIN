const User = require ('./user');
const Sequelize = require('sequelize');
const config = require('../config/config')['test']



const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

describe('User model', ()=>{
    test('static initiate 메서드 호출', ()=>{
        expect(User.initiate(sequelize)).toBe(undefined)
    })
})