import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { ChevronDown, SlidersHorizontal, X, Search } from 'lucide-react';
import { productoService } from '../Controllers/productoService';
import { categoriaService } from '../Controllers/categoriaService';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LazyLoad from 'react-lazyload';
import { Suspense, lazy } from 'react';
import SearchBar from '../Components/SearchBar';

import { getStorageUrl } from '../lib/storage';

// Lazy load del componente Card para mejorar el rendimiento inicial
const LazyCard = lazy(() => import('../Components/card'));

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [ceramicBrands, setCeramicBrands] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: searchParams.get('category') || 'all',
    search: searchParams.get('search') || '',
    subcategories: searchParams.get('subcategory') ? [searchParams.get('subcategory')] : [],
    brands: [],
    ceramicBrands: [],
    measures: [],
    activeFilters: []
  });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = window.innerWidth < 640 ? 6 : 12; // 6 para mobile, 12 para desktop

  // Calcular productos para la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Optimizar el filtrado con useMemo para evitar recálculos innecesarios
  const filteredProductsData = useMemo(() => {
    if (products.length === 0) return [];
    
    let filtered = [...products];
    const newActiveFilters = [];
    const isCeramicCategory = selectedFilters.category.toLowerCase() === "ceramicas y porcelanatos";

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
        product.categoria?.nombre?.toLowerCase() === selectedFilters.category.toLowerCase()
      );
      newActiveFilters.push(`Categoría: ${selectedFilters.category}`);
    }

    // Filtrar por subcategorías
    if (selectedFilters.subcategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.subcategories.includes(product.subCategoria?.nombre)
      );
      selectedFilters.subcategories.forEach(sub => 
        newActiveFilters.push(`Subcategoría: ${sub}`)
      );
    }

    // Filtrar por marcas según la categoría
    if (isCeramicCategory) {
      // Filtrar por marcas de cerámicas
      if (selectedFilters.ceramicBrands.length > 0) {
        filtered = filtered.filter(product => 
          selectedFilters.ceramicBrands.includes(product.marca)
        );
        selectedFilters.ceramicBrands.forEach(brand => 
          newActiveFilters.push(`Marca: ${brand}`)
        );
      }

      // Filtrar por medidas (solo para cerámicas)
      if (selectedFilters.measures.length > 0) {
        filtered = filtered.filter(product => {
          // Asegurarse de que product.medidas existe y coincide exactamente con alguna medida seleccionada
          return product.medidas && selectedFilters.measures.includes(product.medidas);
        });
        selectedFilters.measures.forEach(measure => 
          newActiveFilters.push(`Medida: ${measure}`)
        );
      }
    } else {
      // Filtrar por marcas generales
      if (selectedFilters.brands.length > 0) {
        filtered = filtered.filter(product =>
          selectedFilters.brands.includes(product.marca)
        );
        selectedFilters.brands.forEach(brand => 
          newActiveFilters.push(`Marca: ${brand}`)
        );
      }
    }

    return { filtered, newActiveFilters };
  }, [products, selectedFilters.category, selectedFilters.subcategories, 
      selectedFilters.search, selectedFilters.brands, selectedFilters.ceramicBrands, 
      selectedFilters.measures]);

  // Usar useEffect para actualizar el estado basado en el resultado memorizado
  useEffect(() => {
    if (filteredProductsData.filtered) {
      setFilteredProducts(filteredProductsData.filtered);
      setSelectedFilters(prev => ({
        ...prev,
        activeFilters: filteredProductsData.newActiveFilters
      }));
      // Reset a página 1 cuando cambian los filtros
      setCurrentPage(1);
    }
  }, [filteredProductsData]);

  // Sistema de paginación mejorado con infinite scroll
  const [bottomRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [inView, totalPages]);

  // Mejora del renderizado de productos con animaciones
  const renderedProducts = useMemo(() => {
    return currentProducts.map((product, index) => (
      <motion.div 
        key={product.codigo} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index % 8 * 0.05 }}
        className="flex sm:block justify-center"
      >
        <Suspense fallback={<div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg"></div>}>
          <LazyLoad height={300} once offset={100}>
            <LazyCard
              codigo={product.codigo}
              title={product.nombre}
              image={getStorageUrl(product.imageUrl)}
              brand={product.marca}
              stock={product.stock}
              category={product.categoria?.nombre}
              subcategory={product.subCategoria?.nombre}
              className="w-full max-w-[280px] sm:max-w-none transform transition-transform hover:scale-105"
            />
          </LazyLoad>
        </Suspense>
      </motion.div>
    ));
  }, [currentProducts]);

  // Mejora del filtro móvil con animaciones elegantes
  const MobileFilters = () => {
    // Estado local temporal para los filtros móviles
    const [tempFilters, setTempFilters] = useState(selectedFilters);

    // Resetear los filtros temporales cuando se abre el modal
    useEffect(() => {
      if (isMobileFiltersOpen) {
        setTempFilters(selectedFilters);
      }
    }, [isMobileFiltersOpen]);

    const handleApplyFilters = () => {
      setSelectedFilters(tempFilters);
      setIsMobileFiltersOpen(false);
    };

    const handleCategoryClickMobile = (categoryName) => {
      const isCeramicCategory = categoryName.toLowerCase() === "ceramicas y porcelanatos";
      
      setTempFilters(prev => ({
        ...prev,
        category: prev.category === categoryName ? 'all' : categoryName,
        subcategories: [], // Limpiar subcategorías al cambiar de categoría
        ceramicBrands: isCeramicCategory ? prev.ceramicBrands : [],
        measures: isCeramicCategory ? prev.measures : []
      }));
    };

    const handleSubcategoryChangeMobile = (subcategoryName, checked) => {
      setTempFilters(prev => ({
        ...prev,
        subcategories: checked 
          ? [...prev.subcategories, subcategoryName]
          : prev.subcategories.filter(sub => sub !== subcategoryName)
      }));
    };

    const handleBrandChangeMobile = (brand, checked) => {
      setTempFilters(prev => ({
        ...prev,
        brands: checked 
          ? [...prev.brands, brand]
          : prev.brands.filter(b => b !== brand)
      }));
    };

    const handleCeramicBrandChangeMobile = (brand, checked) => {
      setTempFilters(prev => {
        const newCeramicBrands = checked 
          ? [...prev.ceramicBrands, brand]
          : prev.ceramicBrands.filter(b => b !== brand);
        
        return {
          ...prev,
          ceramicBrands: newCeramicBrands,
          category: checked && newCeramicBrands.length > 0 
            ? "Ceramicas y Porcelanatos" 
            : prev.category
        };
      });
    };

    const handleMeasureChangeMobile = (measure, checked) => {
      setTempFilters(prev => {
        const newMeasures = checked 
          ? [...prev.measures, measure]
          : prev.measures.filter(m => m !== measure);
        
        return {
          ...prev,
          measures: newMeasures,
          category: checked && newMeasures.length > 0 
            ? "Ceramicas y Porcelanatos" 
            : prev.category
        };
      });
    };

    return (
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="ml-auto w-4/5 max-w-md bg-white h-full overflow-y-auto p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filtros</h2>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Categorías */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4">Categorías</h3>
                {categories.map((category) => (
                  <div key={category.id} className="mb-4">
                    <div className="flex items-center justify-between w-full mb-2">
                      <button 
                        onClick={() => handleCategoryClickMobile(category.nombre)}
                        className={`text-left hover:text-[#CB6406] transition-colors duration-200 flex-1 ${
                          tempFilters.category === category.nombre ? 'text-[#CB6406] font-bold' : ''
                        }`}
                      >
                        <span>{category.nombre}</span>
                      </button>
                      {(category.subCategoria?.length > 0 || category.nombre === "Ceramicas y Porcelanatos") && (
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
                    
                    <div 
                      className={`ml-4 space-y-2 overflow-hidden transition-all duration-200 ${
                        expandedCategories[category.id] 
                          ? 'max-h-[1000px] opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      {/* Subcategorías */}
                      {category.subCategoria?.map((sub) => ( 
                        <label 
                          key={sub.id} 
                          className="flex items-center space-x-2 cursor-pointer hover:text-[#CB6406]"
                        >
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-[#CB6406] focus:ring-[#CB6406]"
                            checked={tempFilters.subcategories.includes(sub.nombre)}
                            onChange={(e) => handleSubcategoryChangeMobile(sub.nombre, e.target.checked)}
                          />
                          <span className="text-sm">{sub.nombre}</span>
                        </label>
                      ))}

                      {/* Mostrar marcas y medidas solo para Cerámicas y Porcelanatos */}
                      {category.nombre === "Ceramicas y Porcelanatos" && (
                        <>
                          {/* Marcas de Cerámicas */}
                          <div className="mt-4 border-t pt-4">
                            <h4 className="text-sm font-medium mb-2">Marcas de Cerámicas</h4>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {ceramicBrands.map((brand) => (
                                <label 
                                  key={brand} 
                                  className="flex items-center space-x-2 cursor-pointer hover:text-[#CB6406]"
                                >
                                  <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-[#CB6406] focus:ring-[#CB6406]"
                                    checked={tempFilters.ceramicBrands.includes(brand)}
                                    onChange={(e) => handleCeramicBrandChangeMobile(brand, e.target.checked)}
                                  />
                                  <span className="text-sm">{brand}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Medidas */}
                          <div className="mt-4 border-t pt-4">
                            <h4 className="text-sm font-medium mb-2">Medidas</h4>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {measures.map((measure) => (
                                <label 
                                  key={measure} 
                                  className="flex items-center space-x-2 cursor-pointer hover:text-[#CB6406]"
                                >
                                  <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-[#CB6406] focus:ring-[#CB6406]"
                                    checked={tempFilters.measures.includes(measure)}
                                    onChange={(e) => handleMeasureChangeMobile(measure, e.target.checked)}
                                  />
                                  <span className="text-sm">{measure}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Marcas generales filter */}
              <div className="mb-6">
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
                        checked={tempFilters.brands.includes(brand)}
                        onChange={(e) => handleBrandChangeMobile(brand, e.target.checked)}
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-2">
                <button
                  onClick={() => setTempFilters({
                    category: 'all',
                    search: '',
                    subcategories: [],
                    brands: [],
                    ceramicBrands: [],
                    measures: [],
                    activeFilters: []
                  })}
                  className="w-1/2 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Limpiar
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="w-1/2 py-3 bg-[#CB6406] text-white rounded-lg hover:bg-[#B55805] transition-colors"
                >
                  Aplicar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

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
        
        setError('Error al cargar los productos');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Modificar el useEffect para cargar marcas
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const marcasData = await productoService.getMarcasNotCeramicas();
        setBrands(marcasData.sort());
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, []);

  // Agregar nuevo useEffect para cargar marcas de cerámicas
  useEffect(() => {
    const fetchCeramicBrands = async () => {
      try {
        const marcasData = await productoService.getMarcasCeramicas();
       
        setCeramicBrands(marcasData.sort());
      } catch (error) {
        console.error('Error fetching ceramic brands:', error);
      }
    };
    fetchCeramicBrands();
  }, []);

  // Modificar el useEffect para las medidas
  useEffect(() => {
    if (products.length > 0) {
      const uniqueMeasures = [...new Set(products
        .filter(p => p.categoria?.nombre === "Ceramicas y Porcelanatos" && p.medidas)
        .map(p => p.medidas))]
        .filter(Boolean) // Eliminar valores null/undefined
        .sort();
      
      // Para debugging
      setMeasures(uniqueMeasures);
    }
  }, [products]);

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
    }, 100);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, products]);

  // Manejadores de eventos
  const handleCategoryClick = (categoryName) => {
    const isCeramicCategory = categoryName.toLowerCase() === "ceramicas y porcelanatos";
    const category = categories.find(cat => cat.nombre === categoryName);
    
    setSelectedFilters(prev => ({
      ...prev,
      category: prev.category === categoryName ? 'all' : categoryName,
      subcategories: [], // Limpiar subcategorías al cambiar de categoría
      // Limpiar marcas de cerámicas y medidas si no es la categoría de cerámicas
      ceramicBrands: isCeramicCategory ? prev.ceramicBrands : [],
      measures: isCeramicCategory ? prev.measures : []
    }));
    
    // Expandir automáticamente la categoría seleccionada
    if (category && categoryName !== prev.category) {
      setExpandedCategories(prev => ({
        ...prev,
        [category.id]: true
      }));
    }
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
  const handleBrandChange = (brand, checked) => {
    setSelectedFilters(prev => ({
      ...prev,
      brands: checked 
        ? [...prev.brands, brand]
        : prev.brands.filter(b => b !== brand)
    }));
  };

  // Manejador para cuando se selecciona un producto desde el SearchBar
  const handleSearchProductSelect = (product) => {
    navigate(`/producto/${product.codigo}`);
  };

  // Agregar estos manejadores después de handleBrandChange
  const handleCeramicBrandChange = (brand, checked) => {
    setSelectedFilters(prev => {
      const newCeramicBrands = checked 
        ? [...prev.ceramicBrands, brand]
        : prev.ceramicBrands.filter(b => b !== brand);
      
      return {
        ...prev,
        ceramicBrands: newCeramicBrands,
        category: checked && newCeramicBrands.length > 0 
          ? "Ceramicas y Porcelanatos" 
          : prev.category
      };
    });
  };

  const handleMeasureChange = (measure, checked) => {
    setSelectedFilters(prev => {
      const newMeasures = checked 
        ? [...prev.measures, measure]
        : prev.measures.filter(m => m !== measure);
      
      return {
        ...prev,
        measures: newMeasures,
        category: checked && newMeasures.length > 0 
          ? "Ceramicas y Porcelanatos" 
          : prev.category
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] font-rubik">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar with Preview */}
        <div className="relative w-full max-w-[800px] mx-auto mb-8">
          <SearchBar 
            onProductSelect={handleSearchProductSelect}
            initialSearchTerm={selectedFilters.search}
            className="max-w-3xl mx-auto"
          />
        </div>

        {/* Filtros Activos */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {selectedFilters.activeFilters.map((filter, index) => {
              const [type, ...valueParts] = filter.split(': ');
              const value = valueParts.join(': ');
              return (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-[#CB6406]"
                >
                  {filter}
                  <button
                    onClick={() => handleRemoveFilter(type, value)}
                    className="ml-2 hover:text-orange-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              );
            })}
            {selectedFilters.activeFilters.length > 0 && (
              <button
                onClick={() => {
                  setSelectedFilters({
                    category: 'all',
                    search: '',
                    subcategories: [],
                    brands: [],
                    ceramicBrands: [],
                    measures: [],
                    activeFilters: []
                  });
                }}
                className="text-sm text-gray-500 hover:text-[#CB6406] transition-colors"
              >
                Limpiar filtros
              </button>
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
        <MobileFilters />

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
                    {(category.subCategoria?.length > 0 || category.nombre === "Ceramicas y Porcelanatos") && (
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
                  
                  <div 
                    className={`ml-4 space-y-2 overflow-hidden transition-all duration-200 ${
                      expandedCategories[category.id] 
                        ? 'max-h-[1000px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    {/* Subcategorías */}
                    {category.subCategoria?.map((sub) => ( 
                      <label 
                        key={sub.id} 
                        className="flex items-center space-x-2 cursor-pointer hover:text-[#CB6406]"
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

                    {/* Mostrar marcas y medidas solo para Cerámicas y Porcelanatos */}
                    {category.nombre === "Ceramicas y Porcelanatos" && expandedCategories[category.id] && (
                      <>
                        {/* Marcas de Cerámicas */}
                        <div className="mt-4 border-t pt-4">
                          <h4 className="text-sm font-medium mb-2">Marcas de Cerámicas</h4>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {ceramicBrands.map((brand) => (
                              <label 
                                key={brand} 
                                className="flex items-center space-x-2 cursor-pointer hover:text-[#CB6406]"
                              >
                                <input 
                                  type="checkbox" 
                                  className="rounded border-gray-300 text-[#CB6406] focus:ring-[#CB6406]"
                                  checked={selectedFilters.ceramicBrands.includes(brand)}
                                  onChange={(e) => handleCeramicBrandChange(brand, e.target.checked)}
                                />
                                <span className="text-sm">{brand}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Medidas */}
                        <div className="mt-4 border-t pt-4">
                          <h4 className="text-sm font-medium mb-2">Medidas</h4>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {measures.map((measure) => (
                              <label 
                                key={measure} 
                                className="flex items-center space-x-2 cursor-pointer hover:text-[#CB6406]"
                              >
                                <input 
                                  type="checkbox" 
                                  className="rounded border-gray-300 text-[#CB6406] focus:ring-[#CB6406]"
                                  checked={selectedFilters.measures.includes(measure)}
                                  onChange={(e) => handleMeasureChange(measure, e.target.checked)}
                                />
                                <span className="text-sm">{measure}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Marcas generales filter */}
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
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {renderedProducts}
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