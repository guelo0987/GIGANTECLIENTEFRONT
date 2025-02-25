import React from 'react';

export default function Card({ title, image, price, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center hover:scale-105 transition-transform duration-300">
      {/* Categoría */}
      <p className="text-gray-500 mb-4">Home Elementes</p>

      {/* Imagen del producto */}
      <div className="relative w-full h-48 overflow-hidden mb-4">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-contain mx-auto"
        />
      </div>

      {/* Título del producto */}
      <h3 className="font-semibold mb-4">
        {title}
      </h3>

      {/* Botones */}
      <div className="flex gap-2 justify-center">
        <button className="px-4 py-2 bg-[#CB6406] hover:bg-[#B55705] text-white rounded-lg transition-colors">
          Agregar
        </button>
        <button className="px-4 py-2 border border-[#0B1CBE] text-[#0B1CBE] hover:bg-[#0B1CBE] hover:text-white rounded-lg transition-colors">
          Ver
        </button>
      </div>
    </div>
  );
}
