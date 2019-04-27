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

app.get('/api/allMinors', function(req, res) {

  connection.query('select * from newMinors where franchise IS NOT NULL', function (error, results, fields) {
 /*   console.log(results)*/
    	res.json(results)


    if (error) throw error;
   });
})
app.get('/api/newBatList', function(req, res) {
  console.log(req.query)
  connection.query(`select 
playerHistory.franchise,
playerHistory.Lev,
playerHistory.Tm,
playerHistory.yr,  
latestBatting.playerName,
latestBatting.H, 
latestBatting.HR,
latestBatting.RBI,
latestBatting.R,
latestBatting.BB,
latestBatting.2B,
latestBatting.3B,
latestBatting.TB,
latestBatting.SB,
latestBatting.H / latestBatting.AB as avg
from playerHistory, latestBatting 
where playerHistory.playercode= latestBatting.playerCode 
and playerHistory.franchise = 'NYM'
and playerHistory.Lev = 'AAA'
and playerHistory.yr = 2018
order by latestBatting.TB desc`, [req.query.f, req.query.c, req.query.y, req.query.y], function (error, results, fields) {

    /*    console.log(results)*/
      res.json(results)
    if (error) throw error;
   })
})
app.get('/api/teamSummary', function(req, res) {

  connection.query(`select 
newMaster.franchise,
newMaster.class1,
newMaster.class2,
newMaster.class3,
newMaster.class4,
newMaster.yr,  
newMaster.logo,  
newMaster.franchiseLogo,  
count(latestBatting.playerName) as players,
SUM(latestBatting.AB) AS AB, 
SUM(latestBatting.H) AS H, 
SUM(latestBatting.HR) AS HR,
SUM(latestBatting.RBI) AS RBI,
SUM(latestBatting.R) AS R,
SUM(latestBatting.BB) AS BB,
SUM(latestBatting.2B) AS 2B,
SUM(latestBatting.3B) AS 3B,
SUM(latestBatting.TB) AS TB,
SUM(latestBatting.SB) AS 3B,
SUM(latestBatting.H / latestBatting.AB) as AVG
from newMaster, latestBatting 
where newMaster.playerID= latestBatting.playerCode 
and   'AAA' IN (newMaster.class1, newMaster.class2, newMaster.class3, newMaster.class4)
group by  'AAA' IN (newMaster.class1, newMaster.class2, newMaster.class3, newMaster.class4), franchise, yr
order by latestBatting.TB desc`, [/*req.query.f,*/ req.query.c, req.query.c],function (error, results, fields) {
 /*   console.log(results)*/
      res.json(results)


    if (error) throw error;
   });
})
app.get('/api/newPitchList', function(req, res) {
  connection.query(`select 
playerHistory.franchise,
playerHistory.Lev,
playerHistory.Tm,
playerHistory.yr,  
latestPitching.playerName,
latestPitching.W, 
latestPitching.L,
latestPitching.G,
latestPitching.IP,
latestPitching.H,
latestPitching.ER,
latestPitching.BB,
latestPitching.SO,
latestPitching.HBP,
9 * (latestPitching.ER + latestPitching.ER) / (latestPitching.IP + latestPitching.IP) as ERA
from playerHistory, latestPitching 
where playerHistory.playercode= latestPitching.playerCode 
and playerHistory.franchise = 'NYM'
and playerHistory.Lev = 'AAA'
and playerHistory.yr = 2015
order by latestPitching.IP desc`, function (error, results, fields) {

    /*    console.log(results)*/
      res.json(results)
    if (error) throw error;
   })
})
app.get('/api/newBestMinorsBat', function(req, res) {
  connection.query(`select * from battingSummary19`, function (error, results, fields) {

    /*    console.log(results)*/
      res.json(results)
    if (error) throw error;
   })
})
app.get('/api/newBestMinorsPitch', function(req, res) {
  connection.query(`select * from pitchingSummary19`, function (error, results, fields) {

    /*    console.log(results)*/
      res.json(results)
    if (error) throw error;
   })
})
// Find out which minor league team has produced the most major leaguers in year xxxx
/*app.get('/api/bestMinors', function(req, res) {
  connection.query(`select newMinors.team, newMinors.logo, count(distinct newPlayerMaster.playerID) as playerCount, newPlayerMaster.franchise, newPlayerMaster.yr
from newPlayerMaster, newMinors, batting18
where newPlayerMaster.classes REGEXP ? 
and batting18.teamID = newPlayerMaster.franchise
and batting18.lgID REGEXP ?
and newMinors.class = ?
and newPlayerMaster.yr = ?
and newMinors.franchise = newPlayerMaster.franchise
group by newMinors.team
order by count(newPlayerMaster.playerName) desc`, [req.query.m, req.query.d, req.query.p, req.query.y], function (error, results, fields) {
    console.log(results)
      res.json(results)


    if (error) throw error;
   });
})*/
app.get('/api/batterList', function(req, res) {
/*  console.log(req.query)*/
  connection.query(`select distinct newPlayerMaster.playerName, newPlayerMaster.yr AS YR, latestBatting.lg, latestBatting.G, 
    latestBatting.AB, latestBatting.H, (latestBatting.H/latestBatting.AB) as AVG, latestBatting.2B, 
    latestBatting.3B, latestBatting.HR, latestBatting.Tm,
    latestBatting.RBI, latestBatting.SB, latestBatting.BB, latestBatting.SO, latestBatting.HBP
    from newPlayerMaster, latestBatting 
    where newPlayerMaster.classes REGEXP ?
    and latestBatting.playerCode = newPlayerMaster.playerID
    and newPlayerMaster.franchise = ?
    and newPlayerMaster.yr = ?
    order by AB desc `, [req.query.r, req.query.f, req.query.y], function (error, results, fields) {

    /*    console.log(results)*/
      res.json(results)


    if (error) throw error;
   });
})
app.get('/api/pitcherList', function(req, res) {
/*  console.log(req.query)*/

  connection.query(`select distinct newPlayerMaster.playerName, newPlayerMaster.yr AS YR,  latestPitching.G, 
    latestPitching.IP, latestPitching.W, latestPitching.L, latestPitching.IBB,
    latestPitching.IBB,latestPitching.GF, latestPitching.GS, latestPitching.SV, latestPitching.Tm,
    latestPitching.H, latestPitching.ER, latestPitching.BB, latestPitching.SO, latestPitching.HBP
    from newPlayerMaster, latestPitching 
    where newPlayerMaster.classes REGEXP ?
    and latestPitching.playerCode = newPlayerMaster.playerID
    and newPlayerMaster.franchise = ?
    and newPlayerMaster.yr = ?
    order by (latestPitching.IP / latestPitching.H) desc `, [req.query.r, req.query.f, req.query.y], function (error, results, fields) {

    /*    console.log(results)*/
      res.json(results)


    if (error) throw error;
   });      
})
/*app.get('/api/topBatting', function(req, res) {
  pool.getConnection(function(err, connection) {
  connection.query(`select className as cl, logo, color, milbTeam, yr, bG, bAB, bBA, bHR, bSO, majteam, franchiseLogo from summary18 where className = ? and bAB > 1000  order by bBA desc limit 5;
                    select className as cl, logo, color, milbTeam, yr, bG, bAB, bBA, bHR, bSO, majteam, franchiseLogo from summary18 where className = ? and bAB > 1000  order by bBA desc limit 5;
                    select className as cl, logo, color, milbTeam, yr, bG, bAB, bBA, bHR, bSO, majteam, franchiseLogo from summary18 where className = ? and bAB > 200  order by bBA desc limit 5;
                    select className as cl, logo, color, milbTeam, yr, bG, bAB, bBA, bHR, bSO, majteam, franchiseLogo from summary18 where className = ? and bAB > 200  order by bBA desc limit 5;
                    select className as cl, logo, color, milbTeam, yr, bG, bAB, bBA, bHR, bSO, majteam, franchiseLogo from summary18 where className = ? and bAB > 200  order by bBA desc limit 5;`, ['Triple-A','Double-A','Class A','Class A Advanced','Class A Short'], function (error, results, fields) {
    console.log(results)
      res.json(results)


    if (error) throw error;
   });
 });
})
app.get('/api/topPitching', function(req, res) {
  pool.getConnection(function(err, connection) {
  connection.query(`select className as cl, logo, color, milbTeam, yr, pG, pW, pL, pSV, pER, pIP, majteam, franchiseLogo from summary18 where className = ? and pIP > 300  order by pER limit 5;
                    select className as cl, logo, color, milbTeam, yr, pG, pW, pL, pSV, pER, pIP, majteam, franchiseLogo from summary18 where className = ? and pIP > 300  order by pER limit 5;
                    select className as cl, logo, color, milbTeam, yr, pG, pW, pL, pSV, pER, pIP, majteam, franchiseLogo from summary18 where className = ? and pIP > 150  order by pER limit 5;
                    select className as cl, logo, color, milbTeam, yr, pG, pW, pL, pSV, pER, pIP, majteam, franchiseLogo from summary18 where className = ? and pIP > 150  order by pER limit 5;
                    select className as cl, logo, color, milbTeam, yr, pG, pW, pL, pSV, pER, pIP, majteam, franchiseLogo from summary18 where className = ? and pIP > 150  order by pER limit 5;`, ['Triple-A','Double-A','Class A','Class A Advanced','Class A Short'], function (error, results, fields) {
    console.log(results)
      res.json(results)

    if (error) throw error;
   });
 });
})*/
app.get('/api/classSummary', function(req, res) {
/*  console.log(req.query)*/

  connection.query(`select  className as cl, logo, color, milbTeam, yr, division, 9 * (pER / pIP) as pERA, pG, pW, pL, pSV, pER, pIP, majteam, franchiseLogo from summary18 where className like ? and divID like ? and yr like ?   order by pIP desc limit 20 ;
                    select className as cl, logo, color, milbTeam, yr, division, bG, bH, bAB, bBA, bHR, bSO, bBB, majteam, franchiseLogo from summary18 where className like ? and divID like ? and yr like ?  order by bH desc limit 20 ;`, 
                    [req.query.cl, req.query.dv, req.query.yr, req.query.cl, req.query.dv, req.query.yr ], function (error, results, fields) {
  /*     console.log(results)*/
      res.json(results)

    if (error) throw error;
   });

})
// Use once to aggregate stats
/*app.get('/api/sendStats', function(req, res) {
 var btr = JSON.parse(req.query.ba)
 var ptc = JSON.parse(req.query.pi)
 var tm = JSON.parse(req.query.tm)
  pool.getConnection(function(err, connection) {
  connection.query(`INSERT INTO overall18 (milbTeam, logo, color, franchiseLogo, yr, className, division, bAB, bBA, bBB, bH, bHBP, bHR, bSB, bSO, bG, pBB,
     pER, pERA, pG, pGS, pH, pIP, pL, pSO, pSV, pW ,pHBP, pIBB)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
     [tm.name, tm.logo, tm.color, tm.franchiseLogo, req.query.yr, req.query.dv, req.query.cl, btr.AB, btr.AVG, btr.BB,  btr.H, btr.HBP, btr.HR, btr.SB, btr.SO,btr.G,
     ptc.BB, ptc.ER, ptc.ERA, ptc.G, ptc.GS, ptc.H, ptc.IP, ptc.L, ptc.SO, ptc.SV, ptc.W, ptc.HBP, ptc.IBB ], function (error, results, fields) {

        console.log('results')
      res.json('results')
    connection.release();

    if (error) throw error;
   });
 });
})*/

// scraper
 
/*app.get('/api/setLogos', function(req, res) {
  pool.getConnection(function(err, connection) {
    request({
        method: 'GET',
        url: 'http://www.sportslogos.net/teams/list_by_league/48/Appalachian_League/AppL/logos/'
    }, (err, res, body) => {
      var codes=[]
       const $ = cheerio.load(body);
        $('#team > .logoWall li').each(function(i, e) {
          var result ={}
          var anchr = $(this).children('a')
          result.class = "Rk"
          result.league = "Appalachian"
          result.title = anchr.attr('title').replace(/ Logos/, "")
          result.image = anchr.find('img').attr('src')

          connection.query(`INSERT INTO minorLogos (class, league, teamName, imageUrl)VALUES (?,?,?,?)`, [result.class ,result.league, result.title ,result.image], function (error) {

    if (error) throw error;
                console.log('results')
            
         });                  
       })  
        connection.release();
    })
  })
})*/


const port = process.env.PORT || 5001;
app.listen(port);
console.log(`Listening on ${port}`);




















