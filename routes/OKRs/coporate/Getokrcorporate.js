const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connectionokrs');

// Get KR Team
Router.get('/:ID_Name', async (req, res, next) => {
    var ID_Name = req.params.ID_Name;
    let arrOKRcorporatedata = []
    let arrKRcorporatedata = []
    let arrIDCor = []
    let arrKRCorporate = []
    let arrKRCorporateteamname = []
    let arrOKRTeam = []
    let arrOKRTeamlist = []
    var Totalcaldatateamokr
    var arrdata = []
    var arrdatatotal = []
    var arrdataOKRTeamtotal = []
    var arrdataforresultkr = []
    var caldata
    var totaldatas
    var totalalldatas
    var totalOKRTeamresult
    var totalOKRTeamresultdisplay
    var AVGresultkrcorporate


    /// Get Data User ////////// New Code
    function getuserdata(word, callback) {
        var selects= 'Select ID_Company,Dept,Section'
        var froms = ' FROM users'
        var wheres =' Where ID_Name = ?'
        var sqls = selects+froms+wheres;
        mysqlConnection.query(sqls,[ID_Name], function(err, rowss) {
            if(err) return callback(err);
            callback(null, rowss);
        });
    }
    function getuserdatacallback(callback) {
        getuserdata('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }

    /// Get OKR Corporate List
    function getokrcorporatelist(word, callback) {
        getuserdatacallback((err,Userdata)=>{
        var ID_Company = Userdata[0].ID_Company
        var Dept = Userdata[0].Dept
        var Section = Userdata[0].Section

        var selects= 'Select *'
        var froms = ' FROM corporates'
        var on = ' on corporate_details.ID_Corporate = corporates.ID_Corporate'
        var wheres =' Where corporates.ID_Company = ? and corporates.Dept = ? and corporates.Section = ?'
        var sqls = selects+froms+wheres;
        mysqlConnection.query(sqls,[ID_Company,Dept,Section], function(err, rowss) {
            if(err) return callback(err);
            callback(null, rowss);
        });
    })
    }
    function getokrcorporatelistcallback(callback) {
        getokrcorporatelist('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }


        /// Get KR Corporate List
        function getkrcorporatelist(ID_Co, callback) {
            getokrcorporatelistcallback((err,OKRCorporatelist)=>{
            var ID_Corporateinput = OKRCorporatelist.map(OKRCorporatelist => OKRCorporatelist.ID_Corporate)
            var selects= 'Select *'
            var froms = ' FROM corporate_details'
            var wheres =' Where ID_Corporate IN (?)'
            var sqls = selects+froms+wheres;
                mysqlConnection.query(sqls,[ID_Corporateinput], function(err, rowss) {
                    if(err) return callback(err);
                    callback(null, rowss);
                });   
            })
        }

        function getkrcorporatelistcallback(callback) {
            getkrcorporatelist('result', function (err, result) {
                if(err || !result.length) return callback('error or no results');
                callback(null, result);
            });
        }


    //หา Team OKR
    function getokrteam(word, callback) {
        getokrcorporatelistcallback((err,OKRCorporatelist)=>{
        var ID_Corporateinput = OKRCorporatelist.map(OKRCorporatelist => OKRCorporatelist.ID_Corporate)
        var selects= 'Select ID_Team,Team_Name,Leader,KR_Team,StartDate,EndDate'
        var froms = ' FROM teams'
        var ons = ' on personal_details.ID_Personal = personals.ID_Personal'
        var wheres =' Where ID_Corporate IN (?)'
        var sqls = selects+froms+wheres;
        mysqlConnection.query(sqls,[ID_Corporateinput], function(err, rowss) {
            if(err) return callback(err);
            callback(null, rowss);
        });
    })
    }
    function getokrteamcallback(callback) {
        getokrteam('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }

    //หา KR Team
    function getkrteam(word, callback) {
        getokrcorporatelistcallback((err,OKRCorporatelist)=>{
        var ID_Corporateinput = OKRCorporatelist.map(OKRCorporatelist => OKRCorporatelist.ID_Corporate)
        var selects= 'Select ID_Detailteam,Topic'
        var froms = ' FROM team_detail'
        var ons = ' on personal_details.ID_Personal = personals.ID_Personal'
        var wheres =' Where ID_Corporate IN (?)'
        var sqls = selects+froms+wheres;
        mysqlConnection.query(sqls,[ID_Corporateinput], function(err, rowss) {
            if(err) return callback(err);
            callback(null, rowss);
        });
    })
    }
    function getkrteamcallback(callback) {
        getkrteam('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }



    ///Fine Team Name From ID_Name
    function getteamname(word, callback) {
        getokrcorporatelistcallback((err,OKRCorporatelist)=>{
        var ID_Corporateinput = OKRCorporatelist.map(OKRCorporatelist => OKRCorporatelist.ID_Corporate)
        var selects= 'Select DISTINCT Team_Name'
        var froms = ' FROM personals'
        var wheres =' Where personals.ID_Corporate IN (?)'
        var sqls = selects+froms+wheres;
        mysqlConnection.query(sqls,[ID_Corporateinput], function(err, rowss) {
            if(err) return callback(err);
            callback(null, rowss);
        });
    })
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
            getokrcorporatelistcallback((err,OKRCorporatelist)=>{
            var ID_Corporateinput = OKRCorporatelist.map(OKRCorporatelist => OKRCorporatelist.ID_Corporate)
            Team_Names = Team_Name[0].Team_Name
            var selects= 'Select ID_Team,Team_Name,Leader,KR_Team,StartDate,EndDate'
            var froms = ' FROM teams'
            var on = ' on team_detail.ID_Team = teams.ID_Team'
            var wheres =' Where teams.ID_Corporate IN (?)'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[ID_Corporateinput], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
        })
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
                getokrcorporatelistcallback((err,OKRCorporatelist)=>{
                    var ID_Corporateinput = OKRCorporatelist.map(OKRCorporatelist => OKRCorporatelist.ID_Corporate)
                Team_Names = Team_Name[0].Team_Name
            var selects= 'Select ID_Detailteam,ID_Team,Topic,StartDate,EndDate'
            var froms = ' FROM team_detail'
            var ons = ' on personal_details.ID_Personal = personals.ID_Personal'
            var wheres =' Where ID_Corporate IN (?)'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[ID_Corporateinput], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
        })
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
            getokrcorporatelistcallback((err,OKRCorporatelist)=>{
                var ID_Corporateinput = OKRCorporatelist.map(OKRCorporatelist => OKRCorporatelist.ID_Corporate)
            Team_Names = Team_Name[0].Team_Name

            var selects= 'Select personals.ID_Personal,personals.ID_Teamdetail,personals.ID_Name,personals.ID_Team,users.Name'
            var froms = ' FROM personals inner join users'
            var ons = ' on users.ID_Name = personals.ID_Name'
            var wheres =' Where personals.ID_Corporate IN (?)'
            var sqls = selects+froms+ons+wheres;
            mysqlConnection.query(sqls,[ID_Corporateinput], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
        })
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
            getokrcorporatelistcallback((err,OKRCorporatelist)=>{
                var ID_Corporateinput = OKRCorporatelist.map(OKRCorporatelist => OKRCorporatelist.ID_Corporate)
            Team_Names = Team_Name[0].Team_Name
            var selects= 'Select ID_Personaldetail,ID_Personal,ID_Team,ID_Teamdetail,Result'
            var froms = ' FROM personal_details'
            //var ons = ' on users.ID_Name = personals.ID_Name'
            var wheres =' Where ID_Corporate IN (?)'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[ID_Corporateinput], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
        })
    })
    }
    
    function getpersonalresultcallback(callback) {
        getpersonalresult('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }


    ///Fine Team Detail From ID_Team *********** Default Where Name_Team
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
        getokrcorporatelistcallback((err,OKRCorporatelist)=>{
            var ID_Corporateinput = OKRCorporatelist.map(OKRCorporatelist => OKRCorporatelist.ID_Corporate)
            var selects= 'Select *'
            var froms = ' FROM teams'
            var ons = ' on users.ID_Name = personals.ID_Name'
            var wheres =' Where ID_Corporate IN (?)'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[ID_Corporateinput], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
        })
    } 

    function getteamokrcallback(callback) {
        getteamokr('result', function (err, result) {
            if(err || !result.length) return callback('error or no results');
            callback(null, result);
        });
    }

        //หา KR Corporate
        function getkrcorporate(word, callback) {
            getokrcorporatelistcallback((err,OKRCorporatelist)=>{
                var ID_Corporateinput = OKRCorporatelist.map(OKRCorporatelist => OKRCorporatelist.ID_Corporate)
            var selects= 'Select *'
            var froms = ' FROM corporate_details'
            var wheres =' Where ID_Corporate IN (?)'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[ID_Corporateinput], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
        })
        }
        function getkrcorporatecallback(callback) {
            getkrcorporate('result', function (err, result) {
                if(err || !result.length) return callback('error or no results');
                callback(null, result);
            });
        }

        //หา Team Corporate
        function getteamcorporate(word, callback) {
            getokrcorporatelistcallback((err,OKRCorporatelist)=>{
                var ID_Corporateinput = OKRCorporatelist.map(OKRCorporatelist => OKRCorporatelist.ID_Corporate)
            var selects= 'Select *'
            var froms = ' FROM corporate_teams'
            var wheres =' Where ID_Corporate IN (?)'
            var sqls = selects+froms+wheres;
            mysqlConnection.query(sqls,[ID_Corporateinput], function(err, rowss) {
                if(err) return callback(err);
                callback(null, rowss);
            });
        })
        }
        function getteamcorporatecallback(callback) {
            getteamcorporate('result', function (err, result) {
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

                        getkrcorporatecallback((err,KRCorporatedata)=>{

                            getteamcorporatecallback((err,TeamCorporatedata)=>{

                        arrOKRTeam = []
                        arrOKRTeamlist = []
                        Totalcaldatateamokr = 0
                        arrdataforresultkr = []
                        var ID_Teamokr = TeamOKRdata.map(TeamOKRdata => TeamOKRdata.ID_Team)
                        var ID_Teamcorporate = TeamOKRdata.map(TeamOKRdata => TeamOKRdata.ID_Teamcorporate)
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

                        var ID_Detailcorporate = KRCorporatedata.map(KRCorporatedata => KRCorporatedata.ID_Corporatedetail)
                        var KRCorporate = KRCorporatedata.map(KRCorporatedata => KRCorporatedata.KR)
                        var StartDatekrcor = KRCorporatedata.map(KRCorporatedata => KRCorporatedata.StartDate)
                        var EndDatekrcor = KRCorporatedata.map(KRCorporatedata => KRCorporatedata.EndDate)
                        
                        var ID_Corporatedetailst = TeamCorporatedata.map(TeamCorporatedata => TeamCorporatedata.ID_Corporatedetail)
                        var ID_Teamcorporatest = TeamCorporatedata.map(TeamCorporatedata => TeamCorporatedata.ID_Teamcorporate)
                        var Teamcorporatest = TeamCorporatedata.map(TeamCorporatedata => TeamCorporatedata.Team)
                        var Leaderst = TeamCorporatedata.map(TeamCorporatedata => TeamCorporatedata.Leader)


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
                    totalOKRTeamresultdisplay = 0
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

                        arrdataforresultkr.push({
                            'ID_Teamcorporate': ID_Teamcorporate[0],
                            'Result': totalOKRTeamresult,
                        })
                        
                        arrKRCorporate = []
                        
                        for (let i = 0; i < KRCorporatedata.length; i++) {
                            arrKRCorporateteamname = []
                            var CNTid = 0
                            for (let y = 0; y < TeamCorporatedata.length; y++) {
                                if (ID_Corporatedetailst[y] == ID_Detailcorporate[i]) {
                                    AVGresultkrcorporate = 0
                                    for (let h = 0; h < arrdataforresultkr.length; h++) {
                                       if (ID_Teamcorporatest[y] == arrdataforresultkr[h].ID_Teamcorporate) {
                                        totalOKRTeamresultdisplay = arrdataforresultkr[h].Result
                                       }else{
                                        totalOKRTeamresultdisplay = 0
                                       }
                                        
                                    }

                                    arrKRCorporateteamname.push({
                                        'ID_Teamcorporate': ID_Teamcorporatest[y],
                                        'Teamname': Teamcorporatest[y],
                                        'Leader': Leaderst[y],
                                        'Result': totalOKRTeamresultdisplay,
                                    })
                                    CNTid = CNTid + 1 
                                    AVGresultkrcorporate = AVGresultkrcorporate + totalOKRTeamresultdisplay
                                } 
                                
                            }

                            AVGresultkrcorporate = AVGresultkrcorporate / CNTid  

                            arrKRCorporate.push({
                                'ID_Detailcorporate': ID_Detailcorporate[i],
                                'KRCorporate': KRCorporate[i],
                                'StartDate': StartDate[i],
                                'EndDate': EndDate[i],
                                'Result': AVGresultkrcorporate,
                                'Team': arrKRCorporateteamname,
                                
                            })
                            
                        }

                //res.json(arrOKRTeam)
                res.json(arrKRCorporate)
                        })
                    })
                })
            })
        })
    })
})
})




        ///New Respone Json OBject/////////////
        getokrcorporatelistcallback((err,OKRCorporatelist)=>{
            
            getkrcorporatelistcallback((err,KRCorporatelist)=>{
                var ID_Corporate = OKRCorporatelist.map(OKRCorporatelist => OKRCorporatelist.ID_Corporate)
                var Topic = OKRCorporatelist.map(OKRCorporatelist => OKRCorporatelist.Topic)

                var ID_Corporatekr = KRCorporatelist.map(KRCorporatelist => KRCorporatelist.ID_Corporate)
                var ID_Corporatedetailkr = KRCorporatelist.map(KRCorporatelist => KRCorporatelist.ID_Corporatedetail)
                var KRlist = KRCorporatelist.map(KRCorporatelist => KRCorporatelist.KR)

                arrOKRcorporatedata = []
                

                
                for (let i = 0; i < OKRCorporatelist.length; i++) {
                    arrKRcorporatedata = []
                    for (let f = 0; f < KRCorporatelist.length; f++) {
                        if (ID_Corporatekr[f] == ID_Corporate[i]) {
                           if (ID_Corporatekr[f] == ID_Corporate[i]) {
                           arrKRcorporatedata.push({
                               'ID_Corporatedetail': ID_Corporatedetailkr[f],
                               'KR': KRlist[f],
                           })
                        }
                       }
                   }

                    arrOKRcorporatedata.push({
                        'ID_Corporate': ID_Corporate[i],
                        'OKR': Topic[i],
                        'KR': arrKRcorporatedata,
                    })
                }
                
                //res.json(arrOKRcorporatedata)
            })
        })




});
module.exports = Router;