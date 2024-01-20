const Sequelize = require('sequelize');


class Domain extends Sequelize.Model {

    static initiate(sequelize) {

        Domain.init(
            {
                host: {
                    type: Sequelize.STRING(80),
                    allowNull: false,
                },
                type: {
                    type: Sequelize.ENUM('free', 'premium'),
                    allowNull: false,
                },
                clientSecret: {
                    type: Sequelize.UUID,
                    allowNull: false,
                }
            },

            {
                sequelize,
                timestamps: true,
                paranoid: true,
                modelName: 'Domain',
                tableName: 'domains',
            }
        )
    }

    static associate(db) {
        db.Domain.belongsTo(db.User, {
            foreignKey: 'UserId', // UserId를 외래키로 사용
        });
    }
}

module.exports = Domain