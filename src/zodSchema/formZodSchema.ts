import {z} from 'zod'

export const formZodSchema = z.object({
    images:z.array(z.instanceof(File)).min(1,'Image is not selected'),
    name:z.string().trim().min(2,"Name must be at least 2 characters").max(32, "Name must not exceed 32 characters")
}).partial()



export type FormType = z.infer<typeof formZodSchema>
