import axios from 'axios';

/**
 * Importa raças da API externa TheCatAPI para o backend.
 * Tenta POST primeiro, se falhar com 405/404, tenta GET (conforme README).
 */
export const importBreeds = async (baseURL) => {
  try {
    // Tenta POST primeiro
    await axios.post(`${baseURL}/racas/importar`);
  } catch (error) {
    // Se POST falhar com 405 (Method Not Allowed) ou 404, tenta GET
    if (error.response && (error.response.status === 405 || error.response.status === 404)) {
      await axios.get(`${baseURL}/racas/importar`);
    } else {
      throw error;
    }
  }
};

/**
 * Busca todas as raças cadastradas no backend.
 */
export const getBreeds = async (baseURL) => {
  const response = await axios.get(`${baseURL}/racas`);
  return response.data;
};

/**
 * Busca uma raça específica por ID.
 */
export const getBreedById = async (baseURL, id) => {
  const response = await axios.get(`${baseURL}/racas/${id}`);
  return response.data;
};

/**
 * Busca raças por temperamento.
 */
export const getBreedsByTemperament = async (baseURL, temperamento) => {
  const response = await axios.get(`${baseURL}/racas/temperamento/${temperamento}`);
  return response.data;
};

/**
 * Busca raças por origem.
 */
export const getBreedsByOrigin = async (baseURL, origem) => {
  const response = await axios.get(`${baseURL}/racas/origem/${origem}`);
  return response.data;
};

/**
 * Busca imagens por categoria (ex: chapeu, oculos).
 */
export const getImagesByCategory = async (baseURL, categoria) => {
  const response = await axios.get(`${baseURL}/imagens/categoria/${categoria}`);
  return response.data;
};

/**
 * Importa imagens de uma categoria específica.
 */
export const importImagesByCategory = async (baseURL, categoria) => {
  await axios.post(`${baseURL}/imagens/importar/${categoria}`);
};
