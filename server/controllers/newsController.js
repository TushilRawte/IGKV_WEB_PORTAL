const connectDatabase = require('../mssql'); // Assuming 'db.js' is in the same directory
const sql = require('mssql'); // Import the 'mssql' library
const domainurl = require('../config').domainName;


exports.getNewsCategory = async (req, res) => {
  try {
    const splitArray = req.params.id.split(',').map(value => value.trim());
    const pool = await connectDatabase();
    const params = splitArray.map(value => value === '' ? null : parseInt(value));
    const request = pool.request();
    ['News_Category_ID','office_id','language_id']
      .forEach((param, index) => request.input(param, sql.Int, params[index]));

    const result = await request.execute('[D_Web].[getNewsCategory]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

exports.getTopNewsTillDate = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
      const params = splitArray.map(value => value === '' ? null : parseInt(value));
      const request = pool.request();
      ['News_Category_ID','News_sub_Category_ID','unit_id','PageNumber','RowsPerPage']
        .forEach((param, index) => request.input(param, sql.Int, params[index]));
  
      const result = await request.execute('[D_Web].[getTopNewsTillDate]');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
};

exports.get_newsList = async (req, res) => {
    try {
      const splitArray = req.params.id.split(',').map(value => value.trim());
      const pool = await connectDatabase();
      const params = splitArray.map(value => {
        if (value === '') return null;
        return isNaN(value) ? value : parseInt(value); // Check if value is a string or number
      });

      const request = pool.request();
          const paramDefinitions = [
            { name: 'News_Category_ID', type: sql.Int },
            { name: 'news_parent_category_id', type: sql.Int },
            { name: 'unit_ID', type: sql.Int },
            { name: 'Start_Date', type: sql.Int },
            { name: 'End_Date', type: sql.Int },
            { name: 'news_id', type: sql.Int },
            { name: 'Unit_Type_Id', type: sql.Int },
            { name: 'year', type: sql.Int },
            { name: 'month', type: sql.Int },
            { name: 'Main_Title', type: sql.NVarChar },
            { name: 'StartRowFrom', type: sql.Int },
            { name: 'TotalRow', type: sql.Int },
          ];

          paramDefinitions.forEach((paramDef, index) => {
            const value = params[index]; // Get the corresponding value from params
            if (value !== undefined) {
              request.input(paramDef.name, paramDef.type, value);
            }
          });
      const result = await request.execute('[D_Web].[get_newsList_node]');
      const attachmentResults = []; 
      const p_attachmentResults = []; 

      for (const data of result.recordset) {
        const request2 = pool.request();
        request2.input('news_id', sql.Int, data.News_Notification_Main_Id);
        request2.input('domainName', sql.NVarChar, domainurl);
        const result2 = await request2.execute('[D_Web].[get_newsAttachment]');
        attachmentResults.push(result2.recordsets); // Store recordset of result2 in the array
      }
      const year_month = result.recordsets[1];
      const year = result.recordsets[2];
      const totalNews = result.recordsets[3];

      // Merge `year_month` and `year`
      const mergedYearData = year.map(yearItem => {
      const months = year_month.filter(monthItem => monthItem.newsYear === yearItem.newsYear);
      return {
        ...yearItem,
        months, // Add the months for the current year
      };
    });

      // Merge mainResult with attachmentResults based on array index
      const mergedData = result.recordset.map((item, index) => ({
        ...item,
        attachment: attachmentResults[index],
        p_attachment:p_attachmentResults[index]
      }));
      res.status(200).json({newsData: mergedData,yearData: mergedYearData,totalNews:totalNews[0].totalNews} ); // Send merged data as JSON response
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
};



exports.get_previous_attachemt = async (req, res) => {
  const news_id = req.params.id;
  try {
    const pool = await connectDatabase();

    const request = pool.request();
    request.input('news_id', sql.Int, news_id);
    request.input('domainName', sql.NVarChar, domainurl);
    const result = await request.execute('[D_Web].[get_newsAttachment_previous_node]');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};
  


exports.getAcademicConsilNews = async (req, res) => {
  const isHeadingYN = req.params.id;
  try {
    const pool = await connectDatabase();
    const request = pool.request();
    request.input('isHeadingYN', sql.Char, isHeadingYN);
    const result = await request.execute('[Portal].[GetLinkBaseRulesRagulation_RulesAndRegulation]');
    
    console.log('Result:', result); // Log the full result for debugging
    res.status(200).json(result.recordset || []);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};
