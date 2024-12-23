import { createProductValidation, updateProductValidation } from '../validation/productValidation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'

export class ControllerProducts {
    constructor({ ModelProducts }) {
        this.modelProducts = ModelProducts
    }


    accionProducts = async (req, res) => {
        const { acction, data } = req.body
        if (!req.session) return ValidationResponse.Denied({ message: MessagePersonalise.errorSession('Dato correcto') })

        if (acction === 'C') {
            let validationProducts = createProductValidation(data)
            if (!validationProducts.success) return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Dato correcto') })
            let newProducts = await this.modelProducts.createProducts({ data: data })
            return res.status(newProducts.statusCode).json({ ...newProducts })

        }

        if (acction === 'U') {
        }


    }


}