import { createClientesValidation, updateClientesValidation } from '../validation/clientesVAlidation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'

export class ClienteControllers {
    constructor({ ModelCliente }) {
        this.modelCliente = ModelCliente
    }

    acctionsCliente = async (req, res) => {

        if (!req.session) return ValidationResponse.Denied({ message: MessagePersonalise.errorSession('Inicie Session') })
        console.log(req.body)

        const { acction, data } = req.body

        let resultValiaton;
        let sendValidation;

        if (acction === 'C') {
            resultValiaton = createClientesValidation(data)
            console.log(resultValiaton)
            if (!resultValiaton.success) {
                sendValidation = ValidationResponse.Denied(MessagePersonalise.DataEmpty({ message: MessagePersonalise.DataEmpty('Llene todos los datos') }))
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }
            console.log(resultValiaton)
            sendValidation = await this.modelCliente.creatCliente({ data })
            console.log(sendValidation)
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }

        if (acction === 'U') {
            resultValiaton = updateClientesValidation(data)
            console.log(resultValiaton.error)
            if (!resultValiaton.success) {
                sendValidation = ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('ID') })
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }
            sendValidation = await this.modelCliente.updateCliente({ data: data })
            console.log(sendValidation)
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }

        console.log('Entrando aqui')
        if (acction === 'V') {

            sendValidation = await this.modelCliente.viewAllClient()
            console.log(sendValidation)
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }



    }
}