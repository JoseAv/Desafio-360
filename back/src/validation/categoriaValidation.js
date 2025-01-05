import { z } from 'zod'

const categoryValidation = z.object({
    id: z.number().int().optional(),
    id_usuario: z.number().int(),
    id_estados: z.number().int().optional(),
    nombre: z.string(),
})

export const createcategoryValidation = (data) => {
    return categoryValidation.safeParse(data)
}

export const updatecategoryValidation = (data) => {
    const validation = categoryValidation.pick({ nombre: true, id: true }).merge(
        categoryValidation.partial()
    );
    return validation.safeParse(data)
}

