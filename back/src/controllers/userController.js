import { createUser, updateUserValidation, ComprobateUser } from '../validation/userValitation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'
import jwt from 'jsonwebtoken'

const SecretePass = 'secreto no dejarlo aqui pero es solo para hacer pruebas luego hay que pasrlo a variables de entorno'
export class ControllersUser {
    constructor({ ModelUsers }) {
        this.userModel = ModelUsers
    }

    login = async (req, res) => {

        if (!ComprobateUser(req.body).success) return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Datos Incorrecto') })
        const loginUser = await this.userModel.login({ data: req.body })
        if (!loginUser.success) return res.status(loginUser.statusCode).json({ ...loginUser })
        console.log(loginUser)
        let token = jwt.sign(loginUser.dataQuery, SecretePass, { expiresIn: '1d' })
        return res.status(loginUser.statusCode).cookie('access_user', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000,
        }).json({ ...loginUser })

    }

    inSession = async (req, res) => {
        const data = req.session ?? null
        console.log('Datos de secion', data)
        return res.status(200).json({ ...data })
    }



    logout = async (req, res) => {
        res.clearCookie('access_user')
        res.status(200).json({ message: 'Cierre de sesion completado', success: true })
    }


    accionUser = async (req, res) => {

        if (!req.session) return ValidationResponse.Denied({ message: MessagePersonalise.errorSession('Dato correcto') })


        let sendValidation;
        const { acction, data } = req.body

        if (acction === "V") {

            sendValidation = await this.userModel.viewAllUSer()
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }

        if (acction === "VI") {

            if (!req.body.data || !req.body.data.id) return res.status(400).json({ message: 'Miss ID' })
            sendValidation = await this.userModel.viewOneUser({ id: data.id })
            return res.status(sendValidation.statusCode).json({ ...sendValidation })
        }

        if (acction === "C") {

            sendValidation = createUser(data)
            if (!sendValidation.success) return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Dato correcto') })
            const userCreate = await this.userModel.userCreate({ data: data })

            return res.status(userCreate.statusCode).json({ ...userCreate })
        }

        if (acction === "U") {

            const user = { id: req.session.id, ...req.body }
            if (!updateUserValidation(user).success) return res.status(400).json(ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Dato correcto') }))

            const userCreate = await this.userModel.updateUser({ data: user })
            return res.status(userCreate.statusCode).json({ ...userCreate })
        }


    }

}

