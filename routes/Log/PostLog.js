const express = require('express');
const Router = express.Router();
var multer  = require('multer')
var upload = multer()
const mysqlConnection = require('../../connection');


var storage = multer.diskStorage({
    destination: function(req, file, cd){
        cd(null, './routes/Log/imagelog')
    },
    filename: function (req, file, cd){
        cd(null, Date.now() + '.jpg')
    }
});

var upload = multer({storage: storage});


////////////////////////////////// Post Positive ////////////////////////////////
Router.post("/",upload.single('image'),(req,res)=>{
    var post  = {
        ID_Name:req.body.ID_Name,
        ID_Company:req.body.ID_Company,
        ID_Employee:req.body.ID_Employee,
        Type:req.body.Type,
        Item:req.body.Item,
        Date:req.body.Date,
        Time:req.body.Time,
        Shift:req.body.Shift,
        Situation:req.body.Situation,
        Task:req.body.Task,
        Action:req.body.Action,
        Result:req.body.Result,
        Recorder:req.body.Recorder,
        StatusLog:req.body.StatusLog,
        Approve:req.body.Approve,
        StatusApprove:req.body.StatusApprove,
        
    }
    var dateexplode = post.Date.split("/");
    var Dates = dateexplode[0];
    var Month = dateexplode[1];
    var Year = dateexplode[2];
    
    var sql = "SELECT * from login where Employee_ID = ? and ID_Company = ?";
    mysqlConnection.query(sql,[post.ID_Employee,post.ID_Company], (err,rows,fields)=>{
        if(!err){
            var ID_Namelog = rows[0].ID_Name;
            var sql = "SELECT * from login where ID_Name = ? and ID_Company = ?";
            mysqlConnection.query(sql,[post.Approve,post.ID_Company], (err,rows,fields)=>{
                if(!err){
                    var ID_Namelog1 = rows[0].ID_Name;
                    var path = "imagelog/"+req.file.filename
                    var actualpate = "http://18.139.222.192/node/express/routes/Log/"+path
                    var sql = "INSERT INTO log(ID_Name,ID_Company,ID_Employee,Type,Item,Date,Dates,Month,Year,Time,Shift,Situation,Task,Action,Result,Recorder,StatusLog,Approve,StatusApprove,Photo) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ";
                    mysqlConnection.query(sql,[post.ID_Name,post.ID_Company,post.ID_Employee,post.Type,post.Item,post.Date,Dates,Month,Year,post.Time,post.Shift,post.Situation,post.Task,post.Action,post.Result,post.Recorder,post.StatusLog,ID_Namelog1,post.StatusApprove,actualpate], (err,rows,fields)=>{
                        if(!err){
                            res.json(rows)
                        }else{
                            console.log(err);
                        }
                    })
                }else{
                    console.log(err);
                }
            })
        }else{
            console.log(err);
        }
    })

})
module.exports = Router;

