import React, { useState } from 'react';

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-8 flex flex-col md:flex-row">
        {/* Left side - Product Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
          <img 
            src={product.image} 
            alt={product.name}
            className="max-w-[300px] md:max-w-[400px] h-auto object-contain"
          />
        </div>

        {/* Right side - Product Info */}
        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="text-2xl md:text-[32px] font-bold text-[#1A1A1A] mb-4">{product.name}</h1>
          
          <div className="flex flex-wrap gap-4 md:gap-8 text-gray-500 mb-4 text-sm md:text-base">
            <p>Disponible: {product.stock}</p>
            <p>Código: {product.code}</p>
            <p>Ref.: {product.reference}</p>
          </div>

          <div className="mb-6">
            <p className="text-[#0039A6] font-bold mb-2">Marca: {product.brand}</p>
          </div>

          <div className="mb-8">
            <h3 className="font-bold mb-2">Detalles del Producto:</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <span className="font-bold">Cantidad:</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border border-gray-300 rounded-md"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <button className="w-full bg-[#CB6406] text-white py-3 rounded-lg hover:bg-[#B55705] transition-colors">
            Cotizar
          </button>
        </div>
      </div>
    </div>
  );
} 