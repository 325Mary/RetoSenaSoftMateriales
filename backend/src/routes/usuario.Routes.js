const express = require('express');
const router = express.Router();
const {crearUsuarioC,
     obtenerUsuariosC,
     postLogin,
     editarUsuarioC,
     eliminarUsuarioC,
      cerrarSesionC,
      getUserId,
      enviarDatosUsuarioPorCorreoController,
      cambiarContraseñaC
     } = require('../controllers/usuario.Controller');
const checkPerfil = require('../middleware/verificadorDePerfil')
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.post('/crearUsuario', crearUsuarioC); 
router.get('/listUsuarios', obtenerUsuariosC);
router.post('/iniciarSesion', postLogin)
router.put('/editUser/:idUsuario', editarUsuarioC);
router.delete('/EliminarUser/:idUsuario', eliminarUsuarioC);
router.post('/cerrarSesion', cerrarSesionC);
router.get('/getId/:idUsuario', getUserId);
router.post('/enviarCorreo/:idUsuario', enviarDatosUsuarioPorCorreoController);
router.put('/cambiarPassword/:idUsuario', cambiarContraseñaC)

module.exports = router;
