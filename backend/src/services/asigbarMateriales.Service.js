const {asignarmateriales,
    findByasignarmateriales,
findOneasignarmateriales,
deleteByidasignarmateriales,
findByUsuario
} = require('../models/asignarMaterial.Model');

 const pool = require('../config/database');

 async function crearAsignarmateriales(asignarmaterialesData) {
   try {
       if (!asignarmaterialesData  || !asignarmaterialesData.idUsuario ||!asignarmaterialesData.idMateriales ||!asignarmaterialesData.estado ||!asignarmaterialesData.cantidad ) {
           throw new Error('Faltan datos ');
       }
 

       const nuevoAsignarmateriales = await asignarmateriales.create(asignarmaterialesData);
       return nuevoAsignarmateriales;
   } catch (error) {
       throw error;
   }
 }
 
 const obtenerAsignarmateriales = async () => {
   try {
     const Asignarmateriales = await asignarmateriales.findAll();
     return Asignarmateriales;
   } catch (error) {
     throw error;
   }
 };
 
 


 
 async function editarAsignarmateriales(idasignarMateriales, nuevoAsignarmateriales) {
   try {
     const AsignarmaterialesExistente = await findByasignarmateriales(idasignarMateriales);
     if (!AsignarmaterialesExistente) {
       throw new Error('El Asignarmateriales no existe');
     }
 
     const AsignarmaterialesActualizado = { ...AsignarmaterialesExistente, ...nuevoAsignarmateriales };
 
     // Realizar la actualización en la base de datos
     const [result] = await pool.execute(
       'UPDATE asignarmateriales SET   idUsuario = ?, idMateriales = ?, estado = ?, cantidad = ? WHERE idasignarMateriales = ?',
       [
        AsignarmaterialesActualizado.idUsuario, 
        AsignarmaterialesActualizado.idMateriales, 
        AsignarmaterialesActualizado.estado, 
        AsignarmaterialesActualizado.cantidad,
        idasignarMateriales
       ]
     );
 
     // Verificar si la actualización fue exitosa
     if (result.affectedRows === 0) {
       throw new Error('No se pudo actualizar el Asignarmateriales');
     }
 
     return AsignarmaterialesActualizado;
   } catch (error) {
     throw error;
   }
 }
 
 async function eliminarAsignarmateriales(idasignarMateriales) {
   try {
     await deleteByidasignarmateriales(idasignarMateriales);
     return { message: 'Asignarmateriales eliminado exitosamente' };
   } catch (error) {
     throw error;
   }
 }
 

 const obtenerAsignarmaterialesPorUsuario = async (idUsuario) => {
    try {
      const Asignarmateriales = await findByUsuario(idUsuario);
      return Asignarmateriales;
    } catch (error) {
      throw error;
    }
  };

 
 
 
 
 module.exports = {
  crearAsignarmateriales,
  obtenerAsignarmateriales,
  editarAsignarmateriales,
  deleteByidasignarmateriales,
  obtenerAsignarmaterialesPorUsuario
 };
 
