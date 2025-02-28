import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Banner from '../Components/Banner';
import SearchBar from '../Components/SearchBar';
import Card from '../Components/card';
import Footer from '../Components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import { categoriaService } from '../Controllers/categoriaService';
import { productoService } from '../Controllers/productoService';

export default function Dashboard() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('destacados');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const mainCategories = [
    "Cerámicas y Porcelanatos",
    "Eléctricos",
    "Herramientas",
    "Hogar",
    "Materiales de Construcción",
    "Pintura",
    "Plomería"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Obtener categorías
        const categoriesData = await categoriaService.getAllCategorias();
        const filteredCategories = categoriesData
          .filter(cat => mainCategories.includes(cat.nombre))
          .map(cat => ({
            ...cat,
            icon: `/icons/${cat.nombre.toLowerCase()
              .replace(/ y /g, '_y_')
              .replace(/ /g, '_')
              .replace(/á/g, 'a')
              .replace(/é/g, 'e')
              .replace(/í/g, 'i')
              .replace(/ó/g, 'o')
              .replace(/ú/g, 'u')}.png`
          }));
        setCategories(filteredCategories);

        // Obtener productos destacados según el filtro seleccionado
        if (selectedFilter === 'destacados') {
          // Obtener cerámicas destacadas
          const ceramicasDestacadas = await productoService.getCeramicasDestacadas();
          setProducts(ceramicasDestacadas);

          // Obtener productos destacados excluyendo cerámicas
          const destacados = await productoService.getProductosDestacadosExcluyendoCeramicas();
          setFilteredProducts(destacados);
        } else if (selectedFilter === 'nuevos') {
          // Para nuevos productos, puedes mantener la misma lógica o crear nuevos endpoints si es necesario
          const ceramicasDestacadas = await productoService.getCeramicasDestacadas();
          setProducts(ceramicasDestacadas);
          
          const nonCeramicProducts = await productoService.getProductosDestacadosExcluyendoCeramicas();
          setFilteredProducts(nonCeramicProducts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilter]);

  const handleCategoryClick = (category) => {
    navigate(`/catalogo?category=${category.nombre.toLowerCase()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#CB6406]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header y Banner con fondo blanco */}
      <div className="bg-white">
        <Header />
        <Banner />
      </div>

      {/* SearchBar con fondo blanco */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <SearchBar />
        </div>
      </div>

      {/* Contenido principal con fondo gris */}
      <div className="bg-[#fbfbfb] min-h-screen">
        <main className="container mx-auto px-4 py-8">
          {/* Grid de Categorías */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 rounded-xl hover:shadow-md transition-all cursor-pointer hover:scale-105"
              >
                <img
                  src={category.icon}
                  alt={category.nombre}
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mb-2 sm:mb-3 md:mb-4"
                />
                <span className="text-xs sm:text-sm md:text-base font-medium text-center text-gray-900">
                  {category.nombre}
                </span>
              </div>
            ))}
          </div>

          {/* Sección de Productos Destacados */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">
              CONOCE NUESTROS
              <span className="text-[#CB6406]"> PRODUCTOS </span>
              <span className="text-[#0B1CBE]"> DESTACADOS </span>
            </h2>
            <p className="text-gray-600 mb-4 mt-4">
              Descubre nuestros productos destacados: calidad,
              innovación y lo mejor para ti
            </p>
          </div>

          {/* Sección de filtros de productos */}
          <div className="mt-28 flex flex-col">

            <div className="flex items-end justify-start gap-8">
              <button className="text-lg hover:text-[#CB6406] transition-colors group">
                
                <div className="h-0.5 w-full bg-transparent group-hover:bg-[#CB6406] transition-colors" />
              </button>
            </div>

            <div className="flex items-center justify-end gap-8">
              <button 
                className={`text-xs transition-colors group ${
                  selectedFilter === 'destacados' ? 'text-[#CB6406]' : 'hover:text-[#CB6406]'
                }`}
                onClick={() => setSelectedFilter('destacados')}
              >
                DESTACADOS
                <div className={`h-0.5 w-full ${
                  selectedFilter === 'destacados' ? 'bg-[#CB6406]' : 'bg-transparent group-hover:bg-[#CB6406]'
                } transition-colors`} />
              </button>
            
              <button 
                className={`text-xs transition-colors group ${
                  selectedFilter === 'nuevos' ? 'text-[#CB6406]' : 'hover:text-[#CB6406]'
                }`}
                onClick={() => setSelectedFilter('nuevos')}
              >
                NUEVOS
                <div className={`h-0.5 w-full ${
                  selectedFilter === 'nuevos' ? 'bg-[#CB6406]' : 'bg-transparent group-hover:bg-[#CB6406]'
                } transition-colors`} />
              </button>
            </div>

            {/* Línea separadora */}
            <div className="w-full h-px bg-gray-200 my-6 mb-10" />
          </div>

          {/* Swiper de Productos */}
          <div className="container mx-auto">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={true}
              loop={true}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                  centeredSlides: false,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                  centeredSlides: false,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                  centeredSlides: true,
                },
              }}
              className="product-swiper mt-4 md:mt-8 px-4"
            >
              {filteredProducts.map((product) => (
                <SwiperSlide key={product.codigo} className="flex justify-center">
                  <div className="w-full max-w-[280px]">
                    <Card
                      title={product.nombre}
                      image={`http://localhost:8000/Productos/${product.imageUrl}`}
                      category={product.categoria?.nombre}
                      stock={product.stock}
                      codigo={product.codigo}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Nueva sección de Cerámicas */}
          <div className="mt-40 container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
              NUESTRA COLECCIÓN DE
              <span className="text-[#CB6406]"> CERÁMICAS </span>
            </h2>

            {/* Filtros para cerámicas */}
            <div className="flex items-center justify-end gap-8 mb-6">
              <button 
                className={`text-xs transition-colors group ${
                  selectedFilter === 'destacados' ? 'text-[#CB6406]' : 'hover:text-[#CB6406]'
                }`}
                onClick={() => setSelectedFilter('destacados')}
              >
                DESTACADOS
                <div className={`h-0.5 w-full ${
                  selectedFilter === 'destacados' ? 'bg-[#CB6406]' : 'bg-transparent group-hover:bg-[#CB6406]'
                } transition-colors`} />
              </button>
              <button 
                className={`text-xs transition-colors group ${
                  selectedFilter === 'nuevos' ? 'text-[#CB6406]' : 'hover:text-[#CB6406]'
                }`}
                onClick={() => setSelectedFilter('nuevos')}
              >
                NUEVOS
                <div className={`h-0.5 w-full ${
                  selectedFilter === 'nuevos' ? 'bg-[#CB6406]' : 'bg-transparent group-hover:bg-[#CB6406]'
                } transition-colors`} />
              </button>
            </div>

            {/* Línea separadora */}
            <div className="w-full h-px bg-gray-200 my-6 mb-10" />
            
            {/* Swiper de Cerámicas */}
            <div className="container mx-auto">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={1.2}
                centeredSlides={true}
                loop={true}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
                breakpoints={{
                  480: {
                    slidesPerView: 2,
                    centeredSlides: false,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                    centeredSlides: false,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    centeredSlides: true,
                  },
                }}
                className="product-swiper mt-4 md:mt-8 px-4"
              >
                {products.map((product) => (
                  <SwiperSlide key={product.codigo} className="flex justify-center">
                    <div className="w-full max-w-[280px]">
                      <Card
                        title={product.nombre}
                        image={`http://localhost:8000/Productos/${product.imageUrl}`}
                        category={product.categoria?.nombre}
                        stock={product.stock}
                        codigo={product.codigo}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="mt-40 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">
              <span className="text-[#CB6406]"> NUESTRAS </span>
              <span className="text-[#0B1CBE]"> MARCAS </span>
            </h2>
            <p className="text-gray-600 mb-4 mt-4">
              Trabajamos con marcas aliadas que garantizan calidad e innovación en cada producto
            </p>
          </div>

          {/* Línea separadora */}
          <div className="w-full h-px bg-gray-300 my-6 mb-10" />

          {/* Swiper de marcas */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              480: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="product-swiper mt-4 md:mt-8 px-4"
          >
            <SwiperSlide className="flex justify-center">
              <img
                src="/icons/popular.png"
                alt="popular"
                className="w-full max-w-[280px] h-auto object-contain aspect-[4/3] max-h-[135px]"
              />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <img
                src="/icons/popular.png"
                alt="popular"
                className="w-full max-w-[280px] h-auto object-contain aspect-[4/3] max-h-[135px]"
              />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <img
                src="/icons/popular.png"
                alt="popular"
                className="w-full max-w-[280px] h-auto object-contain aspect-[4/3] max-h-[135px]"
              />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <img
                src="/icons/argos.png"
                alt="argos"
                className="w-full max-w-[280px] h-auto object-contain aspect-[4/3] max-h-[135px]"
              />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <img
                src="/icons/yale.png"
                alt="yale"
                className="w-full max-w-[280px] h-auto object-contain aspect-[4/3] max-h-[135px]"
              />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <img
                src="/icons/yale.png"
                alt="yale"
                className="w-full max-w-[280px] h-auto object-contain aspect-[4/3] max-h-[135px]"
              />
            </SwiperSlide>
          </Swiper>

          {/* Banner promocional */}
          <div
            className="mt-40 relative w-full h-[357px] shadow-[0px_7px_40px_#C4C4C4]"
            style={{
              position: 'relative',
              width: '100vw',
              left: '50%',
              right: '50%',
              marginLeft: '-50vw',
              marginRight: '-50vw'
            }}
          >
            <div className="relative w-full h-full">
              {/* Imagen de fondo con gradiente más sutil */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), url('/banner_footer.png')`,
                }}
              />

              {/* Contenido superpuesto */}
              <div className="absolute inset-0 flex flex-col justify-center">
                <div className="container mx-auto px-4 md:px-8">
                  <h3 className="text-3xl font-bold mb-2">
                    En <span className="text-[#CB6406]">Gigante</span>
                  </h3>
                  <p className="text-xl mb-6">
                    Todo lo que necesitas para <span className="text-[#CB6406]">Construir</span>,
                    <span className="text-[#0B1CBE]"> Mejorar</span> y
                    <span className="text-[#0B1CBE]"> Reparar </span>
                    para cotizar tus ordenes
                  </p>
                  <button className="bg-[#CB6406] text-white px-8 py-3 rounded-md hover:bg-[#B55805] transition-colors">
                    Contáctanos
                  </button>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
