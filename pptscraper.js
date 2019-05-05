
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();
  const TEAM_ROW_SELECTOR = 'tr.full_table'
  

  await page.goto('https://www.baseball-reference.com/leagues/MLB/2019-standard-batting.shtml', {waitUntil: 'networkidle2'});


const bodyHandle = await page.$('#players_standard_batting > tbody > tr');


const html = await page.evaluate(el => el.innerHTML, bodyHandle);

console.log(html)
  await browser.close();
})();









