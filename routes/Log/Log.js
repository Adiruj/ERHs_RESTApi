const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../connection');


////////////////////////////////// Get Item Log////////////////////////////////
Router.get("/itemlog",(req,res)=>{
    res.json([{
        'Item1' : 'All',
        'Item2' : 'Safety',
        'Item3' : 'Quality',
        'Item4' : 'Efficiency',
        'Item5' : '3C'
    }])
})
module.exports = Router;


////////////////////////////////// Search Log ////////////////////////////////
Router.get("/search/:ID_Name/:Type/:Item/:Year/:Month",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var Type = req.params.Type;
    var Item = req.params.Item;
    var Year = req.params.Year;
    var Month = req.params.Month;

    if(Item !== 'All'){
        if(Month == 'All'){
        var sql = "SELECT IDLog,Item,Time,Date,Situation,Recorder,StatusLog,StatusApprove,Name FROM log INNER JOIN login where log.ID_Name = ? and log.Year = ? and log.Type = ? and log.Item = ? and login.ID_Name = log.Approve";
        mysqlConnection.query(sql,[ID_Name,Year,Type,Item], (err,rows,fields)=>{
            if(!err){
                res.json(rows)
            }else{
                console.log(err);
            }
        })
        }else {
        var sql = "SELECT IDLog,Item,Time,Date,Situation,Recorder,StatusLog,StatusApprove,Name FROM log INNER JOIN login where log.ID_Name = ? and log.Month = ? and log.Year = ? and log.Type = ? and log.Item = ? and login.ID_Name = log.Approve ";
        mysqlConnection.query(sql,[ID_Name,Month,Year,Type,Item], (err,rows,fields)=>{
            if(!err){
                res.json(rows)
            }else{
                console.log(err);
            }
        })
        }
      }

      if(Item == 'All'){
        if(Month == 'All'){
        var sql = "SELECT IDLog,Item,Time,Date,Situation,Recorder,StatusLog,StatusApprove,Name FROM log INNER JOIN login where log.ID_Name = ? and log.Year = ? and log.Type = ? and login.ID_Name = log.Approve";
        mysqlConnection.query(sql,[ID_Name,Year,Type], (err,rows,fields)=>{
            if(!err){
                res.json(rows)
            }else{
                console.log(err);
            }
        })
        }else {
        var sql = "SELECT IDLog,Item,Time,Date,Situation,Recorder,StatusLog,StatusApprove,Name FROM log INNER JOIN login where log.ID_Name = ? and log.Month = ? and log.Year = ? and log.Type = ? and login.ID_Name = log.Approve ";
        mysqlConnection.query(sql,[ID_Name,Month,Year,Type], (err,rows,fields)=>{
            if(!err){
                res.json(rows)
            }else{
                console.log(err);
            }
        })
        }
      }


})
module.exports = Router;


////////////////////////////////// Get User ////////////////////////////////
Router.get("/:ID_Name/:ID_Log",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var IDLog = req.params.ID_Log;
    var sql = "SELECT IDLog,Item,Time,Date,Situation,Recorder,StatusLog,StatusApprove,Name,ID_Employee,log.Photo,Approve,Task,Action,Result FROM log INNER JOIN login where login.ID_Name = ? and log.IDLog = ?  ";
    mysqlConnection.query(sql,[ID_Name,IDLog], (err,rows,fields)=>{
        if(!err){
            var IDLog = rows[0].IDLog;
            var Item = rows[0].Item;
            var Time = rows[0].Time;
            var Date = rows[0].Date;
            var Situation = rows[0].Situation;
            var Recorder = rows[0].Recorder;
            var StatusLog = rows[0].StatusLog;
            var StatusApprove = rows[0].StatusApprove;
            var ID_Employee = rows[0].ID_Employee;
            var Photo = rows[0].Photo;
            var Approve = rows[0].Approve;
            var Task = rows[0].Task;
            var Action = rows[0].Action;
            var Result = rows[0].Result;

            var sql2 = "SELECT Name,ID_Company FROM login where ID_Name = ? ";
            mysqlConnection.query(sql2,[Approve], (err,rowsapprove,fields)=>{
                var NameApprove = rowsapprove[0].Name;
                var ID_Company = rowsapprove[0].ID_Company;

            var sql3 = "SELECT * FROM login where ID_Company = ? and Employee_ID = ?";
            mysqlConnection.query(sql3,[ID_Company,ID_Employee], (err,rowsname,fields)=>{
                var Namerecode = rowsname[0].Name;
                var image = rowsname[0].image;
                var Position = rowsname[0].Position;
                res.json([{
                    'IDLog' : IDLog,
                    'ID_Employee' : ID_Employee,
                    'Name' : Namerecode,
                    'Position' : Position,
                    'image' : image,
                    'Item' : Item,
                    'Situation' : Situation,
                    'Task' : Task,
                    'Action' : Action,
                    'Result' : Result,
                    'Recorder' : Recorder,
                    'StatusLog' : StatusLog,
                    'Time' : Time,
                    'Date' : Date,
                    'Photo' : Photo,
                    'Approve' : NameApprove,
                    'StatusApprove' : StatusApprove
                }])
            })
            })
            
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// Get Summary ////////////////////////////////
Router.get("/summary/:ID_Name/:Month/:Year",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var Month = req.params.Month;
    var Year = req.params.Year;
    if(Month == "All"){
        var sqlSafetyPositive = "SELECT * FROM log where ID_Name=? and Item='Safety' and Type='Positive' and StatusApprove='Accept' and Year=?";
        var sqlSafetyNegative = "SELECT * FROM log where ID_Name=? and Item='Safety' and Type='Negative' and StatusApprove='Accept' and Year=?";
        var sqlQualityPositive = "SELECT * FROM log where ID_Name=? and Item='Quality' and Type='Positive' and StatusApprove='Accept' and Year=?";
        var sqlQualityNegative = "SELECT * FROM log where ID_Name=? and Item='Quality' and Type='Negative' and StatusApprove='Accept' and Year=?";
        var sqlEfficiencyPositive = "SELECT * FROM log where ID_Name=? and Item='Efficiency' and Type='Positive' and StatusApprove='Accept' and Year=?";
        var sqlEfficiencyNegative = "SELECT * FROM log where ID_Name=? and Item='Efficiency' and Type='Negative' and StatusApprove='Accept' and Year=?";
        var sql3CPositive = "SELECT * FROM log where ID_Name=? and Item='3C' and Type='Positive' and StatusApprove='Accept' and Year=?";
        var sql3CNegative = "SELECT * FROM log where ID_Name=? and Item='3C' and Type='Negative' and StatusApprove='Accept' and Year=?";
    }else{
        var sqlSafetyPositive = "SELECT * FROM log where ID_Name=? and Item='Safety' and Type='Positive' and StatusApprove='Accept' and Year=? and Month=?";
        var sqlSafetyNegative = "SELECT * FROM log where ID_Name=? and Item='Safety' and Type='Negative' and StatusApprove='Accept' and Year=? and Month=?";
        var sqlQualityPositive = "SELECT * FROM log where ID_Name=? and Item='Quality' and Type='Positive' and StatusApprove='Accept' and Year=? and Month=?";
        var sqlQualityNegative = "SELECT * FROM log where ID_Name=? and Item='Quality' and Type='Negative' and StatusApprove='Accept' and Year=? and Month=?";
        var sqlEfficiencyPositive = "SELECT * FROM log where ID_Name=? and Item='Efficiency' and Type='Positive' and StatusApprove='Accept' and Year=? and Month=?";
        var sqlEfficiencyNegative = "SELECT * FROM log where ID_Name=? and Item='Efficiency' and Type='Negative' and StatusApprove='Accept' and Year=? and Month=?";
        var sql3CPositive = "SELECT * FROM log where ID_Name=? and Item='3C' and Type='Positive' and StatusApprove='Accept' and Year=? and Month=?";
        var sql3CNegative = "SELECT * FROM log where ID_Name=? and Item='3C' and Type='Negative' and StatusApprove='Accept' and Year=? and Month=?";
    }
    mysqlConnection.query(sqlSafetyPositive,[ID_Name,Year,Month], (err,rows,fields)=>{
        if(!err){
            var Safetypositive = rows.length;
            mysqlConnection.query(sqlSafetyNegative,[ID_Name,Year,Month], (err,rows2,fields)=>{
            var Safetynegative = rows2.length;
            mysqlConnection.query(sqlQualityPositive,[ID_Name,Year,Month], (err,rows3,fields)=>{
            var Qualitypositive = rows3.length; 
            mysqlConnection.query(sqlQualityNegative,[ID_Name,Year,Month], (err,rows4,fields)=>{
            var Qualitynegative = rows4.length; 
            mysqlConnection.query(sqlEfficiencyPositive,[ID_Name,Year,Month], (err,rows5,fields)=>{
            var Efficiencypositive = rows5.length; 
            mysqlConnection.query(sqlEfficiencyNegative,[ID_Name,Year,Month], (err,rows6,fields)=>{
            var Efficiencynegative = rows6.length; 
            mysqlConnection.query(sql3CPositive,[ID_Name,Year,Month], (err,rows7,fields)=>{
            var CCCpositive = rows7.length; 
            mysqlConnection.query(sql3CNegative,[ID_Name,Year,Month], (err,rows8,fields)=>{
            var CCCnegative = rows8.length;   

            //Cal Total Data
            var Totalsafety = Safetypositive - Safetynegative;
            var Totalquality = Qualitypositive - Qualitynegative;
            var Totalefficiency = Efficiencypositive - Efficiencynegative;
            var Totalccc = CCCpositive - CCCnegative;
            
            res.json([{
                'SafetyPositive' : Safetypositive,
                'SafetyNegative' : Safetynegative,
                'SafetySummary' : Totalsafety,
                'QualityPositive' : Qualitypositive,
                'QualityNegative' : Qualitynegative,
                'QualitySummary' : Totalquality,
                'EfficiencyPositive' : Efficiencypositive,
                'EfficiencyNegative' : Efficiencynegative,
                'EfficiencySummary' : Totalefficiency,
                '3CPositive' : CCCpositive,
                '3CNegative' : CCCnegative,
                '3CSummary' : Totalccc,
             }])

            })
            })
            })
            })
            })
            })
            })
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

