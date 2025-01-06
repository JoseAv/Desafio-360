import { z } from 'zod'

const clientesValidation = z.object({
    id: z.number().int().optional(),
    razon_social: z.string(),
    nombre_comercial: z.string(),
    dirrecion_entrega: z.string(),
    telefono: z.string(),
    email: z.string().email(),
    id_estados: z.number().positive().optional()
})

export const createClientesValidation = (data) => {
    return clientesValidation.safeParse(data)
}

export const updateClientesValidation = (data) => {
    const validation = clientesValidation.pick({ id: true, id_estados: true }).merge(clientesValidation.partial())
    return validation.safeParse(data)
}

export const ValidationOneClient = (data) => {
    const validation = clientesValidation.pick({ id: true }).merge(clientesValidation.partial())
    return validation.safeParse(data)
}

