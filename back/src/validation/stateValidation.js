import { z } from "zod";


const UserSchema = z.object({
    id: z.number(),
    name: z.string()
})



export const updateUserValidation = ({ data }) => {
    const newSchema = UserSchema.partial().extend({ id: z.number() })
    return newSchema.safeParse(data)
}

export const CreateUserValidation = ({ data }) => {
    const newSchema = UserSchema.pick({ name: true })
    return newSchema.safeParse(data)
}

