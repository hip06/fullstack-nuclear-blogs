'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class Position extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Position.hasMany(models.User, { foreignKey: 'positionCode' })
        }
    }
    Position.init({
        code: DataTypes.STRING,
        value: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Position',
    });
    return Position;
};