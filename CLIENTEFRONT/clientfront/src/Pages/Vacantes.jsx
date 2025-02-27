import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { toast } from 'react-hot-toast';
import { vacanteService } from '../Controllers/vacanteService';

export default function Vacantes() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    correo: '',
    telefono: '',
    sexo: '',
    nivelAcademico: '',
    anosExperiencia: '',
    funcionLaboral: '',
    otroNivelLaboral: '',
    ultimoSalario: '',
    nivelLaboral: '',
    otroNivelLaboral2: '',
    curriculum: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Preparar los datos según el formato esperado por la API
      const vacanteData = {
        nombre: formData.nombre,
        cedula: formData.cedula,
        correo: formData.correo,
        telefono: formData.telefono,
        sexo: formData.sexo,
        nivelAcademico: formData.nivelAcademico,
        anosExperiencia: parseInt(formData.anosExperiencia),
        funcionLaboral: formData.funcionLaboral,
        otroNivelLaboral: formData.otroNivelLaboral,
        ultimoSalario: parseFloat(formData.ultimoSalario),
        nivelLaboral: formData.nivelLaboral,
        otraFuncionLaboral: formData.otroNivelLaboral2,
        curriculumUrl: null // Aquí deberías manejar la subida del archivo
      };

      const response = await vacanteService.createVacante(vacanteData);
      
      toast.success('¡Solicitud enviada con éxito!', {
        duration: 4000,
        position: 'top-center',
      });

      // Limpiar el formulario
      setFormData({
        nombre: '',
        cedula: '',
        correo: '',
        telefono: '',
        sexo: '',
        nivelAcademico: '',
        anosExperiencia: '',
        funcionLaboral: '',
        otroNivelLaboral: '',
        ultimoSalario: '',
        nivelLaboral: '',
        otroNivelLaboral2: '',
        curriculum: null
      });

    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      toast.error('Error al enviar la solicitud. Por favor, intente nuevamente.', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  return (
    <div className="min-h-screen bg-white font-rubik">
      <Header />

      {/* Banner Section */}
      <div className="relative w-full">
        <div className="relative w-full" style={{ paddingTop: '25%' }}>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/vacantes_banner.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-start px-8 sm:px-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                ¡Forma parte de nuestra <span className="text-[#CB6406]">Familia</span>{' '}
                <span className="text-[#0B1CBE]">Gigante!</span>
              </h1>
              <button className="bg-[#CB6406] text-white px-8 py-3 rounded-lg hover:bg-[#B55705] transition-colors">
                Ver
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* 1. Datos Personales */}
          <div>
            <h2 className="text-xl font-bold mb-6">1. Datos Personales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cédula <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="cedula"
                  value={formData.cedula}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Correo electrónico <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Teléfono <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className="bg-gray-100 px-3 py-2 border border-gray-300 rounded-l-md">
                    Dominican Republic: +1
                  </div>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-r-md"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Sexo <span className="text-red-500">*</span></label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sexo"
                    value="F"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  F
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sexo"
                    value="M"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  M
                </label>
              </div>
            </div>
          </div>

          {/* 2. Nivel Académico */}
          <div>
            <h2 className="text-xl font-bold mb-6">2. Nivel Académico</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Seleccione Nivel Alcanzado <span className="text-red-500">*</span></label>
              <select
                name="nivelAcademico"
                value={formData.nivelAcademico}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Básico</option>
                <option value="medio">Medio</option>
                <option value="superior">Superior</option>
              </select>
            </div>
          </div>

          {/* 3. Experiencia Laboral */}
          <div>
            <h2 className="text-xl font-bold mb-6">3. Experiencia Laboral</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Años Totales de Experiencia</label>
                <select
                  name="anosExperiencia"
                  value={formData.anosExperiencia}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  {/* Añadir más opciones según necesario */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Función Laboral</label>
                <select
                  name="funcionLaboral"
                  value={formData.funcionLaboral}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Ferretería</option>
                  {/* Añadir más opciones según necesario */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Otro Nivel Laboral</label>
                <input
                  type="text"
                  name="otroNivelLaboral"
                  value={formData.otroNivelLaboral}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Último Salario</label>
                <select
                  name="ultimoSalario"
                  value={formData.ultimoSalario}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">RD$ 0.00 - RD$ 10,000</option>
                  {/* Añadir más rangos según necesario */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nivel Laboral</label>
                <select
                  name="nivelLaboral"
                  value={formData.nivelLaboral}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Operario</option>
                  {/* Añadir más opciones según necesario */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Otro Nivel Laboral</label>
                <input
                  type="text"
                  name="otroNivelLaboral2"
                  value={formData.otroNivelLaboral2}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* 5. Anexar Curriculum Vitae */}
          <div>
            <h2 className="text-xl font-bold mb-6">5. Anexar Curriculum Vitae</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-600">Haz clic o arrastra un archivo a esta área para subirlo.</p>
                <input
                  type="file"
                  name="curriculum"
                  onChange={handleChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#CB6406] hover:bg-[#B55705] cursor-pointer"
                >
                  Seleccionar archivo
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 bg-[#0B1CBE] text-white rounded-md hover:bg-blue-700 transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'ENVIAR'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
