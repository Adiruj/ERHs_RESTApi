const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../../../connection');


//////////////////////////////////Get Summary////////////////////////////////
Router.get("/summary/:ID_Name/:Quator/:Year",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var Quator = req.params.Quator;
    var Year = req.params.Year;

    var sql = "SELECT * FROM login Where ID_Name = ?";
    mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
        if(!err){
            var ID_Company = rows[0].ID_Company;
            var Dept = rows[0].Dept;
            var Section = rows[0].Section;
            
            var sql2 = "SELECT * FROM summary_evaluation Where ID_Company = ? and Dept = ? and Section = ?";
            mysqlConnection.query(sql2,[ID_Company,Dept,Section], (err,rows2,fields)=>{
            var Performance = rows2[0].Performance;
            var Potential = rows2[0].Potential;
            var Total = rows2[0].Total;
            var KPI_Dept = rows2[0].KPI_Dept;
            var KPI_Section = rows2[0].KPI_Section;
            var KPI_Individual = rows2[0].KPI_Individual;
            var Core = rows2[0].Core;
            var Manegerial = rows2[0].Manegerial;
            
            //// Cal KPI Dept////
            if (Quator == 'All') {
                var sql3 = "SELECT * from kpi_dept LEFT JOIN result_kpidept ON result_kpidept.ID_KPIDepts = kpi_dept.ID_KPIDept Where kpi_dept.ID_Company = ? and kpi_dept.Dept = ? and result_kpidept.Year = ?";
            }else{
                var sql3 = "SELECT * from kpi_dept LEFT JOIN result_kpidept ON result_kpidept.ID_KPIDepts = kpi_dept.ID_KPIDept Where kpi_dept.ID_Company = ? and kpi_dept.Dept = ? and result_kpidept.Year = ? and result_kpidept.Quator=?";
            }
            mysqlConnection.query(sql3,[ID_Company,Dept,Year,Quator], (err,rows3,fields)=>{
            var cntkpidept = rows3.length;
            var A = 0;
            var WeightScoreplan = 0;
            var WeightScorecal = 0;

            for (let i = 0; i < cntkpidept; i++) {
            var WeightScore = rows3[i].WeightScore;
            var Weight = rows3[i].Weight;
            var ResultScore = rows3[i].ResultScore;
                A = (Weight*5)*100;
                WeightScoreplan = A+WeightScoreplan;
                WeightScorecal = WeightScore + WeightScorecal;
            }
            var CalWeight = (WeightScorecal/WeightScoreplan)*100;
            var CalWeights = CalWeight.toFixed(2);
            var CalWeightsummary = (KPI_Dept*CalWeights)/100;
            var CalWeightsummarys = CalWeightsummary.toFixed(2)

            //// Cal KPI Section////
            if (Quator == 'All') {
                var sql4 = "SELECT * from kpi_section LEFT JOIN result_kpisection ON result_kpisection.ID_KPISections = kpi_section.ID_KPISec Where kpi_section.ID_Company = ?  and kpi_section.Dept = ? and kpi_section.Section = ? and result_kpisection.Year = ?";
            } else {
                var sql4 = "SELECT * from kpi_section LEFT JOIN result_kpisection ON result_kpisection.ID_KPISections = kpi_section.ID_KPISec Where kpi_section.ID_Company = ? and kpi_section.Dept = ? and kpi_section.Section = ? and result_kpisection.Year = ? and result_kpisection.Quator=?";
            }
            mysqlConnection.query(sql4,[ID_Company,Dept,Section,Year,Quator], (err,rows4,fields)=>{
            var cntkpisec = rows4.length;
            var Asec = 0;
            var WeightScoreplansec = 0;
            var WeightScorecalsec = 0;
            for (let i = 0; i < cntkpisec; i++) {
            var WeightScoresec = rows4[i].WeightScore;
            var Weightsec = rows4[i].Weight;
            var ResultScoresec = rows4[i].ResultScore;
                Asec = (Weightsec*5)*100;
                WeightScoreplansec = Asec+WeightScoreplansec;
                WeightScorecalsec = Weightsec + WeightScorecalsec;
            }
            var CalWeightsec = (WeightScorecalsec/WeightScoreplansec)*100;
            var CalWeightssec = CalWeightsec.toFixed(2);
            var CalWeightsummarysec = (KPI_Section*CalWeightssec)/100;
            var CalWeightsummaryssec = CalWeightsummarysec.toFixed(2);


            //// Cal KPI Individual////
            if (Quator == 'All') {
                var sql5 = "SELECT * from kpi LEFT JOIN result_kpi ON result_kpi.ID_KPIs = kpi.ID_KPI Where kpi.ID_Name = ?  and result_kpi.Year = ?";
            } else {
                var sql5 = "SELECT * from kpi LEFT JOIN result_kpi ON result_kpi.ID_KPIs = kpi.ID_KPI Where kpi.ID_Name = ? and result_kpi.Year = ? and result_kpi.Quator=?";
            }
                        
            mysqlConnection.query(sql5,[ID_Name,Year,Quator], (err,rows5,fields)=>{
            var cntkpiindi = rows5.length;
            var Aindi = 0;
            var WeightScoreplanindi = 0;
            var WeightScorecalindi = 0;
            for (let i = 0; i < cntkpiindi; i++) {
            var WeightScoreindi = rows5[i].WeightScore;
            var Weightindi = rows5[i].WeightScore;
            var ResultScoreindi = rows5[i].WeightScore;
                Aindi = (Weightindi*5)*100;
                WeightScoreplanindi = Aindi+WeightScoreplanindi;
                WeightScorecalindi = Weightindi + WeightScorecalindi;
            }
            var CalWeightindi = (WeightScorecalindi/WeightScoreplanindi)*100;
            var CalWeightsindi = CalWeightindi.toFixed(2);
            var CalWeightsummaryindi = (KPI_Individual*CalWeightsindi)/100;
            var CalWeightsummarysindi = CalWeightsummaryindi.toFixed(2);
            

            //// Cal Core ////
            if (Quator == 'All') {
                var sql6 = "SELECT * from core LEFT JOIN result_core ON result_core.ID_Cores = core.ID_Core Where core.ID_Name = ? and result_core.Year = ?";
            }else{
                var sql6 = "SELECT * from core LEFT JOIN result_core ON result_core.ID_Cores = core.ID_Core Where core.ID_Name = ? and result_core.Year = ? and result_core.Quator=?";
            }
            mysqlConnection.query(sql6,[ID_Name,Year,Quator], (err,rows6,fields)=>{
            var cntcore = rows6.length;
            var ResultSum = 0;
            var TargetSum = 0;
            for (let i = 0; i < cntcore; i++) {
                var ResultCore = rows6[i].Result;
                var TagetCore = rows6[i].Target;
                ResultSum = ResultCore+ResultSum;
                TargetSum = TargetSum+TagetCore;
            }
            var CalResultCore = (ResultSum*Core)/TargetSum;
            var CalWeightsummarycores = CalResultCore.toFixed(2);

            //// Cal Managerial ////
            if (Quator == 'All') {
                var sql7 = "SELECT * from managerial LEFT JOIN result_managerial ON result_managerial.ID_Managerials = managerial.ID_Managerial Where managerial.ID_Name = ? and result_managerial.Year = ?";
            } else {
                var sql7 = "SELECT * from managerial LEFT JOIN result_managerial ON result_managerial.ID_Managerials = managerial.ID_Managerial Where managerial.ID_Name = ? and result_managerial.Year = ? and result_managerial.Quator=?";
            }
            
            mysqlConnection.query(sql7,[ID_Name,Year,Quator], (err,rows7,fields)=>{
            var cntmana = rows7.length;
            var ResultmanaSum = 0;
            var TargetmanaSum = 0;
            for (let i = 0; i < cntmana; i++) {
            var ResultMana = rows7[i].Result;
            var TagetMana = rows7[i].Target;
            ResultmanaSum = ResultMana+ResultmanaSum;
            TargetmanaSum = TagetMana+TargetmanaSum;
            }
            var CalWeightsummarymana = (ResultmanaSum*Manegerial)/TargetmanaSum;
            var CalWeightsummarysmana = CalWeightsummarymana.toFixed(2);
            
            /*Cal Performance*/
            var Performancecaltotal = parseFloat(CalWeightsummarys)+parseFloat(CalWeightsummaryssec)+parseFloat(CalWeightsummarysindi);
            /*----------------*/

            /*Cal Potential*/
            var Potentialcaltotal = parseFloat(CalWeightsummarycores)+parseFloat(CalWeightsummarysmana);
            /*---------------*/

            /*Cal Total*/
            var Totalcal = parseFloat(Performancecaltotal)+parseFloat(Potentialcaltotal);
            /*---------------*/

            var sql8 = "SELECT * FROM result_grade Where ID_Company = ? and Dept = ? and Section = ?";
            mysqlConnection.query(sql8,[ID_Company,Dept,Section], (err,rows8,fields)=>{
                var cntgrade = rows8.length;
                for (let i = 0; i < cntgrade; i++) {
                    if (i == 0) {
                        if (Totalcal >= rows8[i].Score) {
                            var Graderesult = rows8[i].Grade;
                        }
                    } else {
                        if (Totalcal >= rows8[i].Score && Totalcal < rows8[i-1].Score) {
                            var Graderesult = rows8[i].Grade;
                        }
                    }                    
                }

                res.json([{
                    'Performanceplan' : Performance,
                    'Performancecal' : Performancecaltotal,
                    'Potentialplan' : Potential,
                    'Potentialcal' : Potentialcaltotal,
                    'Totalplan' : Total,
                    'Totalcal' : Totalcal,
                    'Graderesult' : Graderesult
                }])

            })
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



////////////////////////////////// Get Summary Potential////////////////////////////////
Router.get("/potential/:ID_Name/:Quator/:Year",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var Quator = req.params.Quator;
    var Year = req.params.Year;

    var sql = "SELECT * FROM login Where ID_Name = ?";
    mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
        if(!err){
            var ID_Company = rows[0].ID_Company;
            var Dept = rows[0].Dept;
            var Section = rows[0].Section;
            
            var sql = "SELECT * FROM summary_evaluation Where ID_Company = ? and Dept = ? and Section = ?";
            mysqlConnection.query(sql,[ID_Company,Dept,Section], (err,rows2,fields)=>{
            var Core = rows2[0].Core;
            var Manegerial = rows2[0].Manegerial;
            
            if (Quator == 'All') {
                var sql2 = "SELECT * from core LEFT JOIN result_core ON result_core.ID_Cores = core.ID_Core Where core.ID_Name = ? and result_core.Year = ?";
            }else{
                var sql2 = "SELECT * from core LEFT JOIN result_core ON result_core.ID_Cores = core.ID_Core Where core.ID_Name = ? and result_core.Year = ? and result_core.Quator=?";
            }
            mysqlConnection.query(sql2,[ID_Name,Year,Quator], (err,rows2,fields)=>{
            var cntcore = rows2.length;
            var ResultSum = 0;
            var TargetSum = 0;
            for (let i = 0; i < cntcore; i++) {
                var ResultCore = rows2[i].Result;
                var TagetCore = rows2[i].Target;
                ResultSum = ResultCore+ResultSum;
                TargetSum = TargetSum+TagetCore;
            }
            var CalResultCore = (ResultSum*Core)/TargetSum;
            var CalWeightsummarycores = CalResultCore.toFixed(2);


            if (Quator == 'All') {
                var sql3 = "SELECT * from managerial LEFT JOIN result_managerial ON result_managerial.ID_Managerials = managerial.ID_Managerial Where managerial.ID_Name = ? and result_managerial.Year = ?";
            } else {
                var sql3 = "SELECT * from managerial LEFT JOIN result_managerial ON result_managerial.ID_Managerials = managerial.ID_Managerial Where managerial.ID_Name = ? and result_managerial.Year = ? and result_managerial.Quator=?";
            }
            
            mysqlConnection.query(sql3,[ID_Name,Year,Quator], (err,rows3,fields)=>{
            var cntmana = rows3.length;
            var ResultmanaSum = 0;
            var TargetmanaSum = 0;
            for (let i = 0; i < cntmana; i++) {
            var ResultMana = rows3[i].Result;
            var TagetMana = rows3[i].Target;
            ResultmanaSum = ResultMana+ResultmanaSum;
            TargetmanaSum = TagetMana+TargetmanaSum;
            }
            var CalWeightsummarymana = (ResultmanaSum*Manegerial)/TargetmanaSum;
            var CalWeightsummarysmana = CalWeightsummarymana.toFixed(2);
            res.json([{
                'Coreplan' : Core,
                'Coresummary' : CalWeightsummarycores,
                'Manaderialplan' : Manegerial,
                'Managerialsummary' : CalWeightsummarysmana
            }])
            })
            })
            })
        }else{
            console.log(err);
            }
        })
})
module.exports = Router;




////////////////////////////////// Get Summary Performance////////////////////////////////
Router.get("/performance/:ID_Name/:Quator/:Year",(req,res)=>{
    var ID_Name = req.params.ID_Name;
    var Quator = req.params.Quator;
    var Year = req.params.Year;

    var sql = "SELECT * FROM login Where ID_Name = ?";
    mysqlConnection.query(sql,[ID_Name], (err,rows,fields)=>{
        if(!err){
            var ID_Company = rows[0].ID_Company;
            var Dept = rows[0].Dept;
            var Section = rows[0].Section;
            
            var sql2 = "SELECT * FROM summary_evaluation Where ID_Company = ? and Dept = ? and Section = ?";
            mysqlConnection.query(sql2,[ID_Company,Dept,Section], (err,rows2,fields)=>{
            var KPI_Dept = rows2[0].KPI_Dept;
            var KPI_Section = rows2[0].KPI_Section;
            var KPI_Individual = rows2[0].KPI_Individual;
            
            //// Cal KPI Dept////
            if (Quator == 'All') {
                var sql3 = "SELECT * from kpi_dept LEFT JOIN result_kpidept ON result_kpidept.ID_KPIDepts = kpi_dept.ID_KPIDept Where kpi_dept.ID_Company = ? and kpi_dept.Dept = ? and result_kpidept.Year = ?";
            }else{
                var sql3 = "SELECT * from kpi_dept LEFT JOIN result_kpidept ON result_kpidept.ID_KPIDepts = kpi_dept.ID_KPIDept Where kpi_dept.ID_Company = ? and kpi_dept.Dept = ? and result_kpidept.Year = ? and result_kpidept.Quator=?";
            }
            mysqlConnection.query(sql3,[ID_Company,Dept,Year,Quator], (err,rows3,fields)=>{
            var cntkpidept = rows3.length;
            var A = 0;
            var WeightScoreplan = 0;
            var WeightScorecal = 0;

            for (let i = 0; i < cntkpidept; i++) {
            var WeightScore = rows3[i].WeightScore;
            var Weight = rows3[i].Weight;
            var ResultScore = rows3[i].ResultScore;
                A = (Weight*5)*100;
                WeightScoreplan = A+WeightScoreplan;
                WeightScorecal = WeightScore + WeightScorecal;
            }
            var CalWeight = (WeightScorecal/WeightScoreplan)*100;
            var CalWeights = CalWeight.toFixed(2);
            var CalWeightsummary = (KPI_Dept*CalWeights)/100;
            var CalWeightsummarys = CalWeightsummary.toFixed(2)

            //// Cal KPI Section////
            if (Quator == 'All') {
                var sql4 = "SELECT * from kpi_section LEFT JOIN result_kpisection ON result_kpisection.ID_KPISections = kpi_section.ID_KPISec Where kpi_section.ID_Company = ?  and kpi_section.Dept = ? and kpi_section.Section = ? and result_kpisection.Year = ?";
            } else {
                var sql4 = "SELECT * from kpi_section LEFT JOIN result_kpisection ON result_kpisection.ID_KPISections = kpi_section.ID_KPISec Where kpi_section.ID_Company = ? and kpi_section.Dept = ? and kpi_section.Section = ? and result_kpisection.Year = ? and result_kpisection.Quator=?";
            }
            mysqlConnection.query(sql4,[ID_Company,Dept,Section,Year,Quator], (err,rows4,fields)=>{
            var cntkpisec = rows4.length;
            var Asec = 0;
            var WeightScoreplansec = 0;
            var WeightScorecalsec = 0;
            for (let i = 0; i < cntkpisec; i++) {
            var WeightScoresec = rows4[i].WeightScore;
            var Weightsec = rows4[i].Weight;
            var ResultScoresec = rows4[i].ResultScore;
                Asec = (Weightsec*5)*100;
                WeightScoreplansec = Asec+WeightScoreplansec;
                WeightScorecalsec = Weightsec + WeightScorecalsec;
            }
            var CalWeightsec = (WeightScorecalsec/WeightScoreplansec)*100;
            var CalWeightssec = CalWeightsec.toFixed(2);
            var CalWeightsummarysec = (KPI_Section*CalWeightssec)/100;
            var CalWeightsummaryssec = CalWeightsummarysec.toFixed(2);


            //// Cal KPI Individual////
            if (Quator == 'All') {
                var sql5 = "SELECT * from kpi LEFT JOIN result_kpi ON result_kpi.ID_KPIs = kpi.ID_KPI Where kpi.ID_Name = ?  and result_kpi.Year = ?";
            } else {
                var sql5 = "SELECT * from kpi LEFT JOIN result_kpi ON result_kpi.ID_KPIs = kpi.ID_KPI Where kpi.ID_Name = ? and result_kpi.Year = ? and result_kpi.Quator=?";
            }
                        
            mysqlConnection.query(sql5,[ID_Name,Year,Quator], (err,rows5,fields)=>{
            var cntkpiindi = rows5.length;
            var Aindi = 0;
            var WeightScoreplanindi = 0;
            var WeightScorecalindi = 0;
            for (let i = 0; i < cntkpiindi; i++) {
            var WeightScoreindi = rows5[i].WeightScore;
            var Weightindi = rows5[i].WeightScore;
            var ResultScoreindi = rows5[i].WeightScore;
                Aindi = (Weightindi*5)*100;
                WeightScoreplanindi = Aindi+WeightScoreplanindi;
                WeightScorecalindi = Weightindi + WeightScorecalindi;
            }
            var CalWeightindi = (WeightScorecalindi/WeightScoreplanindi)*100;
            var CalWeightsindi = CalWeightindi.toFixed(2);
            var CalWeightsummaryindi = (KPI_Individual*CalWeightsindi)/100;
            var CalWeightsummarysindi = CalWeightsummaryindi.toFixed(2);
            
            res.json([{
                'KPIDeptplan' : KPI_Dept,
                'KPIDeptcal' : CalWeightsummarys,
                'KPISectionplan' : KPI_Section,
                'KPISectioncal' : CalWeightsummaryssec,
                'KPIIndividualplan' : KPI_Individual,
                'KPIIndividualcal' : CalWeightsummarysindi
            }])
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