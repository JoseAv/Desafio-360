import { updateUserValidation, CreateUserValidation } from '../validation/stateValidation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'

export class ControllersStates {
    constructor({ ModelState }) {
        this.model = ModelState
    }


    accionStates = async (req, res) => {
        const { acction, data } = req.body

        if (acction === "R") {
            this.model.statesRead()
        }

        if (acction === "C") {
            let resultCreate = CreateUserValidation(data)
            if (!resultCreate.success) {
                let resulValidation = ValidationResponse.Denied(MessagePersonalise.DataEmpty('Nombre'))
                return res.status(resulValidation.statusCode).json({ ...resulValidation })
            }

            let result = await this.model.createStates({ name: data.name })
            if (!result.success) return res.status(result.statusCode).json({ message: result.message, error: result.error })
            res.status(result.statusCode).json({ message: result.message })
        }

        if (acction === "U") {
            let resultUpdate = updateUserValidation(data)
            if (!resultUpdate.success) {
                let resulValidation = ValidationResponse.Denied(MessagePersonalise.DataEmpty('ID'))
                return res.status(resulValidation.statusCode).json({ ...resulValidation })
            }



            let result = await this.model.updateStates({ name: data.name, id: data.id })
            if (!result.success) return res.status(result.statusCode).json({ message: result.message, error: result.error })

            res.status(result.statusCode).json({ message: result.message })

        }






    }
}