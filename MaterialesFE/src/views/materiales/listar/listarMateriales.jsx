import  { useState, useEffect } from 'react';
import { getMateriales, editarMateriales, eliminarMateriales } from '../../../services/materiales/materiales';
import './listarMateriales.css'

const ListarMateriales = () => {
  const [descripcionMaterial, setDescripcionMaterial] = useState([]);
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedMaterial, setEditedMaterial] = useState({ descripcionMaterial: '' });

 
    const fetchDescripcionMaterial = async () => {
      try {
        const descripcionMaterialData = await getMateriales();
        console.log('descripcionMaterial obtenidos:', descripcionMaterialData);
        if (descripcionMaterialData.data && Array.isArray(descripcionMaterialData.data) && descripcionMaterialData.data.length > 0) {
          setDescripcionMaterial(descripcionMaterialData.data[0]);
        }
      } catch (error) {
        setError('Error al obtener la lista de descripcionMaterial. Por favor, intenta nuevamente.');
        console.error('Error al obtener descripcionMaterial:', error);
    }
  };
    useEffect(() => {
    fetchDescripcionMaterial();
  }, []);
    
  const handleEditClick = (index, material) => {
    setEditingIndex(index);
    setEditedMaterial(material);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedMaterial({ descripcionMaterial: '' });
  };

  const handleSaveEdit = async (idMateriales) => {
    try {
      const updatedMaterial = await editarMateriales(idMateriales, editedMaterial);
      setDescripcionMaterial(descripcionMaterial.map(material =>
        material.idMateriales === updatedMaterial.idMateriales ? updatedMaterial : material
      ));
      setEditingIndex(null);
      fetchDescripcionMaterial();

    } catch (error) {
      setError('Error al editar el material. Por favor, intenta nuevamente.');
      console.error('Error al editar material:', error);
    }
  };

  const handleDelete = async (idMateriales) => {
    try {
      await eliminarMateriales(idMateriales);
      setDescripcionMaterial(descripcionMaterial.filter(material => material.idMateriales !== idMateriales));
    } catch (error) {
      setError('Error al eliminar el material. Por favor, intenta nuevamente.');
      console.error('Error al eliminar material:', error);
    }
  };

  return (
    <div className="table-container">
      <h1>Lista Materiales</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {descripcionMaterial.map((material, index) => (
            <tr key={material.idMateriales}>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedMaterial.descripcionMaterial}
                    onChange={(e) => setEditedMaterial({ ...editedMaterial, descripcionMaterial: e.target.value })}
                  />
                ) : (
                  material.descripcionMaterial
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <>
                    <button onClick={() => handleSaveEdit(material.idMateriales)}>Guardar</button>
                    <button onClick={handleCancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(index, material)}>Editar</button>
                    <button onClick={() => handleDelete(material.idMateriales)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarMateriales;
