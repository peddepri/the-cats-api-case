import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

// Configurar axios
const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000, // Aumentado para 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para verificar saúde da API
export const checkHealth = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar saúde da API:', error);
    throw error;
  }
};

// Função para importar raças com fallback
export const importBreeds = async () => {
  try {
    // Tenta POST primeiro
    const response = await api.post('/api/racas/importar');
    return response.data;
  } catch (error) {
    console.warn('POST falhou, tentando GET:', error.message);
    try {
      // Fallback para GET
      const response = await api.get('/api/racas/importar');
      return response.data;
    } catch (getError) {
      console.error('Ambos POST e GET falharam:', getError);
      throw getError;
    }
  }
};

// Função para listar todas as raças
export const getBreeds = async () => {
  try {
    const response = await api.get('/api/racas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar raças:', error);
    throw error;
  }
};

// Função para importar imagens por categoria
export const importImagesByCategory = async (category) => {
  try {
    // Tenta POST primeiro
    const response = await api.post(`/api/imagens/importar/${category}`);
    return response.data;
  } catch (error) {
    console.warn('POST falhou, tentando GET:', error.message);
    try {
      // Fallback para GET
      const response = await api.get(`/api/imagens/importar/${category}`);
      return response.data;
    } catch (getError) {
      console.error('Ambos POST e GET falharam:', getError);
      throw getError;
    }
  }
};

// Função para buscar imagens por categoria
export const getImagesByCategory = async (category) => {
  try {
    const response = await api.get(`/api/imagens/categoria/${category}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar imagens por categoria:', error);
    throw error;
  }
};

// Função para listar todas as imagens
export const getAllImages = async () => {
  try {
    const response = await api.get('/api/imagens');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar todas as imagens:', error);
    throw error;
  }
};

export default api;
