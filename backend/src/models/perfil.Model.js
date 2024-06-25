const mysql = require('mysql2');


const pool = require('../config/database');

const Perfil = {
  findAll: function() {
    return pool.execute('SELECT * FROM Perfil'); // Utiliza pool.execute() para obtener una promesa
  },
  create: function(perfilData) {
    const sql = `INSERT INTO perfil ( Perfil) VALUES ( ?)`;
    return pool.execute(sql, [ perfilData.Perfil]);
  }
};
async function findOnePerfil(Perfil) {
  const [rows, fields] = await pool.execute('SELECT * FROM Perfil WHERE Perfil = ?', [Perfil]);
  return rows[0];
}


async function findByPerfil (idPerfil) {
    const [rows, fields] = await pool.execute(`SELECT * FROM perfil WHERE idPerfil = ?` , [idPerfil]);
    return rows[0];    throw error;
  }

async function deleteByidPerfil(idPerfil) {
    try {
      const [result] = await pool.execute('DELETE FROM perfil WHERE idPerfil = ?', [idPerfil]);
      if (result.affectedRows === 0) {
        throw new Error('El perfil no existe');
      }
      return { message: 'perfil eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {Perfil     ,
    findByPerfil,
    findOnePerfil,
    deleteByidPerfil,
  };
