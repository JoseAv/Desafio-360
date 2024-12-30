import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'
import { sequelize } from '../db/sequelize.js'


export class ModelOrden {

    static createOrden = async ({ data, productos }) => {

        try {
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



            const ValidateStock = calculateProducts.filter((ele) => ele.stock < 0)
            if (ValidateStock.length) return ValidationResponse.Denied({ message: MessagePersonalise.maxLimit(ValidateStock) })
            return ValidationResponse.Accepted(MessagePersonalise.failPeticion('Orden'), error)

        } catch (error) {
            return ValidationResponse.Denied(MessagePersonalise.failPeticion('Orden'), error)
        }
    }

}

