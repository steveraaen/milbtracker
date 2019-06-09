SELECT eachPlayerHist.yr, eachPlayerHist.class, eachPlayerHist.franchise, latestBatting.playerName, latestBatting.tm, latestBatting.AB,
latestBatting.TB,latestBatting.H, latestBatting.RBI,  latestBatting.HR, latestBatting.B3, latestBatting.B2,latestBatting.BB,latestBatting.HBP,latestBatting.SB
 from eachPlayerHist, latestBatting
 where eachPlayerHist.playerID= latestBatting.playerID
 and eachPlayerHist.yr = 2015
 and eachPlayerHist.franchise='NYM'
 and eachPlayerHist.class="AA"
 ORDER BY TB DESC