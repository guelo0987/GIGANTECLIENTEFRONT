import { Search, X, Clock, TrendingUp, Loader2 } from "lucide-react"
import { useState, useEffect, useRef, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { productoService } from '../Controllers/productoService'
import { getStorageUrl } from '../lib/storage'
import { motion, AnimatePresence } from "framer-motion"

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const [popularSearches, setPopularSearches] = useState([
    "Cerámicas", "Porcelanatos", "Griferías", "Pinturas", "Herramientas"
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)
  const searchCache = useRef({})
  const navigate = useNavigate()

  // Cargar búsquedas recientes del localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches')
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored))
      } catch (e) {
        console.error('Error parsing recent searches', e)
      }
    }
  }, [])

  // Función para cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          !inputRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Optimizado: memoización de resultados para evitar renderizados innecesarios
  const displayResults = useMemo(() => {
    if (searchTerm.length === 0) return []
    return searchResults
  }, [searchResults, searchTerm])

  // Búsqueda con caché
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.length >= 2) {
        // Verificar si tenemos resultados en caché
        if (searchCache.current[searchTerm]) {
          setSearchResults(searchCache.current[searchTerm])
          setShowDropdown(true)
          return
        }

        setIsLoading(true)
        try {
          const data = await productoService.getAllProductos()
          
          // Algoritmo de búsqueda mejorado con pesos por relevancia
          const results = data
            .filter(product => {
              const searchLower = searchTerm.toLowerCase()
              const nameMatch = product.nombre?.toLowerCase().includes(searchLower)
              const categoryMatch = product.categoria?.nombre?.toLowerCase().includes(searchLower)
              const brandMatch = product.marca?.toLowerCase().includes(searchLower)
              const descMatch = product.descripcion?.toLowerCase().includes(searchLower)
              const measureMatch = product.medidas?.toLowerCase().includes(searchLower)
              const codeMatch = product.codigo?.toString().toLowerCase().includes(searchLower)
              
              return nameMatch || categoryMatch || brandMatch || descMatch || measureMatch || codeMatch
            })
            .map(product => {
              // Calcular relevancia
              let relevance = 0
              if (product.nombre?.toLowerCase().includes(searchTerm.toLowerCase())) relevance += 10
              if (product.marca?.toLowerCase().includes(searchTerm.toLowerCase())) relevance += 5
              if (product.categoria?.nombre?.toLowerCase().includes(searchTerm.toLowerCase())) relevance += 3
              
              // Destacar si es cerámica (requerimiento específico)
              if (product.categoria?.nombre === "Ceramicas y Porcelanatos") {
                relevance += 2
              }
              
              return {...product, relevance}
            })
            .sort((a, b) => b.relevance - a.relevance)
            .slice(0, 5)
          
          // Guardar en caché
          searchCache.current[searchTerm] = results
          
          setSearchResults(results)
          setShowDropdown(true)
        } catch (error) {
          console.error('Error searching products:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setSearchResults([])
        setShowDropdown(false)
      }
    }, 250) // Debounce ligeramente más rápido

    return () => clearTimeout(delayDebounce)
  }, [searchTerm])

  // Navegación por teclado
  const handleKeyDown = (e) => {
    if (!showDropdown) return
    
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => {
        // Si hay sugerencias, incluirlas en la navegación
        const maxIndex = searchResults.length + 
                        (searchTerm.length > 0 ? 0 : popularSearches.length + recentSearches.length) - 1
        return prev < maxIndex ? prev + 1 : 0
      })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => {
        const maxIndex = searchResults.length + 
                        (searchTerm.length > 0 ? 0 : popularSearches.length + recentSearches.length) - 1
        return prev > 0 ? prev - 1 : maxIndex
      })
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      
      const totalRecent = recentSearches.length
      const totalPopular = popularSearches.length
      
      if (searchTerm.length === 0) {
        if (selectedIndex < totalRecent) {
          const term = recentSearches[selectedIndex]
          setSearchTerm(term)
          handleSearch(e, term)
        } else if (selectedIndex < totalRecent + totalPopular) {
          const term = popularSearches[selectedIndex - totalRecent]
          setSearchTerm(term)
          handleSearch(e, term)
        }
      } else if (selectedIndex < searchResults.length) {
        handleProductClick(searchResults[selectedIndex])
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  const handleSearch = (e, overrideTerm = null) => {
    e.preventDefault()
    const term = overrideTerm || searchTerm
    
    if (term) {
      // Guardar en búsquedas recientes
      const updatedRecents = [term, ...recentSearches.filter(s => s !== term)]
      if (updatedRecents.length > 5) updatedRecents.pop()
      
      setRecentSearches(updatedRecents)
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecents))
      
      navigate(`/catalogo?search=${encodeURIComponent(term)}`)
      setShowDropdown(false)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    inputRef.current.focus()
  }

  const handleProductClick = (product) => {
    navigate(`/producto/${product.codigo}`);
    setShowDropdown(false);
    setSearchTerm("");
  };

  // Resaltar coincidencias en el texto
  const highlightMatch = (text, query) => {
    if (!text || !query || query.length < 2) return text
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, i) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return <span key={i} className="bg-orange-100 text-[#CB6406]">{part}</span>
      }
      return part
    })
  }

  // Remover una búsqueda reciente
  const removeRecentSearch = (e, term) => {
    e.stopPropagation()
    const updated = recentSearches.filter(s => s !== term)
    setRecentSearches(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
  }

  return (
    <div className="relative w-full max-w-[800px] mx-auto">
      <div className="flex items-center w-full bg-white rounded-full shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl focus-within:ring-2 focus-within:ring-[#CB6406]/30">
        <div className="flex items-center flex-1 px-4">
          <form onSubmit={handleSearch} className="flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={handleKeyDown}
              placeholder="¿Qué estás buscando hoy?"
              className="w-full py-3.5 text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none text-base"
              aria-label="Buscar productos"
            />
            {searchTerm && (
              <button 
                type="button" 
                onClick={clearSearch}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </form>
        </div>
        <button 
          type="submit" 
          onClick={handleSearch}
          className="p-4 bg-gradient-to-r from-[#CB6406] to-[#EB7307] text-white hover:from-[#B55805] hover:to-[#D36606] transition-colors"
        >
          <Search className="h-6 w-6" />
        </button>
      </div>

      {/* Dropdown mejorado con animaciones */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div 
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {isLoading ? (
              <div className="p-6 flex justify-center items-center">
                <Loader2 className="h-6 w-6 animate-spin text-[#CB6406]" />
                <span className="ml-2 text-gray-600">Buscando productos...</span>
              </div>
            ) : searchTerm.length >= 2 ? (
              <>
                {displayResults.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {displayResults.map((product, index) => (
                      <motion.button
                        key={product.codigo}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15, delay: index * 0.05 }}
                        onClick={() => handleProductClick(product)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-4 ${
                          selectedIndex === index ? 'bg-orange-50' : ''
                        }`}
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={getStorageUrl(product.imageUrl)}
                            alt={product.nombre}
                            className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = '/placeholder-image.png'
                            }}
                          />
                          {product.categoria?.nombre === "Ceramicas y Porcelanatos" && (
                            <div className="absolute top-0 right-0 bg-[#CB6406] text-white text-[8px] px-1 py-0.5">
                              Cerámica
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 truncate">
                            {highlightMatch(product.nombre, searchTerm)}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {highlightMatch([
                              product.categoria?.nombre,
                              product.marca,
                              product.medidas
                            ].filter(Boolean).join(' • '), searchTerm)}
                          </div>
                          {product.descripcion && (
                            <div className="text-xs text-gray-400 truncate mt-1">
                              {highlightMatch(product.descripcion, searchTerm)}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-[#CB6406] font-semibold">
                          Ver detalles
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      No se encontraron resultados para "{searchTerm}"
                    </div>
                    <div className="text-sm text-gray-500">
                      Prueba con otros términos o revisa la ortografía
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 divide-y divide-gray-100">
                {/* Búsquedas recientes */}
                {recentSearches.length > 0 && (
                  <div className="pb-4">
                    <div className="flex items-center mb-2">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <h3 className="text-sm font-medium text-gray-500">Búsquedas recientes</h3>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((term, index) => (
                        <button
                          key={`recent-${term}`}
                          onClick={() => {
                            setSearchTerm(term)
                            handleSearch({ preventDefault: () => {} }, term)
                          }}
                          className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded flex items-center ${
                            selectedIndex === index ? 'bg-orange-50' : ''
                          }`}
                        >
                          <span className="flex-1">{term}</span>
                          <button 
                            onClick={(e) => removeRecentSearch(e, term)}
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Búsquedas populares */}
                <div className={recentSearches.length > 0 ? "pt-4" : ""}>
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-4 w-4 text-gray-400 mr-2" />
                    <h3 className="text-sm font-medium text-gray-500">Búsquedas populares</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term, index) => (
                      <button
                        key={`popular-${term}`}
                        onClick={() => {
                          setSearchTerm(term)
                          handleSearch({ preventDefault: () => {} }, term)
                        }}
                        className={`px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full ${
                          selectedIndex === recentSearches.length + index ? 'bg-orange-100 text-[#CB6406]' : 'text-gray-700'
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
