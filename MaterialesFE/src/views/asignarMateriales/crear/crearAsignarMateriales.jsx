import { useState, useEffect } from 'react';
import { crearAsignarMateriales } from '../../../services/asignarMateriales/asignarMateriales';
import { getUsuarios } from '../../../services/login/iniciarSesion';
import { getMateriales } from '../../../services/materiales/materiales';
import { useNavigate } from 'react-router-dom';

const CrearAsignarMateriales = () => {
  const [idUsuario, setIdUsuario] = useState('');
  const [idMateriales, setIdMateriales] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [estado] = useState('Asignado'); 
  const [cantidad, setCantidad] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const UsuariosData = await getUsuarios();
        console.log('Usuarios obtenidos:', UsuariosData);
        if (UsuariosData.data && Array.isArray(UsuariosData.data) && UsuariosData.data.length > 0) {
          const flattenedUsuarios = UsuariosData.data.flat(); 
          const usuariosFiltrados = flattenedUsuarios.filter(usuario => usuario.idPerfil === 3);
          setUsuarios(usuariosFiltrados);
        } else {
          setError('Los datos de usuarios no son válidos.');
        }
      } catch (error) {
        setError('Error al obtener los usuarios. Por favor, intenta nuevamente.');
        console.error('Error al obtener los usuarios:', error);
      }
    };
    fetchUsuarios();
  }, []);
  
  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const MaterialesData = await getMateriales();
        console.log('Materiales obtenidos:', MaterialesData);
        if (MaterialesData.data && Array.isArray(MaterialesData.data) && MaterialesData.data.length > 0) {
          setMateriales(MaterialesData.data[0]);
        } else {
          setError('Los datos de materiales no son válidos.');
        }
      } catch (error) {
        setError('Error al obtener los materiales. Por favor, intenta nuevamente.');
        console.error('Error al obtener los materiales:', error);
      }
    };
    fetchMateriales();
  }, []);

  const CrearAsignarMateriales = async (e) => {
    e.preventDefault();

    try {
      const AsignarMaterialesData = await crearAsignarMateriales({
        idUsuario,
        idMateriales,
        estado,
        cantidad
      });
      console.log('Asignación creada:', AsignarMaterialesData);
      navigate('/MaterialesAsignados');
    } catch (error) {
      setError('Error al registrar la asignación. Por favor, intenta nuevamente.');
      console.error('Error al registrar la asignación:', error);
    }
  };

  return (
    <div className="registro">
      <div className="card">
        <h3> Asignación de Materiales</h3>
        <div className="card-body">
          <form onSubmit={CrearAsignarMateriales}>
            <div className="form-group">
              <label htmlFor="idUsuario">Usuario:</label>
              <select
                id="idUsuario"
                value={idUsuario}
                onChange={(e) => setIdUsuario(e.target.value)}
                required
              >
                <option value="">Selecciona un Usuario</option>
                {Array.isArray(usuarios) && usuarios.map(usuario => (
                  <option key={usuario.idUsuario} value={usuario.idUsuario}>{usuario.nombreUsuario}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="idMateriales">Material:</label>
              <select
                id="idMateriales"
                value={idMateriales}
                onChange={(e) => setIdMateriales(e.target.value)}
                required
              >
                <option value="">Selecciona un Material</option>
                {Array.isArray(materiales) && materiales.map(material => (
                  <option key={material.idMateriales} value={material.idMateriales}>{material.descripcionMaterial}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cantidad">Cantidad:</label>
              <input
                type="number"
                id="cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Asignar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearAsignarMateriales;
