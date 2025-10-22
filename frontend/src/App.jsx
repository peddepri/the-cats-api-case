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
    } finally {
      setLoading(false);
    }
  };

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
    } finally {
      setLoading(false);
    }
  };

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
    }
  };

  return (
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
    </div>
  );
}

export default App;
