// app/products/page.tsx

import ProductCard from "@/components/user/ProductCard";
import { getProducts } from "@/serverFunctions/user/product";
import { config } from "@/shared/config";


export default async function Page({ searchParams }: { searchParams:Promise<{ query?: string, brand?: string, subCategory?: string }> }) {

      const resolvedParams = await searchParams
     const { query, brand, subCategory } = resolvedParams
      const {success,message,data:products} = await getProducts(query,brand,subCategory);
      if(!success){
        return <div>{message}</div>
      }

    
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 bg-gray-50 min-h-screen">
      {
        products.map(product=>(
            <ProductCard key={product._id} name={product.name} image={`${config.CLOUDINARY.IMAGE_BASE_URL}/${product.imageIds[0]}`||""} brand={product.brand} price={product.price}/>
        ))
      }
    </div>
  );
}
