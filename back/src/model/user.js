import { sequelize } from '../db/sequelize.js'

export class ModelUsers {

    static userRead = async () => {

        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
        return
    }


    static userCreate = async ({ data }) => {
        return 'Crear nuevo usuario'
    }


}


