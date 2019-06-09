SELECT
latestBatting.playerID,
latestBatting.playerName,
SUM(latestBatting.G - secondLatestBatting.G) as G,
SUM(latestBatting.PA - secondLatestBatting.PA) as PA,
SUM((latestBatting.TB - secondLatestBatting.TB) + (latestBatting.RBI - secondLatestBatting.RBI))  as TBRBI,
SUM(latestBatting.AB - secondLatestBatting.AB) as AB,
SUM(latestBatting.R - secondLatestBatting.R) as R,
SUM(latestBatting.H - secondLatestBatting.H) as H,
SUM(latestBatting.B2 - secondLatestBatting.B2) as B2,
SUM(latestBatting.B3 - secondLatestBatting.B3) as B3,
SUM(latestBatting.HR - secondLatestBatting.HR) as HR,
SUM(latestBatting.RBI - secondLatestBatting.RBI) as RBI,
SUM(latestBatting.SB - secondLatestBatting.SB) as SB,
SUM(latestBatting.CS - secondLatestBatting.CS) as CS,
SUM(latestBatting.BB - secondLatestBatting.BB) as BB,
SUM(latestBatting.SO - secondLatestBatting.SO) as SO,
SUM(latestBatting.TB - secondLatestBatting.TB) as TB,
SUM(latestBatting.GDP - secondLatestBatting.GDP) as GDP,
SUM(latestBatting.SH - secondLatestBatting.SH) as SH,
SUM(latestBatting.SF - secondLatestBatting.SF) as SF,
SUM(latestBatting.IBB - secondLatestBatting.IBB) as IBB,
SUM(latestBatting.POS - secondLatestBatting.POS) as POS
FROM latestBatting, secondLatestBatting
WHERE latestBatting.playerID = secondLatestBatting.playerID
group by latestBatting.playerID
ORDER BY SUM((latestBatting.TB - secondLatestBatting.TB) + (latestBatting.RBI - secondLatestBatting.RBI))  DESC
