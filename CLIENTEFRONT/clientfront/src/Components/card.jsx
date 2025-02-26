import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function Card({ title, image, description, id, category, stock, codigo }) {
  const navigate = useNavigate();
  const isAvailable = stock > 0;

  const handleClick = () => {
    navigate(`/producto/${codigo}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 w-full max-w-[250px]"
    >
      {/* Categoría centrada */}
      <div className="px-3 pt-2">
        <p className="text-gray-500 text-xs text-center">{category}</p>
      </div>

      {/* Imagen del producto con altura fija */}
      <div className="relative w-full h-[160px] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-contain p-2"
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

      <div className="px-3 pb-2">
        {/* Título del producto centrado */}
        <h3 className="text-sm text-center mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Botón de carrito centrado */}
        <div className="flex justify-center">
          <button 
            className={`p-2 rounded-full transition-colors ${
              isAvailable 
                ? 'bg-[#CB6406] hover:bg-[#B55705] text-white' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!isAvailable}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
