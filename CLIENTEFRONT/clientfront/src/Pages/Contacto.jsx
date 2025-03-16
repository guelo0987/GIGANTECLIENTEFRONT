import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { MapPin, Mail, Phone } from 'lucide-react';
import { mensajeService } from '../Controllers/mensajeService';
import { toast } from 'react-hot-toast';

export default function Contacto() {
  const [formData, setFormData] = useState({
    email: '',
    descripcion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await mensajeService.enviarMensaje(formData);
      
      toast.success('¡Mensaje enviado con éxito!', {
        duration: 4000,
        position: 'top-center',
      });

      // Limpiar el formulario
      setFormData({
        email: '',
        descripcion: '',
      });
    } catch (error) {
      toast.error('Error al enviar el mensaje. Por favor, intente nuevamente.', {
        duration: 4000,
        position: 'top-center',
      });
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white font-rubik">
      <Header />

      {/* Hero Section con imagen de fondo */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/contacto_banner.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4">
            
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de Contacto */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                ¡Estamos aquí <span className="text-[#CB6406]">para ayudarte!</span>
              </h2>
              <p className="text-gray-600">Contáctanos ahora y resolvemos tus dudas</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-[#CB6406] p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">Av. Charles de Gaulle 43,</p>
                  <p className="text-gray-600">Santo Domingo Este</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-[#CB6406] p-3 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">soporte@ferregigante.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-[#CB6406] p-3 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">(809) 123 - 4567</p>
                  <p className="text-gray-600">(809) 333 - 3587</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 focus:ring-2 focus:ring-[#CB6406]"
                  required
                />
              </div>

              <div>
                <textarea
                  name="descripcion"
                  placeholder="Mensaje"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-0 focus:ring-2 focus:ring-[#CB6406]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#CB6406] text-white py-3 rounded-lg hover:bg-[#B55705] transition-colors font-medium ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>
        </div>

        {/* Mapa */}
        <div className="mt-16">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.8901254841187!2d-69.82745132559787!3d18.501818467741687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf864def122abd%3A0x7b78aef65dd83164!2sFerreteria%20Gigante!5e0!3m2!1sen!2sdo!4v1708381543997!5m2!1sen!2sdo"
            className="w-full h-[400px] rounded-lg"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
