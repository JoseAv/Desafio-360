import { z } from 'zod'

const categoryValidation = z.object({
    id: z.number().int(),
    id_usuario: z.number().int(),
    id_estados: z.number().int(),
    nombre: z.string(),
})

export const createcategoryValidation = (data) => {
    const validation = categoryValidation.partial().extend({ nombre: z.string() })
    return validation.safeParse(data)
}

export const updatecategoryValidation = (data) => {
    return categoryValidation.safeParse(data)
}

