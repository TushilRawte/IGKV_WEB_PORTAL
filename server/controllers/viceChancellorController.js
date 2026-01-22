const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library


exports.getGallaryDetailEmployeeWise = async (req, res) => {
  try {
    const splitArray = req.params.id.split(',').map(value => value.trim());
    const pool = await connectDatabase();

    const params = splitArray.map(value => value === '' ? null : parseInt(value));

    const request = pool.request();
    ['gallery_main_id', 'emp_id']
      .forEach((param, index) => request.input(param, sql.Int, params[index]));

    const result = await request.execute('[D_Web].[getGallaryDetailEmployeeWise_node]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};



exports.VC_Desk_getDetail = async (req, res) => {
  try {
    const pool = await connectDatabase();

    const request = pool.request();
    const result = await request.execute('[D_Web].[VC_Desk_getDetail]');
    
    // Extract data from all result sets
    const vc_pagedata = result.recordsets[0];
    const vc_data = result.recordsets[1];
   

      // Combine data from all result sets into a single object
      const responseData = {
        vc_pagedata,
        vc_data
      };
      
      res.status(200).json(responseData);
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
  }
}; 

exports.get_former_vc_List = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const request = pool.request();
    const result = await request.execute('[D_Web].[get_former_vc_List]');
      res.status(200).json(result.recordset);
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
  }
}; 







