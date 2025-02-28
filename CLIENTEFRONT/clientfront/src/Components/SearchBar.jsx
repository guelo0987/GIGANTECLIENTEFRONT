import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { productoService } from '../Controllers/productoService'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.length >= 1) {
        setIsLoading(true)
        try {
          const data = await productoService.getAllProductos()
          const filtered = data.filter(product => 
            product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.categoria?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.medidas?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.codigo?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
          setSearchResults(filtered.slice(0, 5))
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
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [searchTerm])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm) {
      navigate(`/catalogo?search=${encodeURIComponent(searchTerm)}`)
      setShowDropdown(false)
    }
  }

  const handleProductClick = (product) => {
    navigate(`/producto/${product.codigo}`)
    setShowDropdown(false)
    setSearchTerm("")
  }

  return (
    <div className="relative w-full max-w-[800px] mx-auto">
      <form onSubmit={handleSearch} className="flex items-center w-full bg-white rounded-full shadow-lg">
        <div className="flex items-center flex-1 px-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
            placeholder="¿Qué estás buscando hoy?"
            className="w-full py-3 text-gray-600 placeholder-gray-400 bg-transparent focus:outline-none"
          />
        </div>
        <button type="submit" className="p-4 text-gray-600 hover:text-[#CB6406] transition-colors">
          <Search className="h-6 w-6" />
        </button>
      </form>

      {/* Dropdown de resultados */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Buscando...</div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map((product) => (
                <button
                  key={product.codigo}
                  onClick={() => handleProductClick(product)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3"
                >
                  <img 
                    src={`http://localhost:8000/Productos/${product.imageUrl}`}
                    alt={product.nombre}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium text-gray-800">{product.nombre}</div>
                    <div className="text-sm text-gray-500">
                      {[
                        product.categoria?.nombre,
                        product.marca,
                        product.medidas
                      ].filter(Boolean).join(' • ')}
                    </div>
                    {product.descripcion && (
                      <div className="text-xs text-gray-400 truncate">
                        {product.descripcion}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : searchTerm.length > 1 && (
            <div className="p-4 text-center text-gray-500">No se encontraron resultados</div>
          )}
        </div>
      )}
    </div>
  )
}
