import { ordenesValidation, updateOrdenesValidation, updateproductos, createproductos } from '../validation/ordenValidation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'

export class OrdenControllers {
    constructor({ ModelOrden }) {
        this.modelOrden = ModelOrden
    }

    acctionsOrden = async (req, res) => {
        let resultValiaton;
        let sendValidation;
        let resultProductos;
        const { acction, data, productos } = req.body

        if (acction === 'C') {
            resultValiaton = ordenesValidation(data)
            resultProductos = createproductos(productos)

            if (!resultValiaton.success || !resultProductos.success) {
                sendValidation = ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Datos o productos') })
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }

            sendValidation = await this.modelOrden.createOrden({ data, productos })
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }


        if (acction === 'U') {
            resultValiaton = updateOrdenesValidation(data)
            if (!resultValiaton.success) {
                sendValidation = ValidationResponse.Denied(MessagePersonalise.dataNotExisting({ message: MessagePersonalise.DataEmpty('Datos o productos') }))
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }
            sendValidation = await this.modelOrden.updateOrden({ data: data })
            return res.status(sendValidation.statusCode).json({ ...sendValidation })

        }
    }
}