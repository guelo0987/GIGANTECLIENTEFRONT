import axios from '../lib/axiosConfig';
import { endpoints } from '../Api/Endpoints';

export const mensajeService = {
    enviarMensaje: async (mensajeData) => {
        try {
            const response = await axios.post(endpoints.mensajes.enviar, mensajeData);
            return response.data;
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            throw error;
        }
    }
}; 