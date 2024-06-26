const {materiales     ,
    findBymateriales,
    findOnemateriales,
    deleteByidmateriales,} = require('../models/materiales.Model');
 const pool = require('../config/database');

 async function crearMateriales(materialesData) {
   try {
       if (!materialesData  || !materialesData.descripcionMaterial ) {
           throw new Error('Faltan datos del materiales');
       }
 

       const nuevoMateriales = await materiales.create(materialesData);
       return nuevoMateriales;
   } catch (error) {
       throw error;
   }
 }
 
 const obtenerMaterialess = async () => {
   try {
     const Materialess = await materiales.findAll();
     return Materialess;
   } catch (error) {
     throw error;
   }
 };
 
 


 
 async function editarMateriales(idMateriales, nuevoMaterialesData) {
   try {
     const PMaterialExistente = await findBymateriales(idMateriales);
     if (!PMaterialExistente) {
       throw new Error('El material no existe');
     }
 
     const MaterialActualizado = { ...PMaterialExistente, ...nuevoMaterialesData };
 
     const [result] = await pool.execute(
       'UPDATE materiales SET  descripcionMaterial = ? WHERE idMateriales = ?',
       [
        MaterialActualizado.descripcionMaterial,
         idMateriales
       ]
     );
 
     if (result.affectedRows === 0) {
       throw new Error('No se pudo actualizar el Material');
     }
 
     return MaterialActualizado;
   } catch (error) {
     throw error;
   }
 }
 
 async function eliminarMaterial(idMateriales) {
   try {
     await deleteByidmateriales(idMateriales);
     return { message: ' eliminado exitosamente' };
   } catch (error) {
     throw error;
   }
 }
 

 

 
 
 
 
 module.exports = {
   crearMateriales,
   obtenerMaterialess,
   editarMateriales,
   eliminarMaterial
 };
 
