require('dotenv').config() 
const puppeteer = require('puppeteer');
const mysql = require('mysql');
const chalk = require('chalk');

const pool = mysql.createPool({
    host: process.env.DB_HOSTI,
    port: '3306',
    user: process.env.DB_USERI,
    password: process.env.DB_PWI,
    database: process.env.DB_NAMEI
});

/*(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
    console.log(page.viewport())
  await page.goto('http://content.sportslogos.net/logos/37/1016/thumbs/4813.gif');
    await page.screenshot({path: `./milbPNGs/${results[i].team.replace(/\s/,'')}.png`, clip: { x: 325, y: 250, width: 150, height: 100}});
    await page.screenshot({path: `./milbPNGs/aaaa.png`, clip: { x: 325, y: 250, width: 150, height: 100}});

  await browser.close();
})();*/
var dta = pool.query(`SELECT distinct team, imgURL, lgCode, lgNAME as lgName from teamList group by team`,  function(error, results, fields) {
   if (error) throw error;

   for (let i=0; i< results.length; i++) {

	  setTimeout( function timer(){
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(results[i].imgURL);


       await page.screenshot({path: `./lgos/${results[i].team.replace(/\s/g,'_')}.png`, clip: { x: 325, y: 250, width: 150, height: 100}});

  await browser.close();
})();
        
	    }, i*1000 );
	}

});





