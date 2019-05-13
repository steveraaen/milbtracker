require('dotenv').config()
const puppeteer = require('puppeteer');
const mysql = require('mysql');
const chalk = require('chalk');

var connection  = mysql.createConnection({
    host: process.env.DB_HOSTI,
    port: '3306',
    user: process.env.DB_USERI,
    password: process.env.DB_PWI,
    database: process.env.DB_NAMEI
});
(async () => {
connection.query(`TRUNCATE latestPitching`)
 		const browser = await puppeteer.launch();
	   const page = await browser.newPage();

	    await page.goto('https://www.baseball-reference.com/leagues/MLB/2019-standard-pitching.shtml', {waitUntil: 'networkidle2'})
	   let urls = await page.evaluate(() => {
	       let results = [];
	       let items = document.querySelectorAll('#players_standard_pitching tr.full_table');
	       items.forEach((item) => {	  
	       	results.push({
	               playerName:  item.querySelector('td').innerText,
	               playerID:  item.querySelector('td').getAttribute('data-append-csv'),
	               age:  item.querySelector('td:nth-child(3)').innerText,
	               tm:  item.querySelector('td:nth-child(4)').innerText,
	               lg:  item.querySelector('td:nth-child(5)').innerText,
	               W:  item.querySelector('td:nth-child(6)').innerText,
	               L:  item.querySelector('td:nth-child(7)').innerText,
	               G:  item.querySelector('td:nth-child(10)').innerText,
	               GS:  item.querySelector('td:nth-child(11)').innerText,
	               GF:  item.querySelector('td:nth-child(12)').innerText,
	               CG:  item.querySelector('td:nth-child(13)').innerText,
	               SHO:  item.querySelector('td:nth-child(14)').innerText,
	               SV:  item.querySelector('td:nth-child(15)').innerText,
	               IP:  item.querySelector('td:nth-child(16)').innerText,
	               H:  item.querySelector('td:nth-child(17)').innerText,
	               R:  item.querySelector('td:nth-child(19)').innerText,
	               HR:  item.querySelector('td:nth-child(20)').innerText,
	               BB:  item.querySelector('td:nth-child(21)').innerText,
	               IBB:  item.querySelector('td:nth-child(22)').innerText,
	               SO:  item.querySelector('td:nth-child(23)').innerText,
	               HBP:  item.querySelector('td:nth-child(24)').innerText,
	               BK:  item.querySelector('td:nth-child(25)').innerText,
	               WP:  item.querySelector('td:nth-child(26)').innerText,
	               BF:  item.querySelector('td:nth-child(27)').innerText
	           });	       	
	       });
	       return results;
	   })
for(let i = 0; i < urls.length; i++) {
	connection.query(`INSERT INTO latestPitching(playerName,playerID,Age,Tm,Lg,W,L,G,GS,GF,CG,SHO,SV,IP,H,R,HR,BB,IBB,SO,HBP,BK,WP,BF)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [urls[i].playerName,urls[i].playerID,urls[i].age,urls[i].tm,urls[i].lg,urls[i].W,urls[i].L,urls[i].G,urls[i].GS,urls[i].GF,urls[i].CG,urls[i].SHO,urls[i].SV,urls[i].IP,urls[i].H,urls[i].R,urls[i].HR,urls[i].BB,urls[i].IBB,urls[i].SO,urls[i].HBP,urls[i].BK,urls[i].WP,urls[i].BF], function (error) {
      if (error) throw error;
          console.log(chalk.red(`record added to db`))         
   }); 
}


  await browser.close()
})()



















