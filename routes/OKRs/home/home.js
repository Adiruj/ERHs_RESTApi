const express = require('express');
const Router = express.Router();
var mergeJSON = require("merge-json");
const db = require('../../../util/db.config');
// define variable
const sequelize = db.sequelize;
const mysqlConnection = require('../../../connectionokrs');

const { corporate, corporate_detail ,corporate_team, user , personal , team} = require('../../../util/db.config')

// Get User Data
Router.get('/home/user/:ID_Name', async (req, res, next) => {
    var ID_Name = req.params.ID_Name;
    var sql = "SELECT Name,Dept,Section,Company FROM users Where ID_Name = ?";
    mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
    });
    module.exports = Router;

    // Get OKR
Router.get('/home/okr/:ID_Name', async (req, res, next) => {
    var ID_Name = req.params.ID_Name;
    var SELECT = 'select corporates.Topic';
    var FROM = ' from corporates inner join users';
    var WHERE =' where users.ID_Name = ?'

    var sql = SELECT+FROM+WHERE;
    mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
});
module.exports = Router;


// Get Team OKR
Router.get('/home/team/:ID_Name', async (req, res, next) => {
        var ID_Name = req.params.ID_Name;
        var sql = "SELECT DISTINCT teams.KR_Team FROM personals inner join teams on teams.Team_Name = personals.Team_Name Where personals.ID_Name = ?";
        mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
            if(!err){
                res.json(rows)
            }else{
                console.log(err);
            }
        })
    });
module.exports = Router;


// Get Individual
Router.get('/home/individual/:ID_Name', async (req, res, next) => {
    var ID_Name = req.params.ID_Name;
    var sql = "SELECT DISTINCT personals.KR_Personal,teams.KR_Team FROM personals inner join teams on teams.Team_Name = personals.Team_Name Where personals.ID_Name = ? and personals.ID_Team = teams.ID_Team";
    mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
    });
    module.exports = Router;