import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { productoService } from '../Controllers/productoService';
import { ShoppingCart } from 'lucide-react';
import ProductDetail from '../Components/ProductDetail';
import Card from '../Components/card';
import SearchBar from '../Components/SearchBar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getStorageUrl } from '../lib/storage';
import { motion } from 'framer-motion';
import { FreeMode, Thumbs, Zoom } from 'swiper/modules';
import { Share2, Truck, Clock, ShieldCheck, Phone } from 'lucide-react';

export default function DetalleProducto() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState('descripcion');

  useEffect(() => {
    const fetchProductAndSimilar = async () => {
      if (!codigo) return;
      
      try {
        const productData = await productoService.getProductoById(codigo);
        setProduct(productData);
        
        if (productData.categoria?.id && productData.subCategoria?.id) {
          const similarProductsData = await productoService.getProductosBySubCategoria(
            productData.categoria.id,
            productData.subCategoria.id
          );
          const filteredSimilarProducts = similarProductsData.filter(p => p.codigo !== codigo);
          setSimilarProducts(filteredSimilarProducts);
        }
      } catch (err) {
        setError('Error al cargar el producto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndSimilar();
  }, [codigo]);

  const handleCategoryClick = (categoryName) => {
    navigate(`/catalogo?category=${categoryName.toLowerCase()}`);
  };

  const handleSubcategoryClick = (subcategoryName) => {
    navigate(`/catalogo?subcategory=${subcategoryName}`);
  };

  const handleWhatsAppClick = () => {
    const message = `Hola, estoy interesado en el producto: ${product.nombre} (Código: ${product.codigo})`;
    const phoneNumber = '1234567890'; // Replace with your actual phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfbfb]">
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#CB6406]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#fbfbfb]">
        <Header />
        <div className="flex justify-center items-center h-[60vh] text-red-500">
          {error || 'Producto no encontrado'}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfb] font-rubik">
      <Header />
      
      <div className="container mt-6 mx-auto px-4 py-4">
        <SearchBar />
      </div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-500">
          <span 
            onClick={() => handleCategoryClick(product.categoria?.nombre)}
            className="cursor-pointer hover:text-[#CB6406]"
          >
            {product.categoria?.nombre}
          </span>
          <span>→</span>
          <span 
            onClick={() => handleSubcategoryClick(product.subCategoria?.nombre)}
            className="cursor-pointer hover:text-[#CB6406]"
          >
            {product.subCategoria?.nombre}
          </span>
          <span>→</span>
          <span className="text-[#CB6406]">{product.nombre}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="relative">
              <Swiper
                style={{
                  '--swiper-navigation-color': '#CB6406',
                  '--swiper-pagination-color': '#CB6406',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                zoom={{
                  maxRatio: 2,
                  minRatio: 1,
                }}
                modules={[FreeMode, Navigation, Thumbs, Zoom]}
                className="mb-4 bg-gray-50 rounded-lg"
              >
                {product.imageUrl ? (
                  <SwiperSlide className="cursor-zoom-in">
                    <div 
                      className="swiper-zoom-container" 
                      onClick={() => setIsZoomed(!isZoomed)}
                    >
                      <img 
                        src={getStorageUrl(product.imageUrl)} 
                        className="w-full h-96 object-contain" 
                        alt={product.nombre}
                      />
                    </div>
                  </SwiperSlide>
                ) : (
                  <SwiperSlide>
                    <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">Sin imagen</span>
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
              
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="hidden"
              >
              </Swiper>
            </div>
            
            <div>
              {product.marca && (
                <p className="text-sm font-medium text-orange-600 mb-2">{product.marca}</p>
              )}
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {product.nombre}
              </h1>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium">
                    {product.stock > 0 ? 'En stock' : 'Agotado'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Código: </span>
                    {product.codigo}
                  </div>
                  <div>
                    <span className="font-medium">Categoría: </span>
                    {product.categoria?.nombre}
                  </div>
                  {product.subCategoria && (
                    <div>
                      <span className="font-medium">Subcategoría: </span>
                      {product.subCategoria?.nombre}
                    </div>
                  )}
                  {product.medidas && (
                    <div>
                      <span className="font-medium">Medidas: </span>
                      {product.medidas}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b py-4">
                  <div className="flex items-center gap-2">
                    <Truck size={18} className="text-orange-600" />
                    <span className="text-sm">Entrega disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-orange-600" />
                    <span className="text-sm">Entrega en 24-48h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-orange-600" />
                    <span className="text-sm">Garantía de calidad</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                    onClick={handleWhatsAppClick}
                  >
                    <Phone size={18} />
                    Contactar por WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('descripcion')}
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'descripcion'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Descripción
              </button>
              <button
                onClick={() => setActiveTab('especificaciones')}
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'especificaciones'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Especificaciones
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'descripcion' ? (
                <div className="prose prose-orange max-w-none">
                  <p>{product.descripcion || 'No hay descripción disponible.'}</p>
                </div>
              ) : (
                <div className="prose prose-orange max-w-none">
                  <table className="min-w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Código</td>
                        <td className="py-2">{product.codigo}</td>
                      </tr>
                      {product.marca && (
                        <tr className="border-b">
                          <td className="py-2 font-medium">Marca</td>
                          <td className="py-2">{product.marca}</td>
                        </tr>
                      )}
                      {product.categoria && (
                        <tr className="border-b">
                          <td className="py-2 font-medium">Categoría</td>
                          <td className="py-2">{product.categoria.nombre}</td>
                        </tr>
                      )}
                      {product.subCategoria && (
                        <tr className="border-b">
                          <td className="py-2 font-medium">Subcategoría</td>
                          <td className="py-2">{product.subCategoria.nombre}</td>
                        </tr>
                      )}
                      {product.medidas && (
                        <tr className="border-b">
                          <td className="py-2 font-medium">Medidas</td>
                          <td className="py-2">{product.medidas}</td>
                        </tr>
                      )}
                      <tr className="border-b">
                        <td className="py-2 font-medium">Stock</td>
                        <td className="py-2">{product.stock > 0 ? 'Disponible' : 'No disponible'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col">
            <div className="w-full h-px bg-gray-200 my-6 mb-10" />
        </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Productos Similares</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={similarProducts.length > 4}
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
          {similarProducts.map((product) => (
            <SwiperSlide key={product.codigo} className="flex justify-center">
              <Card 
                title={product.nombre}
                image={getStorageUrl(product.imageUrl)}
                category={product.categoria?.nombre}
                stock={product.stock}
                codigo={product.codigo}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Footer />
    </div>
  );
}
