var myPlayersSql = `DROP VIEW splitter;
CREATE VIEW splitter AS SELECT 
userName, email,
SUBSTRING(myAAA, 1,  4) AS myAAAYr , SUBSTRING(myAAA, 6,  30) AS myAAATm,
SUBSTRING(myAA, 1,  4) AS myAAYr , SUBSTRING(myAA, 6,  30) AS myAATm ,
SUBSTRING(myAPlus, 1,  4) AS myAPlusYr , SUBSTRING(myAPlus, 6,  30) AS myAPlusTm,
SUBSTRING(myA, 1,  4) AS myAYr , SUBSTRING(myA, 6,  30) AS myATm,
SUBSTRING(myAMinus, 1,  4) AS myAMinusYr , SUBSTRING(myAMinus, 6,  30) AS myAMinusTM,
SUBSTRING(myRk, 1,  4) AS myRkYr , SUBSTRING(myRk, 6,  30) AS myRkTm from users
where userName =?;

DROP VIEW myPlayers;
CREATE VIEW myPlayers AS SELECT 
finalHist.* FROM finalHist, splitter
WHERE splitter.myAAAYr = finalHist.yr AND splitter.myAAATm = finalHist.tmName
OR(splitter.myAAYr = finalHist.yr AND splitter.myAATm = finalHist.tmName)
OR(splitter.myAPlusYr = finalHist.yr AND splitter.myAPlusTm = finalHist.tmName)
OR(splitter.myAYr = finalHist.yr AND splitter.myATm = finalHist.tmName)
OR(splitter.myAMinusYr = finalHist.yr AND splitter.myAMinusTm = finalHist.tmName)
OR(splitter.myRkYr = finalHist.yr AND splitter.myRkTm = finalHist.tmName);

SELECT myPlayers.franchise,
myPlayers.franchiseName,
myPlayers.majLg,
myPlayers.class,
myPlayers.yr,  
myPlayers.logoPNG,  
myPlayers.franchLogo,  
myPlayers.tmName,  
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
FROM myPlayers, latestBatting
WHERE myPlayers.playerID = latestBatting.playerID
group by playerID
order by H desc;`

module.exports = myPlayersSql