const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connection');

////////////////////////////////// Get experience ////////////////////////////////
Router.get("/experience/:ID_Name",(req,res)=>{
    var sql = "SELECT * FROM experience where ID_Name=? ORDER BY Year DESC";
    mysqlConnection.query(sql,[req.params.ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;