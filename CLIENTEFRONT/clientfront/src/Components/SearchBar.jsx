import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { categories } from '../lib/mockData'

export default function SearchBar() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "all")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchTerm) params.append('search', searchTerm)
    if (selectedCategory !== 'all') params.append('category', selectedCategory)
    navigate(`/catalogo?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full max-w-[800px] mx-auto bg-white rounded-full shadow-lg">
      <div className="flex items-center flex-1 px-4">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="whitespace-nowrap font-bold px-4 py-2 text-gray-600 hover:text-[#CB6406] transition-colors focus:outline-none"
        >
          <option value="all">TODAS LAS CATEGORÍAS</option>
          {categories.map(cat => (
            <option key={cat.name} value={cat.name.toLowerCase()}>
              {cat.name}
            </option>
          ))}
        </select>
        <div className="w-px h-6 bg-gray-300 mx-4"></div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="¿Qué estás buscando hoy?"
          className="w-full py-3 text-gray-600 placeholder-gray-400 bg-transparent focus:outline-none"
        />
      </div>
      <button type="submit" className="p-4 text-gray-600 hover:text-[#CB6406] transition-colors">
        <Search className="h-6 w-6" />
      </button>
    </form>
  )
}
