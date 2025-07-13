import {z} from 'zod'

export const formZodSchema = z.object({
    images:z.array(z.instanceof(File)).min(1,'Image is not selected'),
    name:z.string().trim().min(2,"Name must be at least 2 characters").max(32, "Name must not exceed 32 characters")
})

export type FormType = z.infer<typeof formZodSchema>



//sub cat form zod
export const subCatFormZodSchema = formZodSchema.extend({
    category:z.string().min(1, "Category must be selected")
})
export type SubCatFormType = z.infer<typeof subCatFormZodSchema>

//brand form zod
export const brandFormZodSchema = formZodSchema;
export type BrandFormType = z.infer<typeof brandFormZodSchema>