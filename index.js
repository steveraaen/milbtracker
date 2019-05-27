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
// Retrieve pitch data for getPlayerList
app.get('/api/playerPitchSeason', function(req, res) {
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
app.get('/api/playerPitchYest', function(req, res) {
/*  console.log('newBatList.  ' + JSON.stringify(req.query))*/
  connection.query(`select 
superPlayerHist.franchise,
superPlayerHist.franchiseName,
superPlayerHist.class,
superPlayerHist.yr,  
superPlayerHist.imgURL,  
superPlayerHist.franchLogo,  
superPlayerHist.team,  
oneDayPitching.lg,
oneDayPitching.playerName as playerName,
oneDayPitching.playerID,
oneDayPitching.tm as curTeam,
oneDayPitching.IP - oneDayPitching.R AS IPER, 
oneDayPitching.W AS W, 
oneDayPitching.L AS L,
oneDayPitching.SV AS SV,
oneDayPitching.SO AS SO,
oneDayPitching.H AS H,
oneDayPitching.HR AS HR,
oneDayPitching.BB AS BB,
9 * (oneDayPitching.R / oneDayPitching.IP) as ERA
from superPlayerHist, oneDayPitching 
where superPlayerHist.playerID= oneDayPitching.playerID
and superPlayerHist.class like ?
and superPlayerHist.franchise = ?
and superPlayerHist.yr like ?
order by oneDayPitching.IP - oneDayPitching.R desc`, [req.query.f, req.query.c, req.query.y], function (error, results, fields) {
      /*  console.log(results)*/
      res.json(results)
    if (error) throw error;
   })
})

app.get('/api/playerBatSeason', function(req, res) {
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
app.get('/api/playerBatYest', function(req, res) {
/*  console.log('newBatList.  ' + JSON.stringify(req.query))*/
  connection.query(`select 
superPlayerHist.franchise,
superPlayerHist.franchiseName,
superPlayerHist.team,
superPlayerHist.yr,
superPlayerHist.class,
oneDayBatting.playerName,
oneDayBatting.playerID,
oneDayBatting.AB, 
oneDayBatting.H, 
oneDayBatting.HR,
oneDayBatting.RBI,
oneDayBatting.R,
oneDayBatting.BB,
oneDayBatting.B2,
oneDayBatting.B3,
oneDayBatting.TB,
oneDayBatting.SB,
oneDayBatting.H / oneDayBatting.AB as AVG
from superPlayerHist, oneDayBatting 
where superPlayerHist.playerID= oneDayBatting.playerID 
and superPlayerHist.franchise = ?
and superPlayerHist.class = ?
and superPlayerHist.yr like ?
order by oneDayBatting.TB desc`, [req.query.f, req.query.c, req.query.y], function (error, results, fields) {
      /*  console.log(results)*/
      res.json(results)
    if (error) throw error;
   })
})
app.get('/api/teamPitchSeason', function(req, res) {
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

app.get('/api/teamPitchYest', function(req, res) {
  connection.query(`select 
superPlayerHist.franchise,
superPlayerHist.franchiseName,
superPlayerHist.class,
superPlayerHist.an AS lg,
superPlayerHist.yr,  
superPlayerHist.imgURL,  
superPlayerHist.franchLogo,  
superPlayerHist.team,  
count(oneDayPitching.playerName) as players,
SUM(oneDayPitching.IP - oneDayPitching.R) AS IPER, 
SUM(oneDayPitching.W) AS W, 
SUM(oneDayPitching.L) AS L,
SUM(oneDayPitching.SV) AS SV,
SUM(oneDayPitching.SO) AS SO,
SUM(oneDayPitching.H) AS H,
SUM(oneDayPitching.HR) AS HR,
SUM(oneDayPitching.BB) AS BB,
SUM(9 * (oneDayPitching.R / oneDayPitching.IP)) as ERA
from superPlayerHist, oneDayPitching 
where superPlayerHist.playerID= oneDayPitching.playerID 
and superPlayerHist.class like ?
and superPlayerHist.yr like ?
group by superPlayerHist.class , superPlayerHist.franchise, superPlayerHist.yr
order by SUM(oneDayPitching.IP - oneDayPitching.R) desc limit 40`,[req.query.cl, req.query.yr], function (error, results, fields) {
      res.json(results)
    if (error) throw error;
   })
})

app.get('/api/teamBatSeason', function(req, res) {
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

      res.json(results)
    if (error) throw error;
   });
})
app.get('/api/teamBatYest', function(req, res) {
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
and superPlayerHist.class like ?
and superPlayerHist.yr like ?
group by superPlayerHist.class , superPlayerHist.franchise, superPlayerHist.yr
order by SUM(oneDayBatting.TB) desc limit 40`, [req.query.cl, req.query.yr],function (error, results, fields) {

      res.json(results)
    if (error) throw error;
   });
})

const port = process.env.PORT || 5001;
app.listen(port);
console.log(`Listening on ${port}`);




















