const mysqlConnection = require('../connection');

const userLoginCheck = (req, res, next) => {
	var post  = {
		username:req.body.username,
		password:req.body.password
	}
	var sql = "SELECT * FROM login WHERE Username=? AND Password=?";
	mysqlConnection.query(sql,[post.username,post.password],function(err,rows){
		if(err) {
			res.json({"Error" : true, "Message" : "Error executing MySQL query"});
		}
		else {
			if(rows.length==1){
				next();
			}
			else {
				res.json({"Error" : true, "Message" : "wrong email/password combination"});
			}
		}
	});
 }


module.exports = userLoginCheck;