// mysql -h gmgcjwawatv599gq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com -u rvd8pk44d3y429e3 -p tqqwr7za0fczmnex vtox5woubolsge6o < tranch5_milb.sql

require('dotenv').config()
const express = require('express')
const path = require('path')
const mysql = require('mysql')
const app = express()

app.use(express.static(path.join(__dirname, 'client/build')));

console.log(process.env)
var connection  = mysql.createConnection({
    host: process.env.DB_HOST,
    port: '3306',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
     multipleStatements: true
});

app.get('/api/newPitchList', function(req, res) {
  connection.query(`select 
superPlayerHist.franchise,
superPlayerHist.franchiseName,
superPlayerHist.class,
superPlayerHist.yr,  
superPlayerHist.imgURL,  
superPlayerHist.franchLogo,  
superPlayerHist.team,  
latestPitching.lg,
latestPitching.playerName as playerName,
latestPitching.playerID,
latestPitching.tm as curTeam,
latestPitching.IP - latestPitching.R AS IPER, 
latestPitching.W AS W, 
latestPitching.L AS L,
latestPitching.SV AS SV,
latestPitching.SO AS SO,
latestPitching.H AS H,
latestPitching.HR AS HR,
latestPitching.BB AS BB,
9 * (latestPitching.R / latestPitching.IP) as ERA
from superPlayerHist, latestPitching 
where superPlayerHist.playerID= latestPitching.playerID
and superPlayerHist.class like ?
and superPlayerHist.franchise = ?
and superPlayerHist.yr like ?
order by latestPitching.IP - latestPitching.R desc`,[req.query.c, req.query.f, req.query.y], function (error, results, fields) {
      res.json(results)
    if (error) throw error;
   })
})
app.get('/api/newBatList', function(req, res) {
/*  console.log('newBatList.  ' + JSON.stringify(req.query))*/
  connection.query(`select 
superPlayerHist.franchise,
superPlayerHist.franchiseName,
superPlayerHist.team,
superPlayerHist.yr,
latestBatting.lg,
latestBatting.playerName,
latestBatting.playerID,
latestBatting.tm as curTeam,
latestBatting.AB, 
latestBatting.H, 
latestBatting.HR,
latestBatting.RBI,
latestBatting.R,
latestBatting.BB,
latestBatting.B2,
latestBatting.B3,
latestBatting.TB,
latestBatting.SB,
latestBatting.H / latestBatting.AB as AVG
from superPlayerHist, latestBatting 
where superPlayerHist.playerID= latestBatting.playerID 
and superPlayerHist.franchise = ?
and superPlayerHist.class = ?
and superPlayerHist.yr like ?
order by latestBatting.TB desc`, [req.query.f, req.query.c, req.query.y], function (error, results, fields) {
      /*  console.log(results)*/
      res.json(results)
    if (error) throw error;
   })
})
app.get('/api/teamPitch', function(req, res) {
/*console.log(req.query)*/
  connection.query(`select 
superPlayerHist.franchise,
superPlayerHist.franchiseName,
superPlayerHist.class,
superPlayerHist.an AS lg,
superPlayerHist.yr,  
superPlayerHist.imgURL,  
superPlayerHist.franchLogo,  
superPlayerHist.team,  
count(latestPitching.playerName) as players,
SUM(latestPitching.IP - latestPitching.R) AS IPER, 
SUM(latestPitching.W) AS W, 
SUM(latestPitching.L) AS L,
SUM(latestPitching.SV) AS SV,
SUM(latestPitching.SO) AS SO,
SUM(latestPitching.H) AS H,
SUM(latestPitching.HR) AS HR,
SUM(latestPitching.BB) AS BB,
SUM(9 * (latestPitching.R / latestPitching.IP)) as ERA
from superPlayerHist, latestPitching 
where superPlayerHist.playerID= latestPitching.playerID 
and superPlayerHist.class like ?
and superPlayerHist.yr like ?
group by superPlayerHist.class , superPlayerHist.franchise, superPlayerHist.yr
order by SUM(latestPitching.IP - latestPitching.R) desc limit 40`, [req.query.cl, req.query.yr],function (error, results, fields) {
 /*   console.log(results)*/
      res.json(results)
    if (error) throw error;
   });
})

app.get('/api/teamBat', function(req, res) {
/*console.log(req.query)*/
  connection.query(`select 
superPlayerHist.franchise,
superPlayerHist.franchiseName,
superPlayerHist.class,
superPlayerHist.an AS lg,
superPlayerHist.yr,  
superPlayerHist.imgURL,  
superPlayerHist.franchLogo,  
superPlayerHist.team,  
count(latestBatting.playerName) as players,
SUM(latestBatting.AB) AS AB, 
SUM(latestBatting.H) AS H, 
SUM(latestBatting.HR) AS HR,
SUM(latestBatting.RBI) AS RBI,
SUM(latestBatting.R) AS R,
SUM(latestBatting.BB) AS BB,
SUM(latestBatting.B2) AS B2,
SUM(latestBatting.B3) AS B3,
SUM(latestBatting.TB) AS TB,
SUM(latestBatting.SB) AS B3,
SUM(latestBatting.H / latestBatting.AB) as AVG
from superPlayerHist, latestBatting 
where superPlayerHist.playerID= latestBatting.playerID 
and superPlayerHist.class like ?
and superPlayerHist.yr like ?
group by superPlayerHist.class , superPlayerHist.franchise, superPlayerHist.yr
order by SUM(latestBatting.TB) desc limit 40`, [req.query.cl, req.query.yr],function (error, results, fields) {
 /*   console.log(results)*/
      res.json(results)
    if (error) throw error;
   });

})
app.get('/api/yesterdayPitching', function(req, res) {
  connection.query(`SELECT
latestPitching.playerID,
latestPitching.playerName,
latestPitching.tm,
latestPitching.lg,
SUM(latestPitching.W - secondLatestPitching.W) as W,
SUM(latestPitching.L - secondLatestPitching.L) as L,
SUM(latestPitching.G - secondLatestPitching.G) as G,
SUM(latestPitching.GS - secondLatestPitching.GS) as GS,
SUM(latestPitching.GF - secondLatestPitching.GF) as GF,
SUM(latestPitching.CG - secondLatestPitching.CG) as CG,
SUM(latestPitching.SHO - secondLatestPitching.SHO) as SHO,
SUM(latestPitching.SV - secondLatestPitching.SV) as SV,
SUM(latestPitching.IP - secondLatestPitching.IP) as IP,
SUM(latestPitching.H - secondLatestPitching.H) as H,
SUM(latestPitching.R - secondLatestPitching.R) as R,
SUM(latestPitching.HR - secondLatestPitching.HR) as HR,
SUM(latestPitching.BB - secondLatestPitching.BB) as BB,
SUM(latestPitching.IBB - secondLatestPitching.IBB) as IBB,
SUM(latestPitching.SO - secondLatestPitching.SO) as SO,
SUM(latestPitching.HBP - secondLatestPitching.HBP) as HBP,
SUM(latestPitching.BK - secondLatestPitching.BK) as BK,
SUM(latestPitching.WP - secondLatestPitching.WP) as WP,
SUM(latestPitching.BF - secondLatestPitching.BF) as BF
FROM latestPitching, secondLatestPitching
WHERE latestPitching.playerID = secondLatestPitching.playerID
group by latestPitching.playerID
ORDER BY SUM((latestPitching.IP - secondLatestPitching.IP) - (latestPitching.H - secondLatestPitching.H)) DESC limit 40`, function (error, results, fields) {
      res.json(results)
    if (error) throw error;
   })
})
app.get('/api/yesterdayBatting', function(req, res) {
  connection.query(`SELECT
latestBatting.playerID,
latestBatting.playerName,
SUM(latestBatting.G - secondLatestBatting.G) as G,
SUM(latestBatting.PA - secondLatestBatting.PA) as PA,
SUM((latestBatting.TB - secondLatestBatting.TB) + (latestBatting.RBI - secondLatestBatting.RBI))  as TBRBI,
SUM(latestBatting.AB - secondLatestBatting.AB) as AB,
SUM(latestBatting.R - secondLatestBatting.R) as R,
SUM(latestBatting.H - secondLatestBatting.H) as H,
SUM(latestBatting.B2 - secondLatestBatting.B2) as B2,
SUM(latestBatting.B3 - secondLatestBatting.B3) as B3,
SUM(latestBatting.HR - secondLatestBatting.HR) as HR,
SUM(latestBatting.RBI - secondLatestBatting.RBI) as RBI,
SUM(latestBatting.SB - secondLatestBatting.SB) as SB,
SUM(latestBatting.CS - secondLatestBatting.CS) as CS,
SUM(latestBatting.BB - secondLatestBatting.BB) as BB,
SUM(latestBatting.SO - secondLatestBatting.SO) as SO,
SUM(latestBatting.TB - secondLatestBatting.TB) as TB,
SUM(latestBatting.GDP - secondLatestBatting.GDP) as GDP,
SUM(latestBatting.SH - secondLatestBatting.SH) as SH,
SUM(latestBatting.SF - secondLatestBatting.SF) as SF,
SUM(latestBatting.IBB - secondLatestBatting.IBB) as IBB,
SUM(latestBatting.POS - secondLatestBatting.POS) as POS
FROM latestBatting, secondLatestBatting
WHERE latestBatting.playerID = secondLatestBatting.playerID
group by latestBatting.playerID
ORDER BY SUM((latestBatting.TB - secondLatestBatting.TB) + (latestBatting.RBI - secondLatestBatting.RBI)) DESC LIMIT 40
`, function (error, results, fields) {
      res.json(results)
    if (error) throw error;
   })
})
app.get('/api/oneDay', function(req, res) {
console.log(req.query)
  connection.query(`select 
superPlayerHist.franchise,
superPlayerHist.franchiseName,
superPlayerHist.class,
superPlayerHist.an AS lg,
superPlayerHist.yr,  
superPlayerHist.imgURL,  
superPlayerHist.franchLogo,  
superPlayerHist.team,  
count(oneDayBatting.playerName) as players,
SUM(oneDayBatting.AB) AS AB, 
SUM(oneDayBatting.H) AS H, 
SUM(oneDayBatting.HR) AS HR,
SUM(oneDayBatting.RBI) AS RBI,
SUM(oneDayBatting.R) AS R,
SUM(oneDayBatting.BB) AS BB,
SUM(oneDayBatting.B2) AS B2,
SUM(oneDayBatting.B3) AS B3,
SUM(oneDayBatting.TB) AS TB,
SUM(oneDayBatting.SB) AS B3,
SUM(oneDayBatting.H / oneDayBatting.AB) as AVG
from superPlayerHist, oneDayBatting 
where superPlayerHist.playerID= oneDayBatting.playerID 
and oneDayBatting.AB > 1
and superPlayerHist.class like ?
and superPlayerHist.yr like ?
group by superPlayerHist.class , superPlayerHist.franchise, superPlayerHist.yr
order by SUM(oneDayBatting.TB) desc limit 40`, [req.query.cl, req.query.yr],function (error, results, fields) {
 /*   console.log(results)*/
      res.json(results)
    if (error) throw error;
   });
})
const port = process.env.PORT || 5001;
app.listen(port);
console.log(`Listening on ${port}`);




















