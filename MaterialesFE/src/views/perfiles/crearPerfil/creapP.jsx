import { useState } from 'react';
import { createPerfil } from '../../../services/perfiles/perfil';
import './crearP.css'

const CrearPerfil = () => {
  const [perfil, setPerfil] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCrearPerfil = async (e) => {
    e.preventDefault();
    try {
      const perfilData = { Perfil: perfil }; // Crear objeto con el campo Perfil
      const newPerfil = await createPerfil(perfilData);
      setSuccessMessage('Perfil creado exitosamente.');
      console.log('Nuevo perfil creado:', newPerfil);
      setPerfil(''); // Limpiar el campo después de crear el perfil
    } catch (error) {
      setError('Error al crear el perfil. Por favor, intenta nuevamente.');
      console.error('Error al crear perfil:', error);
    }
  };

  return (
    <div>
      <h1>Crear Perfil</h1>
      {error && <p>Error: {error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleCrearPerfil}>
        <div className="form-group">
          <label htmlFor="perfil">Perfil:</label>
          <input
            type="text"
            id="perfil"
            value={perfil}
            onChange={(e) => setPerfil(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Perfil</button>
      </form>
    </div>
  );
};

export default CrearPerfil;
