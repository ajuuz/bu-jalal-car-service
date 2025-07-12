import instance from "@/lib/axios/instance"


export const uploadImage=async(imageData:FormData)=>{
    try{
        console.log("call comes in service")
        const response = await instance.post('/upload',imageData,{
            headers:{"Content-Type":"multipart/form-data"}
        })
        console.log("service",response)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}