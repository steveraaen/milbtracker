require('dotenv').config() 
const puppeteer = require('puppeteer');
const mysql = require('mysql');
const chalk = require('chalk');


const connection = mysql.createConnection({
    host: process.env.DB_HOSTI,
    port: '3306',
    user: process.env.DB_USERI,
    password: process.env.DB_PWI,
    database: process.env.DB_NAMEI
});

/*(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://www.sportslogos.net/leagues/list_by_category/22/Minor_League_Baseball/logos', {waitUntil: 'networkidle2'});
  	const eachLeague = await page.evaluate(() => {
  var results = []
document.querySelectorAll('.logoWall > li').forEach((item) => {
  			results.push({
  				text: item.querySelector('a').innerText,
  				imgURL: item.querySelector('a img').getAttribute('src'),
  				teamsURL:`http://www.sportslogos.net/${item.querySelector('a').getAttribute('href')}` 
  			})   				
  		})
return results	

  	})
 await browser.close();
  connection.query(`TRUNCATE leagueList`)
console.log(eachLeague)
    for (let i = 0; i < eachLeague.length; i++) {
    	var lgCode = eachLeague[i].teamsURL.split('/')
    	lgCode = lgCode[lgCode.length - 3]
        connection.query(`INSERT INTO leagueList(league, imgURL, teamsURL, lgCode)VALUES(?,?,?,?)`, [eachLeague[i].text, eachLeague[i].imgURL, eachLeague[i].teamsURL, lgCode], function(error) {
            if (error) throw error;
            console.log(chalk.red(`record added to db`))
        });
    }
})();*/

var dta = connection.query(`SELECT teamsURL FROM leagueList`,  function(error, results, fields) {
   if (error) throw error;

   for (let i=0; i< results.length; i++) {
   	   let spltURL = results[i].teamsURL.split('/')
    		let lgCode = spltURL[spltURL.length - 3]
    		let lgName = spltURL[spltURL.length - 4].replace('_', ' ')

	  setTimeout( function timer(){
    	(async () => {
    		const browser = await puppeteer.launch();
				const page = await browser.newPage();
				await page.goto(results[i].teamsURL, {waitUntil: 'networkidle2'});

			  	const eachTeam = await page.evaluate(() => {
			  	var teamLogoArr = []

					document.querySelectorAll('#team > .logoWall > li').forEach((item) => {
					  			teamLogoArr.push({
					  				text: item.querySelector('a').innerText,
					  				imgURL: item.querySelector('a img').getAttribute('src'),
					  				teamsURL:`http://www.sportslogos.net/${item.querySelector('a').getAttribute('href')}`, 
					  			})   				
					  		})
					return teamLogoArr	
  	})
 await browser.close();
 console.log(lgName)
	    		for(let j = 0; j < eachTeam.length; j++) {
        connection.query(`INSERT INTO teamList(team, imgURL, teamsURL, lgCode, lgName)VALUES(?,?,?,?,?)`, [eachTeam[j].text, eachTeam[j].imgURL, eachTeam[j].teamsURL, lgCode, lgName], function(error) {
            if (error) throw error;
            console.log(chalk.red(`${JSON.stringify(eachTeam[j])}record added to db`))
        });
		}
 	})()	        
	    }, i*5000 );
	}

});
  
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.baseball-reference.com/register/affiliate.cgi?year=2019', {waitUntil: 'networkidle2'});
  	const eachTeam = await page.evaluate(() => {
  var results = []
document.querySelectorAll('#affiliates > tbody > tr').forEach((item) => {
	console.log(item)
  			results.push({
  				franchise: item.querySelector('th').innerText,
  				teams: [JSON.stringify({
   				class: item.querySelector('td').getAttribute('data-stat'),
  					team:  item.querySelector('td > a').getAttribute('data-tip'), 
  					test: document.querySelector('#affiliates > tbody > tr').children.item('data-stat').textContent					
  				})]

  			})   				
  		})
return results	

  	})
 await browser.close();
/* console.log(eachTeam)*/
 /* connection.query(`TRUNCATE leagueList`)
console.log(eachLeague)
    for (let i = 0; i < eachLeague.length; i++) {
    	var lgCode = eachLeague[i].teamsURL.split('/')
    	lgCode = lgCode[lgCode.length - 3]
        connection.query(`INSERT INTO leagueList(league, imgURL, teamsURL, lgCode)VALUES(?,?,?,?)`, [eachLeague[i].text, eachLeague[i].imgURL, eachLeague[i].teamsURL, lgCode], function(error) {
            if (error) throw error;
            console.log(chalk.red(`record added to db`))
        });
    }*/
})();












