const express = require('express');
const router = express.Router();
const {
   crearMaterialC,
   obtenerMaterialesC,
   editarMaterialC,
   eliminarMaterialC
     } = require('../controllers/materiales.controller');

router.post('/crearMaterial', crearMaterialC); 
router.get('/listMaterial', obtenerMaterialesC);
router.put('/editMaterial/:idMateriales', editarMaterialC);
router.delete('/EliminarMaterial/:idMateriales', eliminarMaterialC);


module.exports = router;
