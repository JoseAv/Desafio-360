import { sequelize } from '../db/sequelize.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'
import bcrypt from 'bcrypt';


export class ModelUsers {

    static userCreate = async ({ data }) => {
        try {
            const validateEmail = await sequelize.query("select 1 from usuarios where correo_electronico = :correo_electronico", {
                replacements: { correo_electronico: data.correo_electronico },
                type: sequelize.QueryTypes.SELECT
            })

            if (validateEmail.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.dataExisting('Usuario') })

            const newPassword = await bcrypt.hash(data.password, 10)
            await sequelize.query("exec insert_usuario :id_rol, :id_estados, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento, :id_clientes", {
                replacements: {
                    id_rol: data.id_rol,
                    id_estados: data.id_estados ?? 1,
                    correo_electronico: data.correo_electronico,
                    nombre_completo: data.nombre_completo,
                    password: newPassword,
                    telefono: data.telefono,
                    fecha_nacimiento: data.fecha_nacimiento ?? "2024-12-31",
                    id_clientes: data.id_clientes,
                },
                type: sequelize.QueryTypes.SELECT

            })

            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('Usuario') })

        } catch (error) {
            console.log(error)
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion(error) })
        }
    }


    static updateUser = async ({ data }) => {

        let newPassword = null
        try {
            const validateEmail = await sequelize.query("select 1 from usuarios where id = :id", {
                replacements: { id: data.id },
                type: sequelize.QueryTypes.SELECT
            })


            if (!validateEmail.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.dataNotExisting('Usuario') })

            if (data.correo_electronico) {
                const newValidationEmail = await sequelize.query("select 1 from usuarios where correo_electronico = :correo_electronico", {
                    replacements: { correo_electronico: data.correo_electronico },
                    type: sequelize.QueryTypes.SELECT
                })
                if (newValidationEmail.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.dataExisting('Correo Electronico') })
            }
            if (data.password) {
                newPassword = await bcrypt.hash(data.password, 10)
            }

            const newData = data.data
            await sequelize.query("exec sp_update_usuarios :id, :id_rol, :id_estados, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento, :id_clientes", {
                replacements: {
                    id: newData.id,
                    id_rol: newData.id_rol ?? null,
                    id_estados: newData.id_estados ?? null,
                    correo_electronico: newData.correo_electronico ?? null,
                    nombre_completo: newData.nombre_completo ?? null,
                    password: newPassword ?? null,
                    telefono: newData.telefono ?? null,
                    fecha_nacimiento: newData.fecha_nacimiento ?? null,
                    id_clientes: newData.id_clientes ?? null,
                },
                type: sequelize.QueryTypes.SELECT

            })
            return ValidationResponse.Accepted({ message: MessagePersonalise.dataUpdateSuccessful('Usuario') })

        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion(error) })
        }
    }

    static login = async ({ data }) => {
        try {
            const validateEmail = await sequelize.query("select password,id,id_rol,id_estados from usuarios where correo_electronico = :correo_electronico", {
                replacements: { correo_electronico: data.correo_electronico },
                type: sequelize.QueryTypes.SELECT
            })
            console.log('Datos data base', validateEmail)

            if (!validateEmail.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.dataNotExisting('Usuario') })

            const hashedPassword = validateEmail[0]?.password;
            const comparePassword = await bcrypt.compare(data.password, hashedPassword);
            if (!comparePassword) return ValidationResponse.Denied(MessagePersonalise.errorPassword());


            return ValidationResponse.Accepted({ message: MessagePersonalise.passUSer(), dataQuery: { correo_electronico: data.correo_electronico, id: validateEmail[0].id, rol: validateEmail[0].id_rol, id_estados: validateEmail[0].id_estados } })

        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion(error) })
        }

    }


    static viewAllUSer = async () => {
        try {
            const user = await sequelize.query(
                `SELECT 
                u.id ,u.nombre_completo, u.id_estados ,u.correo_electronico, u.telefono, c.razon_social, c.nombre_comercial from usuarios u
                inner join clientes c
                on c.id = u.id_clientes  `
                , {
                    type: sequelize.QueryTypes.SELECT
                })
            return ValidationResponse.Accepted({ message: MessagePersonalise.SuccesMessage('User'), dataQuery: user })

        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion(error), error: error })

        }
    }


    static viewOneUser = async ({ id }) => {
        try {
            const user = await sequelize.query(`SELECT * from usuarios u where id = :id`, {
                replacements: { id: id },
                type: sequelize.QueryTypes.SELECT
            })

            return ValidationResponse.Accepted({ message: MessagePersonalise.SuccesMessage('User'), dataQuery: user })

        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion(error), error: error })

        }
    }

}


