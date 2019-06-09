CREATE VIEW oneDayPitching AS
SELECT
latestPitching.playerID,
latestPitching.playerName,
latestPitching.tm as TM,
latestPitching.lg as LG,
SUM(latestPitching.W - secondLatestPitching.W) as W,
SUM(latestPitching.L - secondLatestPitching.L) as L,
SUM((latestPitching.IP - secondLatestPitching.IP) - (latestPitching.R - secondLatestPitching.R))  as IP_R,
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
SUM(latestPitching.SO - secondLatestPitching.SO) as SO,
SUM(latestPitching.HBP - secondLatestPitching.HBP) as HBP,
SUM(latestPitching.BK - secondLatestPitching.BK) as BK,
SUM(latestPitching.WP - secondLatestPitching.WP) as WP
FROM latestPitching, secondLatestPitching
WHERE latestPitching.playerID = secondLatestPitching.playerID
group by latestPitching.playerID
