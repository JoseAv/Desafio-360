import { ordenesValidation, updateOrdenesValidation, updateproductos, createproductos } from '../validation/ordenValidation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'

export class OrdenControllers {
    constructor({ ModelOrden }) {
        this.modelOrden = ModelOrden
    }

    acctionsOrden = async (req, res) => {
        let resultData;
        let sendValidation;
        let resultProductos;
        const { acction, data, productos } = req.body

        if (acction === 'C') {
            resultData = ordenesValidation(data)
            resultProductos = createproductos(productos)

            if (!resultData.success || !resultProductos.success) {
                sendValidation = ValidationResponse.Denied(MessagePersonalise.DataEmpty({ message: MessagePersonalise.DataEmpty('Datos o productos') }))
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }

            sendValidation = await this.modelOrden.createOrden({ data, productos })
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }


        if (acction === 'U') {
            resultValiaton = updateClientesValidation(data)
            console.log(resultValiaton)
            if (!resultValiaton.success) {
                sendValidation = ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('ID') })
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }
            sendValidation = await this.modelOrden.updateOrden({ nombre: data.nombre, id: data.id })
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }
    }
}