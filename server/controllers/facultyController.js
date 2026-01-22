const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library
const domainurl = require('../config').domainName;


// Faculty DEtail
// exports.facultyWiseDetail = async (req, res) => {
//     const Faculty_Id = req.params.id;
//     try {
//       const pool = await connectDatabase();
  
//       const request = pool.request();
//       request.input('Faculty_Id', sql.Int, Faculty_Id);
//       request.input('domainName', sql.NVarChar, domainurl);

//       const result = await request.execute('[D_Web].[getFacultyDetail]');
//       res.status(200).json(result.recordset);
//     } catch (error) {
//       console.error('Error:', error.message);
//       res.status(500).send('Internal Server Error');
//     }
//   };

exports.facultyWiseDetail = async (req, res) => {
  const Faculty_Id = req.params.id;
  try {
      const pool = await connectDatabase();
      const request = pool.request();
      request.input('Faculty_Id', sql.Int, Faculty_Id);
      request.input('domainName', sql.NVarChar, domainurl);

      const result = await request.execute('[D_Web].[getFacultyDetail]');

      // Extracting data from the first result set (TBL_faculty_View and Tbl_Emp_post_office_Detail_APP)
      const facultyDetails = result.recordsets[0];

      // Extracting data from the second result set (M_edu.M_Faculty)
      const facultyOverview = result.recordsets[1];

      res.status(200).json({ facultyDetails, facultyOverview });
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
  }
};



//   Faculty Dashboard
  exports.facultyDashboard = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      const request = pool.request();
      ['faculty_id', 'Degree_Programme_Type_Id', 'Subject_id', 'degree_programme_id', 'office_id']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
      const result = await request.execute('[D_Web].[getGenderWiseCountByDegreeDegreeTypeFacultyCollegeSubject]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };
  
  
//  Program List in Faculty
exports.ProgramListInFaculty = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      const request = pool.request();
      ['faculty_id', 'office_id', 'Subject_id', 'Degree_Programme_Type_Id', 'degree_programme_id']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
      const result = await request.execute('[D_Web].[getDepartmentListByFacultyCollegeSubject]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };