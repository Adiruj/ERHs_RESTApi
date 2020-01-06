const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../connection');


////////////////////////////////// Search Log ////////////////////////////////
Router.get("/:ID_Name",(req,res)=>{
    var ID_Name = req.params.ID_Name;

    var sql = "SELECT * FROM login where ID_Name = ?";
    mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
        if(!err){
            var ID_Name = rows[0].ID_Name;
            var ID_Company = rows[0].ID_Company;
            var Employee_ID = rows[0].Employee_ID;
            var Dept = rows[0].Dept;
            var Section = rows[0].Section;
            var Position = rows[0].Position;
            var Level = rows[0].Level;

            
            if(Level == '1'){ /*Level Operat*/
                var strSQL = "SELECT Employee_ID,Name,Position FROM login Where Level = 2 and Dept = ? and Section = ?" ;
                mysqlConnection.query(strSQL,[Dept,Section], (err,rows,fields)=>{
                    res.json(rows)
                })
                        
            }
            
            if(Level == 2){ /*Level Foreman*/
                var strSQL = "SELECT Employee_ID,Name,Position FROM login Where Level = 3 and Dept = ? and Section = ?" ;
                mysqlConnection.query(strSQL,[Dept,Section], (err,rows,fields)=>{
                    res.json(rows)
                })
            }
            
            if(Level == 3){ /*Level Sup*/
                var strSQL = "SELECT Employee_ID,Name,Position FROM login Where Level = 4 and Dept = ? and Section = ?" ;
                mysqlConnection.query(strSQL,[Dept,Section], (err,rows,fields)=>{
                    res.json(rows)
                })
            }
            
            if(Level == 4){ /*Level Mgr*/
                var strSQL = "SELECT Employee_ID,Name,Position FROM login Where Level = 5 and Dept = ? and Section = ?" ;
                mysqlConnection.query(strSQL,[Dept,Section], (err,rows,fields)=>{
                    res.json(rows)
                })
            }
            
            if(Level == 5){ /*Level GM*/
            
            }

        }else{
            console.log(err);
        }
    })

})
module.exports = Router;

