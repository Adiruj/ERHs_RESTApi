const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connection');

////////////////////////////////// PUT experience ////////////////////////////////
Router.post("/experience",(req,res)=>{
    var post  = {
        ID_Name:req.body.ID_Name,
        ID_Exper:req.body.ID_Exper,
        Year:req.body.Year,
        Topic:req.body.Topic,
        Detail:req.body.Detail,
        Company:req.body.Company
    }
    var sql = "UPDATE experience SET Year = ? , Topic = ? , Detail = ? , Company =? WHERE ID_Exper = ?";
    mysqlConnection.query(sql,[post.Year,post.Topic,post.Detail,post.Company,post.ID_Exper], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;