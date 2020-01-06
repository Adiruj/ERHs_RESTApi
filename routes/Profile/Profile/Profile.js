const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connection');

////////////////////////////////// Get User ////////////////////////////////
Router.get("/user/:ID_Name",(req,res)=>{
    var sql = "SELECT * FROM login where ID_Name=?";
    mysqlConnection.query(sql,[req.params.ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// Get Education ////////////////////////////////
Router.get("/education/:ID_Name",(req,res)=>{
    var sql = "SELECT * FROM education where ID_Name=?";
    mysqlConnection.query(sql,[req.params.ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// Get Skill ///////////////////////////////////
Router.get("/skill/:ID_Name",(req,res)=>{
    var sql = "SELECT * FROM skill where ID_Name=?";
    mysqlConnection.query(sql,[req.params.ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// Get Personal ///////////////////////////////////
Router.get("/personal/:ID_Name",(req,res)=>{
    var sql = "SELECT * FROM personal_strength where ID_Name=?";
    mysqlConnection.query(sql,[req.params.ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;


////////////////////////////////// List Personal ///////////////////////////////////
Router.get("/listpersonal",(req,res)=>{
    var sql = "SELECT Color,Strength,Strength_eng FROM strength";
    mysqlConnection.query(sql, (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// List Personal ///////////////////////////////////
Router.get("/colorstrength/:ID_Strength",(req,res)=>{
    var ID_Strength = req.params.ID_Strength
    var sql = "SELECT Color,Strength_eng FROM strength Where ID_Strength = ?";
    mysqlConnection.query(sql,[ID_Strength], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// List Employee ///////////////////////////////////
Router.get("/employee/:ID_Name",(req,res)=>{
    var ID_Name = req.params.ID_Name
    var sql = "SELECT * FROM login Where ID_Name = ?";
    mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
        if(!err){
            var Dept = rows[0].Dept;
            var Section = rows[0].Section;
            var sql = "SELECT Employee_ID,Name,Position FROM login Where Dept = ? and Section = ?";
            mysqlConnection.query(sql,[Dept,Section], (err,rows,fields)=>{
                res.json(rows);
            })
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;