import { useState, useEffect } from 'react';
import { endpoints } from '../Api/Endpoints';
import Header from '../Components/Header';
import Banner from '../Components/Banner';
import SearchBar from '../Components/SearchBar';
import Card from '../Components/card';
import Footer from '../Components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import { categories } from '../lib/mockData';

export default function Dashboard() {
  const navigate = useNavigate();

  // Mantener las categorías originales con sus iconos
  const categories = [
    { name: "PLOMERIA", icon: "/icons/plomeria.png" },
    { name: "MATERIALES DE CONSTRUCCIÓN", icon: "/icons/truck.png" },
    { name: "ELÉCTRICOS", icon: "/icons/electricity.png" },
    { name: "PINTURA", icon: "/icons/paint.png" },
    { name: "FERRETEROS", icon: "/icons/ferreteria.png" },
    { name: "HOGAR", icon: "/icons/hogar.png" },
    { name: "CERAMICA", icon: "/icons/ceramica.png" },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/catalogo?category=${category.name.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Header y Banner con fondo blanco */}
      <div className="bg-white">
        <Header />
        <Banner />
      </div>

      {/* SearchBar con fondo blanco */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <SearchBar />
        </div>
      </div>

      {/* Contenido principal con fondo gris */}
      <div className="bg-[#fbfbfb] min-h-screen">
        <main className="container mx-auto px-4 py-8">
          {/* Grid de Categorías */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                onClick={() => handleCategoryClick(category)}
                className="flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 rounded-xl hover:shadow-md transition-all cursor-pointer hover:scale-105"
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mb-2 sm:mb-3 md:mb-4"
                />
                <span className="text-xs sm:text-sm md:text-base font-medium text-center text-gray-900">
                  {category.name}
                </span>
              </div>
            ))}
          </div>

          {/* Sección de Productos Destacados */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">
              CONOCE NUESTROS 
              <span className="text-[#CB6406]"> PRODUCTOS </span> 
              <span className="text-[#0B1CBE]"> DESTACADOS </span>
            </h2>
            <p className="text-gray-600 mb-4 mt-4">
              Descubre nuestros productos destacados: calidad, 
              innovación y lo mejor para ti
            </p>
          </div>

          {/* Sección de filtros de productos */}
          <div className="mt-10 flex flex-col">
            <div className="flex items-center justify-end gap-8">
              <button className="text-xs hover:text-[#CB6406] transition-colors group">
                DESTACADOS
                <div className="h-0.5 w-full bg-transparent group-hover:bg-[#CB6406] transition-colors" />
              </button>
              <button className="text-xs hover:text-[#CB6406] transition-colors group">
                MEJOR CALIFICADOS
                <div className="h-0.5 w-full bg-transparent group-hover:bg-[#CB6406] transition-colors" />
              </button>
              <button className="text-xs hover:text-[#CB6406] transition-colors group">
                NUEVOS
                <div className="h-0.5 w-full bg-transparent group-hover:bg-[#CB6406] transition-colors" />
              </button>
            </div>
            
            {/* Línea separadora */}
            <div className="w-full h-px bg-gray-200 my-6 mb-10" />
          </div>

          {/* Grid de Productos Destacados */}

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
            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/llave_lavamano.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/llave_lavamano.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/llave_lavamano.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/llave_lavamano.png"
              />
            </SwiperSlide>

            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/llave_lavamano.png"
              />
            </SwiperSlide>

            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/llave_lavamano.png"
              />
            </SwiperSlide>

            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/llave_lavamano.png"
              />
            </SwiperSlide>

            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/llave_lavamano.png"
              />
            </SwiperSlide>
          </Swiper>
            
             {/* Sección de filtros de productos */}
          <div className="mt-40 flex flex-col">

              <div className="flex items-end justify-start gap-8">
              <button className="text-lg hover:text-[#CB6406] transition-colors group">
                Ceramica
                <div className="h-0.5 w-full bg-transparent group-hover:bg-[#CB6406] transition-colors" />
              </button>
              </div>

            <div className="flex items-center justify-end gap-8">
              <button className="text-xs hover:text-[#CB6406] transition-colors group">
                DESTACADOS
                <div className="h-0.5 w-full bg-transparent group-hover:bg-[#CB6406] transition-colors" />
              </button>
              <button className="text-xs hover:text-[#CB6406] transition-colors group">
                MEJOR CALIFICADOS
                <div className="h-0.5 w-full bg-transparent group-hover:bg-[#CB6406] transition-colors" />
              </button>
              <button className="text-xs hover:text-[#CB6406] transition-colors group">
                NUEVOS
                <div className="h-0.5 w-full bg-transparent group-hover:bg-[#CB6406] transition-colors" />
              </button>
            </div>
            
            {/* Línea separadora */}
            <div className="w-full h-px bg-gray-200 my-6 mb-10" />
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
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
            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/ceramica.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/ceramica.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/ceramica.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/ceramica.png"
              />
            </SwiperSlide>

            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/ceramica.png"
              />
            </SwiperSlide>

            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/ceramica.png"
              />
            </SwiperSlide>

            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/ceramica.png"
              />
            </SwiperSlide>

            <SwiperSlide>
              <Card 
                title="Crown Summit Backpack"
                image="/products/ceramica.png"
              />
            </SwiperSlide>
          </Swiper>
            

          <div className="mt-40 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">
              <span className="text-[#CB6406]"> NUESTRAS </span> 
              <span className="text-[#0B1CBE]"> MARCAS </span>
            </h2>
            <p className="text-gray-600 mb-4 mt-4">
              Trabajamos con marcas aliadas que garantizan calidad e innovación en cada producto
            </p>
          </div>

          {/* Línea separadora */}
          <div className="w-full h-px bg-gray-300 my-6 mb-10" />

          {/* Contenedor centrado para el Swiper de marcas */}
          <div className="flex justify-center items-center w-full max-w-5xl mx-auto px-8">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{
                clickable: true,
                bulletActiveClass: 'swiper-pagination-bullet-active',
                bulletClass: 'swiper-pagination-bullet',
              }}
              autoplay={{ delay: 4000 }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
              className="product-swiper w-full"
            >
              <SwiperSlide className="flex items-center justify-center p-4">
                <img 
                  src="/icons/popular.png" 
                  alt="popular" 
                  className="w-full h-auto object-contain aspect-[4/3] max-h-[135px]" 
                />
              </SwiperSlide>

              <SwiperSlide className="flex items-center justify-center p-4">
                <img 
                  src="/icons/argos.png" 
                  alt="argo" 
                  className="w-full h-auto object-contain aspect-[4/3] max-h-[135px]" 
                />
              </SwiperSlide>

              <SwiperSlide className="flex items-center justify-center p-4">
                <img 
                  src="/icons/yale.png" 
                  alt="yale" 
                  className="w-full h-auto object-contain aspect-[4/3] max-h-[135px]" 
                />
              </SwiperSlide>

              <SwiperSlide className="flex items-center justify-center p-4">
                <img 
                  src="/icons/yale.png" 
                  alt="yale" 
                  className="w-full h-auto object-contain aspect-[4/3] max-h-[135px]" 
                />
              </SwiperSlide>
            </Swiper>
          </div>
          
          {/* Banner promocional */}
          <div 
            className="mt-40 relative w-full h-[357px] shadow-[0px_7px_40px_#C4C4C4]"
            style={{
              position: 'relative',
              width: '100vw',
              left: '50%',
              right: '50%',
              marginLeft: '-50vw',
              marginRight: '-50vw'
            }}
          >
            <div className="relative w-full h-full">
              {/* Imagen de fondo con gradiente más sutil */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), url('/banner_footer.png')`,
                }}
              />
              
              {/* Contenido superpuesto */}
              <div className="absolute inset-0 flex flex-col justify-center">
                <div className="container mx-auto px-4 md:px-8">
                  <h3 className="text-3xl font-bold mb-2">
                    En <span className="text-[#CB6406]">Gigante</span>
                  </h3>
                  <p className="text-xl mb-6">
                    Todo lo que necesitas para <span className="text-[#CB6406]">Construir</span>, 
                    <span className="text-[#0B1CBE]"> Mejorar</span> y 
                    <span className="text-[#0B1CBE]"> Reparar </span>
                     para cotizar tus ordenes
                  </p>
                  <button className="bg-[#CB6406] text-white px-8 py-3 rounded-md hover:bg-[#B55805] transition-colors">
                    Contáctanos
                  </button>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
