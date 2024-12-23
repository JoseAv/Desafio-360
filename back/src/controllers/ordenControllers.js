import { ordenesValidation, updateOrdenesValidation, updateproductos, createproductos } from '../validation/ordenValidation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'

export class ClienteControllers {
    constructor({ ModelCliente }) {
        this.modelCliente = ModelCliente
    }

    acctionsCliente = async (req, res) => {
        const { acction, data, productos } = req.body
        let resultValiaton;
        let sendValidation;


        if (acction === 'C') {
            resultValiaton = createClientesValidation(data)
            if (!resultValiaton.success) {
                sendValidation = ValidationResponse.Denied(MessagePersonalise.DataEmpty({ message: MessagePersonalise.DataEmpty('Nombre') }))
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }
            sendValidation = await this.modelCliente.creatCliente({ nombre: data.nombre })
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }





        if (acction === 'U') {
            resultValiaton = updateClientesValidation(data)
            console.log(resultValiaton)
            if (!resultValiaton.success) {
                sendValidation = ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('ID') })
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }
            sendValidation = await this.modelCliente.updateCategory({ nombre: data.nombre, id: data.id })
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }
    }
}