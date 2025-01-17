import { Sequelize } from 'sequelize'


export const sequelize = new Sequelize('GDA00337_OT_Jose_Arana', 'myuser', '123', {
    host: 'localhost',
    dialect: 'mssql',
    logging: console.log
})


