
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'
import { Sequelize } from 'sequelize'
import { sequelize } from '../db/sequelize.js'


export class ModelOrden {

    static createOrden = async ({ data }) => {
        try {
            const nameRepited = await sequelize.query('SELECT 1 from orden r where email =  :email', {
                replacements: { email: data, email },
                type: Sequelize.QueryTypes.SELECT
            })
            if (nameRepited.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('category') })
            await sequelize.query('exec nsert_cliente  :razon_social,:nombre_comercial :direccion_entrega,:telefono,:email', {
                replacements: {
                    razon_social: data.razon_social,
                    nombre_comercial: data.nombre_comercial,
                    direccion_entrega: data.direccion_entrega,
                    telefono: data.telefono,
                    email: data.email
                },
                type: sequelize.QueryTypes.SELECT
            })
            return ValidationResponse.Accepted(MessagePersonalise.dataSuccessful('Cliente'))
        } catch (error) {
            return ValidationResponse.Denied(MessagePersonalise.failPeticion('Cliente'), error)
        }
    }

    static updateOrden = async ({ data }) => {
        try {
            const nameRepited = await sequelize.query('SELECT  sp_uptdate_categoria_productos from rol r where id =  :id', {
                replacements: { id: data.id },
                type: Sequelize.QueryTypes.SELECT
            })
            if (!nameRepited.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.dataNotExisting('Cliente') })
            await sequelize.query('EXEC  sp_update_cliente :id,:razon_social,:nombre_comercial,:dirrecion_entrega,:telefono,:email', {
                replacements: {
                    id: data.id,
                    razon_social: data.razon_social,
                    nombre_comercial: data.nombre_comercial,
                    dirrecion_entrega: data.dirrecion_entrega,
                    telefono: data.telefono,
                    email: data.email
                },
                type: Sequelize.QueryTypes.SELECT
            })
            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('Cliente') })

        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('Cliente'), error: error })
        }
    }


}