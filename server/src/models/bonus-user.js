'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class BonusUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            BonusUser.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'bonus' })
        }
    }
    BonusUser.init({
        userId: DataTypes.STRING,
        urlFb: DataTypes.STRING,
        urlYoutube: DataTypes.STRING,
        urlInstagram: DataTypes.STRING,
        urlTwitter: DataTypes.STRING,
        friends: DataTypes.STRING,
        followers: DataTypes.TEXT,
        followings: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'BonusUser',
    });
    return BonusUser;
};