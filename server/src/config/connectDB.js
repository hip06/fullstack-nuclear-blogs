import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('nuclear', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    plain: true,
    timezone: '+07:00'
});

export default async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}