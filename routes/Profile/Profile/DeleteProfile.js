const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connection');

////////////////////////////////// Get Education ////////////////////////////////
Router.get("/education/:ID_Education",(req,res)=>{
    var ID_Education = req.params.ID_Education
    var sql = "DELETE FROM education WHERE ID_Education = ?";
    mysqlConnection.query(sql,[ID_Education], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// Get Skill ///////////////////////////////////
Router.get("/skill/:ID_Skill",(req,res)=>{
    var ID_Skill = req.params.ID_Skill
    var sql = "DELETE FROM skill WHERE ID_Skill = ? ";
    mysqlConnection.query(sql,[ID_Skill], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// Get Personal ///////////////////////////////////
Router.get("/personal/:ID_Personal",(req,res)=>{
    var ID_Personal = req.params.ID_Personal
    ////// GET Color/////////
    var sql1 = "DELETE FROM personal_strength where ID_Personal = ?";
    mysqlConnection.query(sql1,[ID_Personal], (err,rowscolor,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;