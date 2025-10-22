import React, { useState, useEffect } from 'react';
import BreedsList from './components/BreedsList';
import { 
  checkHealth, 
  importBreeds, 
  getBreeds, 
  importImagesByCategory,
  getAllImages 
} from './services/api';

function App() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'
  const [apiStatus, setApiStatus] = useState('unknown');

  useEffect(() => {
    checkApiHealth();
  }, []);

  const showMessage = (text, type = 'info') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const checkApiHealth = async () => {
    try {
      await checkHealth();
      setApiStatus('online');
      showMessage('API está online e funcionando!', 'success');
    } catch (error) {
      setApiStatus('offline');
      showMessage('API está offline. Verifique se o backend está rodando em http://localhost:8080', 'error');
    }
  };

  const handleImportBreeds = async () => {
    setLoading(true);
    try {
      const result = await importBreeds();
      showMessage(result || 'Raças importadas com sucesso!', 'success');
      // Atualizar a lista após importar
      await handleUpdateBreeds();
    } catch (error) {
      showMessage('Erro ao importar raças: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBreeds = async () => {
    setLoading(true);
    try {
      const breedsData = await getBreeds();
      setBreeds(breedsData);
      showMessage(`${breedsData.length} raças carregadas!`, 'success');
    } catch (error) {
      showMessage('Erro ao carregar raças: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleImportImages = async (category) => {
    try {
      const result = await importImagesByCategory(category);
      showMessage(result || `Imagens da categoria "${category}" importadas!`, 'success');
    } catch (error) {
      showMessage(`Erro ao importar imagens de "${category}": ` + error.message, 'error');
    }
  };

  const getStatusColor = () => {
    switch (apiStatus) {
      case 'online': return '#4caf50';
      case 'offline': return '#f44336';
      default: return '#ff9800';
    }
  };

  const getMessageStyle = () => {
    const baseStyle = {
      padding: '12px 16px',
      borderRadius: '4px',
      marginBottom: '16px',
      border: '1px solid',
    };

    switch (messageType) {
      case 'success':
        return { ...baseStyle, backgroundColor: '#e8f5e8', color: '#2e7d32', borderColor: '#4caf50' };
      case 'error':
        return { ...baseStyle, backgroundColor: '#ffebee', color: '#c62828', borderColor: '#f44336' };
      case 'info':
      default:
        return { ...baseStyle, backgroundColor: '#e3f2fd', color: '#1976d2', borderColor: '#2196f3' };
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#2196f3',
          color: '#fff',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
            Cats API - Frontend
          </h1>
          <p style={{ margin: '0', opacity: 0.9 }}>
            Interface para gerenciar raças de gatos e suas imagens
          </p>
          <div style={{
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '14px' }}>Status da API:</span>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: getStatusColor()
            }}></div>
            <span style={{ fontSize: '14px', textTransform: 'capitalize' }}>
              {apiStatus}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #eee',
          backgroundColor: '#fafafa'
        }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <button
              onClick={checkApiHealth}
              style={{
                padding: '10px 16px',
                backgroundColor: '#ff9800',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Verificar API
            </button>
            
            <button
              onClick={handleImportBreeds}
              disabled={loading}
              style={{
                padding: '10px 16px',
                backgroundColor: loading ? '#ccc' : '#4caf50',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >
              {loading ? 'Importando...' : 'Importar raças'}
            </button>

            <button
              onClick={handleUpdateBreeds}
              disabled={loading}
              style={{
                padding: '10px 16px',
                backgroundColor: loading ? '#ccc' : '#2196f3',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >
              {loading ? 'Carregando...' : 'Atualizar lista'}
            </button>
          </div>

          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '14px', color: '#666', alignSelf: 'center' }}>
              Importar imagens:
            </span>
            {['fofa', 'chapeu', 'oculos', 'engraçada'].map(category => (
              <button
                key={category}
                onClick={() => handleImportImages(category)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#9c27b0',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div style={{ padding: '20px 20px 0 20px' }}>
            <div style={getMessageStyle()}>
              {message}
            </div>
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '20px' }}>
          <BreedsList breeds={breeds} loading={loading} />
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '16px',
          textAlign: 'center',
          borderTop: '1px solid #eee',
          fontSize: '14px',
          color: '#666'
        }}>
          <p style={{ margin: '0 0 4px 0' }}>
            Frontend desenvolvido com React + Vite
          </p>
          <p style={{ margin: '0', fontSize: '12px' }}>
            Backend: Spring Boot 3.4.1 | API: http://localhost:8080
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;