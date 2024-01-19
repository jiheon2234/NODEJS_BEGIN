const Sequelize = require('sequelize');
const Post = require('./post')

class Hashtag extends Sequelize.Model{
    static initiate(sequelize){
        Hashtag.init({
            title : {
                type : Sequelize.STRING(15),
                allowNull : false,
                unique : true,
            }
        },{
            sequelize,
            timestamps : true, //createdAt, updatedAt
            underscored : false,
            modelName : 'Hashtag',
            tableName : 'hashtags',
            paranoid : true, //deletedAt 삭제일
            charset : 'utf8mb4',
            collate : 'utf8mb4_general_ci',
        })
    }

    static associate(db){
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
    }

}

module.exports = Hashtag;