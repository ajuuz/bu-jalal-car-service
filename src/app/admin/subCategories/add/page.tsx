'use client'

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaImage } from "react-icons/fa6";
import { SubCatFormType, subCatFormZodSchema } from "@/zodSchema/formZodSchema";
import z from "zod";
import { getCategories } from "@/services/admin/categoriesApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createSubCategory } from "@/serverActions/admin/subCategoryAction";


export default function Page() {
  const [images,setImages] = useState<File[]|null>(null);
  const [preview,setPreview] = useState<string|null>(null);
  const [categories,setCategories] = useState<CategoryDTO[]>([])
  const [category,setCategory]=useState<string>('');
  const [errors,setErrors] = useState<Partial<Record<keyof SubCatFormType,string>>>({})

  useEffect(()=>{
    async function fetchCategories(){
        const categories=await getCategories()
        setCategories(categories)
    }
    fetchCategories()
  },[])
  
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
    const name = form.get('subCatName') as string
    const parsed = subCatFormZodSchema.safeParse({name,images,category})
    if(!parsed.success){
      const errorTree = z.treeifyError(parsed.error);
      const formattedErrors:Partial<Record<keyof SubCatFormType,string>>={
        name: errorTree.properties?.name?.errors?.[0]||"",
        images: errorTree.properties?.images?.errors?.[0]||"",
        category: errorTree.properties?.category?.errors?.[0]||"",
      }
      setErrors(formattedErrors)
      setTimeout(()=>setErrors({}),7000)
      return 
    }
    try{
       const response = await createSubCategory({name,images,category})
       console.log(response)
    }
    catch(error){
      console.log(error)
    }
  };

  return (
    <div  className=" px-6 md:px-12">
      <Card className="max-w-3xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add New Sub Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center">
                <div className="space-y-3">
                 {preview ? (
                     <img src={preview} alt="Preview" className="mt-4 w-32 h-32 rounded-md object-cover border" />
                    ) : (
                     <div className="w-32 h-32 flex items-center justify-center bg-gray-100 border rounded-md">
                       <FaImage className="text-gray-400 scale-150"/>
                        <Input id="subCatImage" type="file" accept="image/*" onChange={handleImageChange} className="w-full hidden"/>
                     </div>
                   )}
                   <div>
                     <Label htmlFor="subCatImage" className="w-full bg-black text-white p-2 rounded-md flex justify-center">Add Image</Label>
                     {errors?.images && <p className="text-red-500 text-center">{errors.images}</p>}
                   </div>
                </div>
              </div>

            <div className="space-y-3">
              <Label htmlFor="subCatName">Sub Category Name</Label>
              <Input id="subCatName" name="subCatName" placeholder="e.g. Body Parts , Hoods" required />
                     {errors?.name && <p className="text-red-500 text-center">{errors.name}</p>}
            </div>

            <div className="flex gap-4">
            <Label>Select Category</Label>
            <Select onValueChange={(value)=>setCategory(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category=>
                <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors?.category && <p className="text-red-500 text-center">{errors.category}</p>}
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full text-lg py-6 rounded-xl">
                Save Sub Category
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
