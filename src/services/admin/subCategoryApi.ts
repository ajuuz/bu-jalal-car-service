import adminInstance from "@/lib/axios/adminInstance"


export const getSubCategories=async()=>{
    try{
        const response = await adminInstance.get('/subCategories')
        return response.data
    }catch(error:any){
        console.log(error)
        throw error?.response?.data || error;
    }
}