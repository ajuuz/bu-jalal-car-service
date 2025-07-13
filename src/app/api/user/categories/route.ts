import dbConnect from "@/lib/mongodb";
import { categoryModel } from "@/models/category";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const partialProjection = searchParams.get('partialProjection')==='true'?true:false;

    try{
        await dbConnect()
        let categories;
        if(partialProjection){
           categories = await categoryModel.find({},{name:1}) 
        }else{
            categories = await categoryModel.find({})
        }

        return NextResponse.json(categories)
    }
    catch(error){
         return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}