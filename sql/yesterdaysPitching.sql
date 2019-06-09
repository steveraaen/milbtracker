SELECT
latestPitching.playerID,
latestPitching.playerName,
latestPitching.tm,
latestPitching.lg,
SUM(latestPitching.W - secondLatestPitching.W) as W,
SUM(latestPitching.L - secondLatestPitching.L) as L,
SUM(latestPitching.G - secondLatestPitching.G) as G,
SUM(latestPitching.GS - secondLatestPitching.GS) as GS,
SUM(latestPitching.GF - secondLatestPitching.GF) as GF,
SUM(latestPitching.CG - secondLatestPitching.CG) as CG,
SUM(latestPitching.SHO - secondLatestPitching.SHO) as SHO,
SUM(latestPitching.SV - secondLatestPitching.SV) as SV,
SUM(latestPitching.IP - secondLatestPitching.IP) as IP,
SUM(latestPitching.H - secondLatestPitching.H) as H,
SUM(latestPitching.R - secondLatestPitching.R) as R,
SUM(latestPitching.HR - secondLatestPitching.HR) as HR,
SUM(latestPitching.BB - secondLatestPitching.BB) as BB,
SUM(latestPitching.IBB - secondLatestPitching.IBB) as IBB,
SUM(latestPitching.SO - secondLatestPitching.SO) as SO,
SUM(latestPitching.HBP - secondLatestPitching.HBP) as HBP,
SUM(latestPitching.BK - secondLatestPitching.BK) as BK,
SUM(latestPitching.WP - secondLatestPitching.WP) as WP,
SUM(latestPitching.BF - secondLatestPitching.BF) as BF
FROM latestPitching, secondLatestPitching
WHERE latestPitching.playerID = secondLatestPitching.playerID
group by latestPitching.playerID
ORDER BY SUM((latestPitching.IP - secondLatestPitching.IP) - (latestPitching.H - secondLatestPitching.H))  DESC
