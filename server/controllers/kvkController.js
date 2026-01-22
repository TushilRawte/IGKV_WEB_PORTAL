const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library
const domainurl = require('../config').domainName;

exports.getKVKDetail = async (req, res) => {
    try {
      const pool = await connectDatabase();
      const request = pool.request();
      const result = await request.execute('[D_Web].[getKVKDetail_node]');
        res.status(200).json(result.recordsets[0]);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
  }; 
  
  


exports.getIndividualKVKDetail = async (req, res) => {
    const office_id = req.params.id;
    try {
      const pool = await connectDatabase();
      const request = pool.request();
      request.input('office_id', sql.Int, office_id);
      request.input('domainName', domainurl);
      const result = await request.execute('[D_Web].[getKVKDetail_node]');
      
      // Extract data from all result sets
      const kvks_Detail = result.recordsets[0];
      const kvks_headDetail = result.recordsets[1];
     
      
        
        // Combine data from all result sets into a single object
        const responseData = {
            kvks_Detail,
            kvks_headDetail
        };
        
        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
  };  
  



  exports.getScientistDashboard = async (req, res) => {
    try {
      const pool = await connectDatabase();
  
      const request = pool.request();
      const result = await request.execute('[D_Web].[Website_Scientist_Count]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };
  
