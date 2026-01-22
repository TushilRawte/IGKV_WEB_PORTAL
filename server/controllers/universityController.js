const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library


exports.getOverviewUniversity = async (req, res) => {
  const Unit_ID = 0;
  try {
    const pool = await connectDatabase();   

    const request = pool.request();
    request.input('Unit_ID', sql.Int, Unit_ID);
    const result = await request.execute('[D_Web].[getOverviewOfUniversity_node]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error custom error');
  }
};



