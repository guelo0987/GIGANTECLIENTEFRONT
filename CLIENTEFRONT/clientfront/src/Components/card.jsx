import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function Card({ title, image, description, id, category, stock, codigo, subcategory }) {
  const navigate = useNavigate();
  const isAvailable = stock > 0;

  const handleClick = () => {
    navigate(`/producto/${codigo}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 w-full aspect-[5/5]"
    >
      <div className="flex flex-col items-center justify-between h-full p-4">
        {/* Categoría centrada */}
        <div className="flex flex-col items-center mb-2">
          <p className="text-gray-500 text-xs text-center">{category}</p>
        </div>

        {/* Imagen del producto con altura proporcional */}
        <div className="relative w-full flex-1 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-contain"
          />
          
          {/* Indicador de disponibilidad discreto */}
          <div className={`absolute top-2 right-2 px-1.5 py-0.5 text-[10px] font-medium rounded ${
            isAvailable 
              ? 'bg-green-50/50 text-green-600/60'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {isAvailable ? 'Disponible' : 'Agotado'}
          </div>
        </div>

        {/* Título del producto centrado */}
        <div className="mt-2">
          <h3 className="text-sm text-center line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
