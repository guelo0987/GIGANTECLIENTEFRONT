import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="flex items-center w-full max-w-[800px] mx-auto bg-white rounded-full shadow-lg">
      <div className="flex items-center flex-1 px-4">
        <button className="whitespace-nowrap flex items-center font-bold px-4 py-2 text-gray-600 hover:text-[#CB6406] transition-colors">
          TODAS LAS CATEGORÍAS
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-4"></div>
        <input
          type="text"
          placeholder="¿Qué estás buscando hoy?"
          className="w-full py-3 text-gray-600 placeholder-gray-400 bg-transparent focus:outline-none"
        />
      </div>
      <button className="p-4 text-gray-600 hover:text-[#CB6406] transition-colors">
        <Search className="h-6 w-6" />
      </button>
    </div>
  )
}
