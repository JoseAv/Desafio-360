import { z } from 'zod'



const userValidation = z.object({
    id: z.number().int(),
    id_rol: z.number().int(),
    id_estados: z.number().int(),
    correo_electronico: z.string().email('No es un email Valido'),
    nombre_completo: z.string().min(1, { message: 'Este campo no puede ir vacio' }),
    password: z.string(),
    telefono: z.string(),
    fecha_nacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    id_cliente: z.number().int()
})



export const createUser = (data) => {
    let newSchema = userValidation.partial({
        id: z.number().int().optional(),
        id_cliente: z.number().int().optional(),
        id_rol: z.number().int().optional(),
        id_estados: z.number().int().optional()
    })
    return newSchema.safeParse(data)

}

export const updateUserValidation = (data) => {
    console.log('dentro de validacion', data)
    let newSchema = userValidation.partial()
    let resultado = newSchema.safeParse(data)

    return resultado
}


export const ComprobateUser = (data) => {
    let newSchema = userValidation.partial({ id: z.number().int() })
    return newSchema.safeParse(data)
}