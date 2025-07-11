
import {z} from 'zod'

const authBaseZodSchema = z.object({
    email:z.email('Invaid email'),
    password:z.string().trim().min(6,"Password must be at least 6 characters").max(32, "Password must not exceed 32 characters")
})


export const signupZodSchema =  authBaseZodSchema.extend({
    name:z.string().trim().min(1,"Name is required")
})
export type SignupType = z.infer<typeof signupZodSchema>

export const loginZodSchema = authBaseZodSchema;
export type LoginType = z.infer<typeof loginZodSchema>