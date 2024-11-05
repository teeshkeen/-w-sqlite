// frontend/src/shared/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Добавляем интерцептор для добавления токена к каждому запросу
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Добавляем интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token'); // Удаляем невалидный токен
      window.location.href = '/login'; // Перенаправляем на страницу логина
    }
    return Promise.reject(error);
  }
);

export const categoryAPI = {
  getCategories: () => api.get('/categories'),
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/categories/${id}`)
};

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
};

// frontend/src/shared/services/api.js

export const productAPI = {
  getProductsByCategoryId: (categoryId) => 
    api.get(`/categories/${categoryId}/products`),
  
  createProduct: async (categoryId, productData) => {
    try {
      console.log('Sending request to create product:', { categoryId, productData });
      const response = await api.post(`/categories/${categoryId}/products`, productData);
      console.log('Product created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error.response?.data || error.message);
      throw error;
    }
  },
  
  updateProduct: (id, data) => 
    api.put(`/products/${id}`, data),
  
  deleteProduct: (id) => 
    api.delete(`/products/${id}`)
};

export default api;

