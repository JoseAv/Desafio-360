import { z } from 'zod'

const rolValidation = z.object({
    id: z.number().int(),
    nombre: z.string()
})

export const createRolValidation = (data) => {
    const validation = rolValidation.partial().extend({ nombre: z.string() })
    return validation.safeParse(data)
}

export const updateRolValidation = (data) => {
    return rolValidation.safeParse(data)
}

