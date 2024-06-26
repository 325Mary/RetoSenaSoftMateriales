import { useState, useEffect } from 'react';
import { getAsignarMateriales, editarAsignarMateriales, eliminarAsignarMateriales } from '../../../services/asignarMateriales/asignarMateriales';
import Swal from 'sweetalert2';

const ListaMaterialesAsignados = () => {
  const [materialesAsignados, setMaterialesAsignados] = useState([]);
  const [estados, setEstados] = useState([]);
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editMaterial, setEditMaterial] = useState({
    nombreUsuario: '',
    descripcionMaterial: '',
    estado: '',
    cantidad: ''
  });

  useEffect(() => {
    const perfilesMock = [
      { nombre: 'Asignado' },
      { nombre: 'Pendiente' },
    ];
    setEstados(perfilesMock);
  }, []);

  const fetchMaterialesAsignados = async () => {
    try {
      const materialesAsignadosData = await getAsignarMateriales();
      console.log('Materiales Asignados obtenidos:', materialesAsignadosData);
      if (materialesAsignadosData.data && Array.isArray(materialesAsignadosData.data) && materialesAsignadosData.data.length > 0) {
        setMaterialesAsignados(materialesAsignadosData.data[0]);
      }
    } catch (error) {
      setError('Error al obtener la lista de materiales asignados. Por favor, intenta nuevamente.');
      console.error('Error al obtener materiales asignados:', error);
    }
  };

  useEffect(() => {
    fetchMaterialesAsignados();
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditMaterial({ ...materialesAsignados[index] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditMaterial((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (idasignarMateriales) => {
    try {
      await editarAsignarMateriales(idasignarMateriales, editMaterial);
      await fetchMaterialesAsignados();
      setEditingIndex(-1);
      Swal.fire('Éxito', 'Material asignado actualizado correctamente', 'success');
    } catch (error) {
      console.error('Error al actualizar el material asignado:', error);
      Swal.fire('Error', 'No se pudo actualizar el material asignado', 'error');
    }
  };

  const handleCancel = () => {
    setEditingIndex(-1);
  };

  const handleDelete = async (idasignarMateriales) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    });

    if (result.isConfirmed) {
      try {
        await eliminarAsignarMateriales(idasignarMateriales);
        await fetchMaterialesAsignados();
        Swal.fire('Eliminado', 'El material asignado ha sido eliminado', 'success');
      } catch (error) {
        console.error('Error al eliminar el material asignado:', error);
        Swal.fire('Error', 'No se pudo eliminar el material asignado', 'error');
      }
    }
  };

  return (
    <div className="table-container">
      <h1>Lista de Materiales Asignados</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre Usuario</th>
            <th>Descripción Material</th>
            <th>Estado</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materialesAsignados.map((material, index) => (
            <tr key={material.idasignarMateriales}>
              {editingIndex === index ? (
                <>
                  <td><input type="text" name="nombreUsuario" value={editMaterial.nombreUsuario} onChange={handleChange} /></td>
                  <td><input type="text" name="descripcionMaterial" value={editMaterial.descripcionMaterial} onChange={handleChange} /></td>
                  <td>
                    <select name="estado" value={editMaterial.estado} onChange={handleChange}>
                      <option value="">Selecciona un estado</option>
                      {estados.map(estado => (
                        <option key={estado.nombre} value={estado.nombre}>{estado.nombre}</option>
                      ))}
                    </select>
                  </td>
                  <td><input type="number" name="cantidad" value={editMaterial.cantidad} onChange={handleChange} /></td>
                  <td>
                    <button onClick={() => handleUpdate(material.idasignarMateriales)}>Actualizar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{material.nombreUsuario}</td>
                  <td>{material.descripcionMaterial}</td>
                  <td>{material.estado}</td>
                  <td>{material.cantidad}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Editar</button>
                    <button onClick={() => handleDelete(material.idasignarMateriales)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaMaterialesAsignados;
