const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../connection');

////////////////////////////////// PUT StatusLOG ////////////////////////////////
Router.delete("/",(req,res)=>{
    var IDLog = req.params.IDLog;
    var sql = "DELETE FROM log where IDLog = ?";
    mysqlConnection.query(sql,[IDLog], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

