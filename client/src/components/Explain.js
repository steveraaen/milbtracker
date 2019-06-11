import React from 'react';
import { Header, Image, Item, Modal} from 'semantic-ui-react'

 import pic from '../lgos/playerdog.png'
 import wspic from '../lgos/worldseries.png'

 export default function Explain(props) {
return(
    <Modal.Content>
    <Item.Group>
    <Item.Header as='h3'>Welcome to Farm Team Fantasy</Item.Header>
    <Item>
      <Item.Image src={pic} />

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
<Item.Header as='h3'>Metrics</Item.Header>
    <Item>
      <Item.Image src={wspic}/>

      <Item.Content>
        <Item.Description>
        <p style={{fontWeight: 500, fontSize: '1.1em'}}>
        Teams and players are ranked on just one offensive and defensive metric.
        </p>
        
 		  <h3>Batting:</h3>
 		  <h3>Pitching:</h3>
        </Item.Description>
      </Item.Content>
    </Item>
  </Item.Group>  
      <Modal.Description>
     </Modal.Description>
    </Modal.Content>
  )
  }