const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library
const domainurl = require('../config').domainName;


// Get Department List 
  exports.departmentList = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      const request = pool.request();
      ['office_id']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));

      const result = await request.execute('[D_Web].[getDepartmentListBycollege]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };


// Get Department Detail 
exports.departmentDetail = async (req, res) => {
  try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();

      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      const request = pool.request();
      ['office_id', 'Subject_id', 'headoffice_id']
          .forEach((param, index) => request.input(param, sql.Int, params[index]));
      request.input('domainName', sql.NVarChar, domainurl);

      const result = await request.execute('[D_Web].[getDepartmentDetail]');

      // Assign names to each result set
      const namedResultSets = {
          departmentInfo: result.recordsets[0],
          employeeInfo: result.recordsets[1]
      };

      // Log named result sets
      Object.entries(namedResultSets).forEach(([name, resultSet], index) => {
          console.log(`Result set ${index + 1} (${name}):`, resultSet);
      });

      res.status(200).json(namedResultSets); // Return named result sets
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
  }
};

// get department details
// exports.departmentDetail = async (req, res) => {
//     try {
//       const splitArray = req.params.id.split(',').map(value => value.trim());
//       const pool = await connectDatabase();
  
//       const params = splitArray.map(value => value === '' ? null : parseInt(value));
//       const request = pool.request();
//       ['office_id','Subject_id','headoffice_id']
//         .forEach((param, index) => request.input(param, sql.Int, params[index]));
//         request.input('domainName', sql.NVarChar, domainurl);

//       const result = await request.execute('[D_Web].[getDepartmentDetail]');
//       res.status(200).json(result.recordset);
//     } catch (error) {
//       console.error('Error:', error.message);
//       res.status(500).send('Internal Server Error');
//     }
//   };

  // Get Degree Program List According to Department 
  exports.degreeProgramList = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      const request = pool.request();
      ['Subject_id', 'Degree_Programme_Type_Id', 'faculty_id', 'degree_programme_id', 'office_id']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
      const result = await request.execute('[D_Web].[getDegreeProgrammeWiseNameAndCount]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };


//   Degree Program List ===== Here Issue Procedure Not found ===
//   exports.degreeProgramList = async (req, res) => {
//     try {
//       const splitArray = req.params.id.split(',').map(value => value.trim());
//       const pool = await connectDatabase();
  
//       const params = splitArray.map(value => value === '' ? null : parseInt(value));
//       const request = pool.request();
//       ['Subject_id', 'Degree_Programme_Type_Id', 'faculty_id', 'degree_programme_id', 'office_id']
//         .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
//       const result = await request.execute('[D_Web].[getDegreeProgrammeWiseNameAndCount]');
//       res.status(200).json(result.recordset);
//     } catch (error) {
//       console.error('Error:', error.message);
//       res.status(500).send('Internal Server Error');
//     }
//   };



  //  get Department Count Faculty Wise
  exports.getDepartmentCollegeList = async (req, res) => {
    try {
        const pool = await connectDatabase();
        const request = pool.request();

        const result = await request.execute('[D_Web].[getDepartmentCollegeList]');

        // Extract data from the first result set
        const facultyData = result.recordsets[0];

        // Extract data from the second result set
        const collegeData = result.recordsets[1];

        // Send both result sets in the response
        res.status(200).json({ facultyData, collegeData });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

// exports.getDepartmentDetaildata = async (req, res) => {
//     try {
//         const { office_id, Subject_id, headoffice_id } = req.query; // Assuming the parameters are sent as query parameters

//         const pool = await connectDatabase();
//         const request = pool.request();

//         // Add input parameters
//         request.input('Subject_id', sql.Int, Subject_id);
//         request.input('office_id', sql.Int, office_id);
//         request.input('headoffice_id', sql.Int, headoffice_id);
//         // request.input('domainName', sql.NVarChar(200), domainName);

//         // Execute the stored procedure
//         const result = await request.execute('[D_Web].[getDepartmentDetail]');

//         // Extract data from the first result set
//         const departmentData = result.recordsets[0];

//         // Extract data from the second result set
//         const employeeData = result.recordsets[1];

//         // Send both result sets in the response
//         res.status(200).json({ departmentData, employeeData });
//     } catch (error) {
//         console.error('Error:', error.message);
//         res.status(500).send('Internal Server Error');
//     }
// };
