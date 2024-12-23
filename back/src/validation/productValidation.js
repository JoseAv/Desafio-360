import { intersection, z } from 'zod'

const productValidation = z.object({
    id_categorias: z.number().int().positive(),
    id_usuarios: z.number().int().positive(),
    nombre: z.string(),
    marca: z.string(),
    codigo: z.string(),
    id_estados: z.number().int().positive(),
    precio: z.number().positive(),
    foto: z.string(),
    stock: z.number().positive(),
})

export const createProductValidation = (data) => {
    const validation = productValidation.partial().extend({ nombre: z.string() })
    return validation.safeParse(data)
}

export const updateProductValidation = (data) => {
    return productValidation.safeParse(data)
}

