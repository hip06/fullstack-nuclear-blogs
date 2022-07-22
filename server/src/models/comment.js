'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comment.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'commentator' })
            Comment.hasOne(models.Likecmt, { foreignKey: 'commentId', as: 'counter' })
        }
    }
    Comment.init({
        userId: DataTypes.STRING,
        postId: DataTypes.STRING,
        parentId: DataTypes.STRING,
        content: DataTypes.TEXT,
        level: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};