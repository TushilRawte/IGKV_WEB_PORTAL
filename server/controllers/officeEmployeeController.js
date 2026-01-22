const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library
const domainurl = require('../config').domainName;

  
  exports.getEmployeeListFromOffice  = async (req, res) => {
    const Unit_ID = req.params.id;
    try {
      const pool = await connectDatabase();
  
      const request = pool.request();
      request.input('Unit_ID', sql.Int, Unit_ID);
      request.input('domainName', sql.NVarChar, domainurl);

      const result = await request.execute('[D_Web].[getEmployeeListFromOffice]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }; 
