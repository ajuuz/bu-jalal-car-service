import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const config={
    api:{
        bodyParser:{
            sizeLimit:'10mb'
        }
    }
}


export async function POST(req:NextRequest){
    try{
        const form = await req.formData();
        const files = form.getAll("image") as File[]

        if(!files.length){
            return NextResponse.json({error:'No image data'},{status:400})
        }

        const uploadPromises = files.map(async (file) => {
           const arrayBuffer = await file.arrayBuffer();
           const buffer = Buffer.from(arrayBuffer);
        
           return new Promise<string>((resolve, reject) => {
             const upload = cloudinary.uploader.upload_stream(
               { folder: "uploads" },
               (error, result) => {
                 if (error || !result) reject(error);
                 else resolve(result.secure_url);
               }
             );
            
             upload.end(buffer); // Send the buffer to the stream
           });
         });

        const urls = await Promise.all(uploadPromises);
        return NextResponse.json({urls},{status:200})
    }
    catch(error){
        console.error("Upload failed:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}