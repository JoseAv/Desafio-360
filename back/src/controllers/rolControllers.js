import { createRolValidation, updateRolValidation } from '../validation/rolValidation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'

export class rolControllers {
    constructor({ ModelRol }) {
        this.modelRol = ModelRol
    }

    acctionsRol = async (req, res) => {
        const { acction, data } = req.body
        let resultValiaton;
        let sendValidation;


        if (acction === 'C') {
            if (!req.session && req.session.id === 1) return ValidationResponse.Denied({ message: MessagePersonalise.errorSession('Dato correcto') })
            resultValiaton = createRolValidation(data)
            if (!resultValiaton.success) {
                sendValidation = ValidationResponse.Denied(MessagePersonalise.DataEmpty({ message: MessagePersonalise.DataEmpty('Nombre') }))
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }
            sendValidation = await this.modelRol.createRol({ nombre: data.nombre })
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }



        if (acction === 'U') {
            if (!req.session && req.session.id === 1) return ValidationResponse.Denied({ message: MessagePersonalise.errorSession('Dato correcto') })
            resultValiaton = updateRolValidation(data)
            console.log(resultValiaton)
            if (!resultValiaton.success) {
                sendValidation = ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('ID') })
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }
            sendValidation = await this.modelRol.updateRol({ nombre: data.nombre, id: data.id })
            console.log(sendValidation)
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }


        if (acction === 'V') {
            if (!req.session && req.session.id === 1) return ValidationResponse.Denied({ message: MessagePersonalise.errorSession('Dato correcto') })
            console.log("Entrada aqui")
            sendValidation = await this.modelRol.viewAllRol()
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }
    }
}