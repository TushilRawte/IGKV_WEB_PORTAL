const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library
const domainurl = require('../config').domainName;


// get all staff detail
exports.getEmployeeDetails = async (req, res) => {
  try {
    // const { emp_id, designation, office, StartRowFrom, TotalRow } = req.params;
    const originalString = req.params.id;
    const splitArray = originalString.split(',');
    console.log(splitArray);
    const pool = await connectDatabase();
    const request = pool.request();

    request.input('emp_id', sql.Int, splitArray[0] || null);
    request.input('designation', sql.Int, splitArray[1] || null);
    request.input('office', sql.Int, splitArray[2] || null);
    request.input('StartRowFrom', sql.Int, splitArray[3] || null );
    request.input('TotalRow', sql.Int, splitArray[4] || null );
    request.input('domainName', sql.NVarChar, domainurl);

    const result = await request.execute('[Finance].[Web_Get_Employee_Details]');

    const employeeOverview = result.recordsets[0];
    const employeeQualifications = result.recordsets[1];
    const employeeWorkExperience = result.recordsets[2];
    const additionalResponsibilities = result.recordsets[3];
    const totalRowCount = result.recordsets[4][0][''];

    res.status(200).json({
      employeeOverview,
      employeeQualifications,
      employeeWorkExperience,
      additionalResponsibilities,
      totalRowCount
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};



exports.empWorkshop = async (req, res) => {
  try {
    const splitArray = req.params.id.split(',').map(value => value.trim());
    const pool = await connectDatabase();

    const params = splitArray.map(value => value === '' ? null : parseInt(value));
    // const [Unit_ID, category_id, section_id, emp_id, Website_Content_ID] = params;

    const request = pool.request();
    ['emp_id']
      .forEach((param, index) => request.input(param, sql.Int, params[index]));

    const result = await request.execute('[D_Web].[get_allWorkshopSeminar]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

exports.getPublicationEmployeeWise = async (req, res) => {
  let pool; // Declare pool variable outside try block
  try {
    let { emp_id } = req.params; // Assuming the employee ID is sent as a route parameter

    // Check if emp_id is undefined or empty
    if (!emp_id) {
      return res.status(400).json({ error: 'emp_id is required' });
    }

    // Convert emp_id to integer
    emp_id = parseInt(emp_id);

    // Connect to the database
    pool = await connectDatabase();
    const request = pool.request();
    console.log(emp_id);

    // Add input parameter for employee ID
    request.input('emp_id', sql.Int, emp_id);

    // Execute the stored procedure
    const result = await request.execute('[D_Web].[getPublicationEmployeeWise]'); 

    // Extract publication data from the result set
    const Publication = result.recordsets[0];
    const categoryIIIBData = result.recordsets[1];
    const Projects = result.recordsets[2];

    // Send the structured data in the response
    res.status(200).json({ Publication , categoryIIIBData , Projects });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  } finally {
    // Close the database connection
    if (pool) await pool.close();
  }
};


exports.getAllWorkshopSeminar = async (req, res) => {
  let pool; // Declare pool variable outside try block
  try {
    let { emp_id } = req.params; // Assuming the employee ID is sent as a route parameter

    // Check if emp_id is undefined or empty
    if (!emp_id) {
      return res.status(400).json({ error: 'emp_id is required' });
    }

    // Convert emp_id to integer
    emp_id = parseInt(emp_id);

    // Connect to the database
    pool = await connectDatabase();
    const request = pool.request();

    // Add input parameter for employee ID
    request.input('emp_id', sql.Int, emp_id);

    // Execute the stored procedure
    const result = await request.execute('[D_Web].[get_allWorkshopSeminar]');

    // Extract data from the result set
    const workshopData = result.recordsets[0];
    const seminarData = result.recordsets[1];
    const invitedLectureData = result.recordsets[2];

    // Send the structured data in the response
    res.status(200).json({ 
      workshopData: workshopData,
      seminarData: seminarData,
      invitedLectureData: invitedLectureData
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  } finally {
    // Close the database connection
    if (pool) await pool.close();
  }
};


exports.getOfficeDetails = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const request = pool.request();

    // Execute the stored procedure
    const result = await request.execute('[dbo].[GetOfficeDetails_node]');

    // Extract data from the result set
    const officeDetails = result.recordset;

    // Send the data as a JSON response
    res.status(200).json({ officeDetails });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};



exports.getOPostDetails = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const request = pool.request();

    // Execute the stored procedure
    const result = await request.execute('[dbo].[GetPostDetails_node]');

    // Extract data from the result set
    const officeDetails = result.recordset;

    // Send the data as a JSON response
    res.status(200).json({ officeDetails });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};


exports.getEmpDetails = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const request = pool.request();

    // Execute the stored procedure
    const result = await request.execute('[dbo].[GetEmployeeNames_node]');

    // Extract data from the result set
    const officeDetails = result.recordset;

    // Send the data as a JSON response
    res.status(200).json({ officeDetails });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

//  ----------- Search -----------

// exports.empSearch = async (req, res) => {
//   try {
//     const splitArray = req.params.id.split(',').map(value => value.trim());
//     const pool = await connectDatabase();

//     const params = splitArray.map(value => value === '' ? null : parseInt(value));
//     // const [Unit_ID, category_id, section_id, emp_id, Website_Content_ID] = params;

//     const request = pool.request();
//     ['emp_id','designation','office','Emp_FName_E','domainName','StartRowFrom','TotalRow']
//       .forEach((param, index) => request.input(param, sql.Int, params[index]));

//     const result = await request.execute('[Finance].[Web_Search_Employee_Details]');
//     res.status(200).json(result.recordset);
//   } catch (error) {
//     console.error('Error:', error.message);
//     res.status(500).send('Internal Server Error');
//   }
// };

// get all staff detail
exports.empSearch = async (req, res) => {
  try {
    // const { emp_id, designation, office, StartRowFrom, TotalRow } = req.params;
    const originalString = req.params.id;
    const splitArray = originalString.split(',');
    console.log(splitArray);
    const pool = await connectDatabase();
    const request = pool.request();
    request.input('emp_id', sql.Int, splitArray[0] || null);
    request.input('designation', sql.VarChar, splitArray[1] || null);
    request.input('office', sql.VarChar, splitArray[2] || null);
    request.input('Emp_FName_E', sql.NVarChar, splitArray[3] || null);
    request.input('StartRowFrom', sql.Int, splitArray[4] || null );
    request.input('TotalRow', sql.Int, splitArray[5] || null );
    request.input('domainName', sql.NVarChar, domainurl);
    const result = await request.execute('[Finance].[Web_Search_Employee_Details]');
    const employeeOverview = result.recordset;
    res.status(200).json({
      employeeOverview
 
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};