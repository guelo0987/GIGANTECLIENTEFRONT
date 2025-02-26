export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5204/';

export const endpoints = {


    banner:{
        getBanner: `${API_BASE_URL}api/Banner`,
    }
} 