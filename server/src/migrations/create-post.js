'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            title: { type: Sequelize.STRING },
            authorId: { type: Sequelize.STRING },
            tags: { type: Sequelize.TEXT },
            specCode: { type: Sequelize.STRING },
            thumbnailUrl: { type: Sequelize.STRING },
            mdContent: { type: Sequelize.TEXT('long') },
            createdAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updatedAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Posts');
    }
};