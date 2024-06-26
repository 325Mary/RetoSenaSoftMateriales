const mysql = require('mysql2');


const pool = require('../config/database');

const materiales = {
  findAll: function() {
    return pool.execute('SELECT * FROM materiales'); 
  },
  create: function(materialesData) {
    const sql = `INSERT INTO materiales ( descripcionMaterial) VALUES ( ?)`;
    return pool.execute(sql, [ materialesData.descripcionMaterial]);
  }
};
async function findOnemateriales(descripcionMaterial) {
  const [rows, fields] = await pool.execute('SELECT * FROM materiales WHERE descripcionMaterial = ?', [descripcionMaterial]);
  return rows[0];
}


async function findBymateriales (idMateriales) {
    const [rows, fields] = await pool.execute(`SELECT * FROM materiales WHERE idMateriales = ?` , [idMateriales]);
    return rows[0];    throw error;
  }

async function deleteByidmateriales(idMateriales) {
    try {
      const [result] = await pool.execute('DELETE FROM materiales WHERE idMateriales = ?', [idMateriales]);
      if (result.affectedRows === 0) {
        throw new Error('El materiales no existe');
      }
      return { message: 'materiales eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {materiales,
    findBymateriales,
    findOnemateriales,
    deleteByidmateriales,
  };
