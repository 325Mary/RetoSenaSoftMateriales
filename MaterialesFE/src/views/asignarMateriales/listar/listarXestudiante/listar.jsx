import  { useState, useEffect } from 'react';
import { getAsignarMaterialesPorUsuario } from '../../../../services/asignarMateriales/asignarMateriales'; 

const ListarMaterialesPorUsuario = () => {
    const [materialesPorUsuario, setMaterialesPorUsuario] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMaterialesPorUsuario = async () => {
            try {
                const materialesData = await getAsignarMaterialesPorUsuario();
                setMaterialesPorUsuario(materialesData.data[0]);
                console.log(materialesData);
            } catch (error) {
                setError('Error al obtener los materiales asignados por usuario. Por favor, inténtalo nuevamente.');
                console.error('Error al obtener los materiales asignados por usuario:', error);
            }
        };

        fetchMaterialesPorUsuario();
    }, []);

    return (
        <div className="table-container">
            <h1>Lista de Materiales Asignados por Usuario</h1>
            {error && <p>Error: {error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Descripción del Material</th>
                        <th>Estado</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {materialesPorUsuario.map((material, index) => (
                        <tr key={index}>
                            <td>{material.descripcionMaterial}</td>
                            <td>{material.estado}</td>
                            <td>{material.cantidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListarMaterialesPorUsuario;
