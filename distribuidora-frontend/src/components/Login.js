import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'admin' // Por defecto admin para este login específico
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Datos del usuario admin que coincidan con App.js
      const adminUser = {
        id: 3,
        companyName: "Administración Nasera",
        contactName: "Administrador", 
        taxId: "99999999999",
        phone: "+51 999 999 999",
        email: formData.email,
        password: formData.password,
        userType: "admin",
        registrationDate: new Date().toISOString(),
        permissions: ['view_orders', 'manage_products', 'view_users', 'manage_users']
      };

      // Verificar credenciales
      if (formData.email === 'admin@nasera.com' && formData.password === 'admin123') {
        // Usar el sistema de login de App.js
        onLogin(adminUser);
      } else {
        setError('Credenciales incorrectas. Usa: admin@nasera.com / admin123');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div className="login-logo">
            NT
          </div>
          <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>Nasera Tienda</h1>
          <p style={{ margin: 0, color: '#666' }}>Sistema de Administración</p>
        </div>

        {error && (
          <div style={{
            background: '#fee',
            color: '#c33',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px',
            border: '1px solid #fcc'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>
              Correo Electrónico
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: error ? '1px solid #c33' : '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                transition: 'border 0.3s ease'
              }}
              placeholder="admin@nasera.com"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: error ? '1px solid #c33' : '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                transition: 'border 0.3s ease'
              }}
              placeholder="••••••"
            />
          </div>

          {/* Campo oculto para userType */}
          <input type="hidden" name="userType" value="admin" />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#999' : '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s ease'
            }}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión como Administrador'}
          </button>
        </form>

        <div style={{
          marginTop: '30px',
          padding: '15px',
          background: '#f5f5f5',
          borderRadius: '5px',
          fontSize: '12px',
          color: '#666'
        }}>
          <strong>Credenciales:</strong> admin@nasera.com / admin123
        </div>

        {/* Enlace al login principal de la tienda */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>
            ¿Eres cliente? {' '}
            <a 
              href="/" 
              style={{ color: '#4f46e5', textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
            >
              Ir a la tienda principal
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;