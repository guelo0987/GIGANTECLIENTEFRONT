import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { productoService } from '../Controllers/productoService';
import { ShoppingCart } from 'lucide-react';
import ProductDetail from '../Components/ProductDetail';
import Card from '../Components/card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function DetalleProducto() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!codigo) return;
      
      try {
        const data = await productoService.getProductoById(codigo);
        console.log("Producto obtenido:", data); // Para debug
        setProduct(data);
      } catch (err) {
        setError('Error al cargar el producto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [codigo]);

  const handleCategoryClick = (categoryName) => {
    navigate(`/catalogo?category=${categoryName}`);
  };

  const handleSubcategoryClick = (subcategoryName) => {
    navigate(`/catalogo?subcategory=${subcategoryName}`);
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
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Imagen con altura fija */}
            <div className="flex items-center justify-center h-[400px] md:h-[500px]">
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={`http://localhost:8000/Productos/${product.imageUrl}`}
                  alt={product.nombre}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Información */}
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-900">{product.nombre}</h1>
                <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                  product.stock 
                    ? 'bg-green-50/80 text-green-600/90'
                    : 'bg-gray-50/80 text-gray-600/90'
                }`}>
                  {product.stock ? 'Disponible' : 'No disponible'}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Código:</span> {product.codigo}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Marca:</span> {product.marca}
                </p>
              </div>

              {product.descripcion && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Descripción</h2>
                  <p className="text-gray-600">{product.descripcion}</p>
                </div>
              )}

              <button 
                className="w-full md:w-auto px-6 py-2 bg-[#CB6406] hover:bg-[#B55705] text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                disabled={!product.stock}
              >
                <ShoppingCart className="h-5 w-5" />
                {product.stock ? 'Agregar al carrito' : 'No disponible'}
              </button>
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
        <h2 className="text-2xl font-bold mb-8">Productos Similares</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="product-swiper mt-8"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <SwiperSlide key={item}>
              <Card 
                title="Crown Summit Backpack"
                image="/products/llave_lavamano.png"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Footer />
    </div>
  );
}
