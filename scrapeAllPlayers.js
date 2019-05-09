const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
  const browser = await puppeteer.launch(/*{ headless: false, slowMo: 250 }*/);
  const page = await browser.newPage();
  
  await page.goto('https://www.baseball-reference.com/leagues/MLB/2019-standard-batting.shtml', {waitUntil: 'networkidle2'});

const values = await page.evaluate(
  () => [...document.querySelectorAll('#players_standard_batting> tbody > tr > td:nth-child(2)')]
        .map(element => element.getAttribute('data-append-csv'))
);


 await browser.close();
 fs.writeFile('scrapedCodes.json', values, function() {
 	console.log('written')
 })
})();