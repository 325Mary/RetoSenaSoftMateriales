import axios from 'axios';
import backendConfig  from '../../../backendConfig'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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

export const iniciarSesion = async (emailUsuario, password) => { 
  try {
    const response = await axios.post(`${API_URL}/iniciarSesion`, { emailUsuario, password });
    const {token, userId, idPerfil} = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('idPerfil', idPerfil)
    console.log(token)
    console.log(userId);
    console.log(idPerfil);
    
    return response.data;
  } catch (error) {
    console.error('Credenciales inválidas:', error);
    throw error;
  }
};


export const editarUsuario = (idUsuario, usuarioData) => {
  return axios.put(`${API_URL}/editUser/${idUsuario}`, usuarioData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error editing Usuario:', error);
      throw error;
    });
};

export const eliminarUsuario = (idUsuario) => {
  return axios.delete(`${API_URL}/EliminarUser/${idUsuario}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting Usuario:', error);
      throw error;
    });
};


export const useCerrarSesion = () => {
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token almacenado en el localStorage');
      return;
    }

    try {
      const headers = {
        Authorization: `${token}`
      };

      await axios.post(`${API_URL}/cerrarSesion`, {}, { headers });

      localStorage.removeItem('token');
      Swal.fire('Sesión cerrada', 'Has cerrado sesión exitosamente', 'success');
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Swal.fire('Error', 'No se pudo cerrar la sesión', 'error');
    }
  };

  return { cerrarSesion };
};