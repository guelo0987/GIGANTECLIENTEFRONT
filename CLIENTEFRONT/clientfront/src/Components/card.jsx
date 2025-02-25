import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ title, image, description, id, category }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 text-center hover:scale-105 transition-transform duration-300">
      {/* Categoría */}
      <p className="text-gray-500 text-sm mb-2">{category}</p>

      {/* Imagen del producto */}
      <div className="relative w-full h-36 overflow-hidden mb-3">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-contain mx-auto"
        />
      </div>

      {/* Título del producto */}
      <h3 className="font-semibold text-sm mb-3">
        {title}
      </h3>

      {/* Botones */}
      <div className="flex gap-2 justify-center">
        <button className="px-3 py-1.5 text-sm bg-[#CB6406] hover:bg-[#B55705] text-white rounded-lg transition-colors">
          Cotizar
        </button>
        <Link to={`/producto/${id}`} className="px-3 py-1.5 text-sm border border-[#0B1CBE] text-[#0B1CBE] hover:bg-[#0B1CBE] hover:text-white rounded-lg transition-colors">
          Ver
        </Link>
      </div>
    </div>
  );
}
