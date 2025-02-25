import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail, Clock, MapPin, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B1CBE] text-white relative w-full mt-20">
      {/* Top Info Bar with Gradient Border */}
      <div className="border-b border-white/10 bg-[#0A19A7]">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="flex items-center space-x-4 group transition-all duration-300 hover:translate-y-[-2px]">
              <div className="bg-white/10 p-3 rounded-full group-hover:bg-[#CB6406]">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xl font-semibold">(809) 123 - 4567</p>
                <p className="text-sm text-gray-300">¡Soporte en línea gratis!</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4 group transition-all duration-300 hover:translate-y-[-2px]">
              <div className="bg-white/10 p-3 rounded-full group-hover:bg-[#CB6406]">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <a href="mailto:soporte@ferregigante.com" className="text-xl font-semibold hover:text-[#CB6406]">
                  soporte@ferregigante.com
                </a>
                <p className="text-sm text-gray-300">¡Escríbenos!</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-center space-x-4 group transition-all duration-300 hover:translate-y-[-2px]">
              <div className="bg-white/10 p-3 rounded-full group-hover:bg-[#CB6406]">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xl font-semibold">Lun - Sab / 8:00 AM - 5:00PM</p>
                <p className="text-xl font-semibold">Dom / 8:00 AM - 1:00 PM</p>
                <p className="text-sm text-gray-300">¡Días de trabajo / Horas!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <img src="/Gigante_Logo.png" alt="Gigante Logo" className="h-20 mb-6" />
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Somos una ferretería online encantados de atenderte y brindarte la mejor experiencia.
              Preguntas por nuestros descuentos.
            </p>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Métodos de Pago Aceptados</h4>
              <img src="/icons/payments.png" alt="Métodos de pago" className="h-8" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative">
              ENCUENTRA RÁPIDO
              <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-[#CB6406]"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/contacto" className="flex items-center text-gray-300 hover:text-white group">
                  <ChevronRight className="h-4 w-4 mr-2 text-[#CB6406] group-hover:translate-x-2 transition-transform" />
                  <span>Contacto</span>
                </Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes" className="flex items-center text-gray-300 hover:text-white group">
                  <ChevronRight className="h-4 w-4 mr-2 text-[#CB6406] group-hover:translate-x-2 transition-transform" />
                  <span>Preguntas Frecuentes</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative">
              UBICACIÓN
              <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-[#CB6406]"></span>
            </h3>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.8901254841187!2d-69.82745132559787!3d18.501818467741687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf864def122abd%3A0x7b78aef65dd83164!2sFerreteria%20Gigante!5e0!3m2!1sen!2sdo!4v1708381543997!5m2!1sen!2sdo"
                className="w-full h-48"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section with Gradient Border */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-12 border-t border-white/10">
          <p className="text-gray-300 font-medium">DESIGN WITH LOVE BY CHIQUI CO.</p>
          <div className="flex space-x-6 mt-6 md:mt-0">
            <a href="#" className="text-white hover:text-[#CB6406] transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-[#CB6406] transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-[#CB6406] transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
