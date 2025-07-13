import dbConnect from "@/lib/mongodb"
import { brandModel } from "@/models/brand";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        await dbConnect();
        const brands = await brandModel.find({},{__v:false});
        return NextResponse.json(brands)
    }
    catch(error){
         return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}