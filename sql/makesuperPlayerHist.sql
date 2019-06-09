create table superPlayerHist SELECT eachPlayerHist.playerID, eachPlayerHist.yr as yr, eachPlayerHist.franchise, eachPlayerHist.class, finalMinorMaster.team, 
finalMinorMaster.imgURL, finalMinorMaster.franchLogo,finalMinorMaster.league as an, finalMinorMaster.lgCode, finalMinorMaster.lgName,
finalMinorMaster.milbLgLogo, finalMinorMaster.franchise as franchiseName
FROM  finalMinorMaster, eachPlayerHist
where finalMinorMaster.franchCode = eachPlayerHist.franchise
and eachPlayerHist.class =  finalMinorMaster.class




