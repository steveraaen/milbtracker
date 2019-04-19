
const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')


request("http://mlb.mlb.com/stats/sortable.jsp#elem=%5Bobject+Object%5D&tab_level=child&click_text=Sortable+Player+hitting&game_type='R'&season=2019&season_type=ANY&league_code='MLB'&sectionType=sp&statType=hitting&page=1", function (error, response, html) {
  

  if(!error && response.statusCode === 200){
      var $ = cheerio.load(html)

      var tbl = $('table')
      console.log(html)


/*var $ = cheerio.load(html);
var tst = $('#all_players_standard_batting').html()
fs.writeFile('aaa.txt', tst, function(err) {
    if(err) {console.log(err)}
        console.log('done')
})*/    
}
});

