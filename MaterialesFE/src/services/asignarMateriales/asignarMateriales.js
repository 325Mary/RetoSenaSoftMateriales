import axios from 'axios';
import backendConfig  from '../../../backendConfig'


const API_URL = backendConfig.apiUrl;

export const getAsignarMateriales = () => {
  return axios.get(`${API_URL}/listasignarmateriales`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching AsignarMateriales:', error);
      throw error;
    });
};

export const getAsignarMaterialesPorUsuario = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
console.log(userId);
  if (!userId || !token) {
    const error = new Error('UserId o token no encontrados en localStorage');
    console.error(error);
    return Promise.reject(error);
  }

  return axios.get(`${API_URL}/listasignarmateriales/${userId}`, {
    headers: {
      Authorization: token,
    },
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching AsignarMateriales por Usuario:', error);
      throw error;
    });
};

export const crearAsignarMateriales = (AsignarMaterialesData) => {
  return axios.post(`${API_URL}/crearasignarmateriales`, AsignarMaterialesData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating AsignarMateriales:', error);
      throw error;    
    });
};

export const editarAsignarMateriales = (idasignarMateriales, AsignarMaterialesData) => {
  return axios.put(`${API_URL}/editasignarmateriales/${idasignarMateriales}`, AsignarMaterialesData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error editing AsignarMateriales:', error);
      throw error;
    });
};

export const eliminarAsignarMateriales = (idasignarMateriales) => {
  return axios.delete(`${API_URL}/Eliminarasignarmateriales/${idasignarMateriales}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting AsignarMateriales:', error);
      throw error;
    });
};

