'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { FaImage } from "react-icons/fa6";


export default function AddBrandPage() {
  const [image,setImage] = useState<File | null>(null);
  const [preview,setPreview] = useState<string | null>(null);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle API submission here
    console.log("Form submitted");
  };

  return (
    <div className=" px-6 md:px-12">
      <Card className="max-w-3xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add New Brand</CardTitle>
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
                        <Input id="brandImage" type="file" accept="image/*" onChange={handleImageChange} className="w-full hidden"/>
                     </div>
                   )}
                   <Label htmlFor="brandImage" className="w-full bg-black text-white">Add Image</Label>
                </div>
              </div>
            <div className="space-y-3">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input id="brandName" name="brandName" placeholder="e.g. Nike, Adidas" required />
            </div>


            <div className="space-y-2">
              <Label htmlFor="">Brand Image</Label>
              <div className="flex items-center gap-4">
                <Button type="button" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </div>
              
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full text-lg py-6 rounded-xl">
                Save Brand
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
