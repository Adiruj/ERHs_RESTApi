const express = require('express');
const Router = express.Router();
var multer  = require('multer')
var upload = multer()
const mysqlConnection = require('../../../connection');

////////////////////////////////// PUT Education ////////////////////////////////
Router.post("/education",(req,res)=>{
    var post  = {
        ID_Name:req.body.ID_Name,
        ID_Education:req.body.ID_Education,
        Degree:req.body.Degree,
        Area:req.body.Area,
        Location:req.body.Location
    }
    var sql = "UPDATE education SET Degree = ?, Area =? , Location = ? WHERE ID_Education = ?";
    mysqlConnection.query(sql,[post.Degree,post.Area,post.Location,post.ID_Education], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// PUT Skill ///////////////////////////////////
Router.post("/skill",(req,res)=>{
    var post  = {
        ID_Name:req.body.ID_Name,
        ID_Skill:req.body.ID_Skill,
        Skill:req.body.Skill
    }
    var sql = "UPDATE skill SET Skill = ? WHERE ID_Skill = ? ";
    mysqlConnection.query(sql,[post.Skill,post.ID_Skill], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// PUT Personal ///////////////////////////////////
Router.post("/personal",(req,res)=>{
    var post  = {
        ID_Name:req.body.ID_Name,
        ID_Strength:req.body.ID_Strength,
        ID_Personal:req.body.ID_Personal,
        Strength:req.body.Strength
    }
    ////// GET Color/////////
    var sql1 = "SELECT * from strength where ID_Strength = ?";
    mysqlConnection.query(sql1,[post.ID_Strength], (err,rowscolor,fields)=>{
        if(!err){
                data = rowscolor[0];
                let Colors = data.Color;
                    ////// POST DATA TO DB/////////
                    var sql = "UPDATE personal_strength SET Color = ? , Personal = ? WHERE ID_Personal = ?";
                    mysqlConnection.query(sql,[Colors,post.Strength,post.Strength], (err,rows,fields)=>{
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

////////////////////////////////// PUT Line ////////////////////////////////
Router.post("/line",(req,res)=>{
    var post  = {
        ID_Name:req.body.ID_Name,
        Line:req.body.Line
    }
    var sql = "UPDATE login SET Line_ID = ? WHERE ID_Name = ?";
    mysqlConnection.query(sql,[post.Line,post.ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// PUT Tel ////////////////////////////////
Router.post("/tel",(req,res)=>{
    var post  = {
        ID_Name:req.body.ID_Name,
        Tel:req.body.Tel
    }
    var sql = "UPDATE login SET Tel = ? WHERE ID_Name = ?";
    mysqlConnection.query(sql,[post.Tel,post.ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;


var storage = multer.diskStorage({
    destination: function(req, file, cd){
        cd(null, './routes/Profile/imageprofile')
    },
    filename: function (req, file, cd){
        cd(null, Date.now() + '.jpg')
    }
});
var upload = multer({storage: storage});

////////////////////////////////// PUT Image Profile ////////////////////////////////
Router.post("/photoprofile",upload.single("Image"),(req,res)=>{
    var post  = {
        ID_Name:req.body.ID_Name,
        Tel:req.body.Tel
    }
    var path = "imageprofile/"+ID_Name+".jpg"
    var actualpate = "http://18.139.222.192/node/express/routes/Profile/"+path;
    var sql = "UPDATE login SET image = ? WHERE ID_Name = ?";
    mysqlConnection.query(sql,[post.Tel,post.ID_Name], (err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;

////////////////////////////////// PUT New Password ////////////////////////////////
Router.post("/newpassword",(req,res)=>{
    var post  = {
        ID_Name:req.body.ID_Name,
        Oldpassword:req.body.Oldpassword,
        Newpassword:req.body.Newpassword,
    }
    var sql = "SELECT Password FROM login WHERE ID_Name = ? and Password = ?";
    mysqlConnection.query(sql,[post.ID_Name,post.Oldpassword], (err,rows,fields)=>{
        if(!err){
            var count = rows.length;
            if (count == 0) {
                res.json('Wrong Oldpassword');
            }else{
                var sql = "UPDATE login SET Password = ? WHERE ID_Name = ?";
                mysqlConnection.query(sql,[post.Newpassword,post.ID_Name], (err,rows,fields)=>{
                    if(!err){
                        res.json(rows)
                    }else{
                        console.log(err);
                    }
                })
            }
        }else{
            console.log(err);
        }
    })
})
module.exports = Router;