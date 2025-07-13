'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaImage } from "react-icons/fa6";
import { FormType, formZodSchema } from "@/zodSchema/formZodSchema";
import z from "zod";
import { createCategory } from "@/serverActions/admin/categoryAction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function Page() {
  const [images,setImages] = useState<File[]|null>(null);
  const [preview,setPreview] = useState<string|null>(null);
  const [errors,setErrors] = useState<Partial<Record<keyof FormType,string>>>({})
  const [loading, setLoading] = useState(false);


  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImages([file]);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle API submission here
    if(!images){
      setErrors((prev)=>({...prev,images:'select a image'}))
      setTimeout(()=>setErrors({}),7000)
      return;
    }
    
    const form = new FormData(e.currentTarget);
    const name = form.get('catName') as string
    const parsed = formZodSchema.safeParse({name,images})
    if(!parsed.success){
      const errorTree = z.treeifyError(parsed.error);
      const formattedErrors:Partial<Record<keyof FormType,string>>={
        name: errorTree.properties?.name?.errors?.[0]||"",
        images: errorTree.properties?.name?.errors?.[0]||"",
      }
      setErrors(formattedErrors)
      setTimeout(()=>setErrors({}),7000)
      return 
    }
    try{
      setLoading(true)
      const response = await createCategory({name,images})
        setLoading(false)
        toast.success(response.message)
        router.push('/admin/categories')
      }
      catch(error:any){
      toast.error(error.message)
    }
  };

  return (
    <div  className=" px-6 md:px-12">
      <Card className="max-w-3xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center">
                <div className="space-y-3">
                 {preview ? (
                     <img src={preview} alt="Preview" className="mt-4  rounded-md object-cover border" />
                    ) : (
                     <div className="w-32 h-32 flex items-center justify-center bg-gray-100 border rounded-md">
                       <FaImage className="text-gray-400 scale-150"/>
                     </div>
                   )}
                   <Input id="catImage" type="file" accept="image/*" onChange={handleImageChange} className="w-full hidden"/>
                   <div>
                     <Label htmlFor="catImage" className="w-full bg-black text-white p-2 rounded-md flex justify-center">Add Image</Label>
                     {errors?.images && <p className="text-red-500 text-center">{errors.images}</p>}
                   </div>
                </div>
              </div>
            <div className="space-y-3">
              <Label htmlFor="catName">Category Name</Label>
              <Input id="catName" name="catName" placeholder="e.g. Body Parts , Hoods" required />
                     {errors?.name && <p className="text-red-500 text-center">{errors.name}</p>}
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={loading} className="w-full text-lg py-6 rounded-xl">
                {loading?'loading...':"Save Category"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
