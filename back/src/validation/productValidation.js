import { z } from 'zod'

const productValidation = z.object({
    id: z.number().int().optional(),
    id_categorias: z.number().int().positive(),
    id_usuarios: z.number().int().positive().optional(),
    nombre: z.string(),
    marca: z.string(),
    codigo: z.string(),
    id_estados: z.number().int().positive().optional(),
    precio: z.number().positive(),
    stock: z.number().positive(),
})

export const createProductValidation = (data) => {
    return productValidation.safeParse(data)
}

export const updateProductValidation = (data) => {
    const validation = productValidation.pick({ id: true }).merge(productValidation.partial())
    return validation.safeParse(data)
}

