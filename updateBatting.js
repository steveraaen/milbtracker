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

(async () => {

    const browser = await puppeteer.launch({
            'args' : [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
});
    const page = await browser.newPage();
    await page.goto('https://www.baseball-reference.com/leagues/MLB/2019-standard-batting.shtml', { waitUntil: 'networkidle2' })
       connection.query(`TRUNCATE TABLE secondLatestBatting;
        INSERT INTO secondLatestBatting SELECT * FROM latestBatting;
        TRUNCATE TABLE latestBatting;`)
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
                IBB: item.querySelector('td:nth-child(29)').innerText
            });
        });
       
        return results;
    });
    for (let i = 0; i < eachPlayer.length; i++) {
        connection.query(`DELETE FROM latestBatting WHERE tm = 'TOT';
            INSERT INTO latestBatting(playerName,playerID,age,tm,lg,G,PA,AB,R,H,B2,B3,HR,RBI,SB,CS,BB,SO,TB,GDP,HBP,SH,SF,IBB)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
            TRUNCATE TABLE odb;
            INSERT INTO odb SELECT
            latestBatting.playerName,
            latestBatting.playerID,
            latestBatting.age,      
            latestBatting.tm,
            latestBatting.lg,
            SUM(latestBatting.G - secondLatestBatting.G) as G,
            SUM(latestBatting.PA - secondLatestBatting.PA) as PA,
            SUM(latestBatting.AB - secondLatestBatting.AB) as AB,
            SUM(latestBatting.R - secondLatestBatting.R) as R,
            SUM(latestBatting.H - secondLatestBatting.H) as H,
            SUM(latestBatting.B2 - secondLatestBatting.B2) as B2,
            SUM(latestBatting.B3 - secondLatestBatting.B3) as B3,
            SUM(latestBatting.HR - secondLatestBatting.HR) as HR,
            SUM(latestBatting.RBI - secondLatestBatting.RBI) as RBI,
            SUM(latestBatting.SB - secondLatestBatting.SB) as SB,
            SUM(latestBatting.CS - secondLatestBatting.CS) as CS,
            SUM(latestBatting.BB - secondLatestBatting.BB) as BB,
            SUM(latestBatting.SO - secondLatestBatting.SO) as SO,
            SUM(latestBatting.TB - secondLatestBatting.TB) as TB,
            SUM(latestBatting.GDP - secondLatestBatting.GDP) as GDP,
            SUM(latestBatting.HBP - secondLatestBatting.HBP) as HBP,
            SUM(latestBatting.SH - secondLatestBatting.SH) as SH,
            SUM(latestBatting.SF - secondLatestBatting.SF) as SF,
            SUM(latestBatting.IBB - secondLatestBatting.IBB) as IBB
            FROM latestBatting, secondLatestBatting
            WHERE latestBatting.playerID = secondLatestBatting.playerID
            group by latestBatting.playerID`, [eachPlayer[i].playerName, eachPlayer[i].playerID, eachPlayer[i].age, eachPlayer[i].tm, eachPlayer[i].lg, eachPlayer[i].G, eachPlayer[i].PA, eachPlayer[i].AB, eachPlayer[i].R, eachPlayer[i].H, eachPlayer[i].B2, eachPlayer[i].B3, eachPlayer[i].HR, eachPlayer[i].RBI, eachPlayer[i].SB, eachPlayer[i].CS, eachPlayer[i].BB, eachPlayer[i].SO, eachPlayer[i].TB, eachPlayer[i].GDP, eachPlayer[i].HBP, eachPlayer[i].SH, eachPlayer[i].SF, eachPlayer[i].IBB], function(error) {
                        if (error) throw error;
            console.log(chalk.white(`${eachPlayer[i].playerName} added to latestBatting`))
        });
    }
    await browser.close()
})();