import { useState, useEffect } from 'react';
import { getUsuarios } from '../../services/login/iniciarSesion';
import './listarUsuarios.css'

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosData = await getUsuarios();
        console.log('Usuarios obtenidos:', usuariosData); 
        if (usuariosData.data && Array.isArray(usuariosData.data) && usuariosData.data.length > 0) {
          setUsuarios(usuariosData.data[0]);
        }
      } catch (error) {
        setError('Error al obtener la lista de usuarios. Por favor, intenta nuevamente.');
        console.error('Error al obtener usuarios:', error);
      }
    };
    fetchUsuarios();
  }, []);
  

  return (
    <div  className="table-container">
      <h1>Lista de Usuarios</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Identificación</th>
            <th>Perfil</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
        {usuarios.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.nombreUsuario}</td>
              <td>{usuario.apellidoUsuario}</td>
              <td>{usuario.IdentificacionUsuario}</td>
              <td>{usuario.nombre_Perfil}</td>
              <td>{usuario.emailUsuario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarUsuarios;
