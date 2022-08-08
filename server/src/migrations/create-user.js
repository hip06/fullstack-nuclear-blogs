'use strict';
/*
email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthday: DataTypes.DATE,
    avatar: DataTypes.STRING,
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING,
    star: DataTypes.STRING,
    description: DataTypes.TEXT,
*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      email: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      firstName: { type: Sequelize.STRING },
      lastname: { type: Sequelize.STRING },
      birthday: { type: Sequelize.DATE },
      avatar: { type: Sequelize.BLOB('long') },
      avatarUrl: { type: Sequelize.STRING },
      positionCode: { type: Sequelize.STRING, defaultValue: 6 },
      roleCode: { type: Sequelize.STRING, defaultValue: 'USER' },
      star: { type: Sequelize.STRING, defaultValue: 0 },
      typeLogin: { type: Sequelize.STRING },
      fbUrl: { type: Sequelize.STRING },
      instagramUrl: { type: Sequelize.STRING },
      youtubeUrl: { type: Sequelize.STRING },
      tokenLogin: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};