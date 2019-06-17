import React from 'react';
import { Header, Image, Item, Modal} from 'semantic-ui-react'

 import batPic from '../lgos/drawBatter.png'
 import pitchPic from '../lgos/drawPitch.png'
import ball from '../ball.png'

 export default function Explain(props) {
return(
    <Modal.Content  className={`App ${props.theme}`} >
    <Item.Group>
    <Item.Header as='h3'>Welcome to Farm Team Fantasy</Item.Header>
    <Item>
      <Item.Image size='mini' src={ball} />

      <Item.Content>
        <Item.Description>
				 <div >
				 <h3>{`Farm Team Fantasy`}</h3>
<div>{`Like fantasy leagues with drafts, Farm Team Fantasy ranks 'synthetic' teams of Major League Baseball players. 
FTF teams however, are constructed based on which Minor League teams the current Major Leaguers played on.`}</div><br/>

<div>{`Farm Team Fantasy exposes the quality of each franchise'e Minor League system  based on
how well their former players are performing in the major leagues this year.`}</div><br/>

<div>{`It is structured like a MLB fantasy league, only the teams are prebuilt based on which minor league teams
each player played on earlier in his career.  If a major leaguer played for ten minor league teams over five years, he is a member of all 10 of those minor league teams.`}</div><br/>

<h3>{`Functionality`}</h3>
<div>{`Single Page App dominated by two tables (Batting and Pitching) at a time.  
User may toggle between table contents being season-long data or the data from the previous day's games by pressing the green and blue buttons. Table border colors reflect the currently selected periodicity.`}</div><br/>

<div>{`The initial content is a summary of all recent Minor League teams, grouped by their Minor League "Alma Mater" for each year.
Their individual statistics are aggregated and then ranked by a single metric for batting (Total Bases plus RBIS) and for pitching
(Innings Pitched minus Earned Runs).`}</div><br/>

<div>{`Players with high Total Bases can be players who hit home runs, walk frequently, steal bases and play every day. Of course those bases may not lead to runs, and since 
 Runs Batted In are a pure measure of offensive results, they are added to the metric.`}</div><br/>

<div>{`Innings Pitched
  show the durability and to an extent, mound-worthiness of a pitcher. By subtracting
  Earned Runs allowed, this metric helps account for pitchers who may be throwing mop-up innings.`}</div><br/>

<div>{`All tables can be sorted by clicking the table header.`}</div><br/>
<div>{`Clicking or tapping any team's row will expose a list of current Major Leaguers who played for that minor league team during that year.`}</div><br/>
<div>{`Clicking or tapping an individual players' name with refer the user to their Baseball Reference page.`}</div></div>       
        </Item.Description>
      </Item.Content>
    </Item>

  </Item.Group>  
      <Modal.Description>
     </Modal.Description>
    </Modal.Content>
  )
  }