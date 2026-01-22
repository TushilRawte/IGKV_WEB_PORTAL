const express = require("express"); //including module/package
const helmet = require('helmet');
const app = express(); // creating object
var morgan = require("morgan");
const cors = require("cors");
const fs = require('fs');
const path = require('path')

app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    frameAncestors: ["'self'"], // This restricts who can embed your demo in an iframe
    scriptSrc: ["'self'"],
    scriptSrcAttr: ["'self'", "'unsafe-hashes'"], // Allows inline event handlers with a hash
    styleSrc: ["'self'", "'unsafe-inline'"],
    fontSrc: ["'self'"],  // Allow local fonts
    imgSrc: ["'self'"],
  },
}));

app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}));

app.use(cors());
app.use(express.json()); //to use data as JSON format. Json() is a built-in middleware function in Express. This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser. This method returns the middleware that only parses JSON and only looks at the requests where the content-type header matches the type option.(To enable parsing of JSON object in the body of request)
app.use(morgan("dev"));


// Custom error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send('An error occurred. Please try again later.');
});

// Remove X-Powered-By header
app.disable('x-powered-by');

let prefix = 'demo/api'


const ActivityList = require("./routes/activity");
const WhoisWhosPostList = require("./routes/whoiswho");
const OfficeDetails = require("./routes/office");
const KVK = require("./routes/kvk");
const officeEmployeeList = require("./routes/officeEmployee");
const degreeProgram = require("./routes/degreeProgram");
const faculty = require("./routes/faculty");
const college = require("./routes/college");
const department = require("./routes/department");
const viceChancellore = require("./routes/viceChancellor");
const OverviewUniversity = require("./routes/university");
const allStaffDetails = require("./routes/allStaffDetails");
const publication = require("./routes/publication");
const project = require("./routes/project");
const news = require("./routes/news");
const homeDashboard = require("./routes/homeDashboard");
const infrastructure = require("./routes/infrastructure");
const Farm = require("./routes/farm");
const patents_copyright = require("./routes/patents_copyright");
const VarietyReleased = require("./routes/varietyReleased");
const patentsCopyright = require("./routes/patents_copyright");


app.use('/demo/',express.static(path.join(__dirname, 'dist')));

app.use(`/${prefix}/degreeProgram`, degreeProgram);
app.use(`/${prefix}/faculty`, faculty);
app.use(`/${prefix}/college`, college);
app.use(`/${prefix}/department`, department);
app.use(`/${prefix}/WhoisWhosPostList`, WhoisWhosPostList);
app.use(`/${prefix}/viceChancellore`, viceChancellore);
app.use(`/${prefix}/officeEmployeeList`, officeEmployeeList);
app.use(`/${prefix}/OverviewUniversity`, OverviewUniversity);
app.use(`/${prefix}/allStaffDetails`, allStaffDetails);
app.use(`/${prefix}/publication`, publication);
app.use(`/${prefix}/project`, project);
app.use(`/${prefix}/news`, news); 
app.use(`/${prefix}/homeDashboard`,homeDashboard);
app.use(`/${prefix}/ActivityList`,ActivityList)
app.use(`/${prefix}/officeInfrastrucutre`,infrastructure);
app.use(`/${prefix}/getFarm`, Farm); 
app.use(`/${prefix}/WhoisWhosPostList`, WhoisWhosPostList);
app.use(`/${prefix}/OfficeDetails`, OfficeDetails);
app.use(`/${prefix}/kvk`,KVK);
app.use(`/${prefix}/patents_copyright`,patents_copyright);
app.use(`/${prefix}/VarietyReleased`,VarietyReleased);
// app.use(`/${prefix}/patentsCopyright`,patentsCopyright);


// Set the static folder (e.g., 'public')



// Load knowledge base from JSON file
const knowledgeBase = JSON.parse(fs.readFileSync('chatbot.json'));
// Endpoint to handle chat requests
// app.post('/demo/chat', (req, res) => {
//   const userMessage = req.body.message.toLowerCase();
//   let botReply = "I'm sorry, I didn't understand that. Can you please rephrase?";

//   // Search for relevant answer in the knowledge base by matching keywords
//   for (let entry of knowledgeBase) {
//     for (let keyword of entry.keywords) {
//       if (userMessage.includes(keyword.toLowerCase())) {
//         botReply = entry.answer;
//         break;
//       }
//     }
//     if (botReply !== "I'm sorry, I didn't understand that. Can you please rephrase?") {
//       break;
//     }
//   }

//   res.json({ reply: botReply });
// });



const port = process.env.PORT || 3001;  
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});




// =========== Live sysytem ===========
// const hostname = '10.132.33.76'
// const port2 = '3001'

// app.listen(port2, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port2}`);
// });





//=========== Daulat sysytem ===========
// const hostname = '192.168.1.241'
// const port2 = '81'

// app.listen(port2, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port2}`);
// });


//========== Sandeep sir system ===========
// const hostname = '192.168.1.130'
// const port2 = '89'

// app.listen(port2, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port2}`);
// });


//  live DB ===================

// "db": {
//   "user": "igkvonline1",
//   "database": "IGKVRevaluation",
//   "server": "10.132.33.72/IGKVRevaluation",
//   "password": "igkvonline$2015"
// }


// local DB ==========================

// "db": {
//   "user": "sa",
//   "database": "D_2023_08_08",
//   "server": "192.168.1.15\\MSSQLSERVER1",
//   "password": "nic@123"
// }



//  test DB =================== 
 // "user": "sa",
  // "database": "IGKVRevaluation_2025_01_04",
  // "server": "192.168.1.126\\SSIS",
  // "password": "nic@123"