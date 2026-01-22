const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library
const domainurl = require('../config').domainName;

// College List 
exports.CollegeTypeList = async (req, res) => {
  try {
    const splitArray = req.params.id.split(',').map(value => value.trim());
    const pool = await connectDatabase();
    const params = splitArray.map(value => value === '' ? null : parseInt(value));
    const request = pool.request();
    ['college_type_id', 'office_id']
      .forEach((param, index) => request.input(param, sql.Int, params[index]));
      request.input('domainName', sql.NVarChar, domainurl);


    const result = await request.execute('[D_Web].[getCollegeListAndDetail]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

// College Detail
exports.collegeDetails = async (req, res) => {
  const Unit_ID = req.params.id;
  try {
    const pool = await connectDatabase();
    const request = pool.request();
    request.input('office_id', sql.Int, Unit_ID);
    request.input('domainName', sql.NVarChar, domainurl);

    const result = await request.execute('[D_Web].[getcollegeDetail_node]');

    // Extracting both record sets
    const collegeDetail = result.recordsets[0]; // First record set
    const employeeDetail = result.recordsets[1]; // Second record set

    // Sending both record sets in the response
    res.status(200).json({ collegeDetail, employeeDetail });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};



function arrangeData(departmentList, headDetail) {
  const arrangedData = [];
  departmentList.forEach(department => {
    const matchingHeadDetail = headDetail.find(detail => detail.Post_Office_Code === department.Office_Code);
    if (matchingHeadDetail) {
      // console.log('Matching Department:', department);
      // console.log('Matching Head Detail:', matchingHeadDetail);
      arrangedData.push({
        DepartmentName: matchingHeadDetail.Office_Name,
        ...department,
        HeadDetail: matchingHeadDetail
      });
    }
  });
  // console.log('Arranged Data:', arrangedData);
  return arrangedData;
}






exports.getDepartmentDetail = async (req, res) => {
  try {
    const splitArray = req.params.id.split(',').map(value => value.trim());
    const headoffice_id = parseInt(splitArray[2]);
    const pool = await connectDatabase();
    const params = splitArray.map(value => value === '' ? null : parseInt(value));
    const request = pool.request();
    ['office_id', 'subject_id', 'headoffice_id']
      .forEach((param, index) => request.input(param, sql.Int, params[index]));
    request.input('domainName', sql.NVarChar, domainurl);

    const result = await request.execute('[D_Web].[getDepartmentDetail]');

    const Department_List = result.recordsets[0];
    const HeadDetail = result.recordsets[1];

    const arrangedData = arrangeData(Department_List, HeadDetail);
    
    const dashboarddata = {}; // Object to store dashboard data by Subject_Id

    for (const data of arrangedData) {
      const request2 = pool.request();
      request2.input('office_id', sql.Int, headoffice_id);
      request2.input('subject_id', sql.Int, data.Subject_Id);
      const result2 = await request2.execute('[D_Web].[getDegreeProgrammeNameAndCount_node]');
      const dashboard = result2.recordset;
      
      // Store dashboard data by Subject_Id
      dashboarddata[data.Subject_Id] = dashboard;
    
      // console.log(dashboard);
    }
    
    // Combine arrangedData and dashboarddata based on Subject_Id
    const combinedData = arrangedData.map(record => ({
      ...record,
      dashboard: dashboarddata[record.Subject_Id] || [] // If there's no matching dashboard data, default to an empty array
    }));

    res.status(200).json({ Department_List: combinedData });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');  
  }
};

