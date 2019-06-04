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
finalHist.franchise,
finalHist.franchiseName,
finalHist.majLg,
finalHist.class,
finalHist.yr,  
finalHist.imgURL,  
finalHist.franchLogo,  
finalHist.tmName,  
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
from finalHist, latestPitching 
where finalHist.playerID= latestPitching.playerID
and finalHist.class like ?
and finalHist.franchise = ?
and finalHist.yr like ?
group by playerID
order by latestPitching.IP - latestPitching.R desc`,[req.query.c, req.query.f, req.query.y], function (error, results, fields) {
      res.json(results)
    if (error) throw error;
   })
})
app.get('/api/playerPitchYest', function(req, res) {
/*  console.log('newBatList.  ' + JSON.stringify(req.query))*/
  connection.query(`select 
finalHist.franchise,
finalHist.franchiseName,
finalHist.majLg,
finalHist.class,
finalHist.yr,  
finalHist.imgURL,  
finalHist.franchLogo,  
finalHist.tmName,  
odp.lg,
odp.playerName as playerName,
odp.playerID,
odp.tm as curTeam,
odp.IP - odp.R AS IPER, 
odp.W AS W, 
odp.L AS L,
odp.SV AS SV,
odp.SO AS SO,
odp.H AS H,
odp.HR AS HR,
odp.BB AS BB,
9 * (odp.R / odp.IP) as ERA
from finalHist, odp 
where finalHist.playerID= odp.playerID
and finalHist.class like ?
and finalHist.franchise = ?
and finalHist.yr like ?
group by playerID
order by odp.IP - odp.R desc`, [req.query.c, req.query.f, req.query.y], function (error, results, fields) {
        console.log(results)
      res.json(results)
    if (error) throw error;
   })
})

app.get('/api/playerBatSeason', function(req, res) {
  console.log(JSON.stringify(req.query))
  connection.query(`select 
finalHist.franchise,
finalHist.franchiseName,
finalHist.majLg,
finalHist.class,
finalHist.yr,  
finalHist.imgURL,  
finalHist.franchLogo,  
finalHist.tmName,  
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
from finalHist, latestBatting 
where finalHist.playerID= latestBatting.playerID 
and finalHist.franchise = ?
and finalHist.class = ?
and finalHist.yr like ?
group by playerID
order by latestBatting.TB desc`, [req.query.f, req.query.c, req.query.y], function (error, results, fields) {
   /*     console.log(results)*/
      res.json(results)
    if (error) throw error;
   })
})
app.get('/api/playerBatYest', function(req, res) {
/*  console.log('newBatList.  ' + JSON.stringify(req.query))*/
  connection.query(`select 
finalHist.franchise,
finalHist.franchiseName,
finalHist.majLg,
finalHist.class,
finalHist.yr,  
finalHist.imgURL,  
finalHist.franchLogo,  
finalHist.tmName,  
odb.playerName,
odb.playerID,
odb.AB, 
odb.H, 
odb.HR,
odb.RBI,
odb.R,
odb.BB,
odb.B2,
odb.B3,
odb.TB,
odb.SB,
odb.H / odb.AB as AVG
from finalHist, odb 
where finalHist.playerID= odb.playerID 
and finalHist.franchise = ?
and finalHist.class = ?
and finalHist.yr like ?
group by playerID
order by odb.TB desc`, [req.query.f, req.query.c, req.query.y], function (error, results, fields) {
      /*  console.log(results)*/
      res.json(results)
    if (error) throw error;
   })
})
app.get('/api/teamPitchSeason', function(req, res) {
/*console.log(req.query)*/
  connection.query(`select 
finalHist.franchise,
finalHist.franchiseName,
finalHist.majLg,
finalHist.class,
finalHist.yr,  
finalHist.imgURL,  
finalHist.franchLogo,  
finalHist.tmName,  
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
from finalHist, latestPitching 
where finalHist.playerID= latestPitching.playerID 
and finalHist.class like ?
and finalHist.yr like ?
group by finalHist.class , finalHist.franchise, finalHist.yr
order by SUM(latestPitching.IP - latestPitching.R) desc limit 40`, [req.query.cl, req.query.yr],function (error, results, fields) {
 /*   console.log(results)*/
      res.json(results)
    if (error) throw error;
   });
})

app.get('/api/teamPitchYest', function(req, res) {
  connection.query(`select 
finalHist.franchise,
finalHist.franchiseName,
finalHist.majLg,
finalHist.class,
finalHist.yr,  
finalHist.imgURL,  
finalHist.franchLogo,  
finalHist.tmName,  
count(odp.playerName) as players,
SUM(odp.IP - odp.R) AS IPER, 
SUM(odp.W) AS W, 
SUM(odp.L) AS L,
SUM(odp.SV) AS SV,
SUM(odp.SO) AS SO,
SUM(odp.H) AS H,
SUM(odp.HR) AS HR,
SUM(odp.BB) AS BB,
SUM(9 * (odp.R / odp.IP)) as ERA
from finalHist, odp 
where finalHist.playerID= odp.playerID 
and finalHist.class like ?
and finalHist.yr like ?
group by finalHist.class , finalHist.franchise, finalHist.yr
order by SUM(odp.IP - odp.R) desc limit 40`,[req.query.cl, req.query.yr], function (error, results, fields) {
      res.json(results)
    if (error) throw error;
   })
})

app.get('/api/teamBatSeason', function(req, res) {
/*console.log(req.query)*/
  connection.query(`select 
finalHist.franchise,
finalHist.franchiseName,
finalHist.majLg,
finalHist.class,
finalHist.yr,  
finalHist.imgURL,  
finalHist.franchLogo,  
finalHist.tmName,  
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
SUM(latestBatting.SB) AS SB,
SUM(latestBatting.H) / SUM(latestBatting.AB) as AVG
from finalHist, latestBatting 
where finalHist.playerID= latestBatting.playerID 
and finalHist.class like ?
and finalHist.yr like ?
group by finalHist.class , finalHist.franchise, finalHist.yr
order by SUM(latestBatting.TB) desc limit 40`, [req.query.cl, req.query.yr],function (error, results, fields) {

      res.json(results)
    if (error) throw error;
   });
})
app.get('/api/teamBatYest', function(req, res) {
console.log(req.query)
  connection.query(`select 
finalHist.franchise,
finalHist.franchiseName,
finalHist.majLg,
finalHist.class,
finalHist.yr,  
finalHist.imgURL,  
finalHist.franchLogo,  
finalHist.tmName,  
count(odb.playerName) as players,
SUM(odb.AB) AS AB, 
SUM(odb.H) AS H, 
SUM(odb.HR) AS HR,
SUM(odb.RBI) AS RBI,
SUM(odb.R) AS R,
SUM(odb.BB) AS BB,
SUM(odb.B2) AS B2,
SUM(odb.B3) AS B3,
SUM(odb.TB) AS TB,
SUM(odb.SB) AS SB,
SUM(odb.H / odb.AB) as AVG
from finalHist, odb 
where finalHist.playerID= odb.playerID 
and finalHist.class like ?
and finalHist.yr like ?
group by finalHist.class , finalHist.franchise, finalHist.yr
order by SUM(odb.TB) desc limit 40`, [req.query.cl, req.query.yr],function (error, results, fields) {

      res.json(results)
    if (error) throw error;
   });
})

const port = process.env.PORT || 5001;
app.listen(port);
console.log(`Listening on ${port}`);




















