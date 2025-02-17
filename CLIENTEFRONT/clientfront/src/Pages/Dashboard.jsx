import { useState, useEffect } from 'react';
import { endpoints } from '../Api/Endpoints';
import Header from '../Components/Header';
import Banner from '../Components/Banner';
import SearchBar from '../Components/SearchBar';

export default function Dashboard() {
  const categories = [
    { name: 'PLOMERIA', icon: '/icons/plomeria.png' },
    { name: 'CONTRUCCIÓN', icon: '/icons/truck.png' },
    { name: 'ELÉCTRICOS', icon: '/icons/electricity.png' },
    { name: 'PINTURA', icon: '/icons/paint.png' },
    { name: 'FERRETEROS', icon: '/icons/ferreteria.png' },
    { name: 'HOGAR', icon: '/icons/hogar.png' },
    { name: 'CERAMICA', icon: '/icons/ceramica.png' },
  ];

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
                className="flex flex-col items-center justify-center p-4 sm:p-5 md:p-6  rounded-xl hover:shadow-md transition-all cursor-pointer hover:scale-105"
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
            <p className="text-gray-600 mb-4">
              Descubre nuestros productos destacados: calidad, innovación y lo mejor para ti
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              CONOCE NUESTROS PRODUCTOS DESTACADOS
            </h2>
          </div>
        </main>
      </div>
    </div>
  );
}
