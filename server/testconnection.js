const sql = require('mssql');
const config = require('config');

// Database configurations
const db1Config = {
  server: config.get('db1.server'),
  user: config.get('db1.user'),
  database: config.get('db1.database'),
  password: config.get('db1.password'),
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const db2Config = {
  server: config.get('db2.server'),
  user: config.get('db2.user'),
  database: config.get('db2.database'),
  password: config.get('db2.password'),
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Function to test connection and stored procedure
const testConnectionAndProcedure = async (config, dbName, procedureName, params) => {
  try {
    console.log(`Connecting to ${dbName} with config:`, config);
    const pool = await sql.connect(config);
    console.log(`${dbName} connection successful`);

    const request = pool.request();

    for (const [key, value] of Object.entries(params)) {
      request.input(key, sql.NVarChar, value); // Adjust SQL type as needed
    }

    console.log(`Executing stored procedure ${procedureName}...`);
    const result = await request.execute(procedureName);
    console.log(`${dbName} stored procedure result:`, result.recordset);

    await pool.close(); // Ensure pool connection is closed
    console.log(`${dbName} connection closed.`);
  } catch (err) {
    console.error(`Error connecting to ${dbName} or executing ${procedureName}:`);
    console.error(`Error Message: ${err.message}`);
    console.error(`Stack Trace: ${err.stack}`);
  }
};

// Run tests
const runTests = async () => {
  const params1 = {}; // Example parameters for Database 1
  const params2 = { domainName: 'exampleDomain' }; // Example parameters for Database 2

  await Promise.all([
    testConnectionAndProcedure(db1Config, 'Database 1', '[D_Web].[getCategoryList]', params1),
    testConnectionAndProcedure(db2Config, 'Database 2', '[dbo].[getDevelopedVarietiesList]', params2),
  ]);
};

runTests();
