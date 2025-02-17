import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Banner() {
  return (
    <div className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Navigation Arrows - Solo visible en desktop */}
      <div className="hidden md:block">
        <button className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors">
          <ChevronLeft className="h-6 w-6 text-[#CB6406]" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors">
          <ChevronRight className="h-6 w-6 text-[#CB6406]" />
        </button>
      </div>

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
