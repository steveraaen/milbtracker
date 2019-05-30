require('dotenv').config()
const puppeteer = require('puppeteer');
const fs = require('fs');
const mysql = require('mysql');
const chalk = require('chalk');

/*var CronJob = require('cron').CronJob;

new CronJob('* * * * * *', function() {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');
*/
var connection  = mysql.createConnection({
    host: process.env.DB_HOSTI,
    port: '3306',
    user: process.env.DB_USERI,
    password: process.env.DB_PWI,
    database: process.env.DB_NAMEI
});

(async () => {
connection.query(`TRUNCATE latestBatting`)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.baseball-reference.com/leagues/MLB/2019-standard-batting.shtml', {waitUntil: 'networkidle2'});

  const packages = await page.evaluate(() => {
    var nodes = document.querySelectorAll('#players_standard_batting> tbody > tr.full_table');

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
	/*playerArr[i][1] = playerArr[i][1]*/
	playerObj.playerName = playerArr[i][1].replace(/\*/g , '').replace(/\#/g , '').trim();
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
	playerObj.SF = playerArr[i][27];
	playerObj.IBB = playerArr[i][28];
	playerObj.POS= playerArr[i][29];

console.log(playerObj)
/*connection.query(`INSERT INTO latestBatting(playerName,age,team,league,G,PA,AB,R,H,B2,B3,HR,RBI,SB,CS,BB,SO,BA,OBP,SLG,OPS,OPSP,TB,GDP,HBP,SH,SF,IBB,POS)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [playerObj.playerName, playerObj.age, playerObj.team, playerObj.league, playerObj.G, playerObj.PA, playerObj.AB, playerObj.R, playerObj.H, playerObj.B2, playerObj.B3, playerObj.HR, playerObj.RBI, playerObj.SB, playerObj.CS, playerObj.BB, playerObj.SO, playerObj.BA, playerObj.OBP, playerObj.SLG, playerObj.OPS, playerObj.OPSP, playerObj.TB, playerObj.GDP, playerObj.HBP, playerObj.SH, playerObj.SF, playerObj.IBB, playerObj.POS], function (error) {
      if (error) throw error;
          console.log(chalk.red(`record added to db`))         
   }); */
}

 await browser.close();
})();












