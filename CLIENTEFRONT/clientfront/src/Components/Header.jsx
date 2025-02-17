import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronDown, ShoppingCart, User } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const mainNavItems = [
    { name: "Nosotros", href: "/nosotros" },
    { name: "Servicios", href: "/servicios" },
    { name: "Contacto", href: "/contacto" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Vacantes", href: "/vacantes" },
  ]

  const categoryNavItems = [
    { name: "PLOMERIA", href: "/categoria/plomeria" },
    { name: "MATERIALES DE CONTRUCCIÓN", href: "/categoria/materiales" },
    { name: "ELÉCTRICOS", href: "/categoria/electricos" },
    { name: "PINTURA", href: "/categoria/pintura" },
    { name: "FERRETEROS", href: "/categoria/ferreteros" },
    { name: "HOGAR", href: "/categoria/hogar" },
    { name: "CERAMICA", href: "/categoria/ceramica" },
  ]

  return (
    <header className="w-full border-b font-rubik">
      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Ahora responsivo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/image.png"
              alt="Centro Ferretero Gigante"
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {mainNavItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.href} 
                className="text-lg font-medium text-gray-900 hover:text-blue-700 transition-all duration-300 hover:scale-105"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Profile & Cart */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center cursor-pointer group">
              <User className="h-6 w-6 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
              <div className="ml-2 hidden lg:block">
                <div className="flex items-center">
                  <span className="text-base text-gray-500">Hola,</span>
                  <span className="ml-1 text-base font-medium text-gray-900">Carlos Pérez</span>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-500 group-hover:text-blue-700 group-hover:rotate-180 transition-transform duration-300" />
                </div>
              </div>
            </div>
            <div className="relative cursor-pointer group">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-700 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-orange-500 text-xs text-white flex items-center justify-center font-medium group-hover:scale-110 transition-transform duration-300">
                0
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors duration-300"
          >
            <svg 
              className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 border-t">
            {mainNavItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className="block py-3 text-lg font-medium text-gray-900 hover:text-blue-700 hover:pl-4 transition-all duration-300"
                style={{
                  transitionDelay: `${index * 50}ms`
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-[#CB6406]">
        <div className="container mx-auto">
          {/* Desktop Categories */}
          <nav className="hidden lg:flex items-center justify-between">
            {categoryNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="px-4 py-3 text-base font-medium text-white hover:bg-orange-700 transition-all duration-300 hover:scale-105"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Category Dropdown */}
          <div className="lg:hidden p-3">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-white border border-orange-400 rounded"
            >
              <span className="font-medium">Categorías</span>
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`mt-1 transition-all duration-300 ease-in-out overflow-hidden ${
              isCategoryOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              {categoryNavItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-white hover:bg-orange-700 transition-colors duration-200"
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

