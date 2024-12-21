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

            if (nameRepited.length > 0) return ValidationResponse.Denied(MessagePersonalise.DataEmpty('Rol'))

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
        try {
            const nameRepited = await sequelize.query('SELECT  1 from rol r where id =  :id', {
                replacements: { id: id },
                type: Sequelize.QueryTypes.SELECT
            })
            if (!nameRepited.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.dataNotExisting('Rol') })

            await sequelize.query('exec update_rol :id :nombre', {
                replacements: {
                    id,
                    nombre: newNombre
                },
                type: sequelize.QueryTypes.SELECT
            })

            return ValidationResponse.Accepted(MessagePersonalise.dataSuccessful('Rol'))

        } catch (error) {
            return ValidationResponse.Denied(MessagePersonalise.failPeticion('Rol'), error)
        }
    }




}