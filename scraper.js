require('dotenv').config()
const cheerio = require('cheerio')
const request = require('request')
const mysql = require('mysql')
const fs = require('fs')

/*var CronJob = require('cron').CronJob;
new CronJob('* * * * * ', function() {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');*/

var connection  = mysql.createConnection({
    host: process.env.DB_HOST,
    port: '3306',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
     multipleStatements: true
});
var baseUrl = 'https://www.baseball-reference.com'
var batTable = '/leagues/MLB/2019-standard-batting.shtml'

request(baseUrl + batTable, function(error, response, html) {
  if(!error && response.statusCode === 200){
    setTimeout(function() {
      var $ = cheerio.load(html);
     var topdiv = $('#players_standard_batting')
     console.log($(topdiv).html())
    }, 10000)
    
  }
})

/*request(baseUrl + '/leagues/MLB/2019-debuts.shtml', function (error, response, html) {
    var urls = []
  if(!error && response.statusCode === 200){
    var $ = cheerio.load(html);

   $('#all_misc_bio td a').data({'stat': 'player'}).each(function(i,e) {
        if($(this).attr('href').match(/player/)) {

        urls.push(baseUrl + $(this).attr('href'))
        }        
    }) 
    for(let i = 0; i < urls.length; i++) {
        var rgx = //
        setTimeout(function() {
           request(urls[i], function(error, response, html){
            var splt = urls[i].split('/')
              var splta = splt[5].split('.')
            $ = cheerio.load(html)              
            let playerObj = {}
                 playerObj.playerName = $('h1').text()
              let rookieArray = []
            $('.minors_table').each(function(e,i) {
                playerObj.playerCode = splta[0]
                playerObj.year = $(this).children().eq(0).html()
                playerObj.age = $(this).children().eq(1).html()
                playerObj.team = $(this).children().eq(2).html()
                playerObj.level = $(this).children().eq(3).html()
                rookieArray.push(playerObj)
          connection.query(`INSERT INTO rookies (playerName, playerCode, yr, age, team, lvl)VALUES (?,?,?,?,?,?)`, [playerObj.playerName, playerObj.playerCode, playerObj.year, playerObj.age, playerObj.team, playerObj.level], function (error) {
            if (error) throw error;
                console.log('object added to db')           
         }); 
                console.log(rookieArray)
            })
           })
        }, i * 3000)
    }     
  }
});*/



