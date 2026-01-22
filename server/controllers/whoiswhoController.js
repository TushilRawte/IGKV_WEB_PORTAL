const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library
const domainurl = require('../config').domainName;


exports.getAdministrativeDashboardDetail  = async (req, res) => {
    const id = req.params.id;
    try {
      const pool = await connectDatabase();
  
      const request = pool.request();
      request.input('Administrative_Board_ID', sql.Int, id);
      request.input('domainName', sql.NVarChar, domainurl);
      const result = await request.execute('[D_Web].[getAdministrativeDashboardDetail]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };    

  exports.getPostListForWhoisWho  = async (req, res) => {
    try {
      const pool = await connectDatabase();
  
      const request = pool.request();
      const result = await request.execute('[D_Web].[getPostListForWhoisWho]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };    

  exports.getEmployeeListForWhoisWho  = async (req, res) => {
    const id = req.params.id;
    try {
      const pool = await connectDatabase();
  
      const request = pool.request();
      request.input('post_level', sql.Int, id);
      const result = await request.execute('[D_Web].[getEmployeeListForWhoisWho]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };    
