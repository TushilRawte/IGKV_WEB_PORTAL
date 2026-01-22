const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library
const domainurl = require('../config').domainName;

exports.getActivityList = async (req, res) => {
  try {
    const splitArray = req.params.id.split(',').map(value => value.trim());
    const pool = await connectDatabase();

    const params = splitArray.map(value => value === '' ? null : parseInt(value));
    // const [Unit_ID, category_id, section_id, emp_id, Website_Content_ID] = params;
    const request = pool.request();
    ['Unit_ID', 'section_id', 'category_id', 'emp_id', 'Website_Content_ID','PageNumber','RowsPerPage',]
      .forEach((param, index) => request.input(param, sql.Int, params[index]));
    request.input('domainName', sql.NVarChar, domainurl);
    const result = await request.execute('[D_Web].[getActivityList_node]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

// with pagination
exports.getActivityListWithPaging = async (req, res) => {
  try {
    const splitArray = req.params.id.split(',').map(value => value.trim());
    const pool = await connectDatabase();

    // Map parameters and handle types appropriately
    const params = splitArray.map(value => {
      if (value === '') return null;
      return isNaN(value) ? value : parseInt(value); // Check if value is a string or number
    });

    const request = pool.request();
    // Define the parameters and types
    const paramDefinitions = [
      { name: 'Unit_ID', type: sql.Int },
      { name: 'section_id', type: sql.Int },
      { name: 'category_id', type: sql.Int },
      { name: 'emp_id', type: sql.Int },
      { name: 'Website_Content_ID', type: sql.Int },
      { name: 'Content_Title', type: sql.NVarChar },
      { name: 'StartRowFrom', type: sql.Int },
      { name: 'TotalRow', type: sql.Int },
    ];
    paramDefinitions.forEach((paramDef, index) => {
      const value = params[index]; // Get the corresponding value from params
      if (value !== undefined) {
        request.input(paramDef.name, paramDef.type, value);
      }
    });

    // Add domainName parameter
    request.input('domainName', sql.NVarChar, domainurl);

    const result = await request.execute('[D_Web].[getActivityList_Page_test]');
    const data = result.recordsets[0];
    const totaldata = result.recordsets[1];
    response = {
      data:data,
      totaldata :totaldata[0].totalActivity
    }
    res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

exports.getCategoryList = async (req, res) => {
  const Unit_ID = req.params.id;
  try {
    const pool = await connectDatabase();

    const request = pool.request();
    request.input('Unit_Type_Id', sql.Int, Unit_ID);
    const result = await request.execute('[D_Web].[getCategoryList]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

exports.getGallaryList = async (req, res) => {
  try {
    const splitArray = req.params.id.split(',').map(value => value.trim());
    const pool = await connectDatabase();

    const params = splitArray.map(value => value === '' ? null : parseInt(value));
    //  const [office_id, category_Id, year] = params;

    const request = pool.request();
    ['unit_id','gallary_main_id']
      .forEach((param, index) => request.input(param, sql.Int, params[index]));

    const result = await request.execute('[D_Web].[GalleryEntry__getGallaryList]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

exports.getGallaryDetail = async (req, res) => {
  const office_id = req.params.id1;{}
  const gallery_main_id = req.params.id2;{}
  
  try {
    const pool = await connectDatabase();
    const request = pool.request();
    request.input('office_id', sql.Int, office_id);
    request.input('domainName', sql.NVarChar, domainurl);
    request.input('gallery_main_id', sql.Int, gallery_main_id);
    const result = await request.execute('[D_Web].[get_GallaryList]');
    const request2 = pool.request();
    request2.input('gallery_main_id', sql.Int, gallery_main_id);
    request2.input('domainName', sql.NVarChar, domainurl);
    const result2 = await request2.execute('[D_Web].[getGallaryDetail]');
    const responseData = {
      GallaryDetail: result.recordset.map(record => ({
        ...record,
        detail: result2.recordset
      }))
    };
    
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

exports.get_gallaryCategoryListByYear = async (req, res) => {
  try {
    const pool = await connectDatabase();

    const request = pool.request();
    // request.input('Gallery_Category_ID', sql.Int, Unit_ID);
    const result = await request.execute('[D_Web].[get_gallaryCategoryListByYear]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

exports.get_gallaryCategoryList = async (req, res) => {
  try {
    const pool = await connectDatabase();

    const request = pool.request();
    request.input('domainName', sql.NVarChar, domainurl);
    const result = await request.execute('[D_Web].[get_gallaryCategoryList]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};


exports.get_GallaryList = async (req, res) => {
  try {
    const splitArray = req.params.id.split(',').map(value => value.trim());
    const pool = await connectDatabase();

    const params = splitArray.map(value => value === '' ? null : parseInt(value));
    // const [Unit_ID, category_id, section_id, emp_id, Website_Content_ID] = params;

    const request = pool.request();
    ['office_id', 'category_Id', 'year']
      .forEach((param, index) => request.input(param, sql.Int, params[index]));
      request.input('domainName', sql.NVarChar, domainurl);
      
    const result = await request.execute('[D_Web].[get_GallaryList]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

