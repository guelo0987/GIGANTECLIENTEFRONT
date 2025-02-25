import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProductDetail from '../Components/ProductDetail';
import Card from '../Components/card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function DetalleProducto() {
  // Mock product data
  const product = {
    name: "Save Gloves",
    stock: 74,
    code: "01-01-1313",
    reference: "A2190",
    brand: "TYLBA ULTRA",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    image: "/products/llave_lavamano.png"
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] font-rubik">
      <Header />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-500">
          <span className="hidden md:inline">Departamento</span>
          <span className="hidden md:inline">→</span>
          <span className="hidden md:inline">Categoría</span>
          <span className="hidden md:inline">→</span>
          <span className="hidden md:inline">Subcategoría</span>
          <span className="hidden md:inline">→</span>
          <span className="md:inline">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <ProductDetail product={product} />

      <div className="mt-10 flex flex-col">
            {/* Línea separadora */}
            <div className="w-full h-px bg-gray-200 my-6 mb-10" />
        </div>


      {/* Similar Products */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8">Productos Similares</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="product-swiper mt-8"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <SwiperSlide key={item}>
              <Card 
                title="Crown Summit Backpack"
                image="/products/llave_lavamano.png"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Footer />
    </div>
  );
}
