import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Card from '../Components/card';
import { ChevronDown, SlidersHorizontal, X, Search } from 'lucide-react';
import { productoService } from '../Controllers/productoService';
import { categoriaService } from '../Controllers/categoriaService';

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: searchParams.get('category') || 'all',
    search: searchParams.get('search') || '',
    subcategories: searchParams.get('subcategory') ? [searchParams.get('subcategory')] : [],
    brands: [],
    activeFilters: []
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = window.innerWidth < 640 ? 6 : 12; // 6 para mobile, 12 para desktop

  // Calcular productos para la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Cargar categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriaService.getAllCategorias();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Cargar productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await productoService.getAllProductos();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error al cargar los productos');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Efecto para extraer marcas únicas de los productos
  useEffect(() => {
    if (products.length > 0) {
      const uniqueBrands = [...new Set(products.map(product => product.marca))].filter(Boolean);
      setBrands(uniqueBrands.sort());
    }
  }, [products]);

  // Filtrar productos cuando cambien los filtros o productos
  useEffect(() => {
    if (products.length > 0) {
      let filtered = [...products];
      const newActiveFilters = [];

      // Filtrar por búsqueda
      if (selectedFilters.search) {
        filtered = filtered.filter(product => 
          product.nombre.toLowerCase().includes(selectedFilters.search.toLowerCase()) ||
          (product.categoria?.nombre?.toLowerCase() || '').includes(selectedFilters.search.toLowerCase())
        );
        newActiveFilters.push(`Búsqueda: ${selectedFilters.search}`);
      }

      // Filtrar por categoría
      if (selectedFilters.category !== 'all') {
        filtered = filtered.filter(product => 
          (product.categoria?.nombre?.toLowerCase() || '') === selectedFilters.category.toLowerCase()
        );
        newActiveFilters.push(`Categoría: ${selectedFilters.category}`);
      }

      // Filtrar por subcategorías
      if (selectedFilters.subcategories.length > 0) {
        filtered = filtered.filter(product => 
          selectedFilters.subcategories.some(sub => 
            product.subCategoria?.nombre === sub
          )
        );
        selectedFilters.subcategories.forEach(sub => 
          newActiveFilters.push(`Subcategoría: ${sub}`)
        );
      }

      // Filtrar por marcas
      if (selectedFilters.brands.length > 0) {
        filtered = filtered.filter(product => 
          selectedFilters.brands.includes(product.marca)
        );
        selectedFilters.brands.forEach(brand => 
          newActiveFilters.push(`Marca: ${brand}`)
        );
      }

      setFilteredProducts(filtered);
      setSelectedFilters(prev => ({
        ...prev,
        activeFilters: newActiveFilters
      }));
    }
  }, [products, selectedFilters.category, selectedFilters.subcategories, selectedFilters.search, selectedFilters.brands]);

  // Efecto para la búsqueda en tiempo real
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.length > 2) {
        setIsSearching(true);
        try {
          const filtered = products.filter(product => 
            product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.categoria?.nombre.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchResults(filtered.slice(0, 5));
          setShowDropdown(true);
        } catch (error) {
          console.error('Error searching products:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, products]);

  // Manejadores de eventos
  const handleCategoryClick = (categoryName) => {
    setSelectedFilters(prev => ({
      ...prev,
      category: prev.category === categoryName ? 'all' : categoryName,
      subcategories: [] // Limpiar subcategorías al cambiar de categoría
    }));
  };

  const handleSubcategoryChange = (subcategoryName, checked) => {
    setSelectedFilters(prev => ({
      ...prev,
      subcategories: checked 
        ? [...prev.subcategories, subcategoryName]
        : prev.subcategories.filter(sub => sub !== subcategoryName)
    }));
  };

  // Manejador separado para el toggle de expansión
  const toggleCategory = (e, categoryId) => {
    e.stopPropagation(); // Prevenir que el click se propague al botón padre
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setSelectedFilters(prev => ({
        ...prev,
        search: searchTerm
      }));
      setShowDropdown(false);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/producto/${product.codigo}`);
    setShowDropdown(false);
    setSearchTerm("");
  };

  // Manejador para filtro de marcas
  const handleBrandChange = (brandName, checked) => {
    setSelectedFilters(prev => ({
      ...prev,
      brands: checked 
        ? [...prev.brands, brandName]
        : prev.brands.filter(brand => brand !== brandName)
    }));
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] font-rubik">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar with Preview */}
        <div className="relative w-full max-w-[800px] mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex items-center w-full bg-white rounded-full shadow-lg">
            <div className="flex items-center flex-1 px-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                placeholder="¿Qué estás buscando?"
                className="w-full py-3 text-gray-600 placeholder-gray-400 bg-transparent focus:outline-none"
              />
            </div>
            <button type="submit" className="p-4 text-gray-600 hover:text-[#CB6406] transition-colors">
              <Search className="h-6 w-6" />
            </button>
          </form>

          {/* Dropdown Preview */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 max-h-[400px] overflow-y-auto">
              {isSearching ? (
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
                        <div className="text-sm text-gray-500">{product.categoria?.nombre}</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchTerm.length > 2 && (
                <div className="p-4 text-center text-gray-500">No se encontraron resultados</div>
              )}
            </div>
          )}
        </div>

        {/* Filtros Activos */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {selectedFilters.activeFilters.length > 0 && (
              <>
                {selectedFilters.activeFilters.map((filter, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-[#CB6406]"
                  >
                    {filter}
                    <button
                      onClick={() => {
                        if (filter.startsWith('Búsqueda:')) {
                          setSearchTerm('');
                          setSelectedFilters(prev => ({ ...prev, search: '' }));
                        }
                        // ... otros casos de eliminación de filtros ...
                      }}
                      className="ml-2 hover:text-orange-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => {
                    setSelectedFilters({
                      category: 'all',
                      search: '',
                      subcategories: [],
                      brands: [],
                      activeFilters: []
                    });
                  }}
                  className="text-sm text-gray-500 hover:text-[#CB6406] transition-colors"
                >
                  Limpiar filtros
                </button>
              </>
            )}
          </div>
          
          {/* Botón de filtros mobile */}
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-[#CB6406] text-white rounded-lg"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </button>
        </div>

        {/* Modal de filtros para mobile */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold">Filtros</h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 hover:text-[#CB6406]"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
                {/* Filtro de Categorías */}
                <div className="space-y-4">
                  <h3 className="font-bold">Categorías</h3>
                  {categories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <button 
                        onClick={() => handleCategoryClick(category.nombre)}
                        className={`text-left w-full ${
                          selectedFilters.category === category.nombre ? 'text-[#CB6406] font-bold' : ''
                        }`}
                      >
                        {category.nombre}
                      </button>
                      {category.subCategoria?.length > 0 && (
                        <div className="ml-4 space-y-2">
                          {category.subCategoria.map((sub) => (
                            <label 
                              key={sub.id} 
                              className="flex items-center space-x-2"
                            >
                              <input 
                                type="checkbox" 
                                checked={selectedFilters.subcategories.includes(sub.nombre)}
                                onChange={(e) => handleSubcategoryChange(sub.nombre, e.target.checked)}
                                className="rounded border-gray-300 text-[#CB6406] focus:ring-[#CB6406]"
                              />
                              <span className="text-sm">{sub.nombre}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Filtro de Marcas */}
                <div className="space-y-4">
                  <h3 className="font-bold">Marcas</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label 
                        key={brand} 
                        className="flex items-center space-x-2"
                      >
                        <input 
                          type="checkbox" 
                          checked={selectedFilters.brands.includes(brand)}
                          onChange={(e) => handleBrandChange(brand, e.target.checked)}
                          className="rounded border-gray-300 text-[#CB6406] focus:ring-[#CB6406]"
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="border-t p-4">
                <button
                  onClick={() => {
                    setIsMobileFiltersOpen(false);
                    setSelectedFilters({
                      category: 'all',
                      search: '',
                      subcategories: [],
                      brands: [],
                      activeFilters: []
                    });
                  }}
                  className="w-full py-2 text-center text-gray-600 mb-2"
                >
                  Limpiar filtros
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full py-2 bg-[#CB6406] text-white rounded-lg"
                >
                  Aplicar filtros
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden md:block w-64 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Categorías</h3>
              {categories.map((category) => (
                <div key={category.id} className="mb-4">
                  <div className="flex items-center justify-between w-full mb-2">
                    <button 
                      onClick={() => handleCategoryClick(category.nombre)}
                      className={`text-left hover:text-[#CB6406] transition-colors duration-200 flex-1 ${
                        selectedFilters.category === category.nombre ? 'text-[#CB6406] font-bold' : ''
                      }`}
                    >
                      <span>{category.nombre}</span>
                    </button>
                    {category.subCategoria?.length > 0 && (
                      <button
                        onClick={(e) => toggleCategory(e, category.id)}
                        className="p-1 hover:text-[#CB6406] transition-colors duration-200"
                      >
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform duration-200 ${
                            expandedCategories[category.id] ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  
                  {category.subCategoria?.length > 0 && (
                    <div 
                      className={`ml-4 space-y-2 overflow-hidden transition-all duration-200 ${
                        expandedCategories[category.id] 
                          ? 'max-h-[500px] opacity-100' 
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      {category.subCategoria.map((sub) => (
                        <label 
                          key={sub.id} 
                          className="flex items-center space-x-2 cursor-pointer hover:text-[#CB6406] transition-colors duration-200"
                        >
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-[#CB6406] focus:ring-[#CB6406]"
                            checked={selectedFilters.subcategories.includes(sub.nombre)}
                            onChange={(e) => handleSubcategoryChange(sub.nombre, e.target.checked)}
                          />
                          <span className="text-sm">{sub.nombre}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Nuevo filtro de Marcas */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Marcas</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <label 
                    key={brand} 
                    className="flex items-center space-x-2 cursor-pointer hover:text-[#CB6406] transition-colors duration-200"
                  >
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-[#CB6406] focus:ring-[#CB6406]"
                      checked={selectedFilters.brands.includes(brand)}
                      onChange={(e) => handleBrandChange(brand, e.target.checked)}
                    />
                    <span className="text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid con centrado solo en mobile */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <div className="flex sm:block justify-center">
                    <Card
                      key={product.codigo}
                      codigo={product.codigo}
                      title={product.nombre}
                      image={`http://localhost:8000/Productos/${product.imageUrl}`}
                      brand={product.marca}
                      stock={product.stock}
                      category={product.categoria?.nombre}
                      subcategory={product.subCategoria?.nombre}
                      className="w-full max-w-[280px] sm:max-w-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Paginación */}
        {filteredProducts.length > productsPerPage && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#CB6406] text-white hover:bg-[#B55805]'
              }`}
            >
              Anterior
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-8 h-8 rounded-full ${
                    currentPage === index + 1
                      ? 'bg-[#CB6406] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#CB6406] text-white hover:bg-[#B55805]'
              }`}
            >
              Siguiente
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 