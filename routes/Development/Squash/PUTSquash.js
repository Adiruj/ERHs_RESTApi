const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connection');

////////////////////////////////// PUT Status Squash ////////////////////////////////
Router.post("/statussquash",(req,res)=>{
    var ID_Schedules = req.body.ID_Schedules
    var Status = req.body.Status

    var sql="UPDATE schedule SET Status = ? WHERE ID_Schedules = ? ";
    mysqlConnection.query(sql,[Status,ID_Schedules], (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

module.exports  = Router;


////////////////////////////////// PUT Squash Discus ////////////////////////////////
Router.post("/squashdiscussion",(req,res)=>{
    var ID_squash = req.body.ID_squash;
    var Discussion = req.body.Discussion;
    var Conclusion = req.body.Conclusion;
    var Feedback = req.body.Feedback;
    var StatusA = req.body.StatusA;

    var sql="UPDATE squash_program SET Discussion = ?,Conclusion=?,Feedback=?,StatusA=? WHERE ID_squash = ? ";
    mysqlConnection.query(sql,[Discussion,Conclusion,Feedback,StatusA,ID_squash], (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

module.exports  = Router;