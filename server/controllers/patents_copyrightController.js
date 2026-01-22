const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library

  
// exports.getPatentCopyrightList = async (req, res) => {
//   const copyright_patent_type = req.params.id;
//     try {
//       const pool = await connectDatabase();
//       const request = pool.request();
//       request.input('copyright_patent_type', sql.NVarChar, copyright_patent_type);
//       const result = await request.execute('[D_Web].[getPatentCopyRightList]');
//         res.status(200).json(result.recordsets);
//     } catch (error) {
//         console.error('Error:', error.message);
//         res.status(500).send('Internal Server Error');
//     }
//   };  


/*   exports.getPatentCopyrightList = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
  
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      const request = pool.request();
      ['emp_id', 'unit_id', 'copyright_patent_type']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
      const result = await request.execute('[D_Web].[getPatentCopyRightList]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    } 
  };
  */

/* using this */
  exports.getAllPatentCopyrightList = async (req, res) => {
   // const copyright_patent_type = req.params.id;
      try {
        const pool = await connectDatabase();
        const request = pool.request();
      //  request.input('copyright_patent_type', sql.Char, copyright_patent_type);
        const result = await request.execute('getCoyrightPatentList');
        const copyrightPatent = result.recordsets[0]
          res.status(200).json(copyrightPatent);
      } catch (error) {
          console.error('Error:', error.message);
          res.status(500).send('Internal Server Error');
      }
    };  

    exports.getTechnology = async (req, res) => {
      try {
        const pool = await connectDatabase();
        const request = pool.request();
        const result = await request.execute('[D_Web].[getTechnologyDeveloped]');
        const copyrightPatent = result.recordsets[0]
          res.status(200).json(copyrightPatent);
      } catch (error) {
          console.error('Error:', error.message);
          res.status(500).send('Internal Server Error');
      }
    };  


