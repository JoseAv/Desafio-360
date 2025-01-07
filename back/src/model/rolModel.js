import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'
import { Sequelize } from 'sequelize'
import { sequelize } from '../db/sequelize.js'

export class ModelRol {

    static createRol = async ({ nombre }) => {
        let newNombre = nombre.toLowerCase()

        try {
            const nameRepited = await sequelize.query('SELECT  1 from rol r where nombre =  :nombre', {
                replacements: { nombre: newNombre },
                type: Sequelize.QueryTypes.SELECT
            })

            if (nameRepited.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Rol') })

            await sequelize.query('exec insert_rol :nombre', {
                replacements: { nombre: newNombre },
                type: sequelize.QueryTypes.SELECT
            })

            return ValidationResponse.Accepted(MessagePersonalise.dataSuccessful('Rol'))

        } catch (error) {
            return ValidationResponse.Denied(MessagePersonalise.failPeticion('Rol'), error)
        }
    }

    static updateRol = async ({ nombre, id }) => {
        let newNombre = nombre.toLowerCase()
        console.log(newNombre)
        try {
            const nameRepited = await sequelize.query('SELECT  nombre from rol r where id =  :id', {
                replacements: { id: id },
                type: Sequelize.QueryTypes.SELECT
            })

            if (!nameRepited.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.dataNotExisting('Rol') })

            let resultados = await sequelize.query('EXEC  update_rol :id,:nombre', {
                replacements: {
                    id: id,
                    nombre: newNombre
                },
                type: Sequelize.QueryTypes.SELECT
            })

            console.log('Resultados', resultados)
            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('Rol') })

        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('Rol'), error: error })
        }
    }


    static viewAllRol = async () => {
        try {

            const rol = await sequelize.query('select * from rol', {
                type: Sequelize.QueryTypes.SELECT
            })
            console.log(rol)

            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('Rol'), dataQuery: rol })
        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('Rol'), error: error })
        }



    }




}