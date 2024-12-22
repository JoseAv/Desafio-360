import { z } from 'zod'



const userVAlidation = z.object({
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
    let newSchema = userVAlidation.partial({
        correo_electronico: z.string().email('No es un email Valido'),
        nombre_completo: z.string().min(1, { message: 'Este campo no puede ir vacio' }),
        password: z.string(),
        telefono: z.string(),
        fecha_nacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    })
    return newSchema.safeParse(data)
}

export const updateUser = (data) => {
    let newSchema = userVAlidation.partial({ id: z.number().int() })
    return newSchema.safeParse(data)
}


export const ComprobateUser = (data) => {
    let newSchema = userVAlidation.partial({ id: z.number().int() })
    return newSchema.safeParse(data)
}