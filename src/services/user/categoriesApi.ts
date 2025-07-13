import userInstance from "@/lib/axios/instance"


export const getCategories=async(partialProjection:boolean)=>{
    try{
        const response = await userInstance.get(`/categories?partialProjection=${partialProjection}`)
        return response.data
    }catch(error:any){
        console.log(error)
        throw error?.response?.data || error;
    }
}