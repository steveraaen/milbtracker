Like fantasy leagues with drafts, Farm Team Fantasy ranks 'synthetic' teams of Major League Baseball players. FTF teams however, are constructed based on which Minor League teams the current Major Leaguers played on.

Farm Team Fantasy generates bragging rights for minor league baseball teams and their fans based on
how well their former players are performing in the major leagues this year.

It is structured like a MLB fantasy league, only the teams are prebuilt based on which minor league teams
each player played on earlier in his career.  If a major leaguer played for ten minor league teams over five years, he is a member of all 10 of those minor league teams.

Functionality
Single Page App dominated by two tables (Batting and Pitching) at a time.  
User may toggle between table contents being season-long data or the data from the previous day's games by pressing the green and blue buttons. Table border colors reflect the currently selected periodicity.

The initial content is a summary of all recent Minor League teams, grouped by their Minor League "Alma Mater" for each year.
Their individual statistics are aggregated and then ranked by a single metric for batting (Total Bases plus RBIS) and for pitching
(Innings Pitched minus Earned Runs).
All tables can be sorted by clicking the table header.
Clicking or tapping any team's row will expose a list of current Major Leaguers who played for that minor league team during that year.
Clicking or tapping an individual players' name with refer the user to their Baseball Reference page.

Filters
The "Gearbox" icon in the upper left of the screen displays toggle-styled radio buttons that enable you to filter content by Minor League class and/or by year.

Light/Dark Mode
The sun and moon icons at the top of the screen enable changing between light and dark modee.

Backend Technology:
The data is managed by an Express server on a Nodejs runtime.  Data is acquired using Puppeteer and stored in a MySQL database.  

Daily CRON
It runs on a Heroku hobby server.  Every morning a Puppeteer task is run to scrape https://www.baseball-reference.com/leagues/MLB/2019-standard-batting.shtml for each MLB player's yearly stats using async promises.  When the promises are resolved, six MySQL
tables are re-configured. LatestBatting, SecondLatestBatting, ODB (One Day Batting)(Equivalent tables for pitchers). 
1 - Truncate SecondLatestBatters 
2 - Copy LatestBatters into SecondLatestBatters
3 - Insert scraped data into LatestBatters
4 - Truncate ODB
5 - Insert (LatestBatting.values - SecondLatestBatting.values) into ODB

Puppeteer extracts data from Baseball Reference.  Minor League team logos were scraped from sportsLogos.net and are stored locally. 
Frontend: This project was built on a Create React App template, then ejected.  In addition to React, it relies on four UI libraries:
"axios" 				  : Http requests
"semantic-ui-react" : Sidebars and basic grid structure.  
"react-table"       : Tables.  
"react-tooltip".    : Tooltips.

Dependencies:
- dotenv
- express
- puppeteer
- mysql

API
MySQL select API routes are handled by Express via local proxy. Minor League team logos were aquired via a one-time scrape of sportslogos.net and are store at the client.

Frontend Dependencies:
- react
- axios
- semantic-ui-react
- react-tooltip
- react-table

























