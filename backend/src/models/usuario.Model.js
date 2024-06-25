const mysql = require('mysql2');


const pool = require('../config/database');

const Usuario = {
  findAll: function() {
    const sql = `
     SELECT usuarios.*, Perfil.Perfil AS nombre_Perfil
FROM usuarios
INNER JOIN Perfil ON usuarios.idPerfil = Perfil.idPerfil
    `;
    return pool.execute(sql);
  },
  create: function(usuarioData) {
    const sql = `INSERT INTO usuarios (idPerfil, IdentificacionUsuario, nombreUsuario, apellidoUsuario,  emailUsuario, password, firstLogin) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    return pool.execute(sql, [usuarioData.idPerfil,  usuarioData.IdentificacionUsuario, usuarioData.nombreUsuario, usuarioData.apellidoUsuario,  usuarioData.emailUsuario, usuarioData.password,  usuarioData.firstLogin]);
  }
};

async function findOneByEmail(emailUsuario) {
  const [rows, fields] = await pool.execute('SELECT * FROM usuarios WHERE emailUsuario = ?', [emailUsuario]);
  return rows[0];
}


async function findByPk(idUsuario) {
  try {
    const query = `
      SELECT 
        usuarios.*,
        Perfil.Perfil
      FROM 
        usuarios
      JOIN 
        Perfil ON usuarios.idPerfil = Perfil.idPerfil
      WHERE 
        usuarios.idUsuario = ?
    `;

    const [rows, fields] = await pool.execute(query, [idUsuario]);
    
    return rows[0];
  } catch (error) {
    throw error;
  }
}


async function deleteById(idUsuario) {
    try {
      const [result] = await pool.execute('DELETE FROM usuarios WHERE idUsuario = ?', [idUsuario]);
      if (result.affectedRows === 0) {
        throw new Error('El usuario no existe');
      }
      return { message: 'Usuario eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {Usuario,
  findOneByEmail,
  findByPk,
  deleteById};
