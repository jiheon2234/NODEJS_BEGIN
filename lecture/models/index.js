'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// const User = require('./user');
// const Post = require('./post')
// const HashTag = require('./hashtag')
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);
db.sequelize = sequelize;


// db.User = User;
// db.Post = Post;
// db.Hashtag = HashTag;
//
// User.initiate(sequelize)
// Post.initiate(sequelize)
// HashTag.initiate(sequelize)
//
// User.associate(sequelize)
// Post.associate(sequelize)
// HashTag.associate(sequelize)

const basename = path.basename(__filename);
fs.readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.') !== 0 &&  !file.includes('test' ) && file !== basename && file.slice(-3) === '.js';
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file));
        db[model.name] = model;
        model.initiate(sequelize);
    });
Object.keys(db).forEach(modelName => {
    console.log(db,modelName);
    if(db[modelName].associate){
        db[modelName].associate(db);
    }
});

module.exports = db;