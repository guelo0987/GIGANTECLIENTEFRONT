export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5203/api';

export const endpoints = {


    banner:{
        getBanner: `${API_BASE_URL}/Banner`,
    }
} 