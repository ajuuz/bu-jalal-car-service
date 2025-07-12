import adminInstance from "@/lib/axios/adminInstance"


export const getCategories=async()=>{
    try{
        const response = await adminInstance.get('/categories')
        return response.data
    }catch(error:any){
        console.log(error)
        throw error?.response?.data || error;
    }
}