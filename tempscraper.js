const puppeteer = require('puppeteer');
(async () => {

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
	               ER:  item.querySelector('td:nth-child(19)').innerText,
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
  console.log(urls)
  await browser.close()
})()
