import dbConnect from "@/lib/mongodb";
import { subCategoryModel } from "@/models/subCategory";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const partialProjection = searchParams.get('partialProjection')==='true'?true:false;

    try{
        await dbConnect()
        let subCategories;
        if(partialProjection){
           subCategories = await subCategoryModel.find({},{name:1}) 
        }else{
            subCategories = await subCategoryModel.find({})
        }

        return NextResponse.json(subCategories)
    }
    catch(error){
         return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}