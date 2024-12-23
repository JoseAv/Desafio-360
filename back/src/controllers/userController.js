import { createUser, updateUserValidation, ComprobateUser } from '../validation/userValitation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'



export class ControllersUser {
    constructor({ ModelUsers }) {
        this.userModel = ModelUsers
    }

    login = (req, res) => {
        res.json(req.body)

    }

    register = async (req, res) => {

        if (!createUser(req.body).success) return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Dato correcto') })
        const userCreate = await this.userModel.userCreate({ data: req.body })

        return res.status(userCreate.statusCode).json({ ...userCreate })
    }


    updateUser = async (req, res) => {

        const user = { id: Number(req.params.id), ...req.body }
        if (!updateUserValidation(user).success) return res.status(400).json(ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Dato correcto') }))
        const userCreate = await this.userModel.updateUser({ data: user })

        return res.status(userCreate.statusCode).json({ ...userCreate })
    }


    login = async (req, res) => {

        if (!createUser(req.body).success) return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Dato correcto') })
        const userCreate = await this.userModel.userCreate({ data: req.body })

        return res.status(userCreate.statusCode).json({ ...userCreate })
    }

}

