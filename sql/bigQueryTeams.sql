select 
superPlayerHist.franchise,
superPlayerHist.class,
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
and superPlayerHist.class like 'AA'
and superPlayerHist.yr like 2015
group by superPlayerHist.class , superPlayerHist.franchise, superPlayerHist.yr
order by SUM(latestPitching.IP - latestPitching.R) desc