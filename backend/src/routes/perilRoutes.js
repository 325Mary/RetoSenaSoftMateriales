const express = require('express');
const router = express.Router();
const {
    crearPerfilC,
    obtenerPerfilesC,
    editarPerfilC,
    eliminarPerfilC
     } = require('../controllers/perfil.Controller');

router.post('/crearPerfil', crearPerfilC); 
router.get('/listPerfil', obtenerPerfilesC);
router.put('/editPerfil/:idPerfil', editarPerfilC);
router.delete('/EliminarPerfil/:idPerfil', eliminarPerfilC);


module.exports = router;
