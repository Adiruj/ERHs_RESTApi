const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connection');

////////////////////////////////// Get experience ////////////////////////////////
Router.delete("/experience",(req,res)=>{
    var post  = {
        ID_Exper:req.body.ID_Exper
    }
    var sql = "DELETE FROM experience WHERE ID_Exper = ?";
    mysqlConnection.query(sql,[post.ID_Exper], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;