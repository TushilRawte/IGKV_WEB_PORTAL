const connectDatabase = require('../mssql');
const sql = require('mssql');

// exports.getFarmProduct = async (req, res) => {
//     const Farm_ID = req.params.id; // Assuming the farm ID is passed as a route parameter
    
//     try {
//         const pool = await connectDatabase();
//         const request = pool.request();
//         request.input('Farm_id', sql.Int, Farm_ID); // Input the farm ID parameter
//         request.input('domainName', sql.NVarChar, "http://localhost:56203/mis%20initial%20project/Farming/");
//         request.input('product_id', sql.Int, product_id);
        
//         const result = await request.execute('[D_Web].[Farming_getProductByFarmId]');
        
//         // Extract data from all result sets
//         const FarmProductDetail = result.recordsets[0];
        
//         // Combine data from all result sets into a single object
//         const responseData = {
//             FarmProductDetail
//         };
        
//         res.status(200).json(responseData);
//     } catch (error) {
//         console.error('Error:', error.message);
//         res.status(500).send('Internal Server Error');
//     }
// };

exports.getFarmProduct = async (req, res) => {
    try {
        // Split the params from the URL
        const splitArray = req.params.id.split(',').map(value => value.trim());
        const pool = await connectDatabase();
  
        // Destructure parameters (Farm_id and product_id), with product_id optional
        const [Farm_id, product_id] = splitArray.map(value => value === '' ? null : value);

        // Set up the request
        const request = pool.request();
        request.input('Farm_id', sql.Int, parseInt(Farm_id));  // Farm_id is required
        request.input('domainName', sql.VarChar(200), null);   // Passing NULL, so default domain is used in SP
        request.input('product_id', sql.Int, product_id ? parseInt(product_id) : null);  // Optional product_id

        // Execute the stored procedure
        const result = await request.execute('[D_Web].[Farming_getProductByFarmId]');

        // Send the result
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
};



exports.getFarmerSuccessStory = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      // const [Unit_ID, category_id, section_id, emp_id, Website_Content_ID] = params;
  
      const request = pool.request();
      ['Farmer_ID']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
      const result = await request.execute('[dbo].[Get_All_Farmer_Success_Story]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

exports.getFarmDashboard = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const request = pool.request();
    const result = await request.execute('[D_Web].[Website_Farm_Count]');

    if (result.recordset && result.recordset.length > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(200).json({ message: 'No farms found', total_farm: 0 });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};


exports.getReserchStation_Farm = async (req, res) => {
  try {
    const splitArray = req.params.id.split(',').map(value => value.trim());
    const pool = await connectDatabase();

    const params = splitArray.map(value => value === '' ? null : parseInt(value));
    // const [Unit_ID, category_id, section_id, emp_id, Website_Content_ID] = params;

    const request = pool.request();
    ['office_class_id']
      .forEach((param, index) => request.input(param, sql.Int, params[index]));

    const result = await request.execute('[D_Web].[ResSta_Farm_KVK__Fill_Research_Station_Farms]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};
