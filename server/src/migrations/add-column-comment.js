module.exports = {
    up: function (queryInterface, Sequelize) {
        // logic for transforming into the new state
        return Promise.all([
            queryInterface.addColumn(
                'Comments',
                'like',
                Sequelize.INTEGER,
                { defaultValue: 0 }
            ),
            queryInterface.addColumn(
                'Comments',
                'dislike',
                Sequelize.INTEGER,
                { defaultValue: 0 }
            )
        ])

    },

    down: function (queryInterface, Sequelize) {
        // logic for reverting the changes
        return Promise.all([
            queryInterface.removeColumn(
                'Comments',
                'like'
            ),
            queryInterface.removeColumn(
                'Comments',
                'dislike'
            )
        ])
    }
}