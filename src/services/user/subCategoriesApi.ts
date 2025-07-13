import userInstance from "@/lib/axios/instance"


export const getSubCategories=async(partialProjection:boolean)=>{
    try{
        const response = await userInstance.get(`/subCategories?partialProjection=${partialProjection}`)
        return response.data
    }catch(error:any){
        console.log(error)
        throw error?.response?.data || error;
    }
}