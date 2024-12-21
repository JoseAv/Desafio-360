import { sequelize } from '../db/sequelize.js'

export class ModelUsers {

    static userRead = async () => {

        try {
            await sequelize.authenticate();
        } catch (error) {
        }
        return
    }


    static userCreate = async ({ data }) => {
        return 'Crear nuevo usuario'
    }


}


