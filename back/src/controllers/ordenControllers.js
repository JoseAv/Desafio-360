import { ordenesValidation, updateOrdenesValidation, updateproductos, createproductos } from '../validation/ordenValidation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'

export class OrdenControllers {
    constructor({ ModelOrden }) {
        this.modelOrden = ModelOrden
    }

    acctionsOrden = async (req, res) => {
        if (!req.session) return ValidationResponse.Denied({ message: MessagePersonalise.errorSession('Inicie Session') })


        let resultValiaton;
        let sendValidation;
        let resultProductos;
        const { acction, data, productos } = req.body
        data.id_usuario = req.session.id
        if (acction === 'C') {

            resultValiaton = ordenesValidation(data)
            resultProductos = createproductos(productos)
            if (!resultValiaton.success) {
                sendValidation = ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Datos o productos') })
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }

            sendValidation = await this.modelOrden.createOrden({ data, productos })
            console.log(sendValidation)
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


        if (acction === 'V') {
            sendValidation = await this.modelOrden.viewAllOrden()
            return res.status(sendValidation.statusCode).json({ ...sendValidation })

        }

        if (acction === "VV") {
            console.log('Entrada qui')
            sendValidation = await this.modelOrden.viewClientOrden({ id: data.id_usuario })
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }

        if (acction === "VP") {

            sendValidation = await this.modelOrden.viewProductsOrden({ id: data.id })
            console.log(sendValidation)
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }


    }
}