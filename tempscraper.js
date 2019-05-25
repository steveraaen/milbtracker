require('dotenv').config()   
const puppeteer = require('puppeteer');
const mysql = require('mysql');
const chalk = require('chalk');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: '3306',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    multipleStatements: true
});
/*setInterval(function() {*/

(async () => {
    connection.query(`TRUNCATE TABLE secondLatestPitching;
        INSERT INTO secondLatestPitching SELECT * FROM latestPitching;
        TRUNCATE TABLE latestPitching;`)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.baseball-reference.com/leagues/MLB/2019-standard-pitching.shtml', { waitUntil: 'networkidle2' })
    let eachPlayer = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll('#players_standard_pitching tr.full_table');
        items.forEach((item) => {
            results.push({
                playerName: item.querySelector('td').innerText,
                playerID: item.querySelector('td').getAttribute('data-append-csv'),
                age: item.querySelector('td:nth-child(3)').innerText,
                tm: item.querySelector('td:nth-child(4)').innerText,
                lg: item.querySelector('td:nth-child(5)').innerText,
                W: item.querySelector('td:nth-child(6)').innerText,
                L: item.querySelector('td:nth-child(7)').innerText,
                G: item.querySelector('td:nth-child(10)').innerText,
                GS: item.querySelector('td:nth-child(11)').innerText,
                GF: item.querySelector('td:nth-child(12)').innerText,
                CG: item.querySelector('td:nth-child(13)').innerText,
                SHO: item.querySelector('td:nth-child(14)').innerText,
                SV: item.querySelector('td:nth-child(15)').innerText,
                IP: item.querySelector('td:nth-child(16)').innerText,
                H: item.querySelector('td:nth-child(17)').innerText,
                R: item.querySelector('td:nth-child(19)').innerText,
                HR: item.querySelector('td:nth-child(20)').innerText,
                BB: item.querySelector('td:nth-child(21)').innerText,
                IBB: item.querySelector('td:nth-child(22)').innerText,
                SO: item.querySelector('td:nth-child(23)').innerText,
                HBP: item.querySelector('td:nth-child(24)').innerText,
                BK: item.querySelector('td:nth-child(25)').innerText,
                WP: item.querySelector('td:nth-child(26)').innerText,
                BF: item.querySelector('td:nth-child(27)').innerText
            });
        });
        return results;
    })
    for (let i = 0; i < eachPlayer.length; i++) {
        connection.query(`INSERT INTO latestPitching(playerName,playerID,Age,Tm,Lg,W,L,G,GS,GF,CG,SHO,SV,IP,H,R,HR,BB,IBB,SO,HBP,BK,WP,BF)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [eachPlayer[i].playerName, eachPlayer[i].playerID, eachPlayer[i].age, eachPlayer[i].tm, eachPlayer[i].lg, eachPlayer[i].W, eachPlayer[i].L, eachPlayer[i].G, eachPlayer[i].GS, eachPlayer[i].GF, eachPlayer[i].CG, eachPlayer[i].SHO, eachPlayer[i].SV, eachPlayer[i].IP, eachPlayer[i].H, eachPlayer[i].R, eachPlayer[i].HR, eachPlayer[i].BB, eachPlayer[i].IBB, eachPlayer[i].SO, eachPlayer[i].HBP, eachPlayer[i].BK, eachPlayer[i].WP, eachPlayer[i].BF], function(error) {
            if (error) throw error;
            console.log(chalk.red(`record added to db`))
            console.log(Date.now())
        });
    }
    await browser.close()
})();
(async () => {
    connection.query(`TRUNCATE TABLE secondLatestBatting;
        INSERT INTO secondLatestBatting SELECT * FROM latestBatting;
        TRUNCATE TABLE latestBatting;`)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.baseball-reference.com/leagues/MLB/2019-standard-batting.shtml', { waitUntil: 'networkidle2' })
    let eachPlayer = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll('#players_standard_batting tr.full_table');
        items.forEach((item) => {
            results.push({
                playerName: item.querySelector('td').innerText,
                playerID: item.querySelector('td').getAttribute('data-append-csv'),
                age: item.querySelector('td:nth-child(3)').innerText,
                tm: item.querySelector('td:nth-child(4)').innerText,
                lg: item.querySelector('td:nth-child(5)').innerText,
                G: item.querySelector('td:nth-child(6)').innerText,
                PA: item.querySelector('td:nth-child(7)').innerText,
                AB: item.querySelector('td:nth-child(8)').innerText,
                R: item.querySelector('td:nth-child(9)').innerText,
                H: item.querySelector('td:nth-child(10)').innerText,
                B2: item.querySelector('td:nth-child(11)').innerText,
                B3: item.querySelector('td:nth-child(12)').innerText,
                HR: item.querySelector('td:nth-child(13)').innerText,
                RBI: item.querySelector('td:nth-child(14)').innerText,
                SB: item.querySelector('td:nth-child(15)').innerText,
                CS: item.querySelector('td:nth-child(16)').innerText,
                BB: item.querySelector('td:nth-child(17)').innerText,
                SO: item.querySelector('td:nth-child(18)').innerText,
                TB: item.querySelector('td:nth-child(24)').innerText,
                GDP: item.querySelector('td:nth-child(25)').innerText,
                HBP: item.querySelector('td:nth-child(26)').innerText,
                SH: item.querySelector('td:nth-child(27)').innerText,
                SF: item.querySelector('td:nth-child(28)').innerText,
                IBB: item.querySelector('td:nth-child(29)').innerText,
                POS: item.querySelector('td:nth-child(30)').innerText
            });
        });
        return results;
    })
    for (let i = 0; i < eachPlayer.length; i++) {
        connection.query(`INSERT INTO latestBatting(playerName,playerID,age,tm,lg,G,PA,AB,R,H,B2,B3,HR,RBI,SB,CS,BB,SO,TB,GDP,HBP,SH,SF,IBB,POS)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [eachPlayer[i].playerName, eachPlayer[i].playerID, eachPlayer[i].age, eachPlayer[i].tm, eachPlayer[i].lg, eachPlayer[i].G, eachPlayer[i].PA, eachPlayer[i].AB, eachPlayer[i].R, eachPlayer[i].H, eachPlayer[i].B2, eachPlayer[i].B3, eachPlayer[i].HR, eachPlayer[i].RBI, eachPlayer[i].SB, eachPlayer[i].CS, eachPlayer[i].BB, eachPlayer[i].SO, eachPlayer[i].TB, eachPlayer[i].GDP, eachPlayer[i].HBP, eachPlayer[i].SH, eachPlayer[i].SF, eachPlayer[i].IBB, eachPlayer[i].POS], function(error) {
            if (error) throw error;
            console.log(chalk.white(`${eachPlayer[i]}record added to db`))
           
           console.log(Date.now())
        });
    }
    await browser.close()
})()

/*}, 900000)*/




