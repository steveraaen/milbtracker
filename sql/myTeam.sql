select 
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
and ( finalHist.tmName= 'Gwinnett Stripers' 
and finalHist.yr = 2018 
or ( finalHist.tmName= 'Arkansas Travelers' and finalHist.yr = 2017)
or ( finalHist.tmName='Batavia Muckdogs' and finalHist.yr = 2013)
or ( finalHist.tmName='Peoria Chiefs' and finalHist.yr = 2016)
or ( finalHist.tmName='Orem Owlz'and finalHist.yr = 2015)
or ( finalHist.tmName='Jupiter Hammerheads' and finalHist.yr = 2014))
group by playerID
order by latestBatting.TB desc