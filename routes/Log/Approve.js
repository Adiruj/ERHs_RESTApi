const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../connection');

////////////////////////////////// Get request////////////////////////////////
Router.get("/request/:ID_Name",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var sql = "SELECT IDLog,Item,Type,Date,Time,Situation,Recorder,StatusLog,Name,StatusApprove from log INNER JOIN login Where log.Approve=? and login.Employee_ID = log.ID_Employee and log.StatusApprove = 'Request'";
    mysqlConnection.query(sql,[ID_Name,ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
            }
        })
})
module.exports = Router;

////////////////////////////////// Get accept////////////////////////////////
Router.get("/accept/:ID_Name",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var sql = "SELECT IDLog,Item,Type,Date,Time,Situation,Recorder,StatusLog,Name,StatusApprove from log INNER JOIN login Where log.Approve=? and login.Employee_ID = log.ID_Employee and log.StatusApprove = 'Accept'";
    mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
            }
        })
})
module.exports = Router;

////////////////////////////////// Get Reject////////////////////////////////
Router.get("/reject/:ID_Name",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var sql = "SELECT IDLog,Item,Type,Date,Time,Situation,Recorder,StatusLog,Name,StatusApprove from log INNER JOIN login Where log.Approve=? and login.Employee_ID = log.ID_Employee and log.StatusApprove = 'Reject'";
    mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
            }
        })
})
module.exports = Router;


////////////////////////////////// Serach accept////////////////////////////////
Router.get("/serach/accept/:ID_Name/:Item/:Year/:Month",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var Item = req.params.Item;
    var Year = req.params.Year;
    var Month = req.params.Month;
    if(Item !== 'All'){
        if(Month == 'All'){
        var sql = "SELECT IDLog,Item,Type,Date,Time,Situation,Recorder,StatusLog,Name,StatusApprove FROM log INNER JOIN login where log.Approve=? and login.Employee_ID = log.ID_Employee and log.StatusApprove = 'Accept' and log.Year = ? and log.Item = ?";
        mysqlConnection.query(sql,[ID_Name,Year,Item], (err,rows,fields)=>{
            if(!err){
                res.json(rows)
            }else{
                console.log(err);
            }
        })
        }else {
        var sql = "SELECT IDLog,Item,Type,Date,Time,Situation,Recorder,StatusLog,Name,StatusApprove FROM log INNER JOIN login where log.Approve=? and login.Employee_ID = log.ID_Employee and log.StatusApprove = 'Accept' and log.Month = ? and log.Year = ? and log.Item = ? ";
        mysqlConnection.query(sql,[ID_Name,Month,Year,Item], (err,rows,fields)=>{
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
        var sql = "SELECT IDLog,Item,Type,Date,Time,Situation,Recorder,StatusLog,Name,StatusApprove FROM log INNER JOIN login where log.Approve=? and login.Employee_ID = log.ID_Employee and log.StatusApprove = 'Accept' and log.Year = ?";
        mysqlConnection.query(sql,[ID_Name,Year], (err,rows,fields)=>{
            if(!err){
                res.json(rows)
            }else{
                console.log(err);
            }
        })
        }else {
        var sql = "SELECT IDLog,Item,Type,Date,Time,Situation,Recorder,StatusLog,Name,StatusApprove FROM log INNER JOIN login where log.Approve=? and login.Employee_ID = log.ID_Employee and log.StatusApprove = 'Accept' and log.Month = ? and log.Year = ?";
        mysqlConnection.query(sql,[ID_Name,Month,Year], (err,rows,fields)=>{
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


////////////////////////////////// Serach Reject////////////////////////////////
Router.get("/serach/reject/:ID_Name/:Item/:Year/:Month",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var Item = req.params.Item;
    var Year = req.params.Year;
    var Month = req.params.Month;
    if(Item !== 'All'){
        if(Month == 'All'){
        var sql = "SELECT IDLog,Item,Type,Date,Time,Situation,Recorder,StatusLog,Name,StatusApprove FROM log INNER JOIN login where log.Approve=? and login.Employee_ID = log.ID_Employee and log.StatusApprove = 'Reject' and log.Year = ? and log.Item = ?";
        mysqlConnection.query(sql,[ID_Name,Year,Item], (err,rows,fields)=>{
            if(!err){
                res.json(rows)
            }else{
                console.log(err);
            }
        })
        }else {
        var sql = "SELECT IDLog,Item,Type,Date,Time,Situation,Recorder,StatusLog,Name,StatusApprove FROM log INNER JOIN login where log.Approve=? and login.Employee_ID = log.ID_Employee and log.StatusApprove = 'Reject' and log.Month = ? and log.Year = ? and log.Item = ? ";
        mysqlConnection.query(sql,[ID_Name,Month,Year,Item], (err,rows,fields)=>{
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
        var sql = "SELECT IDLog,Item,Type,Date,Time,Situation,Recorder,StatusLog,Name,StatusApprove FROM log INNER JOIN login where log.Approve=? and login.Employee_ID = log.ID_Employee and log.StatusApprove = 'Reject' and log.Year = ?";
        mysqlConnection.query(sql,[ID_Name,Year], (err,rows,fields)=>{
            if(!err){
                res.json(rows)
            }else{
                console.log(err);
            }
        })
        }else {
        var sql = "SELECT IDLog,Item,Type,Date,Time,Situation,Recorder,StatusLog,Name,StatusApprove FROM log INNER JOIN login where log.Approve=? and login.Employee_ID = log.ID_Employee and log.StatusApprove = 'Reject' and log.Month = ? and log.Year = ?";
        mysqlConnection.query(sql,[ID_Name,Month,Year], (err,rows,fields)=>{
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


////////////////////////////////// Get Detail////////////////////////////////
Router.get("/detail/:ID_Log",(req,res)=>{
    var ID_Log = req.params.ID_Log;
    var sql = "SELECT * from log INNER JOIN login Where log.IDLog=? and login.ID_Name = log.Approve";
    mysqlConnection.query(sql,[ID_Log], (err,rows,fields)=>{
        if(!err){
            var IDLog = rows[0].IDLog;
            var Item = rows[0].Item;
            var Type = rows[0].Type;
            var Date = rows[0].Date;
            var Shift = rows[0].Shift;
            var Time = rows[0].Time;
            var Situation = rows[0].Situation;
            var Task = rows[0].Task;
            var Action = rows[0].Action;
            var Result = rows[0].Result;
            var Recorder = rows[0].Recorder;
            var StatusLog = rows[0].StatusLog;
            var Approvename = rows[0].Name;
            var StatusApprove = rows[0].StatusApprove;
            var ID_Employee = rows[0].ID_Employee;
            var ID_Company = rows[0].ID_Company;
            var Photo = rows[0].Photo;

            var sql = "SELECT * from login Where ID_Company=? and Employee_ID = ?";
            mysqlConnection.query(sql,[ID_Company,ID_Employee], (err,rows2,fields)=>{
                var namerecordy = rows2[0].Name;
                var positionrecordy = rows2[0].Position;
                res.json([{
                    'IDLog' : IDLog,
                    'Type' : Type,
                    'ID_Employee' : ID_Employee,
                    'Namerecordy' : namerecordy,
                    'Positionrecordy' : positionrecordy,
                    'Item' : Item,
                    'Date' : Date,
                    'Time' : Time,
                    'Shift' : Shift,
                    'Situation' : Situation,
                    'Task' : Task,
                    'Action' : Action,
                    'Result' : Result,
                    'Recorder' : Recorder,
                    'Approvename' : Approvename,
                    'StatusLog' : StatusLog,
                    'StatusApprove' : StatusApprove,
                    'Photo' : Photo
                }])
            })
            
        }else{
            console.log(err);
            }
        })
})
module.exports = Router;