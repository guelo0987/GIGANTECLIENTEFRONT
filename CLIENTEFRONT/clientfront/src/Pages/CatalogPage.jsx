import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Card from '../Components/card';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { products, categories, brands } from '../lib/mockData';

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedFilters, setSelectedFilters] = useState({
    category: searchParams.get('category') || 'all',
    search: searchParams.get('search') || '',
    brands: [],
    subcategories: [],
    activeFilters: []
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category !== selectedFilters.category || search !== selectedFilters.search) {
      setSelectedFilters(prev => ({
        ...prev,
        category: category || 'all',
        search: search || '',
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    filterProducts();
  }, [selectedFilters.category, selectedFilters.search, selectedFilters.brands, selectedFilters.subcategories]);

  const filterProducts = () => {
    let filtered = [...products];
    const newActiveFilters = [];

    // Aplicar filtros de búsqueda
    if (selectedFilters.search) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(selectedFilters.search.toLowerCase()) ||
        product.category.toLowerCase().includes(selectedFilters.search.toLowerCase())
      );
      newActiveFilters.push(`Búsqueda: ${selectedFilters.search}`);
    }

    // Aplicar filtros de categoría
    if (selectedFilters.category !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedFilters.category.toLowerCase()
      );
      newActiveFilters.push(`Categoría: ${selectedFilters.category}`);
    }

    // Aplicar filtros de marca
    if (selectedFilters.brands.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.brands.includes(product.brand)
      );
      selectedFilters.brands.forEach(brand => 
        newActiveFilters.push(`Marca: ${brand}`)
      );
    }

    // Aplicar filtros de subcategoría
    if (selectedFilters.subcategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.subcategories.includes(product.subcategory)
      );
      selectedFilters.subcategories.forEach(sub => 
        newActiveFilters.push(`Subcategoría: ${sub}`)
      );
    }

    setSelectedFilters(prev => ({
      ...prev,
      activeFilters: newActiveFilters
    }));
    setFilteredProducts(filtered);
  };

  // Ejemplo de datos de categorías
  const categoriesData = [
    {
      name: "PLOMERIA",
      subcategories: [
        { name: "Tuberías", count: 120 },
        { name: "Llaves y Grifos", count: 85 },
        { name: "Conexiones", count: 64 },
      ]
    },
    {
      name: "MATERIALES DE CONSTRUCCIÓN",
      subcategories: [
        { name: "Cemento", count: 45 },
        { name: "Blocks", count: 32 },
        { name: "Varillas", count: 78 },
      ]
    },
    // ... más categorías
  ];

  // Ejemplo de marcas
  const brandsData = [
    { name: "TYLBA ULTRA", count: 45 },
    { name: "ARGOS", count: 32 },
    { name: "YALE", count: 28 },
    // ... más marcas
  ];

  return (
    <div className="min-h-screen bg-[#fbfbfb] font-rubik">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-gray-500">
            <span>Departamento</span>
            <span>→</span>
            <span>Categoría</span>
            <span>→</span>
            <span>Subcategoría</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-64 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Categorías</h3>
              {categories.map((category) => (
                <div key={category.name} className="mb-4">
                  <button 
                    onClick={() => {
                      setSelectedFilters({
                        ...selectedFilters,
                        category: category.name
                      });
                    }}
                    className="flex items-center justify-between w-full text-left mb-2 hover:text-[#CB6406]"
                  >
                    <span>{category.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="ml-4 space-y-2">
                    {category.subcategories.map((sub) => (
                      <label key={sub.name} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-[#CB6406]"
                          onChange={(e) => {
                            const newSubcategories = e.target.checked 
                              ? [...selectedFilters.subcategories, sub.name]
                              : selectedFilters.subcategories.filter(s => s !== sub.name);
                            setSelectedFilters({
                              ...selectedFilters,
                              subcategories: newSubcategories
                            });
                          }}
                        />
                        <span className="text-sm">{sub.name}</span>
                        <span className="text-sm text-gray-500">({sub.count})</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-bold mb-4">Marcas</h3>
                {brands.map((brand) => (
                  <label key={brand.name} className="flex items-center space-x-2 cursor-pointer mb-2">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-[#CB6406]"
                      onChange={(e) => {
                        const newBrands = e.target.checked 
                          ? [...selectedFilters.brands, brand.name]
                          : selectedFilters.brands.filter(b => b !== brand.name);
                        setSelectedFilters({
                          ...selectedFilters,
                          brands: newBrands
                        });
                      }}
                    />
                    <span className="text-sm">{brand.name}</span>
                    <span className="text-sm text-gray-500">({brand.count})</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden fixed bottom-4 right-4 bg-[#CB6406] text-white p-4 rounded-full shadow-lg z-50"
          >
            <SlidersHorizontal className="h-6 w-6" />
          </button>

          {/* Mobile Filter Sidebar */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
              <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="absolute top-4 right-4"
                >
                  <X className="h-6 w-6" />
                </button>
                {/* Aquí va el mismo contenido del sidebar desktop */}
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Resultados (120)</h2>
              <select className="border rounded-lg px-4 py-2">
                <option>Más relevantes</option>
                <option>Precio: Menor a Mayor</option>
                <option>Precio: Mayor a Menor</option>
                <option>Más nuevos</option>
              </select>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedFilters.activeFilters.map((filter) => (
                <span key={filter} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {filter}
                  <X 
                    className="h-4 w-4 cursor-pointer" 
                    onClick={() => {
                      setSelectedFilters(prev => ({
                        ...prev,
                        activeFilters: prev.activeFilters.filter(f => f !== filter)
                      }));
                    }}
                  />
                </span>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  category={product.category}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-2">
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Anterior</button>
                <button className="px-4 py-2 bg-[#CB6406] text-white rounded-lg">1</button>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Siguiente</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 