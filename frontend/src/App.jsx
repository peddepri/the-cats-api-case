<<<<<<< HEAD
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
=======
import React, { useState } from 'react';
import BreedsList from './components/BreedsList';
import * as api from './services/api';

function App() {
  // URL base da API - pode ser configurada via variável de ambiente
  const apiBaseURL = import.meta.env.VITE_API_BASE || 'http://localhost:8080';
  
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [searchCategory, setSearchCategory] = useState('chapeu');

  const handleImportBreeds = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await api.importBreeds(apiBaseURL);
      setMessage('Raças importadas com sucesso!');
      // Atualiza a lista automaticamente
      await handleGetBreeds();
    } catch (err) {
      setError(`Erro ao importar raças: ${err.message}`);
>>>>>>> 1a60ddae4a0f8f2bfa426576a16e3bef5442463a
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const handleUpdateBreeds = async () => {
    setLoading(true);
    try {
      const breedsData = await getBreeds();
      setBreeds(breedsData);
      showMessage(`${breedsData.length} raças carregadas!`, 'success');
    } catch (error) {
      showMessage('Erro ao carregar raças: ' + error.message, 'error');
=======
  const handleGetBreeds = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const data = await api.getBreeds(apiBaseURL);
      setBreeds(data);
      setMessage(`${data.length} raça(s) encontrada(s).`);
    } catch (err) {
      setError(`Erro ao buscar raças: ${err.message}`);
>>>>>>> 1a60ddae4a0f8f2bfa426576a16e3bef5442463a
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
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
=======
  const handleImportImagesByCategory = async () => {
    if (!searchCategory) {
      setError('Por favor, informe uma categoria.');
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await api.importImagesByCategory(apiBaseURL, searchCategory);
      setMessage(`Imagens da categoria "${searchCategory}" importadas com sucesso!`);
    } catch (err) {
      setError(`Erro ao importar imagens: ${err.message}`);
    } finally {
      setLoading(false);
>>>>>>> 1a60ddae4a0f8f2bfa426576a16e3bef5442463a
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>CatsAPI Frontend</h1>
      
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '12px', 
        borderRadius: '4px', 
        marginBottom: '20px' 
      }}>
        <p style={{ margin: 0 }}>
          <strong>Backend URL:</strong> {apiBaseURL}
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#666' }}>
          Configure via variável de ambiente VITE_API_BASE
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Ações</h2>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <button 
            onClick={handleImportBreeds} 
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            Importar raças
          </button>

          <button 
            onClick={handleGetBreeds} 
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            Atualizar lista
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            placeholder="Categoria (ex: chapeu, oculos)"
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              minWidth: '200px'
            }}
          />
          
          <button 
            onClick={handleImportImagesByCategory} 
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            Buscar imagens categoria
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ 
          padding: '12px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '4px', 
          marginBottom: '16px' 
        }}>
          Carregando...
        </div>
      )}

      {error && (
        <div style={{ 
          padding: '12px', 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          borderRadius: '4px', 
          marginBottom: '16px' 
        }}>
          {error}
        </div>
      )}

      {message && (
        <div style={{ 
          padding: '12px', 
          backgroundColor: '#e8f5e9', 
          color: '#2e7d32', 
          borderRadius: '4px', 
          marginBottom: '16px' 
        }}>
          {message}
        </div>
      )}

      <BreedsList breeds={breeds} />
>>>>>>> 1a60ddae4a0f8f2bfa426576a16e3bef5442463a
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 1a60ddae4a0f8f2bfa426576a16e3bef5442463a
