const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library
const domainurl = require('../config').domainName;




exports.getOfficeDetail = async (req, res) => {
  const Unit_ID = req.params.id;
  try {
    const pool = await connectDatabase();

    const request = pool.request();
    request.input('Unit_ID', sql.Int, Unit_ID);
    request.input('domainName', sql.NVarChar, domainurl);

    const result = await request.execute('[D_Web].[getOfficeDetail]');
    
    // Extract data from all result sets
    const Office_Page_Data = result.recordsets[0];
    const Office_Head_Data = result.recordsets[1];
   
    
      
      // Combine data from all result sets into a single object
      const responseData = {
          Office_Page_Data,
          Office_Head_Data
      };
      
      res.status(200).json(responseData);
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
  }
};  


