import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';

// Servicios API
const API_URL = 'http://localhost:5000/api';

// Helper para manejar tokens
const authHelper = {
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
const authAPI = {
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
const productsAPI = {
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
const categoriesAPI = {
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

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    const savedFavorites = localStorage.getItem('userFavorites');
    const savedUser = authHelper.getUser();
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedUser) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }

    // Cargar productos reales del backend
    loadProductsFromAPI();
  }, []);

  // Guardar en localStorage cuando cambien los datos
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('userFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Protección: evitar acceso a panel admin si el usuario no es admin
  useEffect(() => {
    if (currentPage === 'admin-dashboard') {
      if (!user || user.userType !== 'admin') {
        addNotification('Acceso denegado: permisos de administrador requeridos', 'error');
        setCurrentPage(user ? 'home' : 'login');
      }
    }
  }, [currentPage, user]);

  // Función para cargar productos desde la API
  const loadProductsFromAPI = async () => {
    try {
      setLoading(true);
      const products = await productsAPI.getAll();
      
      // Transformar productos del backend al formato del frontend
      const transformedProducts = products.map(product => ({
        id: product._id,
        name: product.name,
        price: `Bs. ${product.price}`,
        category: mapCategory(product.category),
        image: getProductImage(product.category, product.name),
        description: product.description,
        inStock: product.stock > 0
      }));
      
      setApiProducts(transformedProducts);
    } catch (error) {
      console.error('❌ Error cargando productos del backend:', error.message);
      addNotification('Error cargando productos. Usando datos locales.', 'warning');
    } finally {
      setLoading(false);
    }
  };

  // Mapear categorías del backend a las del frontend
  const mapCategory = (backendCategory) => {
    const categoryMap = {
      'Carteras': 'carteras',
      'Jeans': 'jeans', 
      'Zapatillas': 'zapatillas',
      'Chaquetas': 'chaquetas',
      'Ropa Hombre': 'jeans',
      'Ropa Mujer': 'carteras'
    };
    return categoryMap[backendCategory] || 'carteras';
  };

  // Obtener imagen basada en categoría y nombre
// Reemplaza la función getProductImage en tu App.js con esta versión corregida:

// Obtener imagen basada en categoría y nombre
const getProductImage = (category, name) => {
  // Mapeo de productos específicos del backend a imágenes locales
  const productImageMap = {
    // Carteras - Nombres corregidos
    'Cartera Elegante 1': 'images/Cartera-1.jpg',
    'Cartera Elegante 2': 'images/Cartera-2.jpg', 
    'Cartera Elegante 3': 'images/Cartera-3.jpg',
    'Cartera Premium': 'images/Cartera-4.jpg',
    'Cartera Deportiva': 'images/Cartera-5.jpg',
    'Cartera Vintage': 'images/Cartera-6.jpg',
    'Cartera Minimalista': 'images/Cartera-7.jpeg',
    'Bolso Bandolera': 'images/Cartera-8.webp',
    'Cartera Ejecutiva': 'images/Cartera-9.jpg',
    'Cartera Compacta': 'images/cartera-10.jpeg',
    'Cartera de Lujo': 'images/cartera-11.png',
    'Cartera Casual': 'images/cartera-12.jpg',
    'Cartera Pequeña': 'images/carttera-13.jpeg',
    'Cartera Moderna': 'images/cartera-14.jpg',
    'Cartera De Lujo 2': 'images/cartera-15.jpeg',

    // Jeans - Nombres corregidos
    'Jean Acne Studio': 'images/Jean-AcneStudio-Hombre.jpg',
    'Jean Acne Studio 2': 'images/Jean-AcneStudio-Hombre-2.jpg',
    'Jean Dior Hombre': 'images/Jean-Dior-de-Hombre.webp',
    'Jean Louis Vuitton': 'images/Jean-Lv-hombre.avif',
    'Jean LV x Supreme': 'images/Jean-LvxSupreme-hombre.avif',
    'Jean Supreme': 'images/Jean-Supreme-hombre.avif',
    'Jean Supreme 2': 'images/Jean-Supreme-Hombre.2.jpeg',
    'Jean Vnno': 'images/Jean-Vnno-Hombre.webp',
    'Jean Vnno 2': 'images/Jean-Vnno-Hombre-2.webp',
    'Jean Palace': 'images/Jean-Palace-Hombre.avif',
    'Jean Crome Hearts': 'images/Jean-Crome Hearts-hombre.webp',
    'Jean Denim Tears': 'images/Jean-DenimTears-hombre.webp',
    'Jean CH Hombre': 'images/Jean-Ch-hombre.webp',

    // Zapatillas - Nombres corregidos
    'Air Force One Clásicas': 'images/AirForce One Clasicas.jpg',
    'Air Force One Picante Red': 'images/AirForce One Picante Red.webp',
    'Air Force One Nocta': 'images/Air Force One Nocta.png',
    'Air Force One Nocta Citron': 'images/AirForceOne Nocta Citron Tint.jpg',
    'Jordan 1 Low Concord': 'images/Jordan 1 Low Concord.avif',
    'Jordan 1 Low UNC': 'images/Jordan 1 Low Unc.avif',
    'Jordan 1 Low Fragment x Travis Scott': 'images/Jordan 1 low Fragment x Travis Scott.avif',
    'Jordan 1 Low Travis Scott Moca': 'images/Jordan 1 low Travis Scott Moca.avif',
    'Jordan 1 Low Travis Scott Reverse Moca': 'images/Jordan 1 low x Travis Scott Reverse Moca.jpg',
    'Jordan 1 Low Travis Scott Reverse Olive': 'images/Jordan 1 low x Travis Scott Reverse Olive.avif',
    'Jordan 1 Low Travis Scott Fragment Blue': 'images/Jordan 1 low x Travis Scott Fragment Blue.webp',
    'Jordan 1 Low Travis Scott Medium Olive': 'images/Jordan 1 low x Travis Scott Medium Olive.webp',
    'Jordan 1 Low Travis Scott Black Phantom': 'images/Jordan 1 low x Travis Scott Black Phantom.webp',
    'Jordan 1 Low Travis Scott Black PlayStation': 'images/Jordan 1 low x Travis Scott Black Play Station.avif',
    'Jordan 1 Low Travis Scott Velvet Brown': 'images/Jordan 1 low x Travis Scott Velvet Brown.webp',
    'Jordan 1 Low Travis Scott Canary': 'images/Jordan 1 Low Travis Scott Canary.webp',

    // Chaquetas - Nombres corregidos
    'Louis Vuitton Varsity Jacket Green': 'images/Louis-Vuitton-Varsity-Jacket-Green.avif',
    'Louis Vuitton Varsity Jacket White': 'images/Louis-Vuitton-Varsity-Jacket-White.webp',
    'Louis Vuitton Denim Jacket': 'images/Louis Vuitton Denim Jacket.webp',
    'Adidas Chinese New Year Jacket Blue': 'images/Adidas-Chinese-New-Year-Jacket-Blue.jpg',
    'Supreme x The North Face': 'images/Supreme x The North Face.webp',
    'Nike x Supreme': 'images/Nike x Supreme.jpeg',
    'Stussy 8 Ball': 'images/Stusse 8 Ball.jpeg'
  };

  // Si encontramos un mapeo específico, lo usamos
  if (productImageMap[name]) {
    return productImageMap[name];
  }

  console.log(`⚠️ No se encontró imagen para: ${name}`);
  
  // Si no, usamos un mapeo genérico por categoría
  const categoryImageMap = {
    'Carteras': 'images/Cartera-1.jpg',
    'Jeans': 'images/Jean-AcneStudio-Hombre.jpg', 
    'Zapatillas': 'images/AirForce One Clasicas.jpg',
    'Chaquetas': 'images/Louis-Vuitton-Varsity-Jacket-Green.avif'
  };

  return categoryImageMap[category] || 'images/Cartera-1.jpg';
};

  // Sistema de Autenticación
  const login = async (userData) => {
    // Si userData viene del backend (con token), es login real
    if (userData.token) {
      // Guardar token y usuario
      authHelper.saveToken(userData.token);
      authHelper.saveUser(userData.user);
      
      setUser(userData.user);
      setIsAuthenticated(true);
      
      // Redirigir según el tipo de usuario
      if (userData.user.userType === 'admin') {
        goToAdmin(userData.user);
      } else {
        setCurrentPage('home');
      }

      addNotification(`¡Bienvenido ${userData.user.contactName}!`, 'success');
    } else {
      // Login con datos mock (para compatibilidad)
      setUser(userData);
      setIsAuthenticated(true);
      authHelper.saveUser(userData);
      
      if (userData.userType === 'admin') {
        goToAdmin(userData);
      } else {
        setCurrentPage('home');
      }

      addNotification(`¡Bienvenido ${userData.contactName || userData.name}!`, 'success');
    }
  };

  // Navegar al panel admin con verificación de permisos
  const goToAdmin = (userParam) => {
    const u = userParam || user;
    if (u && u.userType === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      addNotification('Acceso denegado: permisos de administrador requeridos', 'error');
      setCurrentPage(u ? 'home' : 'login');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    authHelper.removeToken();
    authHelper.removeUser();
    setCurrentPage('welcome');
    addNotification('Sesión cerrada correctamente', 'info');
  };

  const register = async (userData) => {
    try {
      // Intentar registro en el backend
      const result = await authAPI.register(userData);
      login(result); // Esto usará el login real con token
    } catch (error) {
      // Si falla el backend, usar registro local (para compatibilidad)
      console.log('⚠️ Usando registro local:', error.message);
      
      const newUser = {
        ...userData,
        id: Date.now(),
        registrationDate: new Date().toISOString()
      };
      
      const existingUsers = JSON.parse(localStorage.getItem('wholesaleUsers')) || [];
      localStorage.setItem('wholesaleUsers', JSON.stringify([...existingUsers, newUser]));
      
      // Login con datos locales
      login(newUser);
    }
  };

  // Precios diferenciados
  const getProductPrice = (basePrice, productId) => {
    if (!user || user.userType !== 'wholesaler') return basePrice;
    
    const price = parseInt(basePrice.replace('Bs. ', ''));
    const cartItem = cart.find(item => item.id === productId);
    const quantity = cartItem ? cartItem.quantity : 1;
    
    if (quantity >= 50) return `Bs. ${Math.round(price * 0.65)}`;
    if (quantity >= 20) return `Bs. ${Math.round(price * 0.70)}`;
    if (quantity >= 10) return `Bs. ${Math.round(price * 0.80)}`;
    if (quantity >= 5) return `Bs. ${Math.round(price * 0.85)}`;
    
    return basePrice;
  };

  // COMENTADO: Datos de productos locales (como respaldo)
  /*
  const localProducts = [
    // ... (todos tus productos locales comentados)
  ];
  */

  // CAMBIO PRINCIPAL: Usar SOLO productos de la API
  const products = apiProducts; // Solo productos del backend

  // Sistema de Notificaciones
  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  // Sistema de Favoritos
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
      addNotification('Producto removido de favoritos', 'info');
    } else {
      setFavorites([...favorites, productId]);
      addNotification('Producto añadido a favoritos', 'success');
    }
  };

  // Sistema de Búsqueda y Filtrado
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price.replace('Bs. ', '')) - parseInt(b.price.replace('Bs. ', ''));
        case 'price-high':
          return parseInt(b.price.replace('Bs. ', '')) - parseInt(a.price.replace('Bs. ', ''));
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  // Carrito Mejorado
  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    
    addNotification(`${product.name} añadido al carrito`, 'success');
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    addNotification('Producto removido del carrito', 'info');
  };

  const clearCart = () => {
    setCart([]);
    addNotification('Carrito vaciado', 'info');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => 
      total + (parseInt(item.price.replace('Bs. ', '')) * item.quantity), 0
    );
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Componente de Notificaciones
  const NotificationContainer = () => (
    <div className="notifications-container">
      {notifications.map(notification => (
        <div key={notification.id} className={`notification notification-${notification.type}`}>
          <span>{notification.message}</span>
          <button 
            onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
            className="notification-close"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );

  // Página de Bienvenida
  const WelcomePage = () => {
    return (
      <div className="welcome-container">
        <section className="welcome-hero">
          <div className="hero-content">
            <h1>Bienvenido a Nuestra Tienda</h1>
            <p className="hero-subtitle">Donde la elegancia se encuentra con la calidad</p>
            <div className="hero-buttons">
              <button 
                onClick={() => setCurrentPage('login')}
                className="cta-button"
              >
                Acceso Clientes
              </button>
              <button 
                onClick={() => setCurrentPage('home')}
                className="cta-button secondary"
              >
                Explorar Catálogo
              </button>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2>¿Por Qué Elegirnos?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🚚</div>
                <h3>Envío Rápido</h3>
                <p>Entregamos en todo el país en 24-48 horas</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💎</div>
                <h3>Calidad Premium</h3>
                <p>Productos seleccionados con los más altos estándares</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🛡️</div>
                <h3>Garantía</h3>
                <p>Todos nuestros productos incluyen garantía</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h3>Atención 24/7</h3>
                <p>Estamos aquí para ayudarte cuando nos necesites</p>
              </div>
            </div>
          </div>
        </section>

        <section className="wholesale-section">
          <div className="container">
            <h2>¿Eres Mayorista?</h2>
            <p>Obtén precios especiales y descuentos por volumen</p>
            <button 
              onClick={() => setCurrentPage('register')}
              className="cta-button wholesale-btn"
            >
              Regístrate como Mayorista
            </button>
          </div>
        </section>
      </div>
    );
  };

  // Página de Login
  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('wholesaler');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        // Intentar login en el backend
        const result = await authAPI.login(email, password);
        login(result); // Esto manejará el token y usuario del backend
      } catch (error) {
        // Si falla el backend, intentar con cuentas demo
        console.log('⚠️ Usando login local:', error.message);
        
        const demoAccounts = [
          {
            id: 1,
            companyName: "Distribuidora Mayorista Demo",
            contactName: "Carlos Rodríguez",
            taxId: "20123456789",
            phone: "+51 987 654 321",
            email: "mayorista@test.com",
            password: "123456",
            userType: "wholesaler",
            registrationDate: new Date().toISOString()
          },
          {
            id: 2,
            companyName: "Tienda Minorista Demo", 
            contactName: "Ana García",
            taxId: "10456789012",
            phone: "+51 955 444 333",
            email: "minorista@test.com",
            password: "123456",
            userType: "retailer",
            registrationDate: new Date().toISOString()
          },
          {
            id: 3,
            companyName: "Administración Nasera",
            contactName: "Administrador",
            taxId: "99999999999",
            phone: "+51 999 999 999",
            email: "admin@nasera.com",
            password: "admin123",
            userType: "admin",
            registrationDate: new Date().toISOString()
          }
        ];

        const users = JSON.parse(localStorage.getItem('wholesaleUsers')) || demoAccounts;
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          login(foundUser);
        } else {
          addNotification('Credenciales incorrectas. Verifica email y contraseña.', 'error');
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Acceso Clientes</h1>
          
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="admin@nasera.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
            
            <input
              type="password"
              placeholder="admin123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            
            <select 
              value={userType} 
              onChange={(e) => setUserType(e.target.value)}
              className="login-select"
            >
              <option value="wholesaler">Mayorista</option>
              <option value="retailer">Minorista</option>
              <option value="admin">Administrador</option>
            </select>
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <p className="login-register">
            ¿No tienes cuenta? 
            <span 
              className="register-link" 
              onClick={() => setCurrentPage('register')}
            >
              Regístrate aquí
            </span>
          </p>

          <div className="demo-accounts">
            <h4>Cuentas de Demostración:</h4>
            <p><strong>Backend Real:</strong> admin@nasera.com / admin123</p>
            <p><strong>Mayorista Local:</strong> mayorista@test.com / 123456</p>
            <p><strong>Minorista Local:</strong> minorista@test.com / 123456</p>
          </div>

          <button 
            onClick={() => setCurrentPage('welcome')}
            className="back-button"
          >
            ← Volver al Inicio
          </button>
        </div>
      </div>
    );
  };

  // Página de Registro
  const RegisterPage = () => {
    const [formData, setFormData] = useState({
      companyName: '',
      contactName: '',
      taxId: '',
      phone: '',
      email: '',
      password: '',
      userType: 'wholesaler'
    });
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        await register(formData);
      } catch (error) {
        addNotification(error.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    return (
      <div className="register-container">
        <div className="register-card">
          <h1 className="register-title">Registro de Cliente</h1>
          
          <form onSubmit={handleRegister} className="register-form">
            <input
              type="text"
              name="companyName"
              placeholder="Nombre de Empresa"
              value={formData.companyName}
              onChange={handleChange}
              className="register-input"
              required
            />
            
            <input
              type="text"
              name="contactName"
              placeholder="Nombre de Contacto"
              value={formData.contactName}
              onChange={handleChange}
              className="register-input"
              required
            />
            
            <input
              type="text"
              name="taxId"
              placeholder="RUC/DNI"
              value={formData.taxId}
              onChange={handleChange}
              className="register-input"
              required
            />
            
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              className="register-input"
              required
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="register-input"
              required
            />
            
            <input
              type="password"
              name="password"
              placeholder="Contraseña (mínimo 6 caracteres)"
              value={formData.password}
              onChange={handleChange}
              className="register-input"
              minLength="6"
              required
            />
            
            <select 
              name="userType"
              value={formData.userType} 
              onChange={handleChange}
              className="register-select"
              required
            >
              <option value="wholesaler">Mayorista</option>
              <option value="retailer">Minorista</option>
            </select>
            
            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Creando Cuenta...' : 'Crear Cuenta'}
            </button>
          </form>

          <p className="register-login">
            ¿Ya tienes cuenta? 
            <span 
              className="login-link" 
              onClick={() => setCurrentPage('login')}
            >
              Inicia sesión aquí
            </span>
          </p>

          <button 
            onClick={() => setCurrentPage('welcome')}
            className="back-button"
          >
            ← Volver al Inicio
          </button>
        </div>
      </div>
    );
  };

  // Panel de Mayorista
  const WholesalerDashboard = () => {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="welcome-section">
            <h1>Panel de Control - Mayorista</h1>
            <p>Bienvenido, <strong>{user?.companyName || "Distribuidora Mayorista"}</strong></p>
          </div>
          <div className="user-badge">
            <i className="fas fa-user-tie"></i> Cuenta Mayorista
          </div>
        </header>

        <div className="quick-actions">
          <div className="action-card">
            <div className="action-icon">
              <i className="fas fa-book-open"></i>
            </div>
            <h3>Catálogo Mayorista</h3>
            <p>Accede a precios especiales por volumen con descuentos exclusivos</p>
            <button 
              onClick={() => setCurrentPage('home')}
              className="action-btn catalog-btn"
            >
              Ver Catálogo
            </button>
          </div>
          
          <div className="action-card">
            <div className="action-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Mis Pedidos</h3>
            <p>Revisa el historial y estado de tus pedidos mayoristas</p>
            <button className="action-btn">Ver Pedidos</button>
          </div>
          
          <div className="action-card">
            <div className="action-icon">
              <i className="fas fa-file-invoice-dollar"></i>
            </div>
            <h3>Facturación</h3>
            <p>Gestiona tus facturas y documentos fiscales</p>
            <button className="action-btn">Acceder</button>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-icon">
                <i className="fas fa-tags"></i>
              </div>
              <h2 className="card-title">Mis Precios</h2>
            </div>
            <p style={{marginBottom: '20px', color: '#7f8c8d'}}>Descuentos exclusivos por volumen de compra</p>
            
            <div className="pricing-tier">
              <span className="tier-range">5+ unidades</span>
              <span className="tier-discount">15% descuento</span>
            </div>
            <div className="pricing-tier">
              <span className="tier-range">10+ unidades</span>
              <span className="tier-discount">20% descuento</span>
            </div>
            <div className="pricing-tier">
              <span className="tier-range">20+ unidades</span>
              <span className="tier-discount">30% descuento</span>
            </div>
            <div className="pricing-tier">
              <span className="tier-range">50+ unidades</span>
              <span className="tier-discount">35% descuento</span>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h2 className="card-title">Estadísticas</h2>
            </div>
            <p style={{marginBottom: '20px', color: '#7f8c8d'}}>Resumen de tu actividad mayorista</p>
            
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">12</div>
                <div className="stat-label">Pedidos este mes</div>
              </div>
              <div className="stat-item highlight-stat">
                <div className="stat-value">Bs. 2,450</div>
                <div className="stat-label">Ahorro total</div>
              </div>
              <div className="stat-item" style={{gridColumn: 'span 2'}}>
                <div className="stat-label">Productos más comprados</div>
                <div className="stat-value" style={{fontSize: '1.2rem'}}>Zapatillas</div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-icon">
                <i className="fas fa-user-circle"></i>
              </div>
              <h2 className="card-title">Mi Perfil</h2>
            </div>
            <p style={{marginBottom: '20px', color: '#7f8c8d'}}>Información de tu cuenta mayorista</p>
            
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Empresa:</span>
                <span className="info-value">{user?.companyName || "Distribuidora Mayorista Demo"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Contacto:</span>
                <span className="info-value">{user?.contactName || "Carlos Rodríguez"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">RUC/DNI:</span>
                <span className="info-value">{user?.taxId || "20123456789"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Estado:</span>
                <span className="info-value" style={{color: '#2ecc71', fontWeight: '600'}}>
                  <i className="fas fa-check-circle"></i> Verificado
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{marginTop: '30px', textAlign: 'center'}}>
          <button 
            onClick={() => setCurrentPage('home')}
            className="action-btn"
            style={{width: 'auto', padding: '10px 30px'}}
          >
            ← Volver al Catálogo
          </button>
          <button 
            onClick={logout}
            className="logout-btn"
            style={{marginLeft: '15px'}}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  };

  // Página de Inicio
  const HomePage = () => {
    return (
      <div className="home-container">
        <header className="home-header">
          <h1 className="home-title" onClick={() => setCurrentPage('home')}>
            {isAuthenticated ? `Bienvenido, ${user?.contactName}` : 'Tienda Online'}
          </h1>
          <div className="header-actions">
            {isAuthenticated ? (
              <>
                {user?.userType === 'wholesaler' && (
                  <button 
                    onClick={() => setCurrentPage('dashboard')}
                    className="dashboard-button"
                  >
                    🏪 Panel Mayorista
                  </button>
                )}
                {user?.userType === 'admin' && (
                  <button
                    onClick={() => goToAdmin()}
                    className="admin-panel-button"
                  >
                    🔧 Panel Admin
                  </button>
                )}
                <button onClick={() => setCurrentPage('favorites')} className="favorites-button">
                  ❤️ ({favorites.length})
                </button>
                <button onClick={() => setCurrentPage('cart')} className="cart-button">
                  🛒 ({getCartItemCount()})
                </button>
                <button onClick={logout} className="logout-button">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setCurrentPage('login')} className="login-button">
                  Iniciar Sesión
                </button>
                <button onClick={() => setCurrentPage('register')} className="register-button">
                  Registrarse
                </button>
              </>
            )}
          </div>
        </header>

        {isAuthenticated && user?.userType === 'wholesaler' && (
          <div className="wholesaler-banner">
            <div className="banner-content">
              <span className="banner-badge">MAYORISTA</span>
              <p>¡Estás disfrutando de precios especiales por volumen!</p>
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className="banner-button"
              >
                Ver Mi Panel
              </button>
            </div>
          </div>
        )}

        <section className="hero-section">
          <h2>Comodidad y Confianza en Cada Compra</h2>
          <p>Descubre una experiencia de compra única donde el confort se encuentra con el estilo.</p>
        </section>

        {/* Barra de Búsqueda y Filtros */}
        <div className="search-filters-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar productos por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>

          <div className="filters-container">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Ordenar por: Nombre</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        <div className="main-layout">
          <aside className="categories-sidebar">
            <h3>Categorías</h3>
            <div className="categories-list">
              <button 
                onClick={() => setSelectedCategory('todos')} 
                className={`category-btn ${selectedCategory === 'todos' ? 'active' : ''}`}
              >
                Todos
              </button>
              <button 
                onClick={() => setSelectedCategory('carteras')} 
                className={`category-btn ${selectedCategory === 'carteras' ? 'active' : ''}`}
              >
                Carteras
              </button>
              <button 
                onClick={() => setSelectedCategory('jeans')} 
                className={`category-btn ${selectedCategory === 'jeans' ? 'active' : ''}`}
              >
                Jeans
              </button>
              <button 
                onClick={() => setSelectedCategory('zapatillas')} 
                className={`category-btn ${selectedCategory === 'zapatillas' ? 'active' : ''}`}
              >
                Zapatillas
              </button>
              <button 
                onClick={() => setSelectedCategory('chaquetas')} 
                className={`category-btn ${selectedCategory === 'chaquetas' ? 'active' : ''}`}
              >
                Chaquetas
              </button>
            </div>
          </aside>

          <main className="products-main">
            <section className="products-section">
              <div className="products-header">
                <h3>
                  {selectedCategory === 'todos' && 'Productos Destacados'}
                  {selectedCategory === 'carteras' && 'Carteras'}
                  {selectedCategory === 'jeans' && 'Jeans'}
                  {selectedCategory === 'zapatillas' && 'Zapatillas'}
                  {selectedCategory === 'chaquetas' && 'Chaquetas'}
                </h3>
                <span className="products-count">
                  {filteredProducts.length} productos encontrados
                </span>
              </div>
              
              {loading ? (
                <div className="loading-products">
                  <p>Cargando productos desde el backend...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="no-products">
                  <p>No se encontraron productos que coincidan con tu búsqueda.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('todos');
                    }}
                    className="clear-filters-btn"
                  >
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                      <div className="product-image-container">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="product-image"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+No+Disponible';
                          }}
                        />
                        <button 
                          onClick={() => toggleFavorite(product.id)}
                          className={`favorite-btn ${favorites.includes(product.id) ? 'favorited' : ''}`}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                        </button>
                      </div>
                      <h4>{product.name}</h4>
                      <p className="product-price">
                        {getProductPrice(product.price, product.id)}
                        {user?.userType === 'wholesaler' && (
                          <span className="wholesale-badge">MAYORISTA</span>
                        )}
                      </p>
                      <div className="product-actions">
                        <button 
                          onClick={() => setCurrentPage(`product-${product.id}`)}
                          className="view-button"
                        >
                          Ver Detalles
                        </button>
                        <button 
                          onClick={() => addToCart(product)}
                          className="buy-button"
                        >
                          Comprar Ahora
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    );
  };

  // Página de Favoritos
  const FavoritesPage = () => {
    const favoriteProducts = products.filter(product => favorites.includes(product.id));

    return (
      <div className="favorites-container">
        <header className="favorites-header">
          <button onClick={() => setCurrentPage('home')} className="back-button">
            ← Volver
          </button>
          <h1>Mis Favoritos</h1>
          <span className="favorites-count-badge">{favoriteProducts.length} productos</span>
          {user?.userType === 'admin' && (
            <button onClick={() => goToAdmin()} className="admin-panel-button">🔧 Panel Admin</button>
          )}
        </header>

        <div className="favorites-content">
          {favoriteProducts.length === 0 ? (
            <div className="empty-favorites">
              <svg className="empty-heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <h3>No tienes productos favoritos</h3>
              <p>Explora nuestros productos y añade tus favoritos</p>
              <button 
                onClick={() => setCurrentPage('home')}
                className="cta-button"
              >
                Explorar Productos
              </button>
            </div>
          ) : (
            <div className="favorites-grid">
              {favoriteProducts.map(product => (
                <div key={product.id} className="favorite-product-card">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="favorite-product-image"
                  />
                  <div className="favorite-product-info">
                    <h4>{product.name}</h4>
                    <p className="favorite-product-price">
                      {getProductPrice(product.price, product.id)}
                    </p>
                    <div className="favorite-product-actions">
                      <button 
                        onClick={() => addToCart(product)}
                        className="buy-button"
                      >
                        Comprar Ahora
                      </button>
                      <button 
                        onClick={() => toggleFavorite(product.id)}
                        className="remove-favorite-btn"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Página de Detalle de Producto
  const ProductPage = ({ productId }) => {
    const product = products.find(p => p.id === productId);

    if (!product) {
      return (
        <div className="product-not-found">
          <h2>Producto no encontrado</h2>
          <button onClick={() => setCurrentPage('home')} className="back-button">
            ← Volver al Inicio
          </button>
        </div>
      );
    }

    const addToCartAndNotify = () => {
      addToCart(product);
    };

    return (
      <div className="product-container">
        <header className="product-header">
          <button onClick={() => setCurrentPage('home')} className="back-button">
            ← Volver
          </button>
          <h1 className="home-title" onClick={() => setCurrentPage('home')}>
            {isAuthenticated ? `Bienvenido, ${user?.contactName}` : 'Tienda Online'}
          </h1>
          <div className="header-actions">
            <button onClick={() => setCurrentPage('cart')} className="cart-button">
              🛒 ({getCartItemCount()})
            </button>
            {user?.userType === 'admin' && (
              <button onClick={() => goToAdmin()} className="admin-panel-button">🔧 Panel Admin</button>
            )}
          </div>
        </header>

        <div className="product-detail">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-detail-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x400?text=Imagen+No+Disponible';
            }}
          />
          
          <div className="product-info">
            <h2>{product.name}</h2>
            <h3 className="product-detail-price">
              {getProductPrice(product.price, product.id)}
              {user?.userType === 'wholesaler' && (
                <span className="wholesale-badge">PRECIO MAYORISTA</span>
              )}
            </h3>
            
            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {user?.userType === 'wholesaler' && (
              <div className="wholesale-info">
                <h4>🎯 Descuentos por Volumen:</h4>
                <ul>
                  <li>5+ unidades: 15% descuento</li>
                  <li>10+ unidades: 20% descuento</li>
                  <li>20+ unidades: 30% descuento</li>
                  <li>50+ unidades: 35% descuento</li>
                </ul>
              </div>
            )}

            <div className="product-actions-detail">
              <button onClick={addToCartAndNotify} className="add-to-cart-button">
                Añadir al carrito
              </button>
              <button onClick={() => {
                addToCartAndNotify();
                setCurrentPage('cart');
              }} className="buy-now-button">
                Comprar Ahora
              </button>
            </div>

            <button 
              onClick={() => toggleFavorite(product.id)}
              className={`favorite-product-btn ${favorites.includes(product.id) ? 'favorited' : ''}`}
            >
              {favorites.includes(product.id) ? '❤️ En favoritos' : '🤍 Añadir a favoritos'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Página del Carrito
  const CartPage = () => {
    const removeFromCartAndNotify = (productId) => {
      removeFromCart(productId);
    };

    return (
      <div className="cart-container">
        <header className="cart-header">
          <button onClick={() => setCurrentPage('home')} className="back-button">
            ← Volver
          </button>
          <h1 className="home-title" onClick={() => setCurrentPage('home')}>
            {isAuthenticated ? `Bienvenido, ${user?.contactName}` : 'Tienda Online'}
          </h1>
          <div className="header-actions">
            <h1>Carrito de Compras</h1>
            {user?.userType === 'admin' && (
              <button onClick={() => goToAdmin()} className="admin-panel-button">🔧 Panel Admin</button>
            )}
          </div>
        </header>

        <div className="cart-content">
          {cart.length === 0 ? (
            <p className="empty-cart">Tu carrito está vacío</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="cart-item-image"
                    />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>{getProductPrice(item.price, item.id)}</p>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCartAndNotify(item.id)}
                      className="remove-button"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="cart-total">
                <h3>Total: Bs. {getCartTotal()}</h3>
                {user?.userType === 'wholesaler' && (
                  <p className="wholesale-savings">
                    💰 Estás ahorrando con precios mayoristas
                  </p>
                )}
                <div className="cart-actions">
                  <button onClick={clearCart} className="clear-cart-button">
                    Vaciar Carrito
                  </button>
                  <button className="checkout-button">
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <NotificationContainer />
      {currentPage === 'welcome' && <WelcomePage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'register' && <RegisterPage />}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'dashboard' && <WholesalerDashboard />}
      {(user && user.userType === 'admin') && (
        <AdminPanel 
          user={user} 
          onLogout={logout} 
          products={products}
        />
      )}
      {currentPage === 'favorites' && <FavoritesPage />}
      {currentPage.startsWith('product-') && (
        <ProductPage productId={currentPage.split('-')[1]} />
      )}
      {currentPage === 'cart' && <CartPage />}
    </div>
  );
}

export default App;