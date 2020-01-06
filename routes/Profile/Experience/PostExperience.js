const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connection');

////////////////////////////////// Get experience ////////////////////////////////
Router.post("/experience",(req,res)=>{
    var post  = {
		ID_Name:req.body.ID_Name,
        Year:req.body.Year,
        Topic:req.body.Topic,
        Detail:req.body.Detail,
        Company:req.body.Company
    }
    var sql = "INSERT INTO experience(ID_Name,Year,Topic,Detail,Company) value(?,?,?,?,?) ";
    mysqlConnection.query(sql,[post.ID_Name,post.Year,post.Topic,post.Detail,post.Company], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;