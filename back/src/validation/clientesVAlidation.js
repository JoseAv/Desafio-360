import { z } from 'zod'

const clientesValidation = z.object({
    id: z.number().int(),
    razon_Social: z.string(),
    nombre_comercial: z.string(),
    direccion_entrega: z.string(),
    telefono: z.string(),
    email: z.string().email()
})

export const createClientesValidation = (data) => {
    const validation = clientesValidation.partial().extend({ email: z.string() })
    return validation.safeParse(data)
}

export const updateClientesValidation = (data) => {
    return clientesValidation.safeParse(data)
}

