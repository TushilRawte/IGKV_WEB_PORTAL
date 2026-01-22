const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library


  
  exports.getFacultyDetail = async (req, res) => {
    try {
      const pool = await connectDatabase();
  
      const request = pool.request();
      const result = await request.execute('[D_Web].[getFacultyDetail]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };


  exports.getCollegeListAndDetail = async (req, res) => {
    try {
      const pool = await connectDatabase();
  
      const request = pool.request();
      const result = await request.execute('[D_Web].[getCollegeListAndDetail]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };


  exports.getDepartmentListBycollege = async (req, res) => {
    try {
      const pool = await connectDatabase();
      const request = pool.request();
      const result = await request.execute('[D_Web].[getDepartmentListBycollege]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  exports.getGenderWiseCountByDegreeDegreeTypeFacultyCollegeSubject = async (req, res) => {
    try {
      const pool = await connectDatabase();
      const request = pool.request();
      const result = await request.execute('[D_Web].[getGenderWiseCountByDegreeDegreeTypeFacultyCollegeSubject]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  exports.getGenderWisePassOutCountByDegreeDegreeTypeFacultyCollegeSubject = async (req, res) => {
    try {
      const pool = await connectDatabase();
      const request = pool.request();
      const result = await request.execute('[D_Web].[getGenderWisePassOutCountByDegreeDegreeTypeFacultyCollegeSubject]');
      const countAllStudent = result.recordsets[1];
      const countcurrStudent = result.recordsets[2];
      const countAllStudentG = result.recordsets[3];
      const countcurrStudentG = result.recordsets[4];
      response = {
        countAllStudent:countAllStudent,
        countcurrStudent :countcurrStudent,
        countAllStudentGw :countAllStudentG,
        countcurrStudentGw :countcurrStudentG,
      }
     
      res.status(200).json(response);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };


  exports.addVisitorCount = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : value);
  
      const request = pool.request();
      ['sessionid', 'pageName', 'websiteID', 'EventType']
        .forEach((param, index) => {
          const value = params[index];
          // console.log(`${param}:`, value);
          request.input(param, sql.NVarChar, value); // Assuming EventType is of type NVARCHAR
        });
  
      const result = await request.execute('[Portal].[addVisitorCount]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };
  

  // exports.drsDashboard  = async (req, res) => {
  //   try {
  //     const pool = await connectDatabase();
  
  //     const request = pool.request();
  //     const result = await request.execute('[D_Web].[DRS_dashboard]');
  //     res.status(200).json(result.recordsets);
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     res.status(500).send('Internal Server Error');
  //   }
  // };
  
  exports.drsDashboard = async (req, res) => {
    try {
      const pool = await connectDatabase();
      const request = pool.request();
      const result = await request.execute('[D_Web].[DRS_dashboard]');
      res.status(200).json(result.recordsets);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  exports.getLanguage = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
  
      const request = pool.request();
      ['Language_ID']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
      const result = await request.execute('[D_Web].[Lang_getTranslatedContent]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  let visitCount = 13385327;
  exports.getVistedCount = async (req, res) => {
    try {
      visitCount++; 
      res.status(200).json(visitCount);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };