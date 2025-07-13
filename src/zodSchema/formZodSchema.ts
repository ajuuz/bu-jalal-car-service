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

//product form zod
export const productZodeFormSchema = formZodSchema.extend({
    images: z.array(z.union([z.instanceof(File), z.null()])).refine(
    (arr) => arr.filter((img) => img instanceof File).length > 2,
    { message: "At least 3 image must be selected" }
  ),
    subCategory:z.string().min(1, "subCategory must be selected"),
    brand:z.string().min(1, "Brand must be selected"),
    price:z.number().min(0, "Price cannot be negative"),
    description:z.string().min(7, "At least 7 characters needed"),
})
export type ProductFormType = z.infer<typeof productZodeFormSchema>