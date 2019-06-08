Like fantasy leagues with drafts, Farm Team Fantasy ranks 'synthetic' teams of Major League Baseball players. FTF teams however, are constructed based on which Minor League teams the current Major Leaguers played on.

Farm Team Fantasy generates bragging rights for minor league baseball teams and their fans based on
how well their former players are performing in the major leagues this year.

It is structured like a MLB fantasy league, only the teams are prebuilt based on which minor league teams
each player played on earlier in his career.  If a major leaguer played for ten minor league teams over five years, he is a member of all 10 of those minor league teams.

Metrics
The batting metric that drives rankings is total bases plus RBIs.
For pitching, teams are ranked by innings pitched minus earned runs.

Technology Stack
Backend: The data is managed by an Express server on a Nodejs runtime.  Data is acquired using Puppeteer and stored in a MySQL database. It
uses a proxy from the the server to the client. Puppeteer extracts data from Baseball Reference.  Minor League team logos were captured by Pupeteer and are stored locally.  This is because the source, sportslogos.net does not provide https, and it drops cookies on your browser.

Frontend: This project was built on a Create React App template, then ejected.  In addition to React, it relies on three UI libraries:
"semantic-ui-react" : Sidebars and basic grid structure.  
"react-table"       : Tables.  
"react-tooltip".    : Tooltips.

