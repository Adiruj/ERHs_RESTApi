const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connection');

////////////////////////////////// Get Core////////////////////////////////
Router.get("/core/:ID_Name/:Quator/:Year",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var Quator = req.params.Quator;
    var Year = req.params.Year;

    var sql = "SELECT ID_Core,Topic,Target,Result,Gap,Unit,Chart from result_core INNER JOIN core ON core.ID_Core = result_core.ID_Cores Where core.ID_Name=? and result_core.Quator=? and result_core.Year=?";
    mysqlConnection.query(sql,[ID_Name,Quator,Year], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
            }
        })
})
module.exports = Router;

////////////////////////////////// Get Managerial////////////////////////////////
Router.get("/managerial/:ID_Name/:Quator/:Year",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var Quator = req.params.Quator;
    var Year = req.params.Year;

    var sql = "SELECT ID_Managerial,Topic,Target,Result,Gap,Unit,Chart from managerial LEFT JOIN result_managerial ON result_managerial.ID_Managerials = managerial.ID_Managerial Where managerial.ID_Name=? and result_managerial.Quator=? and result_managerial.Year=?";
    mysqlConnection.query(sql,[ID_Name,Quator,Year], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
            }
        })
})
module.exports = Router;