import { z } from 'zod'

const ordenValidation = z.object({
    id: z.number().int(),
    id_usuario: z.number().int(),
    id_estados: z.number().int(),
    nombre_completo: z.string(),
    direccion: z.string(),
    telefono: z.string(),
    correo_electronico: z.string().email(),
    fecha_entrega: z.string(),
    total_orden: z.number().positive(),
})

const productoSchema = z.object({
    id_productos: z.number().int().positive(),
    cantidad: z.number().int().positive(),
    precio: z.number().positive(),
    subtotal: z.number().positive()
});

const productosSchema = z.array(productoSchema);


export const ordenesValidation = (data) => {
    return ordenValidation.safeParse(data)
}

export const updateOrdenesValidation = (data) => {
    return ordenValidation.partial(data).safeParse()
}

export const updateproductos = (data) => {
    return productosSchema.partial().safeParse(data)
}

export const createproductos = (data) => {
    return productosSchema.partial().safeParse(data)
}