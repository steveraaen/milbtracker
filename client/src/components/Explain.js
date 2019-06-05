import React, {useEffect} from 'react';
import {Icon, Image, Header, Modal} from 'semantic-ui-react'
import ftfLogo from '../data/ftflogo.png'


 export default function Explain(props) {
return(
    <Modal.Content>
    
      <Modal.Description>
        <Header>About Farm Team Fantasy</Header>

        <p style={{display: 'flex', flexWrap: 'wrap'}}>{`Like fantasy leagues with drafts, Farm Team Fantasy ranks 'synthetic' teams of Major League Baseball players. FTF teams however, are constructed based on which Minor League teams the current Major Leaguers played on.
Farm Team Fantasy generates bragging rights for minor league baseball teams and their fans based on
how well their former players are performing in the major leagues this year.`}</p>

<p style={{display: 'flex', flexWrap: 'wrap'}}>{`It is structured like a MLB fantasy league, only the teams are prebuilt based on which minor league teams
each player played on earlier in his career.  If a major leaguer played for ten minor league teams over five years, he is a member of all 10 of those minor league teams.`}</p>

<Header>Metrics</Header>
<p style={{display: 'flex', flexWrap: 'wrap'}}>{`The batting metric that drives rankings is total bases plus RBIs.
For pitching, teams are ranked by innings pitched minus earned runs.`}</p>

        
     </Modal.Description>
    </Modal.Content>
  )
  }