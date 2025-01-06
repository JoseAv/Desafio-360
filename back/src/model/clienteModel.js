import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'
import { Sequelize } from 'sequelize'
import { sequelize } from '../db/sequelize.js'

export class ModelCliente {

    static creatCliente = async ({ data }) => {
        console.log('Datos inicio de clienteVF', data)


        try {

            await sequelize.query('exec insert_cliente  :razon_social,:nombre_comercial, :dirrecion_entrega,:telefono,:email', {
                replacements: {
                    razon_social: data.razon_social,
                    nombre_comercial: data.nombre_comercial,
                    dirrecion_entrega: data.dirrecion_entrega,
                    telefono: data.telefono,
                    email: data.email
                },
                type: sequelize.QueryTypes.SELECT
            })

            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('Cliente') })

        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('Cliente'), error: error })
        }
    }

    static updateCliente = async ({ data }) => {
        try {
            await sequelize.query('EXEC  sp_update_cliente :id,:razon_social,:nombre_comercial,:dirrecion_entrega,:telefono,:email, :id_estados', {
                replacements: {
                    id: data.id,
                    razon_social: data.razon_social ?? null,
                    nombre_comercial: data.nombre_comercial ?? null,
                    dirrecion_entrega: data.dirrecion_entrega ?? null,
                    telefono: data.telefono ?? null,
                    email: data.email ?? null,
                    id_estados: data.id_estados ?? null
                },
                type: Sequelize.QueryTypes.SELECT
            })

            return ValidationResponse.Accepted({ message: MessagePersonalise.dataUpdateSuccessful('Cliente') })

        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('Cliente'), error: error })
        }
    }

    static viewAllClient = async () => {
        try {
            const newData = await sequelize.query('SELECT * from clientes c ', {
                type: sequelize.QueryTypes.SELECT
            })

            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('Cliente'), dataQuery: newData })
        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('Cliente'), error: error })
        }

    }


}