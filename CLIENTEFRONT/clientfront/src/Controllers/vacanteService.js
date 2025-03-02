import axios from 'axios';
import { endpoints } from '../Api/Endpoints';

export const vacanteService = {
    createVacante: async (formData) => {
        try {
            // Add validation for file size before sending
            const curriculum = formData.get('Curriculum');
            if (curriculum && curriculum.size > 10 * 1024 * 1024) { // 10MB limit
                throw new Error('El archivo no puede sobrepasar los 10MB.');
            }

            const response = await axios.post(endpoints.vacantes.create, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating vacante:', error);
            if (error.message === 'El archivo no puede sobrepasar los 10MB.') {
                throw error;
            }
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