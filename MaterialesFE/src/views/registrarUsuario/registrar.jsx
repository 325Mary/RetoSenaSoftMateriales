import  { useState, useEffect } from 'react';
import { createUsuario } from "../../services/login/iniciarSesion";
import { getPerfiles } from '../../services/perfiles/perfil';
import { useNavigate } from 'react-router-dom';

const RegistroUsuario = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [apellidoUsuario, setApellidoUsuario] = useState('');
  const [IdentificacionUsuario, setIdentificacionUsuario] = useState('');
  const [idPerfil, setIdPerfil] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [error, setError] = useState('');
  const [perfiles, setPerfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfiles = async () => {
      try {
        const perfilesData = await getPerfiles();
        console.log('Perfiles obtenidos:', perfilesData); 
        if (perfilesData.data && Array.isArray(perfilesData.data) && perfilesData.data.length > 0) {
          setPerfiles(perfilesData.data[0]);
        } else {
          setError('Los datos de perfiles no son válidos.');
        }
      } catch (error) {
        setError('Error al obtener los perfiles. Por favor, intenta nuevamente.');
        console.error('Error al obtener los perfiles:', error);
      }
    };
    fetchPerfiles();
  }, []);

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      const userData = await createUsuario({
        nombreUsuario,
        apellidoUsuario,
        IdentificacionUsuario,
        idPerfil,
        emailUsuario
      });
      console.log('Usuario creado:', userData);
      navigate('/listaUsuarios');

    } catch (error) {
      setError('Error al registrar usuario. Por favor, intenta nuevamente.');
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <div className="registro-usuario">
      <div className="card"> 
        <h3>Registro de Usuario</h3>
        <div className="card-body">
          <form onSubmit={handleRegistro}>
            <div className="form-group">
              <label htmlFor="nombreUsuario">Nombre:</label>
              <input
                type="text"
                id="nombreUsuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellidoUsuario">Apellido:</label>
              <input
                type="text"
                id="apellidoUsuario"
                value={apellidoUsuario}
                onChange={(e) => setApellidoUsuario(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="IdentificacionUsuario">Identificación:</label>
              <input
                type="text"
                id="IdentificacionUsuario"
                value={IdentificacionUsuario}
                onChange={(e) => setIdentificacionUsuario(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="idPerfil">Perfil:</label>
              <select
                id="idPerfil"
                value={idPerfil}
                onChange={(e) => setIdPerfil(e.target.value)}
                required
              >
                <option value="">Selecciona un perfil</option>
                {Array.isArray(perfiles) && perfiles.map(perfil => (
                  <option key={perfil.idPerfil} value={perfil.idPerfil}>{perfil.Perfil}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="emailUsuario">Email:</label>
              <input
                type="email"
                id="emailUsuario"
                value={emailUsuario}
                onChange={(e) => setEmailUsuario(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;
