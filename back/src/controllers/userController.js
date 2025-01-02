import { createUser, updateUserValidation, ComprobateUser } from '../validation/userValitation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'
import jwt from 'jsonwebtoken'

const SecretePass = 'secreto no dejarlo aqui pero es solo para hacer pruebas luego hay que pasrlo a variables de entorno'
export class ControllersUser {
    constructor({ ModelUsers }) {
        this.userModel = ModelUsers
    }

    register = async (req, res) => {
        if (!req.session) return ValidationResponse.Denied({ message: MessagePersonalise.errorSession('Dato correcto') })

        if (!createUser(req.body).success) return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Dato correcto') })
        const userCreate = await this.userModel.userCreate({ data: req.body })

        return res.status(userCreate.statusCode).json({ ...userCreate })
    }


    updateUser = async (req, res) => {
        if (!req.session) {
            let ressionValidation = ValidationResponse.Denied({ message: MessagePersonalise.errorSession() })
            return res.status(ressionValidation.statusCode).json({ ...ressionValidation })
        }

        const user = { id: Number(req.params.id), ...req.body }
        if (!updateUserValidation(user).success) return res.status(400).json(ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Dato correcto') }))
        const userCreate = await this.userModel.updateUser({ data: user })

        return res.status(userCreate.statusCode).json({ ...userCreate })
    }


    login = async (req, res) => {
        if (!ComprobateUser(req.body).success) return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Datos Incorrecto') })
        const loginUser = await this.userModel.login({ data: req.body })
        let token = jwt.sign(loginUser.dataQuery, SecretePass, { expiresIn: '1d' })
        return res.status(loginUser.statusCode).cookie('access_user', token).json({ ...loginUser })
    }


    logout = async (req, res) => {
        res.clearCookie('access_user')
        res.status(200).json({ message: 'Cierre de sesion completado', success: true })
    }

}

