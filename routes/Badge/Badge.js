const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../connection');

////////////////////////////////// Get User ////////////////////////////////
Router.get("/:ID_Name",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var sql1 = "SELECT * FROM log where  ID_Name = ? and Type = 'Positive' and StatusLog = 'Request'";
    var sql2 = "SELECT * FROM log where  ID_Name = ? and Type = 'Negative' and StatusLog = 'Request'";
    var sql3 = "SELECT * FROM log where  Approve = ? and StatusApprove = 'Request'";
    var sql4 = "SELECT * FROM schedule where  ID_Name = ? and Status = 'Request'";

    mysqlConnection.query(sql1,[ID_Name], (err,rows,fields)=>{
        if(!err){
            var cntpositive = rows.length;
            mysqlConnection.query(sql2,[ID_Name], (err,rows2,fields)=>{
                var cntnegative = rows2.length;
                mysqlConnection.query(sql3,[ID_Name], (err,rows3,fields)=>{
                    var cntrequest = rows3.length;
                    mysqlConnection.query(sql4,[ID_Name], (err,rows4,fields)=>{
                        var cntRequestSchedule = rows4.length;
                                /**  Cal Badge */
                                var CountPositive = cntpositive;
                                var CountNegative = cntnegative;
                                var CountRequest = cntrequest;
                                var CountSumLog = parseFloat(cntpositive) + parseFloat(cntnegative) + parseFloat(cntrequest);
                                var CountRequestSchedule = cntRequestSchedule;
                                var CountSumOverAll = parseFloat(cntpositive) + parseFloat(cntnegative) + parseFloat(cntrequest) + parseFloat(cntRequestSchedule);        
                                
                                res.json([{
                                    'CountPositive' : CountPositive,
                                    'CountNegative' : CountNegative,
                                    'CountRequest' : CountRequest,
                                    'CountSumLog' : CountSumLog,
                                    'CountRequestSchedule' : CountRequestSchedule,
                                    'CountSumOverAll' : CountSumOverAll
                                }])
                    })
                })
            })
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;