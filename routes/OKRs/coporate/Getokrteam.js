const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connectionokrs');

// Get KR Team
Router.get('/:ID_Teamcorporate', async (req, res, next) => {
    var ID_Teamcorporate = req.params.ID_Teamcorporate;
    let arrOKRTeam = []
    let arrOKRTeamlist = []
    var Totalcaldatateamokr
    var arrdata = []
    var arrdatatotal = []
    var arrdataOKRTeamtotal = []
    var caldata
    var totaldatas
    var totalalldatas
    var totalOKRTeamresult

    //หา Team OKR
    function getokrteam(word, callback) {
        var selects= 'Select ID_Team,Team_Name,Leader,KR_Team,StartDate,EndDate'
        var froms = ' FROM teams'
        var ons = ' on personal_details.ID_Personal = personals.ID_Personal'
        var wheres =' Where ID_Teamcorporate = ?'
        var sqls = selects+froms+wheres;
        mysqlConnection.query(sqls,[ID_Teamcorporate], function(err, rowss) {
            if(err) return callback(err);
            callback(null, rowss);
        });
    }
    function getokrteamcallback(callback) {
        getokrteam('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }

    //หา KR Team
    function getkrteam(word, callback) {
        var selects= 'Select ID_Detailteam,Topic'
        var froms = ' FROM team_detail'
        var ons = ' on personal_details.ID_Personal = personals.ID_Personal'
        var wheres =' Where ID_Teamcorporate = ?'
        var sqls = selects+froms+wheres;
        mysqlConnection.query(sqls,[ID_Teamcorporate], function(err, rowss) {
            if(err) return callback(err);
            callback(null, rowss);
        });
    }
    function getkrteamcallback(callback) {
        getkrteam('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }



    ///Fine Team Name From ID_Name
    function getteamname(word, callback) {
        var selects= 'Select DISTINCT Team_Name'
        var froms = ' FROM personals'
        var wheres =' Where personals.ID_Teamcorporate = ?'
        var sqls = selects+froms+wheres;
        mysqlConnection.query(sqls,[ID_Teamcorporate], function(err, rowss) {
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
            var selects= 'Select ID_Team,Team_Name,Leader,KR_Team,StartDate,EndDate'
            var froms = ' FROM teams'
            var on = ' on team_detail.ID_Team = teams.ID_Team'
            var wheres =' Where teams.ID_Teamcorporate = ?'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[ID_Teamcorporate], function(err, rowss) {
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
            var wheres =' Where ID_Teamcorporate = ?'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[ID_Teamcorporate], function(err, rowss) {
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
    function getpersonal(word, callback) {
        getteamnamecallback((err,Team_Name)=>{
            Team_Names = Team_Name[0].Team_Name

            var selects= 'Select personals.ID_Personal,personals.ID_Teamdetail,personals.ID_Name,personals.ID_Team,users.Name'
            var froms = ' FROM personals inner join users'
            var ons = ' on users.ID_Name = personals.ID_Name'
            var wheres =' Where personals.ID_Teamcorporate = ?'
            var sqls = selects+froms+ons+wheres;
            mysqlConnection.query(sqls,[ID_Teamcorporate], function(err, rowss) {
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
    function getpersonalresult(word, callback) {
        getteamnamecallback((err,Team_Name)=>{
            Team_Names = Team_Name[0].Team_Name
            var selects= 'Select ID_Personaldetail,ID_Personal,ID_Team,ID_Teamdetail,Result'
            var froms = ' FROM personal_details'
            //var ons = ' on users.ID_Name = personals.ID_Name'
            var wheres =' Where ID_Teamcorporate = ?'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[ID_Teamcorporate], function(err, rowss) {
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




    //หา OKRTeam list
    function getteamokr(word, callback) {
            var selects= 'Select *'
            var froms = ' FROM teams'
            var ons = ' on users.ID_Name = personals.ID_Name'
            var wheres =' Where ID_Teamcorporate = ?'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[ID_Teamcorporate], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
    } 

    function getteamokrcallback(callback) {
        getteamokr('result', function (err, result) {
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

                    getteamokrcallback((err,TeamOKRdata) =>{

                        arrOKRTeam = []
                        arrOKRTeamlist = []
                        Totalcaldatateamokr = 0

                        var ID_Teamokr = TeamOKRdata.map(TeamOKRdata => TeamOKRdata.ID_Team)
                        var Team_Names = TeamOKRdata.map(TeamOKRdata => TeamOKRdata.Team_Name)
                        var Leader = TeamOKRdata.map(TeamOKRdata => TeamOKRdata.Leader)
                        var StartDate = TeamOKRdata.map(TeamOKRdata => TeamOKRdata.StartDate)
                        var EndDate = TeamOKRdata.map(TeamOKRdata => TeamOKRdata.EndDate)
                        var KR_Team = TeamOKRdata.map(TeamOKRdata => TeamOKRdata.KR_Team)

                        var ID_Team = Team_Name.map(Team_Name => Team_Name.ID_Team)
                        var Team_Namedata = Team_Name.map(Team_Name => Team_Name.Team_Name)
                        var Leader = Team_Name.map(Team_Name => Team_Name.Leader)
                        var KR_Team = Team_Name.map(Team_Name => Team_Name.KR_Team)
                        var StartDate = Team_Name.map(Team_Name => Team_Name.StartDate)
                        var EndDate = Team_Name.map(Team_Name => Team_Name.EndDate)
                
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
                    arrdataOKRTeamtotal = []
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
                    totalOKRTeamresult = 0
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
                        totalalldatas = totalalldatas/Team_Name.length    //////Result AVG FROM KR Team Fro Show TO OKRTeam
                            for (let x = 0; x < TeamOKRdata.length; x++) {
                                if (ID_Teamokr[x] == ID_Team[i]) {
                                        arrOKRTeamlist.push({
                                            'ID_Team': ID_Teamokr[x],
                                            'KR_Team': KR_Team[x],
                                            'Result': totalalldatas,
                                        })
                                    arrdataOKRTeamtotal.push(totalalldatas)
                                }
                            }
                        }
                        for (let d = 0; d < arrdataOKRTeamtotal.length; d++) {
                            totalOKRTeamresult = arrdataOKRTeamtotal[d] + totalOKRTeamresult
                        }
                        totalOKRTeamresult = totalOKRTeamresult / TeamOKRdata.length

                        arrOKRTeam.push({
                            'Team_Name': Team_Names[0],
                            'Leader': Leader[0],
                            'StartDate': StartDate[0],
                            'EndDate': EndDate[0],
                            'Total': totalOKRTeamresult,
                            'KR_Team': arrOKRTeamlist,
                        })

                res.json(arrOKRTeam)
                })
            })
        })
    })
})
})



        

        

            


});
module.exports = Router;