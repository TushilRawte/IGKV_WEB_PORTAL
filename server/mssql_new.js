const sql = require('mssql');
const config = require('config');

const dbConfig = {
    server: config.get("db_new.server"),//here host denote host name
    user : config.get("db_new.user"),
    database: config.get("db_new.database"),
    password: config.get("db_new.password"),
  options: {
    encrypt: true, // If your SQL Server requires encryption
    trustServerCertificate: true, // If you trust the server certificate
  },
};


// const dbConfig = {
//   server: config.get("db_new.server"),
//   user: config.get("db_new.user"),
//   database: config.get("db_new.database"),
//   password: config.get("db_new.password"),
//   options: {
//     encrypt: true, // If your SQL Server requires encryption
//     trustServerCertificate: true, // If you trust the server certificate
//   },
// };







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
