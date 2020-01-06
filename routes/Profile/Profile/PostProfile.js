const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connection');

////////////////////////////////// Get Education ////////////////////////////////
Router.post("/education",(req,res)=>{
    var post  = {
		ID_Name:req.body.ID_Name,
        Degree:req.body.Degree,
        Area:req.body.Area,
        Location:req.body.Location
    }
    var sql = "INSERT INTO education(ID_Name,Degree,Area,Location) value(?,?,?,?) ";
    mysqlConnection.query(sql,[post.ID_Name,post.Degree,post.Area,post.Location], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// Get Skill ///////////////////////////////////
Router.post("/skill",(req,res)=>{
    var post  = {
		ID_Name:req.body.ID_Name,
        Skill:req.body.Skill
    }
    var sql = "INSERT INTO skill(ID_Name,Skill) value(?,?)";
    mysqlConnection.query(sql,[post.ID_Name,post.Skill], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// Get Personal ///////////////////////////////////
Router.post("/personal",(req,res)=>{
    var post  = {
		ID_Name:req.body.ID_Name,
        Strength:req.body.Strength
    }
    ////// GET Color/////////
    var sql1 = "SELECT * from strength where Strength = ?";
    mysqlConnection.query(sql1,[post.Strength], (err,rowscolor,fields)=>{
        if(!err){
                data = rowscolor[0];
                let Colors = data.Color;
                    ////// POST DATA TO DB/////////
                    var sql = "INSERT INTO personal_strength(ID_Name,Color,Personal) value(?,?,?) ";
                    mysqlConnection.query(sql,[post.ID_Name,Colors,post.Strength], (err,rows,fields)=>{
                        if(!err){
                            res.json(rows)
                        }else{
                            console.log(err);
                        }
                    })
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;