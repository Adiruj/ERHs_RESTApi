var express = require('express');
var http = require('http');
const bodyParser = require('body-parser');
const mysqlConnection = require('./connection');
var userLoginCheck = require('./middleware/userLoginCheck');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
//var multer = require('multer');
//var uploads = multer();
var app = express();
// for parsing application/json
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
//app.use(uploads.array()); 
app.use(express.static('public'));

const Upload = require('./routes/Upload/Upload');
app.use('/node/express/api/log/postlogimg/', Upload); //DeleteExperience

//////////////////////////Import Profile//////////////////////////////////////
const Getbadge = require('./routes/Badge/Badge');
/////////////////////////////////////////////////////////////////////////////

//////////////////////////Import Profile//////////////////////////////////////
const Getprofile = require('./routes/Profile/Profile/Profile');
const Postprofile = require('./routes/Profile/Profile/PostProfile');
const Putprofile = require('./routes/Profile/Profile/UpdateProfile');
const Deleteprofile = require('./routes/Profile/Profile/DeleteProfile');

const GetExperience = require('./routes/Profile/Experience/Experience');
const PostExperience = require('./routes/Profile/Experience/PostExperience');
const PutExperience = require('./routes/Profile/Experience/PUTExperience');
const DeleteExperience = require('./routes/Profile/Experience/DELETEExperience');

const GetExpectation = require('./routes/Profile/Expectation/Expectation');
/////////////////////////////////////////////////////////////////////////////


//////////////////////////Import LOG/////////////////////////////////////////
const GetLog = require('./routes/Log/Log');
const GetApprove = require('./routes/Log/Approve');
const GetApprovelist = require('./routes/Log/getapprovelist');
const PostLog = require('./routes/Log/PostLog');
const PutLog = require('./routes/Log/PUTLog');
const DeleteLog = require('./routes/Log/DeleteLog');
/////////////////////////////////////////////////////////////////////////////


//////////////////////////Import Evaluation//////////////////////////////////
const Getperfomance = require('./routes/Evaluation/Perfomance/KPI');
const Getpotential = require('./routes/Evaluation/Potential/Potential');
const Getsummary = require('./routes/Evaluation/Summary/Summary');
/////////////////////////////////////////////////////////////////////////////

//////////////////////////Import Development//////////////////////////////////
const Getdevelopmentschedule = require('./routes/Development/Schedule/Schedule');
const Getdevelopmentsummary = require('./routes/Development/Summary/Summary');
const Getdevelopmentdetail = require('./routes/Development/Schedule/Schedule');
const Postsquash = require('./routes/Development/Squash/PostSquash');
const Putsquash = require('./routes/Development/Squash/PUTSquash');
/////////////////////////////////////////////////////////////////////////////




/**********Create Server**************/
//var app = express();
var server = http.createServer(app);

/************************************/


/// Create TOKEN For Login //////////////////////////////////////////////////
const SECRET = "MY_SECRET_KEY";
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods","DELETE, POST, GET, OPTIONS");
  next();
});

app.post('/node/express/api/userlogin', userLoginCheck, (req,res)=>{
  const username = req.body.username;
  const token = jwt.sign({username},SECRET);
  res.json({
    token: token
  });

});
/////////////////////////////////////////////////////////////////////////////


//*************************** Badge Data *******************************************//
app.use('/node/express/api/badge/getbadge/', Getbadge); //Get Profile
/////////////////////////////////////////////////////////////////////////////////////


//*************************** PROFILE *******************************************//
//*************************** GET DATA ******************************************/
app.use('/node/express/api/profile/getprofile/', Getprofile); //Get Profile
app.use('/node/express/api/profile/getexpectation/', GetExpectation); //Get Expectation
app.use('/node/express/api/profile/getexperience/', GetExperience); //Get Expectation
//*************************** POST DATA ******************************************/
app.use('/node/express/api/profile/postprofile/', Postprofile); //Post Profile
app.use('/node/express/api/profile/postexperience/', PostExperience); //Post Expectation
//app.use('/node/express/api/profile/postexpectation/', PostExpectation); //Post Expectation
//*************************** UPDATE DATA ******************************************/
app.use('/node/express/api/profile/putprofile/', Putprofile); //Update Profile
app.use('/node/express/api/profile/putexperience/', PutExperience); //Update Profile
//*************************** DELETE DATA ******************************************/
app.use('/node/express/api/profile/deleteprofile/', Deleteprofile); //Deleteprofile
app.use('/node/express/api/profile/deleteexperience/', DeleteExperience); //DeleteExperience
////////////////////////////////////////////////////////////////////////////////


//*************************** LOG DATA *******************************************//
//*************************** GET DATA ******************************************/
app.use('/node/express/api/log/getlog/', GetLog); //Get Log
app.use('/node/express/api/log/getapprove/', GetApprove); //GetApprove
app.use('/node/express/api/log/getapprovelist/', GetApprovelist); //GetApprovelist
//*************************** POST DATA ******************************************/
app.use('/node/express/api/log/postlog/', PostLog); //POST Profile
//*************************** PUT DATA ******************************************/
app.use('/node/express/api/log/putlog/', PutLog); //PutLog
//*************************** DELETE DATA ******************************************/
app.use('/node/express/api/log/deletelog/', DeleteLog); //PutLog
////////////////////////////////////////////////////////////////////////////////



//*************************** Evauation DATA ************************************//
//*************************** GET DATA ******************************************/
app.use('/node/express/api/evaluation/getperformance/', Getperfomance); //Getperfomance
app.use('/node/express/api/evaluation/getpotential/', Getpotential); //Getpotential
app.use('/node/express/api/evaluation/getsummary/', Getsummary); //Getsummary
//*************************** POST DATA ******************************************/

////////////////////////////////////////////////////////////////////////////////


//*************************** Development DATA ************************************//
//*************************** GET DATA ******************************************/
app.use('/node/express/api/development/getshcedule/', Getdevelopmentschedule); //getshcedule
app.use('/node/express/api/development/getsummary/', Getdevelopmentsummary); //getshcedule
app.use('/node/express/api/development/getdetail/', Getdevelopmentdetail); //getshcedule
//*************************** POST DATA ******************************************/
app.use('/node/express/api/development/postsquash/', Postsquash); //getshcedule
//*************************** PUT DATA ******************************************/
app.use('/node/express/api/development/putsquash/', Putsquash); //Putsquash
////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// OKRs Data RESTApi ////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
const { corporate, corporate_detail } = require('./util/db.config')

app.get('/demoApi/authorHasManyBooks/:ID_Company/:Dept/:Section', (req, res) => {
  let query;
  var ID_Company = req.params.ID_Company;
  var Dept = req.params.Dept;
  var Section = req.params.Section;

  query = corporate.findAll({
  where: { ID_Company: ID_Company,
           Dept: Dept,
           Section: Section},
  include: [{ model: corporate_detail }]
  })
  return query.then(corporate => res.json([{corporate}]))
})

//////////////////////////Import Coporate//////////////////////////////////////
const Gethome = require('./routes/OKRs/home/home');
const Getokrcorporate = require('./routes/OKRs/coporate/Getokrcorporate');
const Getkrcorporate = require('./routes/OKRs/coporate/Getkrcorporate');
const Getokrteam = require('./routes/OKRs/coporate/Getokrteam');
const Getkrteam = require('./routes/OKRs/coporate/Getkrteam');
const Getteam = require('./routes/OKRs/team/Getteam');
const Getindividual = require('./routes/OKRs/personal/Getpersonal');
/////////////////////////////////////////////////////////////////////////////


//*************************** HOME DATA ************************************//
//*************************** GET DATA ******************************************/
app.use('/node/express/api/okrs/', Gethome); 
////////////////////////////////////////////////////////////////////////////////

//*************************** Corporate DATA ************************************//
//*************************** GET DATA ******************************************/
app.use('/node/express/api/okrs/corporate/okrcorporate', Getokrcorporate); 
app.use('/node/express/api/okrs/corporate/krcorporate', Getkrcorporate); 
app.use('/node/express/api/okrs/corporate/okrteam', Getokrteam); 
app.use('/node/express/api/okrs/corporate/krteam', Getkrteam); 
////////////////////////////////////////////////////////////////////////////////

//*************************** Team DATA ************************************//
//*************************** GET DATA ******************************************/
app.use('/node/express/api/okrs/team/', Getteam); 
////////////////////////////////////////////////////////////////////////////////

//*************************** Individual DATA ************************************//
//*************************** GET DATA ******************************************/
app.use('/node/express/api/okrs/individual/', Getindividual); 
////////////////////////////////////////////////////////////////////////////////





server.listen(process.env.PORT || 3000);