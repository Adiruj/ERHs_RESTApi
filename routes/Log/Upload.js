const express = require('express');
const Router = express.Router();
var multer  = require('multer');
var upload = multer();

var storage = multer.diskStorage({
    destination: function(req, file, cd){
        cd(null, './imagelog')
    },
    filename: function (req, file, cd){
        cd(null, Date.now() + '.jpg')
    }
});

var upload = multer({storage: storage}).single('profileImage');

Router.post('/', function(req,res){
    upload(req,res, function(err){
        if(err){

        }else{
            res.json({
                success: true,
                message: "Image uploaded"
            })
        }
    })
});

module.exports = Router;

