

const { pool } = require('../config/database');

const listaNegraService = {
  async agregarToken(token) {
    try {
      const query = 'INSERT INTO blacklistedtoken (token, creacion) VALUES (?, NOW())';
      const result = await pool.promise().query(query, [token]);

      if (!result || result[0].affectedRows !== 1) {
        throw new Error('Error al agregar el token a la lista negra: No se afectó ninguna fila');
      }

      console.log('Token agregado correctamente a la lista negra:', token);
    } catch (error) {
      console.error('Error al agregar el token a la lista negra:', error.message);
      throw error;
    }
  },

  async vaciarListaNegra() {
    try {
      const query = 'DELETE FROM blacklistedtoken';
      await pool.promise().query(query);
    } catch (error) {
      console.error('Error al vaciar la tabla blacklistedtoken:', error.message);
      throw error;
    }
  },

  async tokenEnListaNegra(token) {
    try {

      const query = 'SELECT COUNT(*) AS count FROM blacklistedtoken WHERE token = ?';
      const [rows, fields] = await pool.promise().query(query, [token.toString()]);


      if (!rows || rows.length === 0 || !rows[0] || rows[0].count === undefined) {
        return false; 
      }

      return rows[0].count > 0;
    } catch (error) {
      throw error;
    }
  }
};

setInterval(() => {
  listaNegraService.vaciarListaNegra()
    .catch(error => console.error('Error al vaciar la lista negra:', error));
}, 3600 * 1000); 

module.exports = { listaNegraService };
