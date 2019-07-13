

require('dotenv').config()
const mysql = require('mysql')
const express = require('express')
const path = require('path')
const fs = require('fs')
var Moniker = require('moniker');
var bodyParser = require('body-parser');
var os = require('os')
const app = express()
const myPlayersSql = require('./sql/myTeamPlayersSeason.js')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

console.log(myPlayersSql)
console.log(os.userInfo())
app.use(express.static(path.join(__dirname, 'client/build')));

var connection  = mysql.createConnection({
    host: process.env.DB_HOST,
    port: '3306',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
     multipleStatements: true
});
app.post('/api/user', function(req, res) {
console.log(req.body)
  connection.query(`DELETE FROM users where userName = ?;
    INSERT INTO users(userName, email, myAAA, myAA, myAPlus, myA, myAMinus, myRk)VALUES(?,?,?,?,?,?,?,?)`,
    [req.body.userName,req.body.userName, req.body.email, req.body.team.myAAA, req.body.team.myAA, req.body.team.myAPlus, req.body.team.myA, req.body.team.myAMinus, req.body.team.myRk]
    , function (error, results, fields) {
      res.json(results)
    if (error) throw error;
   })
})
// Check for user
app.get('/api/myPlayers/', function(req, res) {
  connection.query(myPlayersSql, 'Lopsided Thing', function (error, results, fields) {
        console.log(results)
      res.json(results)
    if (error) throw error;
   })
})

app.get('/api/randomName/', function(req, res) {
  var names = Moniker.generator([Moniker.adjective, Moniker.noun]);
res.json(names.choose())
})

// Retrieve pitch data for getPlayerList
app.get('/api/playerPitchSeason', function(req, res) {
  connection.query(`select 
finalHist.franchise,
finalHist.franchiseName,
finalHist.majLg,
finalHist.class,
finalHist.yr,  
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
and finalHist.yr > 2012
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
and finalHist.yr > 2012
group by playerID
order by odp.IP - odp.R desc`, [req.query.c, req.query.f, req.query.y], function (error, results, fields) {
   /*     console.log(results)*/
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
finalHist.logoPNG,  
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
SUM(latestBatting.TB + latestBatting.RBI) AS TBRBI,
FORMAT(latestBatting.H / latestBatting.AB,3) as AVG
from finalHist, latestBatting 
where latestBatting.AB > 0
and finalHist.playerID= latestBatting.playerID 
and finalHist.franchise = ?
and finalHist.class = ?
and finalHist.yr like ?
and finalHist.yr > 2012
group by playerID
order by latestBatting.TB desc`, [req.query.f, req.query.c, req.query.y], function (error, results, fields) {
   /*     console.log(results)*/
      res.json(results)
    if (error) throw error;
   })
})
app.get('/api/playerBatYest', function(req, res) {
  console.log('newBatList.  ' + JSON.stringify(req.query))
  connection.query(`select 
finalHist.franchise,
finalHist.franchiseName,
finalHist.majLg,
finalHist.class,
finalHist.yr,  
finalHist.logoPNG,  
finalHist.franchLogo,  
finalHist.tmName,  
odb.lg,  
odb.playerName,
odb.tm as curTeam,
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
SUM(odb.TB + odb.RBI) AS TBRBI,
FORMAT(odb.H / odb.AB, 3) as AVG
from finalHist, odb 
where odb.AB > 0
and finalHist.playerID= odb.playerID 
and finalHist.franchise = ?
and finalHist.class = ?
and finalHist.yr like ?
and finalHist.yr > 2012
group by playerID
order by SUM(odb.TB + odb.RBI) desc`, [req.query.f, req.query.c, req.query.y], function (error, results, fields) {
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
finalHist.logoPNG,
finalHist.franchLogo,  
finalHist.tmName,  
count(DISTINCT latestPitching.playerName) as players,
ROUND(SUM(latestPitching.IP - latestPitching.R)) AS IPER, 
ROUND(SUM(latestPitching.W)) AS W, 
ROUND(SUM(latestPitching.L)) AS L,
ROUND(SUM(latestPitching.SV)) AS SV,
ROUND(SUM(latestPitching.SO)) AS SO,
ROUND(SUM(latestPitching.H)) AS H,
ROUND(SUM(latestPitching.HR)) AS HR,
ROUND(SUM(latestPitching.BB)) AS BB,
9 * (SUM(latestPitching.R) / (latestPitching.IP)) as ERA
from finalHist, latestPitching 
where finalHist.playerID= latestPitching.playerID 
and finalHist.class like ?
and finalHist.yr like ?
and finalHist.yr > 2012
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
finalHist.logoPNG,  
finalHist.franchLogo,  
finalHist.tmName,  
count(DISTINCT odp.playerName) as players,
SUM(odp.IP - odp.R) AS IPER, 
ROUND(SUM(odp.W)) AS W, 
ROUND(SUM(odp.L)) AS L,
ROUND(SUM(odp.SV)) AS SV,
ROUND(SUM(odp.SO)) AS SO,
ROUND(SUM(odp.H)) AS H,
ROUND(SUM(odp.HR)) AS HR,
ROUND(SUM(odp.BB)) AS BB,
9 * (SUM(odp.R) / SUM(odp.IP)) as ERA
from finalHist, odp 
where finalHist.playerID= odp.playerID 
and finalHist.class like ?
and finalHist.yr like ?
and finalHist.yr > 2012
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
finalHist.logoPNG, 
finalHist.franchLogo,  
finalHist.tmName,  
count(DISTINCT latestBatting.playerName) as players,
ROUND(SUM(latestBatting.AB)) AS AB, 
ROUND(SUM(latestBatting.H)) AS H, 
ROUND(SUM(latestBatting.HR)) AS HR,
ROUND(SUM(latestBatting.RBI)) AS RBI,
ROUND(SUM(latestBatting.R)) AS R,
ROUND(SUM(latestBatting.BB)) AS BB,
ROUND(SUM(latestBatting.B2)) AS B2,
ROUND(SUM(latestBatting.B3)) AS B3,
ROUND(SUM(latestBatting.TB)) AS TB,
ROUND(SUM(latestBatting.SB)) AS SB,
ROUND(SUM(latestBatting.TB) + SUM(latestBatting.RBI)) AS TBRBI,
FORMAT(SUM(latestBatting.H) / SUM(latestBatting.AB), 3) as AVG
from finalHist, latestBatting 
where finalHist.playerID= latestBatting.playerID 
and finalHist.class like ?
and finalHist.yr like ?
and finalHist.yr > 2012
group by finalHist.tmName, finalHist.yr
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
finalHist.logoPNG, 
finalHist.franchLogo,  
finalHist.tmName,  
count(DISTINCT odb.playerName) as players,
ROUND(SUM(odb.AB)) AS AB, 
ROUND(SUM(odb.H)) AS H, 
ROUND(SUM(odb.HR)) AS HR,
ROUND(SUM(odb.RBI)) AS RBI,
ROUND(SUM(odb.R)) AS R,
ROUND(SUM(odb.BB)) AS BB,
ROUND(SUM(odb.B2)) AS B2,
ROUND(SUM(odb.B3)) AS B3,
ROUND(SUM(odb.TB)) AS TB,
ROUND(SUM(odb.SB)) AS SB,
ROUND(SUM(odb.TB) + SUM(odb.RBI)) AS TBRBI,
FORMAT(SUM(odb.H) / SUM(odb.AB),3) as AVG
from finalHist, odb 
where odb.AB > 0
and finalHist.playerID= odb.playerID 
and finalHist.class like ?
and finalHist.yr like ?
and finalHist.yr > 2012
group by finalHist.tmName, finalHist.yr
order by SUM(odb.TB) desc limit 40;`, [req.query.cl, req.query.yr],function (error, results, fields) {
      res.json(results)
    if (error) throw error;
   });
})
app.get('/api/minorMaster', function(req, res) {
console.log(req.query)
  connection.query(`select  distinct tmName, yr, franchise, class, majLg, league, franchiseName, franchLogo, logoPNG 
from finalHist where yr > 2012 and yr < 2019 group by tmName`,function (error, results, fields) {
      res.json(results)
    if (error) throw error;
   });
})
app.get('/api/minorYears', function(req, res) {
console.log(req.query)
  connection.query(`select distinct tmName, finalHist.yr from finalHist where finalHist.yr > 2012 and finalHist.yr < 2019  order by finalHist.tmName`,function (error, results, fields) {
    
      res.json(results)
    if (error) throw error;
   });
})
app.get('/api/teamYrs', function(req, res) {
console.log(req.query)
  connection.query(`select distinct finalHist.yr from finalHist where finalHist.yr > 2012 and finalHist.yr < 2019 and tmName = ? order by finalHist.yr desc`,[req.query.tm],function (error, results, fields) {
console.log(results)
      res.json(results)
    if (error) throw error;
   });
})
app.get('/api/getMyTeam', function(req, res) {
console.log(req.query)
  connection.query(`select 
finalHist.franchise,
finalHist.franchiseName,
finalHist.majLg,
finalHist.class,
finalHist.yr,  
finalHist.logoPNG,  
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
SUM(latestBatting.TB + latestBatting.RBI) AS TBRBI,
FORMAT(latestBatting.H / latestBatting.AB,3) as AVG
from finalHist, latestBatting 
where latestBatting.AB > 0
and finalHist.playerID= latestBatting.playerID 
and finalHist.tmName= ? 
and finalHist.yr = ? 
group by playerID
order by latestBatting.TB desc`,[req.query.tm, req.query.yr],function (error, results, fields) {
console.log(results)
      res.json(results)
    if (error) throw error;
   });
})


const port = process.env.PORT || 5001;
app.listen(port);
console.log(`Listening on ${port}`);














