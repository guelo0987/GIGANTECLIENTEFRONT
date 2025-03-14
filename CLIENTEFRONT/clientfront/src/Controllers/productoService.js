import axios from 'axios';
import { endpoints } from '../Api/Endpoints';

export const productoService = {
    getAllProductos: async () => {
        try {
            const response = await axios.get(endpoints.producto.getAll);
            return response.data;
        } catch (error) {
            console.error('Error fetching productos:', error);
            throw error;
        }
    },

    getProductoById: async (id) => {
        try {
            
            const response = await axios.get(endpoints.producto.getById(id));
            
            return response.data;
        } catch (error) {
            console.error('Error fetching producto:', error);
            throw error;
        }
    },

    getProductosByCategoria: async (categoriaId) => {
        try {
            const response = await axios.get(endpoints.producto.getByCategoria(categoriaId));
            return response.data;
        } catch (error) {
            console.error('Error fetching productos by categoria:', error);
            throw error;
        }
    },

    getProductosBySubCategoria: async (categoriaId, subcategoriaId) => {
        try {
            const response = await axios.get(endpoints.producto.getBySubCategoria(categoriaId, subcategoriaId));
            return response.data;
        } catch (error) {
            console.error('Error fetching productos by subcategoria:', error);
            throw error;
        }
    },

    getProductosByMarca: async (marca) => {
        try {
            const response = await axios.get(`${endpoints.producto.getByMarca}?marca=${marca}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching productos by marca:', error);
            throw error;
        }
    },

    getProductosDestacadosExcluyendoCeramicas: async () => {
        try {
            const response = await axios.get(endpoints.producto.getDestacadosExcluyendoCeramicas);
            return response.data;
        } catch (error) {
            console.error('Error fetching productos destacados:', error);
            throw error;
        }
    },

    getCeramicasDestacadas: async () => {
        try {
            const response = await axios.get(endpoints.producto.getCeramicasDestacadas);
            return response.data;
        } catch (error) {
            console.error('Error fetching cerámicas destacadas:', error);
            throw error;
        }
    },

    getMarcasNotCeramicas: async () => {
        try {
            const response = await axios.get(endpoints.producto.getMarcasNotCeramicas);
            return response.data;
        } catch (error) {
            console.error('Error fetching marcas not ceramicas:', error);
            throw error;
        }
    },

    getMarcasCeramicas: async () => {
        try {
            const response = await axios.get(endpoints.producto.getMarcasCeramicas);
            return response.data;
        } catch (error) {
            console.error('Error fetching marcas ceramicas:', error);
            throw error;
        }
    }
};
