import axios from 'axios';
import { endpoints } from '../Api/Endpoints';

export const vacanteService = {
    createVacante: async (formData) => {
        try {
            const response = await axios.post(endpoints.vacantes.create, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating vacante:', error);
            throw error;
        }
    },

    getVacanteById: async (id) => {
        try {
            const response = await axios.get(endpoints.vacantes.getById(id));
            return response.data;
        } catch (error) {
            console.error('Error fetching vacante:', error);
            throw error;
        }
    }
};