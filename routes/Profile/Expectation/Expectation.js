const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connection');

////////////////////////////////// Get jd ////////////////////////////////
Router.get("/jd/:ID_Name",(req,res)=>{
    var sql = "SELECT * FROM  jd   WHERE ID_Name=?";
    mysqlConnection.query(sql,[req.params.ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// Get behavior ////////////////////////////////
Router.get("/behavior/:ID_Name",(req,res)=>{
    var sql = "SELECT * FROM  behavior  WHERE ID_Name=?";
    mysqlConnection.query(sql,[req.params.ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// Get kpi ///////////////////////////////////
Router.get("/kpi/:ID_Name",(req,res)=>{
    var sql = "SELECT Topic,Target,Result,Unit,Gap,ResultScore,Weight,Score1,Score2,Score3,Score4,Score5 from kpi INNER JOIN result_kpi ON result_kpi.ID_KPIs = kpi.ID_KPI  WHERE ID_Name=?";
    mysqlConnection.query(sql,[req.params.ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// Get core ///////////////////////////////////
Router.get("/core/:ID_Name",(req,res)=>{
    var sql = "SELECT Topic,Target FROM core  WHERE ID_Name=?";
    mysqlConnection.query(sql,[req.params.ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// Get managerial ///////////////////////////////////
Router.get("/managerial/:ID_Name",(req,res)=>{
    var sql = "SELECT Topic,Target FROM managerial WHERE ID_Name=?";
    mysqlConnection.query(sql,[req.params.ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;