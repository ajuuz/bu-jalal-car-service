import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type ProductCardProps = {
  name: string;
  price: number;
  brand: string;
  image: string;
};

const ProductCard = async ({ name, price, brand, image }: ProductCardProps) => {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group overflow-hidden h-fit">
      <div className="relative w-full h-56">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>

      <CardHeader className="px-5 pt-4 pb-2 space-y-1">
        <CardTitle className="text-lg font-semibold text-gray-800">{name}</CardTitle>
        <Badge className="text-xs bg-gray-100 text-gray-700 border border-gray-300 w-fit">{brand}</Badge>
      </CardHeader>

      <CardContent className="px-5 pb-4 flex justify-between items-center">
        <p className="text-xl font-bold text-black">₹{price}</p>
        <Button className="rounded-lg px-5 py-2 text-sm hover:scale-105 transition-transform duration-200">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
