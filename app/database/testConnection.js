import { getConnection } from './sqlConfig';

export async function testDatabaseConnection() {
  const pool = await getConnection();
  if (pool) {
    try {
      const result = await pool.request().query('SELECT 1 AS number'); // Consulta simple para probar la conexión
      console.log('Connection Successful:', result.recordset);
    } catch (error) {
      console.error('Error executing query:', error);
    } finally {
      pool.close(); // Asegúrate de cerrar la conexión después de la prueba
    }
  }
}