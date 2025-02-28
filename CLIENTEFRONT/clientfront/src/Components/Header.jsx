import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChevronDown, ShoppingCart, User } from "lucide-react"
import { categoriaService } from '../Controllers/categoriaService'

export default function Header() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [categories, setCategories] = useState([])
  const [moreCategories, setMoreCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const mainCategories = [
    "Plomería",
    "Materiales de Construcción",
    "Eléctricos",
    "Pintura",
    "Herramientas",
    "Hogar",
    "Cerámicas y Porcelanatos"
  ]

  const mainNavItems = [
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Vacantes", href: "/vacantes" },
  ]

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await categoriaService.getAllCategorias();
        const sortedCategories = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        
        const main = [];
        const more = [];
        
        sortedCategories.forEach(cat => {
          if (mainCategories.includes(cat.nombre)) {
            main.push(cat);
          } else {
            more.push(cat);
          }
        });

        setCategories(main);
        setMoreCategories(more);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category, subcategory = null) => {
    let url = '/catalogo';
    const params = new URLSearchParams();

    if (category) {
      params.append('category', category);
    }

    if (subcategory) {
      params.append('subcategory', subcategory);
    }

    url = `${url}?${params.toString()}`;
    
    window.location.href = url;

    setIsCategoryOpen(false);
    setActiveCategory(null);
  };

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
        <div className="container mx-auto px-4">
          {/* Desktop Categories */}
          <nav className="hidden lg:flex items-center justify-center space-x-4">
            {!isLoading && categories.map((category) => (
              <div key={category.id} className="relative group">
                <button
                  onClick={() => handleCategoryClick(category.nombre)}
                  className="px-4 py-3 text-base font-medium text-white hover:bg-orange-700 transition-all duration-300 flex items-center"
                >
                  {category.nombre}
                  {category.subCategoria?.length > 0 && (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </button>
                
                {/* Desktop Subcategorías dropdown */}
                {category.subCategoria?.length > 0 && (
                  <div className="absolute left-0 z-10 w-48 py-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {category.subCategoria.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(category.nombre, sub.nombre);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                      >
                        {sub.nombre}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Desktop Más departamentos dropdown */}
            {!isLoading && moreCategories.length > 0 && (
              <div className="relative group">
                <button className="px-4 py-3 text-base font-medium text-white hover:bg-orange-700 transition-all duration-300 flex items-center">
                  Más Departamentos
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 z-10 w-48 py-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {moreCategories.map((category) => (
                    <div key={category.id} className="relative group/sub">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 flex items-center justify-between"
                        onClick={() => handleCategoryClick(category.nombre)}
                      >
                        {category.nombre}
                        {category.subCategoria?.length > 0 && (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                      {category.subCategoria?.length > 0 && (
                        <div className="absolute left-full top-0 w-48 py-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300">
                          {category.subCategoria.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCategoryClick(category.nombre, sub.nombre);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                            >
                              {sub.nombre}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Mobile Category Dropdown */}
          <div className="lg:hidden p-3">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full flex items-center justify-center px-4 py-2 text-white border border-orange-400 rounded"
            >
              <span className="font-medium">Categorías</span>
              <ChevronDown className={`ml-2 h-5 w-5 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`mt-1 transition-all duration-300 ease-in-out overflow-hidden ${
              isCategoryOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}>
              {/* Mobile Categorías Principales */}
              {!isLoading && categories.map((category) => (
                <div key={category.id}>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleCategoryClick(category.nombre)}
                      className="flex-1 px-4 py-2 text-white hover:bg-orange-700 transition-colors duration-200 text-center"
                    >
                      <span>{category.nombre}</span>
                    </button>
                    {category.subCategoria?.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCategory(activeCategory === category.nombre ? null : category.nombre);
                        }}
                        className="px-2 py-2 text-white hover:bg-orange-700 transition-colors duration-200"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                          activeCategory === category.nombre ? 'rotate-180' : ''
                        }`} />
                      </button>
                    )}
                  </div>
                  
                  {category.subCategoria?.length > 0 && (
                    <div className={`bg-orange-800 transition-all duration-300 ${
                      activeCategory === category.nombre ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                      {category.subCategoria.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleCategoryClick(category.nombre, sub.nombre)}
                          className="block w-full text-center px-8 py-2 text-sm text-white hover:bg-orange-900 transition-colors duration-200"
                        >
                          {sub.nombre}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Separador */}
              {!isLoading && moreCategories.length > 0 && (
                <div className="border-t border-orange-500 my-2"></div>
              )}

              {/* Mobile Más Departamentos */}
              {!isLoading && moreCategories.map((category) => (
                <div key={category.id}>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleCategoryClick(category.nombre)}
                      className="flex-1 px-4 py-2 text-white hover:bg-orange-700 transition-colors duration-200 text-center"
                    >
                      <span>{category.nombre}</span>
                    </button>
                    {category.subCategoria?.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCategory(activeCategory === category.nombre ? null : category.nombre);
                        }}
                        className="px-2 py-2 text-white hover:bg-orange-700 transition-colors duration-200"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                          activeCategory === category.nombre ? 'rotate-180' : ''
                        }`} />
                      </button>
                    )}
                  </div>
                  
                  {category.subCategoria?.length > 0 && (
                    <div className={`bg-orange-800 transition-all duration-300 ${
                      activeCategory === category.nombre ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                      {category.subCategoria.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleCategoryClick(category.nombre, sub.nombre)}
                          className="block w-full text-center px-8 py-2 text-sm text-white hover:bg-orange-900 transition-colors duration-200"
                        >
                          {sub.nombre}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

