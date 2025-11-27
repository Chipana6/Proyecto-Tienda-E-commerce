import React from 'react';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{
        background: 'white',
        padding: '15px 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: '#4f46e5',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            DM
          </div>
          <h1 style={{ margin: 0, color: '#333' }}>Distribuidora Moda</h1>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>Dashboard</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {[
            { title: 'Ventas del Mes', value: '$45,230', color: '#10b981' },
            { title: 'Total Productos', value: '1,234', color: '#3b82f6' },
            { title: 'Clientes Activos', value: '89', color: '#8b5cf6' },
            { title: 'Pedidos Pendientes', value: '23', color: '#f59e0b' }
          ].map((stat, index) => (
            <div key={index} style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>{stat.title}</p>
              <p style={{ margin: 0, color: '#333', fontSize: '24px', fontWeight: 'bold' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Bienvenido al Sistema</h3>
          <p style={{ margin: 0, color: '#666' }}>Sistema de gestión para distribuidora de moda</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;