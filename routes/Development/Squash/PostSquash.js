const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connection');

////////////////////////////////// Post Squash ////////////////////////////////
Router.post("/",(req,res)=>{
    var post  = {
        ID_Name:req.body.ID_Name,
        Squash:req.body.Squash,
        Dates:req.body.Dates,
        StartTime:req.body.StartTime,
        EndTime:req.body.EndTime,
        Item:req.body.Item,
        Topic:req.body.Topic,
        EmployeeID1:req.body.EmployeeID1,
        EmployeeID2:req.body.EmployeeID2
    }
    var dateexplode = post.Dates.split("/");
    var Datess = dateexplode[0];
    var Month = dateexplode[1];
    var Year = dateexplode[2];

    var sql = "INSERT INTO squash_program(Squash, Dates,Datess,Month,Year,StartTime, EndTime, Item, Topic, StatusA) value(?,?,?,?,?,?,?,?,?,?) ";
    mysqlConnection.query(sql,[post.Squash,post.Dates,Datess,Month,Year,post.StartTime,post.EndTime,post.Item,post.Topic,"Wait"], (err,rows,fields)=>{
        if(!err){
            var id_squash = "SELECT ID_squash FROM squash_program order by ID_squash desc";
            mysqlConnection.query(id_squash, (err,rows,fields)=>{
                var ID_squashs = rows[0].ID_squash;

                var ID_Company = "SELECT * FROM login WHERE ID_Name = ?";
                mysqlConnection.query(ID_Company,[post.ID_Name], (err,rows,fields)=>{
                    var ID_Company = rows[0].ID_Company;

                    var emp1 = "SELECT * FROM login WHERE Employee_ID = ? and ID_Company = ?";
                    mysqlConnection.query(emp1,[post.EmployeeID1,ID_Company], (err,rows,fields)=>{
                        var Name1 = rows[0].ID_Name;

                        var emp2 = "SELECT * FROM login WHERE Employee_ID = ? and ID_Company = ?";
                            mysqlConnection.query(emp2,[post.EmployeeID2,ID_Company], (err,rows,fields)=>{
                            var Name2 = rows[0].ID_Name;

                            var insert1 = "INSERT INTO schedule(ID_Squashs,ID_Name, Status) VALUE(?,?,?)";
                            mysqlConnection.query(insert1,[ID_squashs,post.ID_Name,'Request'], (err,rows,fields)=>{
                                var insert2 = "INSERT INTO schedule(ID_Squashs,ID_Name, Status) VALUE(?,?,?)";
                                mysqlConnection.query(insert2,[ID_squashs,Name1,'Request'], (err,rows,fields)=>{
                                if (Name2 == '') {
                                    console.log('Name2 Null')
                                }else{
                                    var insert3 = "INSERT INTO schedule(ID_Squashs,ID_Name, Status) VALUE(?,?,?)";
                                    mysqlConnection.query(insert3,[ID_squashs,Name2,'Request'], (err,rows,fields)=>{
                                        res.json(rows);
                                    })
                                }
                            })
                            })
                    })

                    })
                })
            })
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;