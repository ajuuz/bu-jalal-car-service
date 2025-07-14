import { Button } from "@/components/ui/button";
import HomeHeroSection from "@/components/user/HomeHeroSection";
import { getCategories } from "@/serverFunctions/user/category";
import { config } from "@/shared/config";
import { carImages, partsImage } from "@/shared/constants/staticImages";
import Image from "next/image";
import Link from "next/link";


const offers = [
  {
    title: 'BRAKE PADS',
    desc: '4Pc High Quality Brake Pads',
    brand: 'BOSCH',
    sale: 'Flash Sale',
    discount: '20% OFF ON MRP',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'GENUINE PARTS AVAILABLE',
    desc: 'Tie rod ends, Lower arms, Link rods',
    brand: 'talbros',
    sale: '',
    discount: '22% OFF ON MRP',
    image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'BRAKE PADS',
    desc: '4Pc High Quality Brake Pads',
    brand: 'BOSCH',
    sale: 'Flash Sale',
    discount: '20% OFF ON MRP',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
  },
];

const categories = [
  { name: 'Maintenance Service Parts', icon: '🔧' },
  { name: 'Maintenance Service Parts', icon: '💡' },
  { name: 'Maintenance Service Parts', icon: '🛠️' },
  { name: 'body parts', icon: '🚗' },
];

const models = [
  { name: 'CAMRY', image: carImages.mustang },
  { name: 'GLANCA', image: carImages.toyota },
  { name: 'LIVA', image: carImages.mustang },
  { name: 'FORTUNER', image: carImages.toyota },
];

const recentlyViewed = [
  { name: 'PANEL ASSY MID FLOOR', price: '₹322.00', brand: 'FORD', image: partsImage.body },
  { name: 'FRONT END ASSY', price: '₹322.00', brand: 'MAHINDRA', image: partsImage.hyundaiHood1 },
  { name: 'PANEL ASSY MID FLOOR', price: '₹322.00', brand: 'FORD', image:partsImage.hyundaiSideBar  },
  { name: 'FRONT END ASSY', price: '₹322.00', brand: 'MAHINDRA', image: partsImage.rearwheel },
];

const productGrid = [
  { name: 'ACE FACELIFT REAR VIEW RH', price: '197.25', oldPrice: '263.00', image:partsImage.poloPart },
  { name: 'ACE FACELIFT REAR VIEW RH', price: '197.25', oldPrice: '263.00', image:partsImage.rearwheel },
  { name: 'ACE FACELIFT REAR VIEW RH', price: '197.25', oldPrice: '263.00', image:partsImage.hyundaiHood2},
  { name: 'ACE FACELIFT REAR VIEW RH', price: '197.25', oldPrice: '263.00', image:partsImage.body },
];
export default async function Home() {

  const {success,message,data:categories} = await getCategories();

  return (
     <div className="bg-white min-h-screen">

      {/* Search Bar */}
      <section className="bg-blue-100 w-[70%] mx-auto flex items-center justify-between px-8 py-20 mt-4 rounded-lg relative">
        <input className="w-1/2 bg-slate-50 px-6 py-3 rounded-full border-none outline-none text-lg" placeholder="SEARCH PARTS..." />
        <span className="absolute left-1/2 top-1/2 -translate-y-1/2 text-2xl text-gray-400">🔍</span>

        <HomeHeroSection/>
      </section>

      {/* Offers */}
      <section className="mt-15 px-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">CURRENT <span className="text-black">OFFERS</span> &lt; &gt;</h2>
        <div className="flex gap-4 overflow-x-auto justify-center">
          {offers.map((offer, i) => (
            <div key={i} className="bg-red-100 rounded-lg p-4 min-w-[300px] relative">
              <div className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded">{offer.sale}</div>
              <img src={offer.image} alt={offer.title} className="h-20 mx-auto mb-2" />
              <h3 className="font-bold text-lg">{offer.title}</h3>
              <p className="text-xs text-gray-700 mb-1">{offer.desc}</p>
              <span className="text-green-700 font-bold text-xs">{offer.brand}</span>
              <div className="text-orange-600 font-bold mt-2">{offer.discount}</div>
              <Button className="mt-2">Order Now</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Category Search */}
      <section className="mt-15 px-8">
        <h2 className="text-xl font-bold mb-4">SEARCH BY <span className="text-blue-500">CATEGORY</span></h2>
          {!success || !categories
          ?<div className="flex gap-4 justify-center"><div>{message}</div></div>
          :
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-center">
            {categories.map((cat, i) => (
              <div key={cat._id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center min-w-[160px]">
              <img src={`${config.CLOUDINARY.IMAGE_BASE_URL}/${cat.imageId}`||""} alt={cat.name}/>
              <span className="font-semibold text-center">{cat.name}</span>
              </div>
          ))}
          </div>
        }
      </section>

      {/* Model Search */}
      <section className="mt-8 px-8">
        <h2 className="text-xl font-bold mb-4">SEARCH BY <span className="text-blue-500">MODELS</span></h2>
        <div className="flex gap-4 justify-center">
          {models.map((model, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 flex flex-col items-center min-w-[160px]">
              <img src={model.image} alt={model.name} className=" mb-2" />
              <span className="font-semibold">{model.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      <section className="mt-8 px-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">RECENTLY <span className="text-black">VIEWED</span> &lt; &gt;</h2>
        <div className="flex gap-4 overflow-x-auto justify-center">
          {recentlyViewed.map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 min-w-[200px]">
              <img src={item.image} alt={item.name} className="h-40 mx-auto mb-2" />
              <div className="font-bold text-xs mb-1">{item.name}</div>
              <div className="text-blue-700 font-bold text-sm mb-1">{item.price}</div>
              <div className="text-xs text-gray-500 mb-2">{item.brand}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid with Filters */}
      <section className="mt-8 px-8">
        <div className="flex gap-4 mb-4">
          <Button className="bg-gray-900 text-white">ALL</Button>
          <Button variant="outline">BEST SELLER</Button>
          <Button variant="outline">NEW ARRIVAL</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {productGrid.map((prod, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
              <img src={prod.image} alt={prod.name} className="h-40 mb-2" />
              <div className="font-bold text-xs mb-1">{prod.name}</div>
              <div className="text-blue-700 font-bold text-sm mb-1">{prod.price} <span className="line-through text-gray-400 text-xs">{prod.oldPrice}</span></div>
              <Button className="mt-2 w-full">Add to Cart</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12 py-8 px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-bold mb-2">Company Informations</div>
            <div className="text-sm">About carex<br/>Careers at carex<br/>Press Releases<br/>Contact Us</div>
          </div>
          <div>
            <div className="font-bold mb-2">Customer Care</div>
            <div className="text-sm">Customer Service<br/>Order Status<br/>FAQs</div>
          </div>
          <div>
            <div className="font-bold mb-2">Policies</div>
            <div className="text-sm">Return Policy<br/>Shipping Policy<br/>Transparency in Coverage</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-bold mb-2">Newsletter & Get Updates</div>
            <div className="flex gap-2">
              <input className="px-4 py-2 rounded-l bg-white text-black" placeholder="ENTER YOUR EMAIL ID" />
              <Button className="rounded-r">SUBMIT</Button>
            </div>
          </div>
          <div className="text-sm mt-4 md:mt-0">
            mail to : carex@gmail.com<br/>phone : 98********
          </div>
        </div>
      </footer>
    </div>
  );
}
