const mysql = require('mysql2');


const pool = require('../config/database');

const asignarmateriales = {
  findAll: function() {
    const sql = `
      SELECT am.*, u.nombreUsuario, m.descripcionMaterial 
      FROM asignarmateriales am
      JOIN usuarios u ON am.idUsuario = u.idUsuario
      JOIN materiales m ON am.idMateriales = m.idMateriales
    `;
    return pool.execute(sql);  
  },
  create: function(asignarmaterialesData) {
    const sql = `INSERT INTO asignarmateriales ( idUsuario, idMateriales, estado, cantidad) VALUES ( ?, ?, ?, ?)`;
    return pool.execute(sql, [ asignarmaterialesData.idUsuario, asignarmaterialesData.idMateriales, asignarmaterialesData.estado, asignarmaterialesData.cantidad]);
  }
};
async function findOneasignarmateriales(idasignarMateriales) {
  const [rows, fields] = await pool.execute('SELECT * FROM asignarmateriales WHERE idasignarMateriales = ?', [idasignarMateriales]);
  return rows[0];
}


async function findByasignarmateriales (idasignarMateriales) {
    const [rows, fields] = await pool.execute(`SELECT * FROM asignarmateriales WHERE idasignarMateriales = ?` , [idasignarMateriales]);
    return rows[0];    throw error;
  }

async function deleteByidasignarmateriales(idasignarMateriales) {
    try {
      const [result] = await pool.execute('DELETE FROM asignarmateriales WHERE idasignarMateriales = ?', [idasignarMateriales]);
      if (result.affectedRows === 0) {
        throw new Error('El asignarmateriales no existe');
      }
      return { message: 'asignarmateriales eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  
async function findByUsuario(idUsuario) {
  const sql = `
    SELECT am.*, u.nombreUsuario, m.descripcionMaterial 
    FROM asignarmateriales am
    JOIN usuarios u ON am.idUsuario = u.idUsuario
    JOIN materiales m ON am.idMateriales = m.idMateriales
    WHERE am.idUsuario = ?
  `;
  return pool.execute(sql, [idUsuario]);
}


module.exports = {asignarmateriales     ,
    findByasignarmateriales,
    findOneasignarmateriales,
    deleteByidasignarmateriales,
    findByUsuario
  };
