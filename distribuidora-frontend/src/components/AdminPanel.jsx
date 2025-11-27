// src/components/AdminPanel.jsx - CON PRODUCTOS REALES
import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  // API URLs
  const API_URL = 'http://localhost:5000/api';

  // Cargar productos reales del backend
  useEffect(() => {
    loadProducts();
    loadCustomers();
    loadOrders();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error('Error al cargar productos');
      const data = await response.json();
      
      // Transformar productos del backend al formato del frontend
      const transformedProducts = data.map(product => ({
        id: product._id,
        name: product.name,
        category: product.category,
        price: `Bs. ${product.price}`,
        stock: product.stock,
        description: product.description,
        status: product.stock > 0 ? 'Activo' : 'Agotado',
        image: getProductImage(product.category, product.name)
      }));
      
      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCustomers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error('Error cargando clientes:', error);
      // Datos de ejemplo como fallback
      setCustomers([
        { id: 1, name: 'María González', email: 'maria@email.com', phone: '+591 71234567', orders: 12, total: 'Bs. 8,400', status: 'Activo' },
        { id: 2, name: 'Carlos Rodríguez', email: 'carlos@email.com', phone: '+591 72345678', orders: 8, total: 'Bs. 5,200', status: 'Activo' }
      ]);
    }
  };

  const loadOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/orders`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error cargando órdenes:', error);
      // Datos de ejemplo como fallback
      setOrders([
        { id: '4001', customer: 'María González', date: '2024-01-15', amount: 'Bs. 1,200', status: 'Completado' },
        { id: '4002', customer: 'Carlos Rodríguez', date: '2024-01-15', amount: 'Bs. 850', status: 'Procesando' }
      ]);
    }
  };

  // Mapeo de imágenes basado en tus archivos reales
  const getProductImage = (category, productName) => {
    const imageMap = {
      // Carteras
      'Cartera Elegante 1': '/images/Cartera-1.jpg',
      'Cartera Elegante 2': '/images/Cartera-2.jpg',
      'Cartera Elegante 3': '/images/Cartera-3.jpg',
      'Cartera Premium': '/images/Cartera-4.jpg',
      'Cartera Deportiva': '/images/Cartera-5.jpg',
      'Cartera Vintage': '/images/Cartera-6.jpg',
      'Cartera Minimalista': '/images/Cartera-7.jpeg',
      'Bolso Bandolera': '/images/Cartera-8.webp',
      'Cartera Ejecutiva': '/images/Cartera-9.jpg',
      'Cartera Compacta': '/images/cartera-10.jpeg',
      'Cartera de Lujo': '/images/cartera-11.png',
      'Cartera Casual': '/images/cartera-12.jpg',
      'Cartera Pequeña': '/images/carttera-13.jpeg',
      'Cartera Moderna': '/images/cartera-14.jpg',
      'Cartera De Lujo 2': '/images/cartera-15.jpeg',

      // Jeans
      'Jean Acne Studio': '/images/Jean-AcneStudio-Hombre.jpg',
      'Jean Acne Studio 2': '/images/Jean-AcneStudio-Hombre-2.jpg',
      'Jean Dior Hombre': '/images/Jean-Dior-de-Hombre.webp',
      'Jean Louis Vuitton': '/images/Jean-Lv-hombre.avif',
      'Jean LV x Supreme': '/images/Jean-LvxSupreme-hombre.avif',
      'Jean Supreme': '/images/Jean-Supreme-hombre.avif',
      'Jean Supreme 2': '/images/Jean-Supreme-Hombre.2.jpeg',
      'Jean Vnno': '/images/Jean-Vnno-Hombre.webp',
      'Jean Vnno 2': '/images/Jean-Vnno-Hombre-2.webp',
      'Jean Palace': '/images/Jean-Palace-Hombre.avif',
      'Jean Crome Hearts': '/images/Jean-Crome Hearts-hombre.webp',
      'Jean Denim Tears': '/images/Jean-DenimTears-hombre.webp',
      'Jean CH Hombre': '/images/Jean-Ch-hombre.webp',

      // Zapatillas
      'Air Force One Clásicas': '/images/AirForce One Clasicas.jpg',
      'Air Force One Picante Red': '/images/AirForce One Picante Red.webp',
      'Air Force One Nocta': '/images/Air Force One Nocta.png',
      'Air Force One Nocta Citron': '/images/AirForceOne Nocta Citron Tint.jpg',
      'Jordan 1 Low Concord': '/images/Jordan 1 Low Concord.avif',
      'Jordan 1 Low UNC': '/images/Jordan 1 Low Unc.avif',
      'Jordan 1 Low Fragment x Travis Scott': '/images/Jordan 1 low Fragment x Travis Scott.avif',
      'Jordan 1 Low Travis Scott Moca': '/images/Jordan 1 low Travis Scott Moca.avif',
      'Jordan 1 Low Travis Scott Reverse Moca': '/images/Jordan 1 low x Travis Scott Reverse Moca.jpg',
      'Jordan 1 Low Travis Scott Reverse Olive': '/images/Jordan 1 low x Travis Scott Reverse Olive.avif',
      'Jordan 1 Low Travis Scott Fragment Blue': '/images/Jordan 1 low x Travis Scott Fragment Blue.webp',
      'Jordan 1 Low Travis Scott Medium Olive': '/images/Jordan 1 low x Travis Scott Medium Olive.webp',
      'Jordan 1 Low Travis Scott Black Phantom': '/images/Jordan 1 low x Travis Scott Black Phantom.webp',
      'Jordan 1 Low Travis Scott Black PlayStation': '/images/Jordan 1 low x Travis Scott Black Play Station.avif',
      'Jordan 1 Low Travis Scott Velvet Brown': '/images/Jordan 1 low x Travis Scott Velvet Brown.webp',
      'Jordan 1 Low Travis Scott Canary': '/images/Jordan 1 Low Travis Scott Canary.webp',

      // Chaquetas
      'Louis Vuitton Varsity Jacket Green': '/images/Louis-Vuitton-Varsity-Jacket-Green.avif',
      'Louis Vuitton Varsity Jacket White': '/images/Louis-Vuitton-Varsity-Jacket-White.webp',
      'Louis Vuitton Denim Jacket': '/images/Louis Vuitton Denim Jacket.webp',
      'Adidas Chinese New Year Jacket Blue': '/images/Adidas-Chinese-New-Year-Jacket-Blue.jpg',
      'Supreme x The North Face': '/images/Supreme x The North Face.webp',
      'Nike x Supreme': '/images/Nike x Supreme.jpeg',
      'Stussy 8 Ball': '/images/Stusse 8 Ball.jpeg'
    };

    return imageMap[productName] || '/images/default-product.jpg';
  };

  // Datos de estadísticas calculados de los datos reales
  const statsData = [
    { 
      title: 'Ventas Totales', 
      value: `Bs. ${orders.reduce((total, order) => total + parseInt(order.amount?.replace('Bs. ', '') || 0), 0).toLocaleString()}`, 
      type: 'primary', 
      icon: '💰' 
    },
    { 
      title: 'Órdenes Hoy', 
      value: orders.length.toString(), 
      type: 'success', 
      icon: '📦' 
    },
    { 
      title: 'Productos', 
      value: products.length.toString(), 
      type: 'warning', 
      icon: '👕' 
    },
    { 
      title: 'Clientes', 
      value: customers.length.toString(), 
      type: 'info', 
      icon: '👥' 
    }
  ];

  // Funciones para gestionar productos
  const deleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setProducts(products.filter(p => p.id !== productId));
          alert('Producto eliminado correctamente');
        } else {
          alert('Error al eliminar el producto');
        }
      } catch (error) {
        console.error('Error eliminando producto:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  const updateProductStock = async (productId, newStock) => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stock: newStock })
      });
      
      if (response.ok) {
        setProducts(products.map(p => 
          p.id === productId ? { ...p, stock: newStock } : p
        ));
        alert('Stock actualizado correctamente');
      }
    } catch (error) {
      console.error('Error actualizando stock:', error);
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h1>🏪 Nuestra Tienda</h1>
          <p>Panel Administrativo</p>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3>Principal</h3>
            <button 
              className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={`nav-item ${activeSection === 'ventas' ? 'active' : ''}`}
              onClick={() => setActiveSection('ventas')}
            >
              💰 Ventas
            </button>
          </div>

          <div className="nav-section">
            <h3>Gestión</h3>
            <button 
              className={`nav-item ${activeSection === 'productos' ? 'active' : ''}`}
              onClick={() => setActiveSection('productos')}
            >
              👕 Productos ({products.length})
            </button>
            <button 
              className={`nav-item ${activeSection === 'clientes' ? 'active' : ''}`}
              onClick={() => setActiveSection('clientes')}
            >
              👥 Clientes ({customers.length})
            </button>
            <button 
              className={`nav-item ${activeSection === 'inventario' ? 'active' : ''}`}
              onClick={() => setActiveSection('inventario')}
            >
              📦 Inventario
            </button>
          </div>

          <div className="nav-section">
            <h3>Sistema</h3>
            <button 
              className={`nav-item ${activeSection === 'configuracion' ? 'active' : ''}`}
              onClick={() => setActiveSection('configuracion')}
            >
              ⚙️ Configuración
            </button>
            <button 
              className="nav-item logout-btn"
              onClick={onLogout}
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <h1>
              {activeSection === 'dashboard' && 'Dashboard'}
              {activeSection === 'ventas' && 'Gestión de Ventas'}
              {activeSection === 'productos' && 'Gestión de Productos'}
              {activeSection === 'clientes' && 'Gestión de Clientes'}
              {activeSection === 'inventario' && 'Control de Inventario'}
              {activeSection === 'configuracion' && 'Configuración del Sistema'}
            </h1>
            <p>Bienvenido, {user?.contactName || 'Administrador Principal'}</p>
          </div>
          
          <div className="header-actions">
            <div className="user-info">
              <div className="user-avatar">
                {user?.contactName?.charAt(0) || 'A'}
              </div>
              <span>{user?.companyName || 'Nasera Fashion Admin'}</span>
            </div>
          </div>
        </header>

        {/* Contenido Dinámico */}
        <div className="admin-content">
          {/* DASHBOARD */}
          {activeSection === 'dashboard' && (
            <div className="dashboard-content">
              {/* Estadísticas */}
              <div className="stats-grid">
                {statsData.map((stat, index) => (
                  <div key={index} className={`stat-card ${stat.type}`}>
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-info">
                      <h3>{stat.value}</h3>
                      <p>{stat.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid de Contenido */}
              <div className="dashboard-grid">
                {/* Órdenes Recientes */}
                <div className="dashboard-card">
                  <div className="card-header">
                    <h2>Órdenes Recientes</h2>
                    <button className="btn btn-sm btn-primary">Ver Todas</button>
                  </div>
                  <div className="orders-list">
                    {orders.slice(0, 5).map((order, index) => (
                      <div key={index} className="order-card">
                        <div className="order-info">
                          <h4>#{order.id}</h4>
                          <p>{order.customer}</p>
                          <span className="order-date">{order.date}</span>
                        </div>
                        <div className="order-details">
                          <span className="order-amount">{order.amount}</span>
                          <span className={`status-badge status-${order.status?.toLowerCase() || 'pendiente'}`}>
                            {order.status || 'Pendiente'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Productos con Bajo Stock */}
                <div className="dashboard-card">
                  <div className="card-header">
                    <h2>Productos con Bajo Stock</h2>
                  </div>
                  <div className="low-stock-products">
                    {products.filter(p => p.stock < 10).slice(0, 5).map(product => (
                      <div key={product.id} className="stock-alert">
                        <span className="product-name">{product.name}</span>
                        <span className={`stock-level ${product.stock === 0 ? 'out-of-stock' : 'low-stock'}`}>
                          {product.stock} unidades
                        </span>
                      </div>
                    ))}
                    {products.filter(p => p.stock < 10).length === 0 && (
                      <p className="no-alerts">✅ Todo el stock está en niveles óptimos</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTOS - CON TUS PRODUCTOS REALES */}
          {activeSection === 'productos' && (
            <div className="products-management">
              <div className="section-header">
                <h2>Gestión de Productos ({products.length} productos)</h2>
                <div className="header-actions">
                  <button className="btn btn-secondary" onClick={loadProducts}>
                    🔄 Actualizar
                  </button>
                  <button className="btn btn-primary">
                    + Agregar Producto
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="loading-state">
                  <p>Cargando productos...</p>
                </div>
              ) : (
                <div className="products-table">
                  <div className="table-header">
                    <div>Imagen</div>
                    <div>Producto</div>
                    <div>Categoría</div>
                    <div>Precio</div>
                    <div>Stock</div>
                    <div>Estado</div>
                    <div>Acciones</div>
                  </div>

                  {products.map(product => (
                    <div key={product.id} className="table-row">
                      <div>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="product-thumbnail"
                          onError={(e) => {
                            e.target.src = '/images/default-product.jpg';
                          }}
                        />
                      </div>
                      <div>
                        <strong>{product.name}</strong>
                        {product.description && (
                          <p className="product-description">{product.description}</p>
                        )}
                      </div>
                      <div>{product.category}</div>
                      <div>{product.price}</div>
                      <div>
                        <span className={`stock-badge ${product.stock > 10 ? 'in-stock' : product.stock === 0 ? 'out-of-stock' : 'low-stock'}`}>
                          {product.stock} unidades
                        </span>
                      </div>
                      <div>
                        <span className={`status-badge status-${product.status?.toLowerCase()}`}>
                          {product.status}
                        </span>
                      </div>
                      <div className="action-buttons">
                        <button 
                          className="btn btn-sm btn-edit"
                          onClick={() => updateProductStock(product.id, product.stock + 10)}
                        >
                          📦 Reponer
                        </button>
                        <button 
                          className="btn btn-sm btn-delete"
                          onClick={() => deleteProduct(product.id)}
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CLIENTES */}
          {activeSection === 'clientes' && (
            <div className="customers-management">
              <div className="section-header">
                <h2>Gestión de Clientes ({customers.length} clientes)</h2>
                <div className="header-actions">
                  <button className="btn btn-secondary" onClick={loadCustomers}>
                    🔄 Actualizar
                  </button>
                </div>
              </div>

              <div className="customers-table">
                <div className="table-header">
                  <div>ID</div>
                  <div>Cliente</div>
                  <div>Contacto</div>
                  <div>Pedidos</div>
                  <div>Total Gastado</div>
                  <div>Estado</div>
                  <div>Acciones</div>
                </div>

                {customers.map(customer => (
                  <div key={customer.id} className="table-row">
                    <div>#{customer.id}</div>
                    <div>
                      <strong>{customer.name}</strong>
                      <br />
                      <small>{customer.email}</small>
                    </div>
                    <div>{customer.phone}</div>
                    <div>{customer.orders || 0} pedidos</div>
                    <div>{customer.total || 'Bs. 0'}</div>
                    <div>
                      <span className={`status-badge status-${customer.status?.toLowerCase() || 'activo'}`}>
                        {customer.status || 'Activo'}
                      </span>
                    </div>
                    <div className="action-buttons">
                      <button className="btn btn-sm btn-edit">Editar</button>
                      <button className="btn btn-sm btn-delete">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

{activeSection === 'inventario' && (
  <div className="inventory-management">
    <div className="section-header">
      <h2>Control de Inventario</h2>
      <div className="header-actions">
        <button className="btn btn-secondary">📊 Generar Reporte</button>
        <button className="btn btn-primary">📦 Actualizar Stock Masivo</button>
      </div>
    </div>

    {/* Alertas importantes */}
    <div className="inventory-alerts">
      {products.filter(p => p.stock === 0).length > 0 && (
        <div className="alert alert-danger">
          ⚠️ <strong>{products.filter(p => p.stock === 0).length} productos agotados</strong>
        </div>
      )}
      {products.filter(p => p.stock < 10 && p.stock > 0).length > 0 && (
        <div className="alert alert-warning">
          ⚠️ <strong>{products.filter(p => p.stock < 10 && p.stock > 0).length} productos con stock bajo</strong>
        </div>
      )}
    </div>

    <div className="inventory-stats">
      <div className="inventory-stat">
        <h3>Total Productos</h3>
        <p>{products.length}</p>
      </div>
      <div className="inventory-stat">
        <h3>Bajo Stock</h3>
        <p className="stat-warning">{products.filter(p => p.stock < 10 && p.stock > 0).length}</p>
      </div>
      <div className="inventory-stat">
        <h3>Agotados</h3>
        <p className="stat-danger">{products.filter(p => p.stock === 0).length}</p>
      </div>
      <div className="inventory-stat">
        <h3>Disponibles</h3>
        <p className="stat-success">{products.filter(p => p.stock > 0).length}</p>
      </div>
    </div>

    <div className="inventory-table">
      <div className="table-header">
        <div>Imagen</div>
        <div>Producto</div>
        <div>Categoría</div>
        <div>Precio</div>
        <div>Stock Actual</div>
        <div>Estado</div>
        <div>Acciones</div>
      </div>

      {products.map(product => (
        <div key={product.id} className={`table-row ${product.stock === 0 ? 'out-of-stock-row' : product.stock < 10 ? 'low-stock-row' : ''}`}>
          <div>
            <img 
              src={product.image} 
              alt={product.name}
              className="product-thumbnail"
              onError={(e) => {
                e.target.src = '/images/default-product.jpg';
              }}
            />
          </div>
          <div>
            <strong>{product.name}</strong>
            {product.description && (
              <p className="product-description">{product.description}</p>
            )}
          </div>
          <div>{product.category}</div>
          <div>{product.price}</div>
          <div>
            <span className={`stock-badge ${product.stock > 10 ? 'in-stock' : product.stock === 0 ? 'out-of-stock' : 'low-stock'}`}>
              {product.stock} unidades
            </span>
          </div>
          <div>
            <span className={`status-badge status-${product.stock > 10 ? 'disponible' : product.stock === 0 ? 'agotado' : 'bajo-stock'}`}>
              {product.stock > 10 ? 'Disponible' : product.stock === 0 ? 'Agotado' : 'Bajo Stock'}
            </span>
          </div>
          <div className="action-buttons">
            <button 
              className="btn btn-sm btn-success"
              onClick={() => updateProductStock(product.id, product.stock + 10)}
              title="Agregar 10 unidades"
            >
              +10
            </button>
            <button 
              className="btn btn-sm btn-warning"
              onClick={() => updateProductStock(product.id, product.stock + 1)}
              title="Agregar 1 unidad"
            >
              +1
            </button>
            <button 
              className="btn btn-sm btn-danger"
              onClick={() => updateProductStock(product.id, Math.max(0, product.stock - 1))}
              title="Reducir 1 unidad"
            >
              -1
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
          {/* Los otros módulos permanecen igual... */}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;