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
    Correo: '',
    telefono: '',
    sexo: '',
    NivelAcademico: '',
    AnosExperiencia: '',
    FuncionLaboral: '',
    OtraFuncionLaboral: '',
    UltimoSalario: '',
    NivelLaboral: '',
    OtroNivelLaboral: '',
    Curriculum: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validaciones de campos requeridos
    const camposRequeridos = {
      nombre: 'Nombre',
      cedula: 'Cédula',
      Correo: 'Correo electrónico',
      telefono: 'Teléfono',
      sexo: 'Sexo',
      NivelAcademico: 'Nivel Académico',
      FuncionLaboral: 'Función Laboral',
      NivelLaboral: 'Nivel Laboral',
      Curriculum: 'Curriculum'
    };

    const camposFaltantes = Object.entries(camposRequeridos)
      .filter(([key]) => !formData[key])
      .map(([, label]) => label);

    if (camposFaltantes.length > 0) {
      toast.error(`Complete los campos obligatorios: ${camposFaltantes.join(', ')}`, {
        duration: 4000,
        position: 'top-center',
      });
      setIsSubmitting(false);
      return;
    }

    // Validar archivo PDF y tamaño
    if (formData.Curriculum) {
        if (formData.Curriculum.type !== 'application/pdf') {
            toast.error('El currículum debe ser un archivo PDF', {
                duration: 4000,
                position: 'top-center',
            });
            setIsSubmitting(false);
            return;
        }
        
        if (formData.Curriculum.size > 10 * 1024 * 1024) { // 10MB limit
            toast.error('El archivo no puede sobrepasar los 10MB', {
                duration: 4000,
                position: 'top-center',
            });
            setIsSubmitting(false);
            return;
        }
    }

    try {
      const formDataToSend = new FormData();
      
      // Agregar campos al FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'Curriculum' && value) {
            formDataToSend.append(key, value, value.name);
          } else {
            formDataToSend.append(key, value);
          }
        }
      });

      await vacanteService.createVacante(formDataToSend);
      
      toast.success('¡Solicitud enviada con éxito!', {
        duration: 4000,
        position: 'top-center',
      });

      // Limpiar formulario
      setFormData({
        nombre: '',
        cedula: '',
        Correo: '',
        telefono: '',
        sexo: '',
        NivelAcademico: '',
        AnosExperiencia: '',
        FuncionLaboral: '',
        OtraFuncionLaboral: '',
        UltimoSalario: '',
        NivelLaboral: '',
        OtroNivelLaboral: '',
        Curriculum: null
      });

    } catch (error) {
      console.error('Error al enviar:', error);
      toast.error(error.response?.data?.message || 'Error al enviar la solicitud', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
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
                  name="Correo"
                  value={formData.Correo}
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
                    required
                  />
                  Femenino
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sexo"
                    value="M"
                    onChange={handleChange}
                    className="mr-2"
                    required
                  />
                  Masculino
                </label>
                
              </div>
            </div>
          </div>

          {/* 2. Nivel Académico */}
          <div>
            <h2 className="text-xl font-bold mb-6">2. Nivel Académico</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Nivel Alcanzado <span className="text-red-500">*</span></label>
              <select
                name="NivelAcademico"
                value={formData.NivelAcademico}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Seleccione un nivel</option>
                <option value="basico">Básico</option>
                <option value="bachiller">Bachiller</option>
                <option value="tecnico">Técnico</option>
                <option value="licenciado">Licenciado</option>
                <option value="maestria">Maestría</option>
                <option value="doctorado">Doctorado</option>
              </select>
            </div>
          </div>

          {/* 3. Experiencia Laboral */}
          <div>
            <h2 className="text-xl font-bold mb-6">3. Experiencia Laboral</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Años de Experiencia
                </label>
                <input
                  type="number"
                  name="AnosExperiencia"
                  value={formData.AnosExperiencia}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Función Laboral <span className="text-red-500">*</span>
                </label>
                <select
                  name="FuncionLaboral"
                  value={formData.FuncionLaboral}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Seleccione una función</option>
                  <option value="ferreteria">Ferretería</option>
                  <option value="industria">Industria</option>
                  <option value="gobierno">Gobierno</option>
                  <option value="intermediacion">Intermediación Financiera</option>
                  <option value="hoteleria">Hotelería</option>
                  <option value="comercio">Comercio</option>
                  <option value="construccion">Construcción</option>
                  <option value="salud">Salud</option>
                  <option value="transporte">Transporte</option>
                  <option value="agricultura">Agricultura</option>
                  <option value="electricidad">Electricidad</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Último Salario</label>
                <input
                  type="number"
                  name="UltimoSalario"
                  value={formData.UltimoSalario}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nivel Laboral <span className="text-red-500">*</span>
                </label>
                <select
                  name="NivelLaboral"
                  value={formData.NivelLaboral}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Seleccione un nivel</option>
                  <option value="operario">Operario</option>
                  <option value="analista">Analista</option>
                  <option value="auxiliar">Auxiliar</option>
                  <option value="promotor">Promotor</option>
                  <option value="asistente">Asistente</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="encargado">Encargado</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="gerente">Gerente</option>
                  <option value="director">Director</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Otra Función Laboral</label>
                <input
                  type="text"
                  name="OtraFuncionLaboral"
                  value={formData.OtraFuncionLaboral}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Otro Nivel Laboral</label>
                <input
                  type="text"
                  name="OtroNivelLaboral"
                  value={formData.OtroNivelLaboral}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* 4. Curriculum Vitae */}
          <div>
            <h2 className="text-xl font-bold mb-6">4. Curriculum Vitae</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-2">Formato aceptado: PDF</p>
                <p className="text-gray-600 mb-2">Tamaño máximo: 10MB</p>
                <input
                  type="file"
                  name="Curriculum"
                  onChange={handleChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#CB6406] hover:bg-[#B55705] cursor-pointer"
                >
                  {formData.Curriculum ? formData.Curriculum.name : 'Seleccionar archivo'}
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
              {isSubmitting ? 'Enviando...' : 'ENVIAR SOLICITUD'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}