import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'
import { sequelize } from '../db/sequelize.js'


export class ModelOrden {

    static createOrden = async ({ data, productos }) => {

        try {
            // Validaciones de si existe el id y si hay stock
            const idProducts = productos.map(p => p.id_productos)
            const productData = await sequelize.query(
                'SELECT id, nombre, stock, precio FROM productos WHERE id IN (:ids)',
                {
                    replacements: { ids: idProducts },
                    type: sequelize.QueryTypes.SELECT,

                }
            )
            const idsProductData = productData.map(p => p.id)
            const existingProducts = idProducts.filter((ids) => !idsProductData.includes(ids))
            if (existingProducts.length) return ValidationResponse.Denied({ message: MessagePersonalise.idProductNotValit(existingProducts) })


            const calculateProducts = productData.map((product) => {
                const stockInfo = productos.find(stock => stock.id_productos === product.id);
                if (stockInfo) {
                    product.stock = product.stock - stockInfo.cantidad;
                    if (product.total) {
                        product.total = product.total + (product.precio * stockInfo.cantidad)
                        product.cantidad = stockInfo.cantidad
                    } else {
                        product.total = (product.precio * stockInfo.cantidad)
                        product.cantidad = stockInfo.cantidad
                    }
                }
                return product;
            })

            // crear orden para obtener el id
            const ValidateStock = calculateProducts.filter((ele) => ele.stock < 0)
            if (ValidateStock.length) return ValidationResponse.Denied({ message: MessagePersonalise.maxLimit(ValidateStock) })

            let totalOrden = calculateProducts.reduce((acc, pro) => acc + pro.total, 0);
            const id_orden = await sequelize.query(
                `EXEC sp_create_orden 
                :id_usuario, :nombre_completo,:direccion,
                :telefono,:correo_electronico,:fecha_entrega, 
                :total_orden`,
                {
                    replacements: {
                        id_usuario: data.id_usuario,
                        nombre_completo: data.nombre_completo,
                        direccion: data.direccion,
                        telefono: data.telefono,
                        correo_electronico: data.correo_electronico,
                        fecha_entrega: data.fecha_entrega,
                        total_orden: totalOrden
                    },
                    type: sequelize.QueryTypes.SELECT,
                }
            )
            // crear detalle de orden y estado y stock
            let changeStock = calculateProducts.map(async (pro) => {
                return sequelize.query(
                    'EXEC sp_create_detail_orden :id_orden, :id_productos, :cantidad, :precio, :subtotal',
                    {
                        replacements: {
                            id_orden: id_orden[0].id_orden,
                            id_productos: pro.id,
                            cantidad: pro.cantidad,
                            precio: pro.precio,
                            subtotal: pro.total
                        },
                        type: sequelize.QueryTypes.SELECT,
                    }
                )
            })
            await Promise.all(changeStock)
            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('Orden') })

        } catch (error) {
            console.log(error)
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('Orden'), error: error })
        }
    }

    static updateOrden = async ({ data }) => {
        console.log('Entrada datos', data)
        try {

            await sequelize.query(
                `EXEC  sp_update_orden
                :id, :nombre_completo,
                :direccion, :telefono, :correo_electronico
                `,
                {
                    replacements: {
                        id: data.id ?? null,
                        nombre_completo: data.nombre_completo ?? null,
                        direccion: data.direccion ?? null,
                        telefono: data.telefono ?? null,
                        correo_electronico: data.correo_electronico ?? null,
                    },
                    type: sequelize.QueryTypes.SELECT
                })

            return ValidationResponse.Accepted({ message: MessagePersonalise.dataUpdateSuccessful(' Orden') })
        } catch (error) {
            console.log('Errores    ', error)
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion('Update Orden'), error: error })
        }


    }


}

