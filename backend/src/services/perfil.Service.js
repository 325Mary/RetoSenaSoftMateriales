const {Perfil,
    findByPerfil,
    findOnePerfil,
    deleteByidPerfil,} = require('../models/perfil.Model');
 const pool = require('../config/database');

 async function crearPerfil(perfilData) {
   try {
       if (!perfilData  || !perfilData.Perfil ) {
           throw new Error('Faltan datos del perfil');
       }
 

       const nuevoPerfil = await Perfil.create(perfilData);
       return nuevoPerfil;
   } catch (error) {
       throw error;
   }
 }
 
 const obtenerPerfiles = async () => {
   try {
     const perfiles = await Perfil.findAll();
     return perfiles;
   } catch (error) {
     throw error;
   }
 };
 
 


 
 async function editarPerfil(idPerfil, nuevoPerfilData) {
   try {
     const PerfilExistente = await findByPerfil(idPerfil);
     if (!PerfilExistente) {
       throw new Error('El perfil no existe');
     }
 
     const perfilActualizado = { ...PerfilExistente, ...nuevoPerfilData };
 
     // Realizar la actualización en la base de datos
     const [result] = await pool.execute(
       'UPDATE perfil SET  perfil = ? WHERE idPerfil = ?',
       [
        perfilActualizado.perfil,
         idPerfil
       ]
     );
 
     // Verificar si la actualización fue exitosa
     if (result.affectedRows === 0) {
       throw new Error('No se pudo actualizar el perfil');
     }
 
     return perfilActualizado;
   } catch (error) {
     throw error;
   }
 }
 
 async function eliminarPerfil(idPerfil) {
   try {
     await deleteByidPerfil(idPerfil);
     return { message: 'perfil eliminado exitosamente' };
   } catch (error) {
     throw error;
   }
 }
 

 

 
 
 
 
 module.exports = {
    crearPerfil,
    obtenerPerfiles,
    editarPerfil,
    eliminarPerfil
 };
 
