
const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')

var baseUrl = 'https://www.baseball-reference.com'


request(baseUrl + '/leagues/MLB/2019-debuts.shtml', function (error, response, html) {
    var urls = []
  if(!error && response.statusCode === 200){
    var $ = cheerio.load(html);

   $('#misc_bio td a').data({'stat': 'player'}).each(function(i,e) {
        if($(this).attr('href').match(/player/)) {
        urls.push(baseUrl + $(this).attr('href'))
        }        
    }) 
    for(let i = 0; i < urls.length; i++) {
        setTimeout(function() {
           request(urls[i], function(error, response, html){

              $ = cheerio.load(html)
              var player = $('.minors_table').children().data({'stat': 'year_ID'})

              console.log(player.text())
           })
        }, i * 3000)
    }     
  }
});



