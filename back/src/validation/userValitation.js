import { z } from 'zod'



const userValidation = z.object({
    id: z.number().int().optional(),
    id_rol: z.number().int(),
    id_estados: z.number().int().optional(),
    correo_electronico: z.string().email('No es un email Valido'),
    nombre_completo: z.string().min(1, { message: 'Este campo no puede ir vacio' }),
    password: z.string(),
    telefono: z.string().length(8, "El numero debe de ser de 8 caracteres"),
    fecha_nacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    id_clientes: z.number().int()
})


const userLogin = z.object({
    correo_electronico: z.string().email('No es un email Valido'),
    password: z.string(),
})



export const createUser = (data) => {
    return userValidation.safeParse(data)

}

export const updateUserValidation = (data) => {
    let newSchema = userValidation.partial()
    let resultado = newSchema.safeParse(data)
    return resultado
}


export const ComprobateUser = (data) => {
    return userLogin.safeParse(data)
}