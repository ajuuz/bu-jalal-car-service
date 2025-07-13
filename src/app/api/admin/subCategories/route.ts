import dbConnect from "@/lib/mongodb"
import { subCategoryModel } from "@/models/subCategory";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        await dbConnect();
        const subCategories = await subCategoryModel.find({},{__v:false});
        return NextResponse.json(subCategories)
    }
    catch(error){
         return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}