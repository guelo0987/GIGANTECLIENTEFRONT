export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5204/';

export const endpoints = {
    banner: {
        getBanner: `${API_BASE_URL}api/Banner`,
    },
    categoria: {
        getAll: `${API_BASE_URL}api/Categoria`,
        getById: (id) => `${API_BASE_URL}api/Categoria/${id}`,
    },
    producto: {
        getAll: `${API_BASE_URL}api/Producto`,
        getById: (id) => `${API_BASE_URL}api/Producto/${id}`,
        getByCategoria: (categoriaId) => `${API_BASE_URL}api/Producto/porcategoria/${categoriaId}`,
        getBySubCategoria: (categoriaId, subcategoriaId) => 
            `${API_BASE_URL}api/Producto/porsubcategoria/${categoriaId}/${subcategoriaId}`,
        getByMarca: (marca) => `${API_BASE_URL}api/Producto/pormarca?marca=${marca}`,
        getDestacadosExcluyendoCeramicas: `${API_BASE_URL}api/Producto/destacados/excluyendoCeramicas`,
        getCeramicasDestacadas: `${API_BASE_URL}api/Producto/destacados/ceramicas`,
    },
    vacantes: {
        create: `${API_BASE_URL}api/Vacantes`,
        getById: (id) => `${API_BASE_URL}api/Vacantes/${id}`,
    },
} 