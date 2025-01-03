import { QueryTypes } from 'sequelize'
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
                    id_rol: data.id_rol ?? null,
                    id_estados: data.id_estados ?? 1,
                    correo_electronico: data.correo_electronico,
                    nombre_completo: data.nombre_completo,
                    password: newPassword,
                    telefono: data.telefono,
                    fecha_nacimiento: data.fecha_nacimiento,
                    id_clientes: data.id_clientes ?? null,
                },
                type: sequelize.QueryTypes.SELECT

            })

            return ValidationResponse.Accepted({ message: MessagePersonalise.dataSuccessful('Usuario') })

        } catch (error) {
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
                const validateEmail = await sequelize.query("select 1 from usuarios where correo_electronico = :correo_electronico", {
                    replacements: { correo_electronico: data.correo_electronico },
                    type: sequelize.QueryTypes.SELECT
                })
                if (validateEmail.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.dataExisting('Correo Electronico') })
            }
            if (data.password) {
                newPassword = await bcrypt.hash(data.password, 10)
            }
            await sequelize.query("exec sp_update_usuarios :id, :id_rol, :id_estados, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento, :id_clientes", {
                replacements: {
                    id: data.id,
                    id_rol: data.id_rol ?? null,
                    id_estados: data.id_estados ?? null,
                    correo_electronico: data.correo_electronico ?? null,
                    nombre_completo: data.nombre_completo ?? null,
                    password: newPassword ?? null,
                    telefono: data.telefono ?? null,
                    fecha_nacimiento: data.fecha_nacimiento ?? null,
                    id_clientes: data.id_clientes ?? null,
                },
                type: sequelize.QueryTypes.SELECT

            })
            return ValidationResponse.Accepted({ message: MessagePersonalise.dataUpdateSuccessful('Usuario') })

        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion(error) })
        }
    }

    static login = async ({ data }) => {
        console.log(data)
        try {
            const validateEmail = await sequelize.query("select password,id,id_rol from usuarios where correo_electronico = :correo_electronico", {
                replacements: { correo_electronico: data.correo_electronico },
                type: sequelize.QueryTypes.SELECT
            })


            if (!validateEmail.length > 0) return ValidationResponse.Denied({ message: MessagePersonalise.dataNotExisting('Usuario') })

            const hashedPassword = validateEmail[0]?.password;
            const comparePassword = await bcrypt.compare(data.password, hashedPassword);
            if (!comparePassword) return ValidationResponse.Denied(MessagePersonalise.errorPassword());


            return ValidationResponse.Accepted({ message: MessagePersonalise.passUSer(), dataQuery: { correo_electronico: data.correo_electronico, id: validateEmail[0].id, rol: validateEmail[0].id_rol } })

        } catch (error) {
            return ValidationResponse.Denied({ message: MessagePersonalise.failPeticion(error) })
        }

    }

}


