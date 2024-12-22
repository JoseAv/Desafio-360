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
            resultValiaton = createRolValidation(data)
            if (!resultValiaton.success) {
                sendValidation = ValidationResponse.Denied(MessagePersonalise.DataEmpty({ message: MessagePersonalise.DataEmpty('Nombre') }))
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }
            sendValidation = await this.modelRol.createRol({ nombre: data.nombre })
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }



        if (acction === 'U') {
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






    }
}