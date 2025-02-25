import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function Carrito() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Save Gloves',
      brand: 'TYLBA ULTRA',
      dimensions: '59" 30"',
      image: '/products/llave_lavamano.png',
      quantity: 5
    },
    {
      id: 2,
      name: 'Save Gloves',
      brand: 'TYLBA ULTRA',
      dimensions: '59" 30"',
      image: '/products/llave_lavamano.png',
      quantity: 5
    },
    {
      id: 3,
      name: 'Save Gloves',
      brand: 'TYLBA ULTRA',
      dimensions: '59" 30"',
      image: '/products/llave_lavamano.png',
      quantity: 5
    },
    {
      id: 4,
      name: 'Save Gloves',
      brand: 'TYLBA ULTRA',
      dimensions: '59" 30"',
      image: '/products/llave_lavamano.png',
      quantity: 5
    }
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] font-rubik">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl text-center font-medium mb-12">Cotización</h1>

        {/* Table Headers */}
        <div className="hidden md:grid grid-cols-12 gap-2 mb-4 text-gray-600 font-medium px-6">
          <div className="col-span-7">Producto</div>
          <div className="col-span-5">Cantidad</div>
        </div>

        {/* Separator Line */}
        <div className="hidden md:block h-px bg-gray-200 mb-6"></div>

        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4 grid grid-cols-1 md:grid-cols-12 gap-2 items-center px-6">
              {/* Product Info */}
              <div className="col-span-1 md:col-span-7 flex items-center space-x-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Marca: {item.brand}</p>
                  <p className="text-sm text-gray-500">Dimensiones: {item.dimensions}</p>
                </div>
              </div>

              {/* Quantity Controls and Delete Button */}
              <div className="col-span-1 md:col-span-5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input 
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="w-16 text-center border rounded p-1"
                    min="1"
                  />
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons Section with Separators */}
        <div className="mt-16 space-y-8">
          {/* First set of buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <button className="px-6 py-2 border-2 border-[#0B1CBE] text-[#0B1CBE] rounded-lg hover:bg-[#0B1CBE] hover:text-white transition-colors">
              Agregar Producto
            </button>
            <button className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
              Vaciar Carrito
            </button>
          </div>

          {/* Separator Line */}
          <div className="h-px bg-gray-200"></div>

          {/* Quote Button */}
          <div className="flex justify-end">
            <button className="px-8 py-3 bg-[#CB6406] text-white rounded-lg hover:bg-[#B55705] transition-colors text-lg">
              Solicitar Cotización →
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
