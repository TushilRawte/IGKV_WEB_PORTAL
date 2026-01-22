const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library
const domainurl = require('../config').domainName;

exports.getInstitutionSetupTypeList = async (req, res) => {
  const office_id = req.params.id;
  try {
    const pool = await connectDatabase();
    const request = pool.request();
    request.input('office_id', sql.Int, office_id);
    const result = await request.execute('[D_Web].[get_institutionSetupTypeList]');
    
    const result2Array = [];

    for (const item of result.recordset) {
      const request2 = pool.request();
      request2.input('office_id', sql.Int, office_id);
      request2.input('domainName', sql.NVarChar, domainurl);
      request2.input('Institution_setup_type_ID', sql.Int, item.Institution_setup_type_ID);
      const result2 = await request2.execute('[D_Web].[get_institutionSetupList]');
      result2Array.push(result2.recordset.slice(0,1));
    }

     // Combine the first and second query results into responseData
     const responseData = result.recordset.map((setup, index) => ({
      institutionSetup: {
        Institution_setup_name: setup.Institution_setup_name,
        Institution_setup_type_ID: setup.Institution_setup_type_ID,
        imageList: result2Array[index] ? result2Array[index].map(image => ({
          Institution_Setup_main_id: image.Institution_Setup_main_id,
          Column1: image.imageURL
        })) : [],
        description: setup.description
      }
    }));


    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

exports.getInstitutionSetupTypeDetails = async (req, res) => {
  try {
    const splitArray = req.params.id.split(',').map(value => value.trim());
    const pool = await connectDatabase();

    const params = splitArray.map(value => value === '' ? null : parseInt(value));
    // const [Unit_ID, category_id, section_id, emp_id, Website_Content_ID] = params;
    const request = pool.request();
    ['office_id', 'Institution_setup_type_ID']
      .forEach((param, index) => request.input(param, sql.Int, params[index]));
    request.input('domainName', sql.NVarChar, domainurl);
    const result = await request.execute('[D_Web].[get_institutionSetupList]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};


exports.getInstitutionSetupListDetails = async (req, res) => {
  try {
    const splitArray = req.params.id.split(',').map(value => value.trim());
    const pool = await connectDatabase();

    const params = splitArray.map(value => value === '' ? null : parseInt(value));
    // const [Unit_ID, category_id, section_id, emp_id, Website_Content_ID] = params;
    const request = pool.request();
    ['office_id', 'Institution_setup_type_ID','Institution_Setup_main_id']
      .forEach((param, index) => request.input(param, sql.Int, params[index]));
    request.input('domainName', sql.NVarChar, domainurl);
    const result = await request.execute('[D_Web].[get_institutionSetupList_details]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

exports.getInstSetListWithDetails = async (req, res) => {
  const office_id = req.params.id1;
  const Institution_setup_type_ID = req.params.id2;
  try {
    const pool = await connectDatabase();
    const request = pool.request();
    request.input('office_id', sql.Int, office_id);
    request.input('domainName', sql.NVarChar, domainurl);
    request.input('Institution_setup_type_ID', sql.Int, Institution_setup_type_ID);
    const result = await request.execute('[D_Web].[get_institutionSetupList]');
    
    const result2Array = [];

    for (const item of result.recordset) {
      const request2 = pool.request();
      request2.input('office_id', sql.Int, office_id);
      request2.input('domainName', sql.NVarChar, domainurl);
      request2.input('Institution_setup_type_ID', sql.Int, item.Institution_setup_type_ID);
      request2.input('Institution_Setup_main_id', sql.Int, item.Institution_Setup_main_id);
      const result2 = await request2.execute('[D_Web].[get_institutionSetupList_details]');
      result2Array.push(result2.recordset);
    }

     // Combine the first and second query results into responseData
     const responseData = result.recordset.map((setup, index) => ({
      institutionSetup: {
        Institution_setup_name: setup.Institution_setup_name,
        description: setup.description,
        title:setup.title,
        imageList: result2Array[index] ? result2Array[index].map(image => ({
          imageUrl: image.imageURL
        })) : [],
      }
    }));


    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};