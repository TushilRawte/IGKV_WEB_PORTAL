const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library
const domainurl = require('../config').domainName;

exports.getVarietyData = async (req, res) => {
  try {
    const splitArray = req.params.id.split(',').map(value => value.trim());
    const pool = await connectDatabase();
    const params = splitArray.map(value => value === '' ? null : parseInt(value));
    const request = pool.request();

    ['Crop_id','Variety_ID']
      .forEach((param, index) => request.input(param, sql.Int, params[index]));
      request.input('domainName', sql.NVarChar, domainurl);
    const result = await request.execute('[D_Web].[get_Varieties_Evolved]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

exports.getCropData  = async (req, res) => {
  try {
    const pool = await connectDatabase();

    const request = pool.request();
    const result = await request.execute('[D_Web].[GetCropForVarietyEvolved]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};    

exports.getDasboard  = async (req, res) => {
  try {
    const pool = await connectDatabase();

    const request = pool.request();
    const result = await request.execute('[D_Web].[getCrop_Variety_Dasboard]');
    res.status(200).json(result.recordsets);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};   












  