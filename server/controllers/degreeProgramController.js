const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library

// Degree Deatil
exports.getDegreeProgramData = async (req, res) => {
    const degreeProgrammeType = req.params.id;
    try {
      const pool = await connectDatabase();
  
      const request = pool.request();
      request.input('degreeProgrammeType', sql.Int, degreeProgrammeType);
      const result = await request.execute('[D_Web].[getDegreeProgrammeTypeDetail]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };
  
// Degree wise Subject and There Dashboards
  exports.getDegreeWiseSubjectDetail = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      const request = pool.request();
      ['office_id', 'faculty_id', 'degree_programme_id', 'Degree_Programme_Type_Id', 'subject_id']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
      const result = await request.execute('[D_Web].[getDegreeProgrammeNameAndCount]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

//   DashBoard
  exports.degreeWiseDashboard  = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      const request = pool.request();
      ['office_id', 'faculty_id', 'degree_programme_id', 'Degree_Programme_Type_Id', 'subject_id']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
      const result = await request.execute('[D_Web].[getDegreeProgramTypebyFacultyCollegeSubject]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

// Student Count acording to session

exports.GetStudentCountsBySession = async (req, res) => {
  const session = req.params.id;
  try {
    const pool = await connectDatabase();
    const request = pool.request();
    request.input('session', sql.Int, session);
    const result = await request.execute('GetStudentCountsBySession_node');
    res.status(200).json(result.recordsets);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};



