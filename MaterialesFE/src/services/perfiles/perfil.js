import axios from 'axios';
import backendConfig  from '../../../backendConfig'


const API_URL = backendConfig.apiUrl;

export const getPerfiles = async () => {
    try {
      const response = await axios.get(`${API_URL}/listPerfil`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Perfiles:', error);
      throw error;
    }
  };

export const createPerfil = (PerfilData) => {
  return axios.post(`${API_URL}/crearPerfil`, PerfilData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating Perfil:', error);
      throw error;    
    });
};


