const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../connection');

////////////////////////////////// PUT StatusLOG ////////////////////////////////
Router.post("/statuslog",(req,res)=>{
    var IDLog = req.body.IDLog;
    var StatusLog = req.body.StatusLog;
    var sql = "UPDATE log SET StatusLog = ? where IDLog = ?";
    mysqlConnection.query(sql,[StatusLog,IDLog], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// PUT StatusApprove ////////////////////////////////
Router.post("/statusapprove",(req,res)=>{
    var IDLog = req.body.IDLog;
    var StatusApprove = req.body.StatusApprove;
    var sql = "UPDATE log SET StatusApprove = ? where IDLog = ?";
    mysqlConnection.query(sql,[StatusApprove,IDLog], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

