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
connection.query(`INSERT INTO latestBatting(playerName,age,team,league,G,PA,AB,R,H,B2,B3,HR,RBI,SB,CS,BB,SO,BA,OBP,SLG,OPS,OPSP,TB,GDP,HBP,SH,SF,IBB,POS)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [playerObj.playerName, playerObj.age, playerObj.team, playerObj.league, playerObj.G, playerObj.PA, playerObj.AB, playerObj.R, playerObj.H, playerObj.B2, playerObj.B3, playerObj.HR, playerObj.RBI, playerObj.SB, playerObj.CS, playerObj.BB, playerObj.SO, playerObj.BA, playerObj.OBP, playerObj.SLG, playerObj.OPS, playerObj.OPSP, playerObj.TB, playerObj.GDP, playerObj.HBP, playerObj.SH, playerObj.SF, playerObj.IBB, playerObj.POS], function (error) {
      if (error) throw error;
          console.log(chalk.red(`record added to db`))         
   }); 
}

 await browser.close();
})();

(async () => {
connection.query(`TRUNCATE latestPitching`)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.baseball-reference.com/leagues/MLB/2019-standard-pitching.shtml', {waitUntil: 'networkidle2'});

  const packages = await page.evaluate(() => {
    var nodes = document.querySelectorAll('#players_standard_pitching> tbody > tr');
    var cells = [...nodes].map(el => el.innerText)

    return cells;
  });
const pitcherArr = []
var pitcherObjArr = []
for(let i = 0; i < packages.length; i++) {	
	pitcherArr.push(packages[i].split(/\t/))
	}

for(let i = 0; i < pitcherArr.length; i++) {
	var pitcherObj={}

pitcherObj.playerName  = pitcherArr[i][1].replace(/\*/g , '').replace(/\#/g , '').trim();
pitcherObj.Age  = pitcherArr[i][2];
pitcherObj.Tm  = pitcherArr[i][3];
pitcherObj.Lg  = pitcherArr[i][4];
pitcherObj.W  = pitcherArr[i][5];
pitcherObj.L  = pitcherArr[i][6];
pitcherObj.WL  = pitcherArr[i][7];
pitcherObj.ERA  = pitcherArr[i][8];
pitcherObj.G  = pitcherArr[i][9];
pitcherObj.GS  = pitcherArr[i][10];
pitcherObj.GF  = pitcherArr[i][11];
pitcherObj.CG  = pitcherArr[i][12];
pitcherObj.SHO  = pitcherArr[i][13];
pitcherObj.SV  = pitcherArr[i][14];
pitcherObj.IP  = pitcherArr[i][15];
pitcherObj.H  = pitcherArr[i][16];
pitcherObj.R  = pitcherArr[i][17];
pitcherObj.ER  = pitcherArr[i][18];
pitcherObj.HR  = pitcherArr[i][19];
pitcherObj.BB  = pitcherArr[i][20];
pitcherObj.IBB  = pitcherArr[i][21];
pitcherObj.SO  = pitcherArr[i][22];
pitcherObj.HBP  = pitcherArr[i][23];
pitcherObj.BK  = pitcherArr[i][24];
pitcherObj.WP  = pitcherArr[i][25];
pitcherObj.BF  = pitcherArr[i][26];
pitcherObj.ERAp  = pitcherArr[i][27];
pitcherObj.FIP  = pitcherArr[i][28];
pitcherObj.WHIP  = pitcherArr[i][29];
pitcherObj.H9  = pitcherArr[i][30];
pitcherObj.HR9  = pitcherArr[i][31];
pitcherObj.BB9  = pitcherArr[i][32];
pitcherObj.SO9  = pitcherArr[i][33];
pitcherObj.SOW  = pitcherArr[i][34];

console.log(pitcherObj)
connection.query(`INSERT INTO latestPitching(playerName,Age,Tm,Lg,W,L,WL,ERA,G,GS,GF,CG,SHO,SV,IP,H,R,ER,HR,BB,IBB,SO,HBP,BK,WP,BF,ERAp,FIP,WHIP,H9,HR9,BB9,SO9,SOW)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [pitcherObj.playerName,pitcherObj.Age,pitcherObj.Tm,pitcherObj.Lg,pitcherObj.W,pitcherObj.L,pitcherObj.WL,pitcherObj.ERA,pitcherObj.G,pitcherObj.GS,pitcherObj.GF,pitcherObj.CG,pitcherObj.SHO,pitcherObj.SV,pitcherObj.IP,pitcherObj.H,pitcherObj.R,pitcherObj.ER,pitcherObj.HR,pitcherObj.BB,pitcherObj.IBB,pitcherObj.SO,pitcherObj.HBP,pitcherObj.BK,pitcherObj.WP,pitcherObj.BF,pitcherObj.ERAp,pitcherObj.FIP,pitcherObj.WHIP,pitcherObj.H9,pitcherObj.HR9,pitcherObj.BB9,pitcherObj.SO9,pitcherObj.SOW], function (error) {
      if (error) throw error;
          console.log(chalk.red(`record added to db`))         
   }); 
}
 await browser.close();
})();











