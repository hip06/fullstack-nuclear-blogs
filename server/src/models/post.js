'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Post.belongsTo(models.User, { foreignKey: 'authorId', targetKey: 'id', as: 'author' })
            Post.belongsTo(models.Specialization, { foreignKey: 'specCode', targetKey: 'code', as: 'specialization' })
        }
    }
    Post.init({
        title: DataTypes.STRING,
        authorId: DataTypes.STRING,
        mdContent: DataTypes.TEXT,
        tags: DataTypes.TEXT,
        specCode: DataTypes.STRING,
        thumbnailUrl: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};