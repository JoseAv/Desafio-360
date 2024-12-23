import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'
import { Sequelize } from 'sequelize'
import { sequelize } from '../db/sequelize.js'

export class ModelCategory {

    static creatCategory = async ({ data }) => {
        let newNombre = data.nombre.toLowerCase()

        try {
            const nameRepited = await sequelize.query('SELECT  1 from categoria_productos r where nombre =  :nombre', {
                replacements: { nombre: newNombre },
                type: Sequelize.QueryTypes.SELECT
            })

            if (nameRepited.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('category') })

            await sequelize.query('exec insert_categoria_productos :id_usuario,:nombre :id_estados', {
                replacements: {
                    id_usuario: data.id_usuario,
                    nombre: newNombre,
                    id_estados: data.id_estados
                },
                type: sequelize.QueryTypes.SELECT
            })

            return ValidationResponse.Accepted(MessagePersonalise.dataSuccessful('category'))

        } catch (error) {
            return ValidationResponse.Denied(MessagePersonalise.failPeticion('category'), error)
        }
    }

    static updateCategory = async ({ data }) => {
        let newNombre = data.nombre.toLowerCase()
        console.log(newNombre)
        try {
            const nameRepited = await sequelize.query('SELECT  sp_uptdate_categoria_productos from rol r where id =  :id', {
                replacements: { id: data.id },
                type: Sequelize.QueryTypes.SELECT
            })

            if (!nameRepited.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.dataNotExisting('category') })

            await sequelize.query('EXEC  sp_uptdate_categoria_productos :id,:id_usuario,:nombre,:id_estados', {
                replacements: {
                    id: data.id,
                    id_usuario: data.id_usuario,
                    nombre: newNombre,
                    id_estados: data.id_estados
                },
                type: Sequelize.QueryTypes.SELECT
            })

            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('category') })

        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('category'), error: error })
        }
    }




}