import axios from 'axios';
import backendConfig  from '../../../backendConfig'


const API_URL = backendConfig.apiUrl;

export const getUsuarios = () => {
  return axios.get(`${API_URL}/listUsuarios`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching Usuarios:', error);
      throw error;
    });
};

export const createUsuario = (usuarioData) => {
  return axios.post(`${API_URL}/crearUsuario`, usuarioData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating Usuario:', error);
      throw error;    
    });
};

export const iniciarSesion = (emailUsuario, password) => { 
  return axios.post(`${API_URL}/iniciarSesion`, { emailUsuario, password })
    .then(response => response.data)
    .catch(error => {
      console.error('Credenciales inválidas:', error);
      throw error;
    });
};
