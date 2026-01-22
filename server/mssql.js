const sql = require('mssql');
const config = require('config');

// Retrieve database configuration for 'db'
const dbConfig = {
  server: config.get("db.server"),
  user: config.get("db.user"),
  database: config.get("db.database"),
  password: config.get("db.password"),
  options: {
    encrypt: true, // If your SQL Server requires encryption
    trustServerCertificate: true, // If you trust the server certificate
    requestTimeout:30000,
    connectionTimeout:30000
  },
};

const connectDatabase = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
};

module.exports = connectDatabase;
