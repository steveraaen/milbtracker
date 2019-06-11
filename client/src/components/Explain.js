import React from 'react';
import { Header, Image, Item, Modal} from 'semantic-ui-react'

 import batPic from '../lgos/drawBatter.png'
 import pitchPic from '../lgos/drawPitch.png'
import ball from '../ball.png'

 export default function Explain(props) {
return(
    <Modal.Content>
    <Item.Group>
    <Item.Header as='h3'>Welcome to Farm Team Fantasy</Item.Header>
    <Item>
      <Item.Image size='mini' src={ball} />

      <Item.Content>
        <Item.Description>
				 <p style={{fontWeight: 500, fontSize: '1.1em'}}>
				 {`Similar to fantasy leagues with drafts, Farm Team Fantasy ranks 'synthetic' teams of Major League 
				 Baseball players. FTF teams however, are constructed based on which Minor League teams the current 
				 Major Leaguers played on earlier in their career. Farm Team Fantasy generates bragging rights for minor league baseball 
				 teams and their fans based on how well their alumni are performing in the major leagues this year.`}</p>       
        </Item.Description>
      </Item.Content>
    </Item>
<Item.Header as='h3'>Batting Metrics :</Item.Header>
    <Item>
      <Item.Image size='mini' src={batPic}/>

      <Item.Content>
        <Item.Description> 		 
 		  	 <span>
 		  		<p>Players with high 
 		  			<span style={{fontWeight: 700}}> Total Bases </span>
 		  			 can be players who hit home runs, walk frequently, steal bases and play every day. Of course those bases may not lead to runs, and since 
 		  			 <span style={{fontWeight: 700}}>Runs Batted In</span> 
 		  			 are a pure measure of offensive results, they contribute to rankings.</p>
 		  		<p>All offensive results are ranked by <span style={{fontWeight: 700}}>Total Bases plus Runs Batted In.</span>  </p>
 		  	</span>
        </Item.Description>
      </Item.Content>
    </Item>
 <Item.Header as='h3'>Pitching Metrics :</Item.Header>
    <Item>
      <Item.Image size='mini' src={pitchPic}/>
      <Item.Content>
        <Item.Description> 		 
 		  	 <span>
 		  		<p><span style={{fontWeight: 700}}>Innings Pitched</span>
 		  			 show the durability and to an extent, mound-worthiness. By subtracting
 		  			 <span style={{fontWeight: 700}}>Earned Runs</span> allowed, we account for pitchers who may be throwing mop-up innings.
 		  		</p>
 		  		<p>Pitching is ranked by <span style={{fontWeight: 700}}>Innings Pitched minus Earned Runs.</span>  </p>
 		  	</span>
        </Item.Description>
      </Item.Content>
    </Item>
  </Item.Group>  
      <Modal.Description>
     </Modal.Description>
    </Modal.Content>
  )
  }