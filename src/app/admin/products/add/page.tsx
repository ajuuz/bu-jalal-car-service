'use client';

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageIcon, Plus } from "lucide-react";
import { ProductFormType, productZodeFormSchema } from "@/zodSchema/formZodSchema";
import z from "zod";
import { createProduct } from "@/serverActions/admin/productAction";
import { getBrands } from "@/services/admin/brandApi";
import { getSubCategories } from "@/services/admin/subCategoryApi";

export default function Page() {
  const [images, setImages] = useState<(File|null)[]>([null,null,null])
  const [errors,setErrors] = useState<Partial<Record<keyof ProductFormType,string>>>({})
  const [brands,setBrands] = useState<BrandDTO[]>([])
  const [subCategories,setSubCategories] = useState<SubCategoryDTO[]>([])


    useEffect(()=>{
        (async function(){
            const asyncOperation=[];
            asyncOperation.push(getBrands(),getSubCategories())
            const result = await Promise.all(asyncOperation)
            console.log(result)
            setBrands(result[0])
            setSubCategories(result[1])
        })()
    },[])



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>,index:number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImages((prev)=>{
        const images=[...prev];
        images[index] = file;
        return images
    })
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name') as string
    const brand = form.get('brand') as string
    const subCategory = form.get('subCategory') as string
    const price = Number(form.get('price'))
    const description = form.get('description') as string
    console.log(name,brand,subCategory,price,description)
    const parsed = productZodeFormSchema.safeParse({images,name,brand,subCategory,price,description})
    if(!parsed.success){
        const errorTree = z.treeifyError(parsed.error);
        const formattedErrors:Partial<Record<keyof ProductFormType,string>>={
          images: errorTree.properties?.images?.errors?.[0]||"",
          name: errorTree.properties?.name?.errors?.[0]||"",
          subCategory: errorTree.properties?.subCategory?.errors?.[0]||"",
          brand: errorTree.properties?.brand?.errors?.[0]||"",
          price: errorTree.properties?.price?.errors?.[0]||"",
          description: errorTree.properties?.description?.errors?.[0]||"",
        }
        setErrors(formattedErrors)
        setTimeout(()=>setErrors({}),7000)
    }

    if(parsed.data){
        const response = await createProduct(parsed.data)
        console.log(response)
    }
  };

  return (
    <div className="px-6 md:px-12 py-8">
      <Card className="max-w-4xl mx-auto shadow-2xl border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold">Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="images">Product Images (up to 10)</Label>
              {errors?.images && <p className="text-red-500">{errors.images}</p>}
              <div  className="grid grid-cols-3">
                {images.map((image,index)=>
                    <div key={index} className="p-5">
                        <Input id={`images-${index}`} type="file" accept="image/*" onChange={(e)=>handleImageChange(e,index)} className="hidden"/>
                        <Label htmlFor={`images-${index}`} className="h-40 border-dashed border-3 rounded flex justify-center items-center flex-col bg-blue-100/80 border-blue-200/70">
                              
                            {!images[index]?<ImageIcon className="text-blue-600"/>:<img src={URL.createObjectURL(images[index])} className="w-full h-24 object-cover border rounded-md shadow" alt={`preview-${index}`} />}
                            <span className="bg-blue-400 py-2 px-1 text-white rounded-md ">Upload Image</span>
                        </Label>
                    </div>
                )}
                <div className="p-5">
                 <div className="h-40 border-dashed border-3 rounded flex justify-center items-center flex-col bg-blue-100/80 border-blue-200/70">
                    <Plus onClick={()=>console.log(images)} className="text-blue-600 font-bold scale-180"/>
                 </div>
                </div>

              </div>
        </div>

            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" placeholder="e.g. Alloy Wheels" required />
            {errors?.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            {/* Brand Dropdown */}
            <div className="space-y-2">
              <Label>Brand</Label>
              <Select name="brand">
                <SelectTrigger>
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                    {brands.map((brand)=><SelectItem key={brand._id} value={brand._id}>{brand.name}</SelectItem>)}
                </SelectContent>
              </Select>
            {errors?.brand && <p className="text-red-500">{errors.brand}</p>}
            </div>

            {/* Subcategory Dropdown */}
            <div className="space-y-2">
              <Label>Subcategory</Label>
              <Select name="subCategory">
                <SelectTrigger>
                  <SelectValue placeholder="Select Subcategory" />
                </SelectTrigger>
                <SelectContent>
                 {subCategories.map((subCategory)=><SelectItem key={subCategory._id} value={subCategory._id}>{subCategory.name}</SelectItem>)}
                </SelectContent>
              </Select>
            {errors?.subCategory && <p className="text-red-500">{errors.subCategory}</p>}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price (in ₹)</Label>
              <Input id="price" name="price" type="number" min={1} placeholder="e.g. 4999" required />
            {errors?.price && <p className="text-red-500">{errors.price}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the product..."
                className="min-h-[120px]"
              />
            {errors?.description && <p className="text-red-500">{errors.description}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full text-lg py-6 rounded-xl">
                Save Product
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
