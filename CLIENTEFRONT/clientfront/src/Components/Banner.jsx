import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import axios from 'axios'
import { endpoints } from '../Api/Endpoints'

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
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

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Auto-advance banner every 5 seconds
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(nextBanner, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  if (isLoading || banners.length === 0) {
    return (
      <div className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full bg-gray-200 animate-pulse" />
    );
  }

  return (
    <div className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500"
        style={{
          backgroundImage: `url(http://localhost:8000/Banners/${banners[currentBanner]?.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Navigation Arrows - Solo visible en desktop */}
      {banners.length > 1 && (
        <div className="hidden md:block">
          <button 
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-[#CB6406]" />
          </button>
          <button 
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-[#CB6406]" />
          </button>
        </div>
      )}

      {/* Pagination Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentBanner ? 'bg-[#CB6406] w-4' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

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
        
        {/* Botón Moderno */}
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
  )
}
