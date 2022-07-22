'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class Likecmt extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Likecmt.belongsTo(models.Comment, { foreignKey: 'commentId', targetKey: 'id', as: 'counter' })
        }
    }
    Likecmt.init({
        commentId: DataTypes.STRING,
        like: DataTypes.TEXT,
        dislike: DataTypes.TEXT,

    }, {
        sequelize,
        modelName: 'Likecmt',
    });
    return Likecmt;
};