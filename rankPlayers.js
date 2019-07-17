require('dotenv').config()   
const mysql = require('mysql');
const chalk = require('chalk');
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: '3306',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    multipleStatements: true
});


connection.query(`
TRUNCATE TABLE rankedAAA;
INSERT INTO rankedAAA(yr, tm, tb)
SELECT 
finalHist.yr,  
finalHist.tmName,  
ROUND(SUM(latestBatting.TB)) AS TB
from finalHist, latestBatting 
where finalHist.playerID= latestBatting.playerID 
and finalHist.yr > 2012
and finalHist.class = "AAA"
group by finalHist.tmName, finalHist.yr
order by SUM(latestBatting.TB) desc`,function (error, results, fields) {
	console.log(results)
      return results
    if (error) throw error;
   });
connection.query(`
TRUNCATE TABLE rankedAA;
INSERT INTO rankedAA(yr, tm, tb)
SELECT 
finalHist.yr,  
finalHist.tmName,  
ROUND(SUM(latestBatting.TB)) AS TB
from finalHist, latestBatting 
where finalHist.playerID= latestBatting.playerID 
and finalHist.yr > 2012
and finalHist.class = "AA"
group by finalHist.tmName, finalHist.yr
order by SUM(latestBatting.TB) desc`,function (error, results, fields) {
	console.log(results)
      return results
    if (error) throw error;
   });
connection.query(`
TRUNCATE TABLE rankedAPlus;
INSERT INTO rankedAPlus(yr, tm, tb)
SELECT 
finalHist.yr,  
finalHist.tmName,  
ROUND(SUM(latestBatting.TB)) AS TB
from finalHist, latestBatting 
where finalHist.playerID= latestBatting.playerID 
and finalHist.yr > 2012
and finalHist.class = "A+"
group by finalHist.tmName, finalHist.yr
order by SUM(latestBatting.TB) desc`,function (error, results, fields) {
	console.log(results)
      return results
    if (error) throw error;
   });
connection.query(`
TRUNCATE TABLE rankedA;
INSERT INTO rankedA(yr, tm, tb)
SELECT 
finalHist.yr,  
finalHist.tmName,  
ROUND(SUM(latestBatting.TB)) AS TB
from finalHist, latestBatting 
where finalHist.playerID= latestBatting.playerID 
and finalHist.yr > 2012
and finalHist.class = "A"
group by finalHist.tmName, finalHist.yr
order by SUM(latestBatting.TB) desc`,function (error, results, fields) {
	console.log(results)
      return results
    if (error) throw error;
   });
connection.query(`
TRUNCATE TABLE rankedAMinus;
INSERT INTO rankedAMinus(yr, tm, tb)
SELECT 
finalHist.yr,  
finalHist.tmName,  
ROUND(SUM(latestBatting.TB)) AS TB
from finalHist, latestBatting 
where finalHist.playerID= latestBatting.playerID 
and finalHist.yr > 2012
and finalHist.class = "A-"
group by finalHist.tmName, finalHist.yr
order by SUM(latestBatting.TB) desc`,function (error, results, fields) {
	console.log(results)
      return results
    if (error) throw error;
   });
connection.query(`
TRUNCATE TABLE rankedRk;
INSERT INTO rankedRk(yr, tm, tb)
SELECT 
finalHist.yr,  
finalHist.tmName,  
ROUND(SUM(latestBatting.TB)) AS TB
from finalHist, latestBatting 
where finalHist.playerID= latestBatting.playerID 
and finalHist.yr > 2012
and finalHist.class = "Rk"
group by finalHist.tmName, finalHist.yr
order by SUM(latestBatting.TB) desc`,function (error, results, fields) {
	console.log(results)
      return results
    if (error) throw error;
   });


