import React from 'react';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#2196f3', marginBottom: '20px' }}>
          🐱 Cats API Frontend
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Aplicação React funcionando perfeitamente!
        </p>
        <div style={{
          backgroundColor: '#4caf50',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '4px',
          display: 'inline-block'
        }}>
          ✅ Frontend Online
        </div>
        <div style={{ marginTop: '20px', fontSize: '14px', color: '#999' }}>
          <p>Backend: http://localhost:8080</p>
          <p>Frontend: http://localhost:5173</p>
        </div>
      </div>
    </div>
  );
}

export default App;