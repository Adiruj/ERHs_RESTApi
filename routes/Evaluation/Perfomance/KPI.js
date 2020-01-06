const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connection');

////////////////////////////////// Get KPI Dept////////////////////////////////
Router.get("/dept/:ID_Name/:Month/:Year",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var Month = req.params.Month;
    var Year = req.params.Year;

    var sql = "SELECT * FROM login Where ID_Name = ? ";
    mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
        if(!err){
            data = rows[0];
            let ID_Company = data.ID_Company;
            let Dept = data.Dept;
            var sqls = "SELECT Topic,Target,Result,Unit,Gap,ResultScore,Weight,Score1,Score2,Score3,Score4,Score5 from kpi_dept LEFT JOIN result_kpidept ON result_kpidept.ID_KPIDepts = kpi_dept.ID_KPIDept Where kpi_dept.ID_Company = ? and kpi_dept.Dept = ? and result_kpidept.Month = ? and result_kpidept.Year = ?";
            mysqlConnection.query(sqls,[ID_Company,Dept,Month,Year], (err,rowss,fields)=>{
                if(!err){
                    res.json(rowss)
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


////////////////////////////////// Get KPI Section////////////////////////////////
Router.get("/section/:ID_Name/:Month/:Year",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var Month = req.params.Month;
    var Year = req.params.Year;

    var sql = "SELECT * FROM login Where ID_Name = ? ";
    mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
    if(!err){
        data = rows[0];
        let ID_Company = data.ID_Company;
        let Dept = data.Dept;
        let Section = data.Section;
        var sqls = "SELECT Topic,Target,Result,Unit,Gap,ResultScore,Weight,Score1,Score2,Score3,Score4,Score5 from kpi_section LEFT JOIN result_kpisection ON result_kpisection.ID_KPISections = kpi_section.ID_KPISec Where kpi_section.ID_Company = ? and kpi_section.Dept = ? and kpi_section.section = ? and result_kpisection.Month = ? and result_kpisection.Year = ?";
        mysqlConnection.query(sqls,[ID_Company,Dept,Section,Month,Year], (err,rowss,fields)=>{
            if(!err){
                console.log(rowss);
                res.json(rowss)
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


////////////////////////////////// Get KPI Individual////////////////////////////////
Router.get("/individual/:ID_Name/:Month/:Year",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var Month = req.params.Month;
    var Year = req.params.Year;

    var sql = "SELECT * FROM login Where ID_Name = ? ";
    mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
    if(!err){
    data = rows[0];
    let ID_Company = data.ID_Company;
    let Dept = data.Dept;
    let Section = data.Section;
    var sqls = "SELECT Topic,Target,Result,Unit,Gap,ResultScore,Weight,Score1,Score2,Score3,Score4,Score5 from kpi LEFT JOIN result_kpi ON result_kpi.ID_KPIs = kpi.ID_KPI Where kpi.ID_Name = ? and result_kpi.Month = ? and result_kpi.Year = ?";
    mysqlConnection.query(sqls,[ID_Name,Month,Year], (err,rowss,fields)=>{
        if(!err){
            res.json(rowss)
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