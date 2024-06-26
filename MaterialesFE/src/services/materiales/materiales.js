import axios from 'axios';
import backendConfig  from '../../../backendConfig'


const API_URL = backendConfig.apiUrl;

export const getMateriales = () => {
  return axios.get(`${API_URL}/listMaterial`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching Materiales:', error);
      throw error;
    });
};

export const crearMateriales = (MaterialesData) => {
  return axios.post(`${API_URL}/crearMaterial`, MaterialesData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating Materiales:', error);
      throw error;    
    });
};

export const editarMateriales = (idMateriales, MaterialesData) => {
  return axios.put(`${API_URL}/editMaterial/${idMateriales}`, MaterialesData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error editing Materiales:', error);
      throw error;
    });
};

export const eliminarMateriales = (idMateriales) => {
  return axios.delete(`${API_URL}/EliminarMaterial/${idMateriales}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting Materiales:', error);
      throw error;
    });
};

