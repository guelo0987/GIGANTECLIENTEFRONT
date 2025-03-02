import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Users, Target, Eye, Heart, Award, Clock, ChevronDown, Hammer } from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function NosotrosPage() {
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef([]);
  const controls = useAnimation();

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [index]: true }));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const addToRefs = (el, index) => {
    if (el && !observerRefs.current.includes(el)) observerRefs.current[index] = el;
  };

  // Animation Variants
  const bannerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const yearVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'backOut' } },
  };

  return (
    <div className="min-h-screen bg-white font-rubik overflow-hidden">
      <Header />

      {/* Banner Section with Animated Particles */}
      <div className="relative w-full h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(rgba(11, 28, 190, 0.8), rgba(203, 100, 6, 0.8)), url('/nosotros_banner.jpg')",
          }}
        >
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4"
            initial="hidden"
            animate="visible"
            variants={bannerVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              animate={{ y: [0, -10, 0], transition: { repeat: Infinity, duration: 2 } }}
            >
              Nuestra Historia
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
            >
              Desde 1990, construyendo sueños contigo
            </motion.p>
            <motion.button
              onClick={() => document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white/10 p-3 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all"
              animate={{ y: [0, 10, 0], transition: { repeat: Infinity, duration: 1.5 } }}
            >
              <ChevronDown className="h-6 w-6" />
            </motion.button>
          </motion.div>
          {/* Animated Particle Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3, transition: { duration: 2 } }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
                animate={{
                  y: [0, -1000],
                  opacity: [0, 1, 0],
                  transition: { duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 2 },
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Sección Quiénes Somos */}
      <section id="about-section" className="py-20" ref={(el) => addToRefs(el, 0)}>
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate={isVisible[0] ? "visible" : "hidden"}
            variants={bannerVariants}
          >
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-[#CB6406]">QUIÉNES</span>{' '}
              <span className="text-[#0B1CBE]">SOMOS</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Desde 1990, Ferretería Gigante ha sido más que una ferretería: somos tus socios en cada proyecto, 
              con soluciones creativas y un espíritu innovador que nos distingue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sección Valores con Animaciones */}
      <section className="bg-[#fbfbfb] py-20" ref={(el) => addToRefs(el, 1)}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Misión */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all"
              initial="hidden"
              animate={isVisible[1] ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <motion.div
                className="w-12 h-12 bg-[#CB6406]/10 rounded-full flex items-center justify-center mb-6"
                animate={{ rotate: 360, transition: { duration: 2, repeat: Infinity, ease: "linear" } }}
              >
                <Target className="h-6 w-6 text-[#CB6406]" />
              </motion.div>
              <h3 className="text-xl font-bold mb-4">Nuestra Misión</h3>
              <p className="text-gray-600">
                Inspirar y equipar a nuestros clientes con herramientas y soluciones únicas para dar vida a sus ideas.
              </p>
            </motion.div>

            {/* Visión */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all"
              initial="hidden"
              animate={isVisible[1] ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <motion.div
                className="w-12 h-12 bg-[#0B1CBE]/10 rounded-full flex items-center justify-center mb-6"
                animate={{ y: [0, -5, 0], transition: { duration: 1.5, repeat: Infinity } }}
              >
                <Eye className="h-6 w-6 text-[#0B1CBE]" />
              </motion.div>
              <h3 className="text-xl font-bold mb-4">Nuestra Visión</h3>
              <p className="text-gray-600">
                Transformar el mundo ferretero con creatividad y pasión, siendo pioneros en innovación.
              </p>
            </motion.div>

            {/* Valores */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all"
              initial="hidden"
              animate={isVisible[1] ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-12 h-12 bg-[#CB6406]/10 rounded-full flex items-center justify-center mb-6"
                animate={{ scale: [1, 1.2, 1], transition: { duration: 1, repeat: Infinity } }}
              >
                <Heart className="h-6 w-6 text-[#CB6406]" />
              </motion.div>
              <h3 className="text-xl font-bold mb-4">Nuestros Valores</h3>
              <ul className="text-gray-600 space-y-2">
                {['Creatividad', 'Pasión', 'Innovación', 'Confianza'].map((value, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, transition: { delay: i * 0.2 } }}
                  >
                    <span className="text-[#CB6406] mr-2">•</span> {value}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white" ref={(el) => addToRefs(el, 2)}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Nuestro Viaje desde <span className="text-[#CB6406]">1990</span>
          </h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Línea vertical central */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#0B1CBE]"
              style={{ height: '100%', top: 0 }}
              initial={{ height: 0 }}
              animate={isVisible[2] ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 1.5 }}
            />

            {/* 1990 */}
            <motion.div
              className="relative mb-16"
              initial={{ opacity: 0, x: -100 }}
              animate={isVisible[2] ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-2xl font-bold text-[#CB6406]">1990</h3>
                  <p className="text-gray-600 mt-2">
                    Nace Ferretería Gigante, con una pequeña tienda y grandes sueños.
                    El comienzo de una historia de servicio y dedicación.
                  </p>
                </div>
                <div className="w-8 h-8 absolute left-1/2 transform -translate-x-1/2 bg-[#CB6406] rounded-full border-4 border-white" />
                <div className="w-1/2 pl-8"></div>
              </div>
            </motion.div>

            {/* 2015 */}
            <motion.div
              className="relative mb-16"
              initial={{ opacity: 0, x: 100 }}
              animate={isVisible[2] ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="w-8 h-8 absolute left-1/2 transform -translate-x-1/2 bg-[#0B1CBE] rounded-full border-4 border-white" />
                <div className="w-1/2 pl-8">
                  <h3 className="text-2xl font-bold text-[#0B1CBE]">2015</h3>
                  <p className="text-gray-600 mt-2">
                    25 años de crecimiento continuo. Expansión de nuestras instalaciones
                    y ampliación de nuestra gama de productos.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Actual */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -100 }}
              animate={isVisible[2] ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-2xl font-bold text-[#CB6406]">Actual</h3>
                  <p className="text-gray-600 mt-2">
                    Líder en el mercado ferretero, con tecnología de punta
                    y el mejor servicio al cliente. Tu socio confiable en cada proyecto.
                  </p>
                </div>
                <div className="w-8 h-8 absolute left-1/2 transform -translate-x-1/2 bg-[#CB6406] rounded-full border-4 border-white" />
                <div className="w-1/2 pl-8"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección CTA */}
      <section className="bg-[#0B1CBE] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
          >
            ¿Listo para construir algo increíble?
          </motion.h2>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3, duration: 1 } }}
          >
            Juntos, hagamos realidad tus ideas
          </motion.p>
          <motion.button
            className="bg-[#CB6406] px-8 py-3 rounded-lg font-medium hover:bg-[#CB6406]/90 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Contáctanos
          </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  );
}