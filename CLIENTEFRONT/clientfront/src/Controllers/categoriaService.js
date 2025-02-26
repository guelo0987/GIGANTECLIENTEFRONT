import axios from 'axios';
import { endpoints } from '../Api/Endpoints';

export const categoriaService = {
    getAllCategorias: async () => {
        try {
            const response = await axios.get(endpoints.categoria.getAll);
            return response.data;
        } catch (error) {
            console.error('Error fetching categorias:', error);
            throw error;
        }
    },

    getCategoriaById: async (id) => {
        try {
            const response = await axios.get(endpoints.categoria.getById(id));
            return response.data;
        } catch (error) {
            console.error('Error fetching categoria:', error);
            throw error;
        }
    }
};
