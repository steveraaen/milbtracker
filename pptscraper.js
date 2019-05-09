const puppeteer = require('puppeteer');
const fs = require('fs');
const playerIDs = require('./playerIDs.json');


(async () => {
  const browser = await puppeteer.launch(/*{ headless: false, slowMo: 250 }*/);
  const page = await browser.newPage();
  
  await page.goto('https://www.baseball-reference.com/leagues/MLB/2019-standard-batting.shtml', {waitUntil: 'networkidle2'});

/*const data = await page.$$eval('#players_standard_batting> tbody > tr', trs => trs.map((tr) => {	
					const dataNodeList = tr.querySelectorAll('td')
					console.log(dataNodeList)
		return tr.innerHTML;
}))*/
  const packages = await page.evaluate(() => {
    var nodes = document.querySelectorAll('#players_standard_batting> tbody > tr');
    var cells = [...nodes].map(el => el.innerText)

    return cells;
  });
const playerArr = []
var playerObjArr = []
for(let i = 0; i < packages.length; i++) {	
	playerArr.push(packages[i].split(/\t/))
	}
	
for(let i = 0; i < playerArr.length; i++) {
	var playerObj={}
	playerArr[i][1] = playerArr[i][1].replace(/\*/g , '').replace(/\#/g , '')

	playerObj.playerName = playerArr[i][1];
	playerObj.age = playerArr[i][2];
	playerObj.team = playerArr[i][3];
	playerObj.league = playerArr[i][4];
	playerObj.G = playerArr[i][5];
	playerObj.PA = playerArr[i][6];
	playerObj.AB = playerArr[i][7];
	playerObj.R = playerArr[i][8];
	playerObj.H = playerArr[i][9];
	playerObj.B2 = playerArr[i][10];
	playerObj.B3 = playerArr[i][11];
	playerObj.HR = playerArr[i][12];
	playerObj.RBI = playerArr[i][13];
	playerObj.SB = playerArr[i][14];
	playerObj.CS = playerArr[i][15];
	playerObj.BB = playerArr[i][16];
	playerObj.SO = playerArr[i][17];
	playerObj.BA = playerArr[i][18];
	playerObj.OBP = playerArr[i][19];
	playerObj.SLG = playerArr[i][20];
	playerObj.OPS = playerArr[i][21];
	playerObj.OPSP = playerArr[i][22];
	playerObj.TB = playerArr[i][23];
	playerObj.GDP = playerArr[i][24];
	playerObj.HBP = playerArr[i][25];
	playerObj.SH = playerArr[i][26];
	playerObj.IBB = playerArr[i][27];
	playerObj.POS= playerArr[i][28];
	

	playerObjArr.push(playerObj)

}
for(let i = 0; i < playerObjArr.length; i++) {
	console.log(playerObjArr[i].playerName)
}


/*	for(let j=0; j < playerIDs.length; j++) {
		console.log(playerIDs[j].playerName)
	}*/

 await browser.close();
})();





























