select majormaster.picurl as franchiseLogo, newMinors.team, newMinors.league, newMinors.state, newMinors.logo, origmaster.* 
from newMinors, origmaster, majormaster 
where newMinors.class IN (origmaster.class1, origmaster.class2, origmaster.class3, origmaster.class4)
and  newMinors.franchise = origmaster.franchise
and majormaster.majteam = newMinors.franchise
group by  newMinors.team