const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library


// Get Session
exports.getProjectSession = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      const request = pool.request();
      ['fin_year']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
      const result = await request.execute('[Finance].[Web_Get_All_Research_Project_Year]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  exports.getProjectSource = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      const request = pool.request();
      ['fin_year']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
      const result = await request.execute('[Finance].[Web_Get_Source_By_Fin_Year]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  exports.getProjectMajor = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      const request = pool.request();
      ['fin_year','Source_Code']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
      const result = await request.execute('[Finance].[Web_Get_MajorHead_By_Source]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  exports.getProjectScheme = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      const request = pool.request();
      ['fin_year','Source_Code','MajorHead_Code']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
      const result = await request.execute('[Finance].[Web_Get_Scheme_By_MajorHead]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  exports.getProjectForOffice = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      const request = pool.request();
      ['fin_year','Source_Code','MajorHead_Code','Office_code']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
      const result = await request.execute('[Finance].[Web_Get_All_Research_Project_By_Office]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };


  // exports.serchProjectSceme = async (req, res) => {
  //   try {
  //     const splitArray = req.params.id.split(',').map(value => value.trim());
  //     const pool = await connectDatabase();
  
  //     const params = splitArray.map(value => value === '' ? null : parseInt(value));
  //     const request = pool.request();
  //     [,'fin_year','Scheme_Name','StartRowFrom','TotalRow']
  //       .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
  //     const result = await request.execute('[Finance].[Web_Get_Search_Scheme]');
  //     res.status(200).json(result.recordset);
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     res.status(500).send('Internal Server Error');
  //   }
  // };

  exports.serchProjectSceme = async (req, res) => {
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
        { name: 'fin_year', type: sql.Int },
        { name: 'Scheme_Name', type: sql.NVarChar },
        { name: 'StartRowFrom', type: sql.Int },
        { name: 'TotalRow', type: sql.Int },
      ];
      paramDefinitions.forEach((paramDef, index) => {
        const value = params[index]; // Get the corresponding value from params
        if (value !== undefined) {
          request.input(paramDef.name, paramDef.type, value);
        }
      });
      const result = await request.execute('[Finance].[Web_Get_Search_Scheme]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };



//   exports.projectList = async (req, res) => {
//     try {
//       const splitArray = req.params.id.split(',').map(value => value.trim());
//       const pool = await connectDatabase();
  
//       const params = splitArray.map(value => value === '' ? null : parseInt(value));
//       const request = pool.request();
//       ['fin_year', 'Source_Code', 'MajorHead_Code']
//         .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
//       // Execute the stored procedure
//       const result = await request.execute('[Finance].[Web_Get_All_Research_Project]');
  
//       // Extract data from each result set
//       const [totalProjectCountSourceWise, totalProjectCountSourceAndMajorHeadWise, totalProjectCountWithPIWise] = result.recordsets;
  
//       // Return data from all result sets
//       res.status(200).json({
//         totalProjectCountSourceWise,
//         totalProjectCountSourceAndMajorHeadWise,
//         totalProjectCountWithPIWise
//       });
//     } catch (error) {
//       console.error('Error:', error.message);
//       res.status(500).send('Internal Server Error');
//     }
//   };
  
  exports.projectList = async (req, res) => {
    try {
        const splitArray = req.params.id.split(',').map(value => value.trim());
        const pool = await connectDatabase();

        const params = splitArray.map(value => value === '' ? null : parseInt(value));
        const request = pool.request();
        ['fin_year', 'Source_Code', 'MajorHead_Code']
            .forEach((param, index) => request.input(param, sql.Int, params[index]));
            const result = await request.execute('[Finance].[Web_Get_All_Project_List]');

        // const result = await request.execute('[Finance].[Web_Get_All_Research_Project]');
        
        // Extract data from all result sets
        const totalProjectCountSourceWise = result.recordsets[0];
        const totalProjectCountSourceAndMajorHeadWise = result.recordsets[1];
        const totalProjectCountWithPIWise = result.recordsets[2];
        const SessionYear = result.recordsets[3];
        
        // Combine data from all result sets into a single object
        const responseData = {
            totalProjectCountSourceWise,
            totalProjectCountSourceAndMajorHeadWise,
            totalProjectCountWithPIWise,
            SessionYear
        };
        
        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

// Project Total Count
exports.GetCurrentProjectCount = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const request = pool.request();
    const result = await request.execute('[Finance].[GetCurrentProjectCount]');
      res.status(200).json(result.recordset);
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
  }
}; 