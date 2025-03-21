import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Reset2Password2() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email });
  };

  return (
    <div className="min-h-screen flex bg-white font-rubik">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-[40%] relative overflow-hidden">
        {/* Fondo azul más oscuro */}
        <div className="absolute inset-0 bg-blue-primary/95 z-0"></div>
        
        {/* Imagen más pequeña */}
        <div className="absolute inset-0 flex items-end justify-center">
          <img 
            src="/password_reset.png" 
            alt="Trabajador" 
            className="w-[80%] max-h-[80vh] object-contain z-10"
          />
        </div>
        
        {/* Gradiente naranja */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-orange-300/50 to-transparent z-20"></div>
        
        {/* Logo más grande y responsivo */}
        <div className="absolute top-0 left-0 p-4 md:p-6 lg:p-8 z-30 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] xl:max-w-[450px]">
          <img 
            src="/Gigante_Logo.png" 
            alt="Centro Ferretero Gigante" 
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-[60%] flex flex-col justify-center px-4 sm:px-8 lg:px-24 relative">
        <div className="max-w-3xl w-full mx-auto">
          {/* Close button */}
          <Link to="/login" className="absolute top-8 right-8 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>

          <h2 className="text-5xl font-medium mb-4">¿Olvidaste tu contraseña?</h2>
          <p className="text-gray-600 text-xl mb-10">
            Ingresa tu correo electrónico para restablecer tu contraseña
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xl font-medium mb-2">
                Correo Electrónico <span className="text-orange-500">+</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Dirección de correo electrónico"
                required
                className="w-full px-5 py-3 rounded-lg bg-gray-input border-0 focus:ring-1 focus:ring-orange-400 text-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-2xl hover:bg-orange-400 transition duration-200 text-xl font-medium"
            >
              Siguiente
            </button>

            <div className="text-center text-xl font-medium text-gray-600">
              ¿Recordaste tu contraseña?{' '}
              <Link to="/login" className="text-orange-500 hover:underline">
                Inicia Sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
