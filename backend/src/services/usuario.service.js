const {Usuario,
    findOneByEmail,
    findByPk,
    deleteById} = require('../models/usuario.Model');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const pool = require('../config/database');
 const nodemailer = require('nodemailer');
 const {listaNegraService} = require('./listaNegraService')
 
 
 require('dotenv').config();
 
 
 async function crearUsuario(usuarioData) {
   try {
       if (!usuarioData || !usuarioData.idPerfil  || !usuarioData.IdentificacionUsuario || !usuarioData.nombreUsuario || !usuarioData.apellidoUsuario  || !usuarioData.emailUsuario  ) {
           throw new Error('Faltan datos del usuario');
       }
 
 
       const defaultPassword = usuarioData.IdentificacionUsuario;
       if (!defaultPassword) {
           throw new Error('Identificación no proporcionada');
       }
 
       const hashedPassword = await bcrypt.hash(defaultPassword, 12);
       usuarioData.password = hashedPassword;
       usuarioData.firstLogin = 1;
 
       const nuevoUsuario = await Usuario.create(usuarioData);
       return nuevoUsuario;
   } catch (error) {
       throw error;
   }
 }
 const obtenerUsuarios = async () => {
   try {
     const usuarios = await Usuario.findAll();
     return usuarios;
   } catch (error) {
     throw error;
   }
 };
 
 
 async function loginUser(req, res) {
   try {
     const { emailUsuario, password } = req.body;
 
     if (!emailUsuario || !password) {
       return res.status(400).json({ error: 'El correo electrónico y la contraseña son requeridos' });
     }
 
     const user = await findOneByEmail(emailUsuario);
 
     if (!user) {
       return res.status(401).json({ error: 'Credenciales inválidas' });
     }
 
//  if (user.firstLogin) {
//    return res.status(200).json({ message: 'Por favor, cambie su contraseña.', firstLogin: 1, token: crearToken(user), userId: user.idUsuario });
//  }
 
//      const passwordMatch = await bcrypt.compare(password, user.password);
 
//      if (passwordMatch) {
//        res.json({ success: 'Inicio de sesión correcto', token: crearToken(user), userId: user.idUsuario });
//      } else {
//        return res.status(401).json({ error: 'Credenciales inválidas ' });
//      }
     
 else {
     return res.status(200).json({ message: 'login existoso.', token: crearToken(user), userId: user.idUsuario, idPerfil: user.idPerfil });

 }
   } catch (e) {
     console.error('Error:', e);
     res.status(500).json({ error: 'Error interno del servidor' });
   }
 }
 
 function crearToken(user) {
   const { idUsuario, emailUsuario,  nombreUsuario, IdentificacionUsuario, idPerfil } = user;
   const payload = { userId: idUsuario, emailUsuario , nombreUsuario, IdentificacionUsuario, idPerfil};
   console.log("Atributos del payload:", payload); 
   const secret = process.env.JWT_SECRET;
   const options = { expiresIn: '30m' };
   const token = jwt.sign(payload, secret, options);
   return token;
 }
 
 async function editarUsuario(idUsuario, nuevoUsuarioData) {
   try {
     const usuarioExistente = await findByPk(idUsuario);
     if (!usuarioExistente) {
       throw new Error('El usuario no existe');
     }
 
     const usuarioActualizado = { ...usuarioExistente, ...nuevoUsuarioData };
 
     const [result] = await pool.execute(
       'UPDATE usuarios SET  idPerfil = ? , IdentificacionUsuario = ? , nombreUsuario = ? , apellidoUsuario = ? ,  emailUsuario = ? WHERE idUsuario = ?',
       [
         usuarioActualizado.idPerfil,
         usuarioActualizado.IdentificacionUsuario,
         usuarioActualizado.nombreUsuario,
         usuarioActualizado.apellidoUsuario,
         usuarioActualizado.emailUsuario,
         idUsuario
       ]
     );
 
     if (result.affectedRows === 0) {
       throw new Error('No se pudo actualizar el usuario');
     }
 
     return usuarioActualizado;
   } catch (error) {
     throw error;
   }
 }
 
 async function eliminarUsuario(idUsuario) {
   try {
     await deleteById(idUsuario);
     return { message: 'Usuario eliminado exitosamente' };
   } catch (error) {
     throw error;
   }
 }

 
 
 
 const cerrarSesion = async (token) => {
   try {
     // Agregar el token a la lista negra
     await listaNegraService.agregarToken(token);
     return { message: 'Sesión cerrada exitosamente' };
   } catch (error) {
     throw error;
   }
 };
 
 const getUserById = async (idUsuario) => {
   try {
     const user = await findByPk(idUsuario);
     if (!user) {
       throw new Error('Usuario no encontrado');
     }
     
     const {  nombreUsuario, apellidoUsuario, emailUsuario,  perfil } = user;
     
     return {  nombreUsuario, apellidoUsuario, emailUsuario,   perfil };
   } catch (error) {
     throw new Error('Error al obtener el usuario por ID: ' + error.message);
   }
 };
 
 
 const enviarDatosUsuarioPorCorreo = async (idUsuario) => {
   try {
     const user = await findByPk(idUsuario);
 
     if (!user) {
       throw new Error('Usuario no encontrado');
     }
 
     const correoOptions = {
       from: 'sigoset66@gmail.com',
       to: user.emailUsuario,
       subject: 'Datos de Usuario para Ingreso en SigoSet',
       html: `
       <html>
       <head>
       <meta name="viewport" content="width=device-width, initial-scale=1">
         <style>
           body {
             font-family: Arial, sans-serif;
             background-color: #f4f4f4;
             padding: 20px;
           }
           .container {
             max-width: 600px;
             margin: 0 auto;
             background-color: #fff;
             border-radius: 5px;
             padding: 30px;
             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
             border: 2px solid #ccc; /* Añadir un borde sólido de 2px */
         }
         
         h1 {
             color: #333;
             margin-top: 0; /* Eliminar el margen superior del título */
         }
         
         .user-name {
             font-weight: bold;
         }
         
         .user-info {
             margin-top: 20px;
         }
         
         .user-info li {
             list-style: none;
             margin-bottom: 10px;
             font-size: 16px; /* Ajustar el tamaño de la fuente */
         }
         
         .user-info li span {
             font-weight: bold;
         }
         
         /* Otras reglas de estilo que desees añadir */
         
         </style>
       </head>
       <body>
         <div class="container">
           <h1>Datos de Usuario para Ingreso en SigoSet</h1>
           <p>Estimado/a <span class="user-name">${user.nombreUsuario}</span>,</p>
           <p>A continuación se presentan sus credenciales:</p>
           <ul class="user-info">
             <li><span>Email:</span> ${user.emailUsuario}</li>
             <li><span>Contraseña:</span> ${user.IdentificacionUsuario}</li>
             <!-- Agrega más campos según sea necesario -->
           </ul>
         </div>
       </body>
       </html>
       
       `
     };
     
     const transporter = nodemailer.createTransport({
       host: 'smtp.gmail.com',
       port: 587,
       service: 'gmail',
       auth: {
         user: 'sigoset66@gmail.com',
         pass: 'w f v s q s c d m l g l m n t a'
       }
     });
 
     const info = await transporter.sendMail(correoOptions);
     console.log('Correo electrónico enviado:', info.response);
   } catch (error) {
     throw error;
   }
 };

 const cambiarContraseña = async (idUsuario, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const [result] = await pool.execute(
      'UPDATE usuarios SET password = ?, firstLogin = 0 WHERE idUsuario = ?',
      [hashedPassword, idUsuario]
    );

    if (result.affectedRows === 0) {
      throw new Error('No se pudo cambiar la contraseña');
    }

    return { message: 'Contraseña cambiada exitosamente' };
  } catch (error) {
    throw error;
  }
};

 
 module.exports = {
     crearUsuario,
     obtenerUsuarios,
     loginUser,
     editarUsuario,
     eliminarUsuario,
    cerrarSesion,
    getUserById,
    enviarDatosUsuarioPorCorreo,
    cambiarContraseña
 };
 