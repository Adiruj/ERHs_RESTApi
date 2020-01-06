const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connectionokrs');


Router.get('/main/:ID_Name', async (req, res, next) => {
    var ID_Name = req.params.ID_Name
    let Personal = []
    let DetailPersonal = []
    var caldata
    function getpersonals(word, callback) {
        var selects= 'Select personal_details.ID_Personaldetail,personal_details.ID_Personal,personal_details.Detail_Personal,personal_details.Result,personal_details.Status'
        var froms = ' FROM personal_details inner join personals'
        var ons = ' on personal_details.ID_Personal = personals.ID_Personal'
        var wheres =' Where personal_details.ID_Personal = personals.ID_Personal and personals.ID_Name = ?'
        var sqls = selects+froms+ons+wheres;
        mysqlConnection.query(sqls,[ID_Name], function(err, rowss) {
            if(err) return callback(err);
            callback(null, rowss);
        });
    }

    function getParrotMessages(callback) {
        getpersonals('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }




    function getParrotMessage(callback) {
        getpersonal('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }



    function getpersonal(word, callback) {
        var SELECT = 'SELECT DISTINCT personals.ID_Personal,personals.KR_Personal,Teams.KR_Team,teams.StartDate,teams.EndDate';
        var FROM = ' FROM personals inner join teams';
        var ON =' on teams.Team_Name = personals.Team_Name and teams.ID_Team = personals.ID_Team';
        var WHERE = ' WHERE personals.ID_Name = ?';
        var SQL = SELECT+FROM+ON+WHERE;
        mysqlConnection.query(SQL,[ID_Name], function(err, rows) {
            if(err) return callback(err);
            callback(null, rows);
        });
    }

    getParrotMessage(function(err, personal){

        getParrotMessages(function(err, personaldetail){
            var ID_Personal = personal.map(personal => personal.ID_Personal)
            var KR_Personal = personal.map(personal => personal.KR_Personal)
            var KR_Team = personal.map(personal => personal.KR_Team)
            var StartDate = personal.map(personal => personal.StartDate)
            var EndDate = personal.map(personal => personal.EndDate)
            var ID_Personaldetail = personaldetail.map(personaldetail => personaldetail.ID_Personaldetail)
            var ID_Personals = personaldetail.map(personaldetail => personaldetail.ID_Personal)
            var Detail_Personal = personaldetail.map(personaldetail => personaldetail.Detail_Personal)
            var Result = personaldetail.map(personaldetail => personaldetail.Result)
            var Status = personaldetail.map(personaldetail => personaldetail.Status)

            for (let i = 0; i < personal.length; i++) {
                DetailPersonal = []
                caldata = 0
                for (let x = 0; x < personaldetail.length; x++) {
                        if (ID_Personals[x] == ID_Personal[i]) {
                            DetailPersonal.push({
                                'ID_Personaldetail': ID_Personaldetail[x],
                                'Detail_Personal': Detail_Personal[x],
                                'Result': Result[x],
                            })
                            caldata = Result[x] + caldata
                        }             
                }

                Personal.push({
                    'ID_Personal': ID_Personal[i],
                    'KR_Personal': KR_Personal[i],
                    'KR_Team': KR_Team[i],
                    'StartDate': StartDate[i],
                    'EndDate': EndDate[i],
                    'Total': caldata,
                    'Detail': DetailPersonal,
                });

            }
            res.json(Personal)
        });

    });
});
module.exports = Router;

Router.get('/detail/:ID_Personal', async (req, res, next) => {
    var ID_Personal = req.params.ID_Personal
    let Personal = []
    let DetailPersonal = []
    var caldata
    function getpersonaldetail(word, callback) {
        var selects= 'Select personals.ID_Name,personal_details.ID_Personaldetail,personal_details.ID_Personal,personal_details.Detail_Personal,personal_details.Status,personal_details.Weight,personal_details.Result'
        var froms = ' FROM personal_details inner join personals'
        var ons = ' on personal_details.ID_Personal = personals.ID_Personal'
        var wheres =' Where personal_details.ID_Personal = ?'
        var sqls = selects+froms+ons+wheres;
        mysqlConnection.query(sqls,[ID_Personal], function(err, rowss) {
            if(err) return callback(err);
            callback(null, rowss);
        });
    }

    function getPersonalCallback(callback) {
        getpersonaldetail('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }


    function getpersonal(word, callback) {
        var SELECT = 'SELECT DISTINCT personals.ID_Personal,personals.KR_Personal,Teams.KR_Team,teams.StartDate,teams.EndDate';
        var FROM = ' FROM personals inner join teams';
        var ON =' on teams.Team_Name = personals.Team_Name and teams.ID_Team = personals.ID_Team';
        var WHERE = ' WHERE personals.ID_Personal = ?';
        var SQL = SELECT+FROM+ON+WHERE;
        mysqlConnection.query(SQL,[ID_Personal], function(err, rows) {
            if(err) return callback(err);
            callback(null, rows);
        });
    }

    function getpersonalcallback(callback) {
        getpersonal('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }

    getpersonalcallback(function(err,personal){
        getPersonalCallback(function(err,personaldetail){
            var ID_Personal = personal.map(personal => personal.ID_Personal)
            var KR_Personal = personal.map(personal => personal.KR_Personal)
            var KR_Team = personal.map(personal => personal.KR_Team)
            var StartDate = personal.map(personal => personal.StartDate)
            var EndDate = personal.map(personal => personal.EndDate)
            var ID_Personaldetail = personaldetail.map(personaldetail => personaldetail.ID_Personaldetail)
            var ID_Personals = personaldetail.map(personaldetail => personaldetail.ID_Personal)
            var Detail_Personal = personaldetail.map(personaldetail => personaldetail.Detail_Personal)
            var Result = personaldetail.map(personaldetail => personaldetail.Result)
            var Weight = personaldetail.map(personaldetail => personaldetail.Weight)
            var Status = personaldetail.map(personaldetail => personaldetail.Status)

            
            for (let i = 0; i < personal.length; i++) {
                DetailPersonal = []
                caldata = 0
                for (let x = 0; x < personaldetail.length; x++) {
                        if (ID_Personals[x] == ID_Personal[i]) {
                            DetailPersonal.push({
                                'ID_Personaldetail': ID_Personaldetail[x],
                                'Detail_Personal': Detail_Personal[x],
                                'Weight': Weight[x],
                                'Status': Status[x],
                            })
                            caldata = Result[x] + caldata
                        }             
                }

                Personal.push({
                    'ID_Personal': ID_Personal[i],
                    'KR_Personal': KR_Personal[i],
                    'KR_Team': KR_Team[i],
                    'StartDate': StartDate[i],
                    'EndDate': EndDate[i],
                    'Total': caldata,
                    'Detail': DetailPersonal,
                });

            }

            res.json(Personal);
        })
    })
});
module.exports = Router;

