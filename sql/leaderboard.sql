select tempPlayers.userName,
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
from tempPlayers, latestBatting 
where tempPlayers.playerID= latestBatting.playerID 
group by tempPlayers.userName
order by SUM(latestBatting.TB) desc