import { updateUserValidation, CreateUserValidation } from '../validation/stateValidation'


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
            updateUserValidation(data)
            const result = await this.model.createStates({ name: data.name })
            if (result.success) {
                res.status(result.statusCode).json({ message: result.message })
            } else {
                res.status(result.statusCode).json({ message: result.message, error: result.error })
            }
        }


        if (acction === "U") {
            const result = await this.model.updateStates({ name: data.name, id: data.id })
            console.log(result)
            if (result.success) {
                res.status(result.statusCode).json({ message: result.message })
            } else {
                res.status(result.statusCode).json({ message: result.message, error: result.error })
            }
        }



    }



}