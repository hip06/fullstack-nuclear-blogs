'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: 'roleCode', targetKey: 'code' })
      User.belongsTo(models.Position, { foreignKey: 'positionCode', targetKey: 'code' })
      User.hasMany(models.Post, { foreignKey: 'authorId', as: 'author' })
      User.hasMany(models.Comment, { foreignKey: 'userId', as: 'commentator' })

    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthday: DataTypes.DATE,
    avatar: DataTypes.BLOB,
    avatarUrl: DataTypes.STRING,
    roleCode: DataTypes.STRING,
    positionCode: DataTypes.STRING,
    star: DataTypes.STRING,
    description: DataTypes.TEXT,
    typeLogin: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};