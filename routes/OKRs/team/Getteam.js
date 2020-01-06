const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connectionokrs');


Router.get('/main/:ID_Name', async (req, res, next) => {
    var ID_Name = req.params.ID_Name
    let Team = []
    let Teamforresult = []
    let Teampersonal = []
    let Teamdetail = []
    let Result = []
    var caldata
    var Team_Names
    var arrdata = []
    var arrdatatotal = []
    var caldata
    var totaldatas
    var totalalldatas

    ///Fine Team Name From ID_Name
    function getteamname(word, callback) {
        var selects= 'Select DISTINCT Team_Name'
        var froms = ' FROM personals'
        var wheres =' Where personals.ID_Name = ?'
        var sqls = selects+froms+wheres;
        mysqlConnection.query(sqls,[ID_Name], function(err, rowss) {
            if(err) return callback(err);
            callback(null, rowss);
        });
    }

    function getteamnamecallback(callback) {
        getteamname('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }
    

    ///Fine KR Team From Team_Name
    function getteam(word, callback) {
        getteamnamecallback((err,Team_Name)=>{
            Team_Names = Team_Name[0].Team_Name
            var selects= 'Select teams.ID_Team,teams.KR_Team'
            var froms = ' FROM teams'
            var on = ' on team_detail.ID_Team = teams.ID_Team'
            var wheres =' Where teams.Team_Name = ?'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[Team_Names], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
        })
    }

    function getteamcallback(callback) {
        getteam('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }


        //หา KR Teamdetail
        function getteamdetailforresult(word, callback) {
            getteamnamecallback((err,Team_Name)=>{
                Team_Names = Team_Name[0].Team_Name
            var selects= 'Select ID_Detailteam,ID_Team,Topic,StartDate,EndDate'
            var froms = ' FROM team_detail'
            var ons = ' on personal_details.ID_Personal = personals.ID_Personal'
            var wheres =' Where Team_Name = ?'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[Team_Names], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
        })
        }
    
        function getteamdetailforresultcallback(callback) {
            getteamdetailforresult('result', function (err, result) {
                if(err || !result.length) return callback('error or no results');
                callback(null, result);
            });
        }

        
    //หาชื่อ Personal
    function getpersonal(ID_Team, callback) {
        getteamnamecallback((err,Team_Name)=>{
            Team_Names = Team_Name[0].Team_Name

            var selects= 'Select personals.ID_Personal,personals.ID_Teamdetail,personals.ID_Name,personals.ID_Team,users.Name'
            var froms = ' FROM personals inner join users'
            var ons = ' on users.ID_Name = personals.ID_Name'
            var wheres =' Where personals.Team_Name = ?'
            var sqls = selects+froms+ons+wheres;
            mysqlConnection.query(sqls,[Team_Names], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
        })
    }

    function getpersonalcallback(callback) {
        getpersonal('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }
   

    //หา Result Personal
    function getpersonalresult(ID_Team, callback) {
        getteamnamecallback((err,Team_Name)=>{
            Team_Names = Team_Name[0].Team_Name
            var selects= 'Select ID_Personaldetail,ID_Personal,ID_Team,ID_Teamdetail,Result'
            var froms = ' FROM personal_details'
            //var ons = ' on users.ID_Name = personals.ID_Name'
            var wheres =' Where Team_Name = ?'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[Team_Names], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
        })
    }
    
    function getpersonalresultcallback(callback) {
        getpersonalresult('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }


    ///Fine Team Detail From ID_Team
    function getteamdetail(word, callback) {
        getteamcallback((err,Team_Name)=>{
                var selects= 'Select DISTINCT team_detail.ID_Detailteam,team_detail.ID_Team,team_detail.Team_Name,team_detail.Topic,personal_details.ID_Teamdetail,team_detail.ID_Detailteam'
                var froms = ' FROM team_detail left join personal_details'
                var on = ' on personal_details.ID_Teamdetail = team_detail.ID_Detailteam'
                var wheres =' Where team_detail.Team_Name = ?'
                var sqls = selects+froms+on+wheres;
                mysqlConnection.query(sqls,[Team_Names], function(err, rowss) {
                    if(err) return callback(err);
                    callback(null, rowss);
                });            
        })
    }

    function getteamdetailcallback(callback) {
        getteamdetail('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }





/// Respone JSON Object
getteamcallback((err,Team_Name)=>{

    getteamdetailcallback((err,KRTeam)=>{

        getteamdetailforresultcallback((err,Teamdetails)=>{

            getpersonalcallback((err,personalnames)=>{

                getpersonalresultcallback((err,personalresult)=>{

                var ID_Team = Team_Name.map(Team_Name => Team_Name.ID_Team)
                var KR_Team = Team_Name.map(Team_Name => Team_Name.KR_Team)
                
                var ID_Detailteam = KRTeam.map(KRTeam => KRTeam.ID_Detailteam)
                var ID_Teams = KRTeam.map(KRTeam => KRTeam.ID_Team)
                var Topic = KRTeam.map(KRTeam => KRTeam.Topic)
                

                var ID_Detailteams = Teamdetails.map(Teamdetails => Teamdetails.ID_Detailteam)
                var ID_Teamss = Teamdetails.map(Teamdetails => Teamdetails.ID_Team)
                var KR_Teams = Teamdetails.map(Teamdetails => Teamdetails.Topic)
                var StartDates = Teamdetails.map(Teamdetails => Teamdetails.StartDate)
                var EndDates = Teamdetails.map(Teamdetails => Teamdetails.EndDate)

                var ID_Teampersonal = personalnames.map(personalnames => personalnames.ID_Team)
                var ID_Namepersonal = personalnames.map(personalnames => personalnames.ID_Name)
                var ID_Teamdetailpersonal = personalnames.map(personalnames => personalnames.ID_Teamdetail)
                var Namepersonal = personalnames.map(personalnames => personalnames.Name)
                var ID_Personals = personalnames.map(personalnames => personalnames.ID_Personal)
                
                var ID_Personalresult = personalresult.map(personalresult => personalresult.ID_Personal)
                var Result_Personalresult = personalresult.map(personalresult => personalresult.Result)

                Teamforresult = []
                for (let i = 0; i < Teamdetails.length; i++) {
                    Teampersonal = []
                    arrdata = []
                    
                    for (let x = 0; x < personalnames.length; x++) {
                        caldata = 0
                        
                        for (let o = 0; o < personalresult.length; o++) {
                            if (ID_Personalresult[o] == ID_Personals[x]) {
                                caldata = Result_Personalresult[o] + caldata
                            }
                        }
        
                        if (ID_Teampersonal[x] == ID_Teams[i]) {
                            if (ID_Teamdetailpersonal[x] == ID_Detailteam[i]) {
                                arrdata.push(caldata)
                            }
                        }
                        
                    }

                    totaldatas = 0
                    for (let u = 0; u < arrdata.length; u++) {
                        totaldatas = arrdata[u] + totaldatas 
                    }
                    totaldatas = (totaldatas)/arrdata.length
                    arrdatatotal.push(totaldatas)
                }
                
                
                Team = []
                for (let i = 0; i < Team_Name.length; i++) { 
                    caldata = 0
                        Teamdetail = []
                        totalalldatas = 0
                        for (let x = 0; x < KRTeam.length; x++) {                      
                            if (ID_Teams[x] == ID_Team[i]) {

                                Teamdetail.push({
                                    'ID_Detailteam': ID_Detailteam[x],
                                    'Topic': Topic[x],
                                    'Result': arrdatatotal[x]
                                })   
                                    
                                    if (isNaN(arrdatatotal[x])) {
                                        totalalldatas = totalalldatas + 0
                                    }else{
                                        totalalldatas = arrdatatotal[x] + totalalldatas
                                    }      
                                
                            }
                        }
                        totalalldatas = totalalldatas/Team_Name.length    
                        Team.push({
                            'ID_Team': ID_Team[i],
                            'Team Name': Team_Names,
                            'KR_Team': KR_Team[i],
                            'Total': totalalldatas,
                            'Team_Detail': Teamdetail,
                            })
                        }
                res.json(Team)
                })
            })
        })
    })
})

});
module.exports = Router;

Router.get('/detail/:ID_Team', async (req, res, next) => {
    var ID_Team = req.params.ID_Team
    let Team = []
    let Teampersonal = []
    let ResiltTeamdetail = []
    var ID_Namelog = []
    var arrdata = []
    var caldata
    var totaldatas
    var Teamname


        //หา Team Name
        function getteamname(word, callback) {
            var selects= 'Select distinct Team_Name'
            var froms = ' FROM teams'
            var ons = ' on personal_details.ID_Personal = personals.ID_Personal'
            var wheres =' Where ID_Team = ?'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[ID_Team], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
        }
    
        function getteamnamecallback(callback) {
            getteamname('result', function (err, result) {
                if(err || !result.length) return callback('error or no results');
                callback(null, result);
            });
        }

    //หา KR Teamdetail
    function getteamdetail(word, callback) {
        var selects= 'Select ID_Detailteam,ID_Team,Topic,StartDate,EndDate'
        var froms = ' FROM team_detail'
        var ons = ' on personal_details.ID_Personal = personals.ID_Personal'
        var wheres =' Where ID_Team = ?'
        var sqls = selects+froms+wheres;
        mysqlConnection.query(sqls,[ID_Team], function(err, rowss) {
            if(err) return callback(err);
            callback(null, rowss);
        });
    }
    function getteamdetailcallback(callback) {
        getteamdetail('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }

    
    //หาชื่อ Personal
    function getpersonal(ID_Team, callback) {
        getteamnamecallback((err,Teamnamesssss)=>{
            Teamname = Teamnamesssss[0].Team_Name

            var selects= 'Select personals.ID_Personal,personals.ID_Teamdetail,personals.ID_Name,personals.ID_Team,users.Name'
            var froms = ' FROM personals inner join users'
            var ons = ' on users.ID_Name = personals.ID_Name'
            var wheres =' Where personals.Team_Name = ?'
            var sqls = selects+froms+ons+wheres;
            mysqlConnection.query(sqls,[Teamname], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
        })
    }

    function getpersonalcallback(callback) {
        getpersonal('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }
   

    //หา Result Personal
    function getpersonalresult(ID_Team, callback) {
        getteamnamecallback((err,Teamnamesssss)=>{
            Teamname = Teamnamesssss[0].Team_Name
            var selects= 'Select ID_Personaldetail,ID_Personal,ID_Team,ID_Teamdetail,Result'
            var froms = ' FROM personal_details'
            //var ons = ' on users.ID_Name = personals.ID_Name'
            var wheres =' Where Team_Name = ?'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[Teamname], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
        })
    }
    
    function getpersonalresultcallback(callback) {
        getpersonalresult('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }

    //Respone Json Object
    getteamdetailcallback((err,Teamdetail)=>{
        getpersonalcallback((err,personalnames)=>{
            getpersonalresultcallback((err,personalresult)=>{

        var ID_Detailteam = Teamdetail.map(Teamdetail => Teamdetail.ID_Detailteam)
        var ID_Teams = Teamdetail.map(Teamdetail => Teamdetail.ID_Team)
        var KR_Teams = Teamdetail.map(Teamdetail => Teamdetail.Topic)
        var StartDates = Teamdetail.map(Teamdetail => Teamdetail.StartDate)
        var EndDates = Teamdetail.map(Teamdetail => Teamdetail.EndDate)

        var ID_Teampersonal = personalnames.map(personalnames => personalnames.ID_Team)
        var ID_Namepersonal = personalnames.map(personalnames => personalnames.ID_Name)
        var ID_Teamdetailpersonal = personalnames.map(personalnames => personalnames.ID_Teamdetail)
        var Namepersonal = personalnames.map(personalnames => personalnames.Name)
        var ID_Personals = personalnames.map(personalnames => personalnames.ID_Personal)
        
        var ID_Personalresult = personalresult.map(personalresult => personalresult.ID_Personal)
        var Result_Personalresult = personalresult.map(personalresult => personalresult.Result)
        
        Team = []
        for (let i = 0; i < Teamdetail.length; i++) {
            
            Teampersonal = []
            arrdata = []
            for (let x = 0; x < personalnames.length; x++) {
                caldata = 0
                
                for (let o = 0; o < personalresult.length; o++) {
                    if (ID_Personalresult[o] == ID_Personals[x]) {
                        caldata = Result_Personalresult[o] + caldata
                    }
                }

                if (ID_Teampersonal[x] == ID_Teams[i]) {
                    if (ID_Teamdetailpersonal[x] == ID_Detailteam[i]) {
                        arrdata.push(caldata)
                        Teampersonal.push({
                            'ID_Name': ID_Namepersonal[x],
                            'ID_Personal': ID_Teamdetailpersonal[x],
                            'Name': Namepersonal[x],
                            'Result': caldata,
                        })
                    }
                }
                
            }
            totaldatas = 0
            for (let u = 0; u < arrdata.length; u++) {
                totaldatas = arrdata[u] + totaldatas 
            }
            totaldatas = (totaldatas)/arrdata.length

            Team.push({
                'ID_Team': ID_Teams[i],
                'ID_Teamdetail': ID_Detailteam[i],
                'KR_Teams': KR_Teams[i],
                'StartDates': StartDates[i],
                'EndDates': EndDates[i],
                'Total': totaldatas,
                'Personal': Teampersonal,
            })

        }

        res.json(Team)                  
    })
})
})
});
module.exports = Router;


Router.get('/detailpersonal/:ID_Name', async (req, res, next) => {
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

