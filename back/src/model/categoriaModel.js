import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'
import { Sequelize } from 'sequelize'
import { sequelize } from '../db/sequelize.js'

export class ModelCategory {

    static creatCategory = async ({ data }) => {
        let newNombre = data.nombre?.toLowerCase() ?? null
        console.log(data)

        try {
            const nameRepited = await sequelize.query('SELECT  1 from categoria_productos r where nombre =  :nombre', {
                replacements: { nombre: newNombre },
                type: Sequelize.QueryTypes.SELECT
            })

            if (nameRepited.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('category') })

            await sequelize.query('exec insert_categoria_productos :id_usuario,:nombre, :id_estados', {
                replacements: {
                    id_usuario: data.id_usuario,
                    nombre: newNombre,
                    id_estados: data.id_estados ?? 1
                },
                type: sequelize.QueryTypes.SELECT
            })

            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('category') })

        } catch (error) {
            console.log(error)
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('category'), error: error })
        }
    }

    static updateCategory = async ({ data }) => {
        let newNombre = data.nombre?.toLowerCase() ?? null
        try {
            const nameRepited = await sequelize.query('SELECT  1 from categoria_productos r where id =  :id', {
                replacements: { id: data.id },
                type: Sequelize.QueryTypes.SELECT
            })

            if (!nameRepited.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.dataNotExisting('category') })

            await sequelize.query('exec  sp_uptdate_categoria_productos :id,:id_usuario,:nombre,:id_estados', {
                replacements: {
                    id: data.id,
                    id_usuario: data?.id_usuario ?? null,
                    nombre: newNombre,
                    id_estados: data?.id_estados ?? null
                },
                type: Sequelize.QueryTypes.SELECT
            })

            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('category') })

        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('category'), error: error })
        }
    }


    static viewCategory = async () => {
        try {
            const categoria = await sequelize.query('select * from categoria_productos cp ')
            console.log(categoria)
            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('category'), dataQuery: categoria[0] })
        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('category'), error: error })
        }


    }


    static viewOneCategory = async ({ id }) => {

        try {
            const categoria = await sequelize.query('select * from categoria_productos cp where id = :id', {
                replacements: { id: id },
                type: sequelize.QueryTypes.SELECT
            })

            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('category'), dataQuery: categoria[0] })
        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('category'), error: error })
        }


    }


}