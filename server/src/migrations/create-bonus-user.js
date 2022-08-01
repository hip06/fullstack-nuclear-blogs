'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('BonusUsers', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            userId: { type: Sequelize.STRING },
            urlFb: { type: Sequelize.STRING },
            urlYoutube: { type: Sequelize.STRING },
            urlInstagram: { type: Sequelize.STRING },
            urlTwitter: { type: Sequelize.STRING },
            friends: { type: Sequelize.STRING },
            followers: { type: Sequelize.TEXT('long') },
            followings: { type: Sequelize.TEXT('long') },
            createdAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updatedAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('BonusUsers');
    }
};