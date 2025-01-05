import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'
import { Sequelize } from 'sequelize'
import { sequelize } from '../db/sequelize.js'

export class ModelProducts {


    static createProducts = async ({ data }) => {
        let newNombre = data.nombre.toLowerCase()
        try {
            const nameRepited = await sequelize.query('SELECT  * from productos where nombre =  :nombre', {
                replacements: { nombre: newNombre },
                type: sequelize.QueryTypes.SELECT
            })
            console.log(nameRepited)
            if (nameRepited.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('products') })

            await sequelize.query('exec insert_producto :id_categorias, :id_usuarios, :nombre, :marca, :codigo, :id_estados, :precio, :foto, :stock', {
                replacements: {
                    id_categorias: data.id_categorias,
                    id_usuarios: data.id_usuarios,
                    nombre: newNombre,
                    marca: data.marca,
                    codigo: data.codigo,
                    id_estados: data.id_estados ?? 1,
                    precio: data.precio,
                    foto: data.fotoUrl ?? null,
                    stock: data.stock
                },
                type: sequelize.QueryTypes.SELECT
            })

            console.log

            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('producto') })

        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('producto'), error: error })
        }
    }


    static updateProducts = async ({ data }) => {
        console.log(data)

        let newNombre = data.nombre.toLowerCase()
        try {
            const nameRepited = await sequelize.query('SELECT  * from productos where id =  :id', {
                replacements: { id: data.id },
                type: sequelize.QueryTypes.SELECT
            })
            console.log(nameRepited)
            if (!nameRepited.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.dataNotExisting('products') })

            await sequelize.query('exec update_producto :id, :id_categorias, :id_usuarios, :nombre, :marca, :codigo, :id_estados, :precio, :foto, :stock', {
                replacements: {
                    id: data.id,
                    id_categorias: data.id_categorias ?? null,
                    id_usuarios: data.id_usuarios,
                    nombre: newNombre,
                    marca: data.marca,
                    codigo: data.codigo,
                    id_estados: data.id_estados ?? null,
                    precio: data.precio,
                    foto: data.fotoUrl ?? null,
                    stock: data.stock
                },
                type: sequelize.QueryTypes.SELECT
            })



            return ValidationResponse.Accepted({ message: MessagePersonalise.dataUpdateSuccessful('producto') })

        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('producto'), error: error })
        }
    }



}