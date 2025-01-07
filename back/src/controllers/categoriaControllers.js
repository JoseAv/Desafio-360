import { createcategoryValidation, updatecategoryValidation } from '../validation/categoriaValidation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'

export class CategoryControllers {
    constructor({ ModelCategory }) {
        this.modelCategory = ModelCategory
    }

    acctionsCategory = async (req, res) => {
        if (!req.session) return ValidationResponse.Denied({ message: MessagePersonalise.errorSession('Inicie Session') })

        const { acction, data } = req.body
        let resultValiaton;
        let sendValidation;

        if (acction === 'C') {
            data.id_usuario = req.session.id ?? null
            resultValiaton = createcategoryValidation(data)
            console.log(resultValiaton)
            if (!resultValiaton.success) {
                sendValidation = ValidationResponse.Denied(MessagePersonalise.DataEmpty({ message: MessagePersonalise.DataEmpty('Nombre') }))
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }
            sendValidation = await this.modelCategory.creatCategory({ data: data })
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }

        if (acction === 'U') {
            resultValiaton = updatecategoryValidation(data)
            if (!resultValiaton.success) {
                sendValidation = ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('ID') })
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }
            sendValidation = await this.modelCategory.updateCategory({ data: data })
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }

        if (acction === "V") {

            sendValidation = await this.modelCategory.viewCategory()
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }

        if (acction === "VI") {
            if (!data.id) {
                sendValidation = ValidationResponse.Denied(MessagePersonalise.DataEmpty({ message: MessagePersonalise.DataEmpty('ID') }))
                return res.status(sendValidation.statusCode).json({ ...sendValidation })
            }

            sendValidation = await this.modelCategory.viewOneCategory({ id: data.id })
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }



    }
}