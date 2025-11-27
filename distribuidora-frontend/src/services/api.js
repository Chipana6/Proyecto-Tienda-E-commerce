const API_URL = 'http://localhost:5000/api';

// Helper para manejar tokens
export const authHelper = {
  saveToken: (token) => {
    localStorage.setItem('token', token);
  },
  
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  removeToken: () => {
    localStorage.removeItem('token');
  },
  
  saveUser: (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  },
  
  getUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },
  
  removeUser: () => {
    localStorage.removeItem('currentUser');
  }
};

// Servicio de autenticación
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en el login');
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en el registro');
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
};

// Servicio de productos
export const productsAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error('Error al obtener productos');
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  getByCategory: async (category) => {
    try {
      const response = await fetch(`${API_URL}/categories/${category}/products`);
      if (!response.ok) throw new Error('Error al obtener productos por categoría');
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
};

// Servicio de categorías
export const categoriesAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      if (!response.ok) throw new Error('Error al obtener categorías');
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
};