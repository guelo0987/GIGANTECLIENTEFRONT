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

export default function DetalleProducto() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

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

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(1, prev - 1));
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
      
      {/* Agregamos el SearchBar después del Header */}
      <div className="container mt-6 mx-auto px-4 py-4">
        <SearchBar />
      </div>
      
      {/* Breadcrumb */}
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

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8 relative">
        <div className="bg-white rounded-lg shadow-md mx-auto
          w-full max-w-[1140px] 
          min-h-[484px] md:h-[484px]
          overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 h-full relative">
            {/* Columna izquierda - Imagen */}
            <div className="flex items-center justify-center p-4 md:p-8 relative
              h-[300px] md:h-full"
            >
              <div className="w-full h-[250px] md:h-[350px] flex items-center justify-center">
                <img 
                  src={getStorageUrl(product.imageUrl)}
                  alt={product.nombre}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              {/* Línea vertical separadora - solo visible en desktop */}
              <div className="hidden md:block absolute right-0 top-8 bottom-8 w-px bg-gray-200" />
            </div>

            {/* Línea horizontal separadora - solo visible en mobile */}
            <div className="md:hidden w-full h-px bg-gray-200 mx-auto" />

            {/* Columna derecha - Información */}
            <div className="flex flex-col justify-center p-4 md:p-8">
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h1 className="text-2xl md:text-[32px] text-[#1B1B1B]">{product.nombre}</h1>
                  <div className="flex flex-col md:flex-row gap-2 md:gap-8 mt-2 md:mt-4 text-gray-600 text-sm md:text-base">
                    <div>
                      <span>Disponible: </span>
                      <span className="font-medium">{product.stock ? "Si": 'No'}</span>
                    </div>
                    <div>
                      <span>Código: </span>
                      <span className="font-medium">{product.codigo}</span>
                    </div>
                  
                  </div>
                </div>

                <div>
                  <div className="text-[#0039A6] text-sm md:text-base">
                    <span className="font-medium">Marca: </span>
                    <span>{product.marca}</span>
                  </div>
                </div>

                {product.descripcion && (
                  <div>
                    <h2 className="font-medium mb-1 md:mb-2 text-sm md:text-base">Detalles del Producto:</h2>
                    <p className="text-gray-600 text-sm md:text-base line-clamp-3">{product.descripcion}</p>
                  </div>
                )}

                {/* Botones de carrito y Carrito Logo */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col">
            {/* Línea separadora */}
            <div className="w-full h-px bg-gray-200 my-6 mb-10" />
        </div>


      {/* Similar Products */}
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
