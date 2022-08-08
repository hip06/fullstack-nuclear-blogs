'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Notices', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            from: {
                type: Sequelize.STRING
            },
            to: {
                type: Sequelize.STRING
            },
            typeCode: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: 'Pending'
            },
            createdAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updatedAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Notices');
    }
};