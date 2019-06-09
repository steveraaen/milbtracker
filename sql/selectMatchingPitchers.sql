select 
superPlayerHist.franchise,
superPlayerHist.franchise,
superPlayerHist.class,
superPlayerHist.yr,  
superPlayerHist.imgURL,  
superPlayerHist.franchLogo,  
superPlayerHist.team,  
latestPitching.playerName as players,
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
and superPlayerHist.class like 'AAA'
and superPlayerHist.franchise = 'BOS'
and superPlayerHist.yr like 2017
order by latestPitching.IP - latestPitching.R desc