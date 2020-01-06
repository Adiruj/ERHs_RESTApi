const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connection');

////////////////////////////////// Get Summary////////////////////////////////
Router.get("/:ID_Name",(req,res)=>{
    var ID_Name = req.params.ID_Name;

    var sql = "SELECT ID_squash,Squash,Dates,StartTime,EndTime,Item,Topic,StatusA from schedule LEFT JOIN squash_program ON schedule.ID_Squashs = squash_program.ID_squash Where schedule.ID_Name=? and schedule.Status = 'Accept'";
    mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
            }
        })
})
module.exports = Router;