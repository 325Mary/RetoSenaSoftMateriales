const express = require('express');
const router = express.Router();
const {
  crearasignarmaterialesC,
  editarasignarmaterialesC,
  obtenerasignarmaterialesC,
  eliminarasignarmaterialesC,
  obtenerasignarmaterialesPorUsuarioC
} = require('../controllers/aisgnarMateriales.controller');

const  validarTokenMiddleware  = require('../middleware/userAuthentication');

router.post('/crearasignarmateriales', crearasignarmaterialesC);
router.get('/listasignarmateriales', obtenerasignarmaterialesC);
router.get('/listasignarmateriales/:idUsuario', validarTokenMiddleware, obtenerasignarmaterialesPorUsuarioC);
router.put('/editasignarmateriales/:idasignarMateriales', editarasignarmaterialesC);
router.delete('/eliminarasignarmateriales/:idasignarMateriales', eliminarasignarmaterialesC);

module.exports = router;
