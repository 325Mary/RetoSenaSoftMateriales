
import  { useState } from 'react';
import { crearMateriales } from '../../../services/materiales/materiales';
import { useNavigate } from 'react-router-dom';
const CrearMateriales = () =>{
        

  const [descripcionMaterial, setDescripcionMaterial] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 
  const CrearMaterial = async (e) => {
    e.preventDefault();

    try {
      const MaterialesData = await crearMateriales({
        descripcionMaterial,
        
      });
      console.log('creado:', MaterialesData);
      navigate('/listaMateriales');

    } catch (error) {
      setError('Error al registrar usuario. Por favor, intenta nuevamente.');
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <div className="registro">
      <div className="card"> 
        <h3>Crear Materiales</h3>
        <div className="card-body">
          <form onSubmit={CrearMaterial}>
            <div className="form-group">
              <label htmlFor="descripcionMaterial">descripcion de material:</label>
              <input
                type="text"
                id="descripcionMaterial"
                value={descripcionMaterial}
                onChange={(e) => setDescripcionMaterial(e.target.value)}
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

export default CrearMateriales

