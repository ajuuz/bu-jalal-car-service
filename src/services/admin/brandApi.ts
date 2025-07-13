import adminInstance from "@/lib/axios/adminInstance"


export const getBrands=async()=>{
    try{
        const response = await adminInstance.get('/brands')
        return response.data
    }catch(error:any){
        console.log(error)
        throw error?.response?.data || error;
    }
}