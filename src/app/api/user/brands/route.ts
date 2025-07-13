import dbConnect from "@/lib/mongodb";
import { brandModel } from "@/models/brand";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const partialProjection = searchParams.get('partialProjection')==='true'?true:false;

    try{
        await dbConnect()
        let brands;
        if(partialProjection){
           brands = await brandModel.find({},{name:1}) 
        }else{
            brands = await brandModel.find({})
        }

        return NextResponse.json(brands)
    }
    catch(error){
         return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}