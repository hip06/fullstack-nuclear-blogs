'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Tag.hasMany(models.User, { foreignKey: 'roleCode' })
        }
    }
    Tag.init({
        tag: DataTypes.STRING,
        specCode: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Tag',
    });
    return Tag;
};