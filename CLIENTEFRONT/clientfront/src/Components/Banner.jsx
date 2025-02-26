import { useState, useEffect } from "react"
import axios from 'axios'
import { endpoints } from '../Api/Endpoints'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(endpoints.banner.getBanner);
        const activeBanners = response.data.filter(banner => banner.active);
        setBanners(activeBanners);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (isLoading || banners.length === 0) {
    return (
      <div className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full bg-gray-200 animate-pulse" />
    );
  }

  return (
    <div className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="banner-swiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            <div
              className="relative w-full h-full"
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(http://localhost:8000/Banners/${banner.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
              <div className="absolute inset-0 bg-black/10" />
              
              {/* Text Content */}
              <div className="absolute left-8 sm:left-20 md:left-28 lg:left-40 top-1/4 container mx-auto">
                <span className="text-[#CB6406] text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-2 sm:mb-3 block">
                  GRANDES EN
                </span>
                <h1 className="text-[#1a1a1a] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                  BUENOS
                  <br />
                  PRECIOS 
                </h1>
                
                <button className="
                  mt-4 sm:mt-6
                  px-6 sm:px-8 md:px-10
                  py-2 sm:py-3 md:py-4
                  text-sm sm:text-base md:text-lg
                  font-medium
                  text-[#CB6406]
                  bg-transparent
                  border-2
                  border-[#CB6406]
                  rounded-lg
                  hover:bg-[#CB6406]
                  hover:text-white
                  transition-all
                  duration-300
                  transform
                  hover:scale-105
                  hover:shadow-lg
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#CB6406]
                  focus:ring-opacity-50
                ">
                  CONTÁCTANOS
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
