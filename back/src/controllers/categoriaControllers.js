import { createcategoryValidation, updatecategoryValidation } from '../validation/categoriaValidation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'

export class CategoryControllers {
    constructor({ ModelCategory }) {
        this.modelCategory = ModelCategory
    }

    acctionsCategory = async (req, res) => {
        const { acction, data } = req.body
        let resultValiaton;
        let sendValidation;


        if (acction === 'C') {
            resultValiaton = createcategoryValidation(data)
            if (!resultValiaton.success) {
                sendValidation = ValidationResponse.Denied(MessagePersonalise.DataEmpty({ message: MessagePersonalise.DataEmpty('Nombre') }))
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }
            sendValidation = await this.modelCategory.creatCategory({ nombre: data.nombre })
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }

        if (acction === 'U') {
            resultValiaton = updatecategoryValidation(data)
            console.log(resultValiaton)
            if (!resultValiaton.success) {
                sendValidation = ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('ID') })
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }
            sendValidation = await this.modelCategory.updateCategory({ nombre: data.nombre, id: data.id })
            console.log(sendValidation)
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }






    }
}