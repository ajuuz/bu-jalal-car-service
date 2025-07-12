import dbConnect from "@/lib/mongodb"
import { categoryModel } from "@/models/category";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        await dbConnect();
        const categories = await categoryModel.find({},{__v:false});
        return NextResponse.json(categories)
    }
    catch(error){
         return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}