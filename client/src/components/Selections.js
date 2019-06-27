import React from 'react';
import { Container,  Form, Segment,  Table } from 'semantic-ui-react'
import '../App.css'

function YearPicker(props) {
    function handleChange(e, { value, label }) {
        console.log(e.target)
        props.setSelectedYear(value)
        props.getTopTen(props.selectedClass.code, value.value, props.timeframe)
        props.toggleFormSidebar()
    }
    return (
        <Form>
        <Form.Group 
        style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        { props.years.map((yr, idx) => {
          return(
             <Form.Checkbox 
             toggle
               label={yr.text}
               value={yr}
               key={idx} 
               onChange={handleChange}
               checked={props.selectedYear === yr}
               >
               </Form.Checkbox>
            )
        })        
       }
        </Form.Group>
     </Form>
    )
}
function ClassPicker(props) {
    function handleChange(e, { value }) {
        console.log(value)
        props.setSelectedClass(value)
        props.getTopTen(value.code, props.selectedYear.value, props.timeframe)
        props.toggleFormSidebar()
    }

    return (
       <Form.Group       
         style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}> 
        { props.classes.map((cl, idx) => {
          return(
             <Form.Checkbox 
             toggle
             label={cl.displayName}
             key={cl.regex} 
             value={cl}
             onChange={handleChange}
             checked={props.selectedClass === cl}
             >
             </Form.Checkbox>
            )
        })         
        }
        </Form.Group> 
    );
}
const Batters = (props) => {
    if (props.playerList) {
       return (
            <div style={{width: '45vw', marginTop: 2, height: 240, overflowY: 'scroll', paddingBottom: 10}}>
    <Segment>
 
      <Table compact >
      <Table.Header>
        <Table.Row>         
          <Table.HeaderCell  style={{fontSize: '1rem', fontWeight: 'bold'}}>Batter</Table.HeaderCell>          
          <Table.HeaderCell  style={{fontSize: '1rem', fontWeight: 'bold'}}>Team</Table.HeaderCell>          
          <Table.HeaderCell  style={{fontSize: '1rem', fontWeight: 'bold'}}>At Bats</Table.HeaderCell>          
          <Table.HeaderCell  style={{fontSize: '1rem', fontWeight: 'bold'}}>Average</Table.HeaderCell>          
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {props.playerList.map((pl, idx) => {
        return(
        <Table.Row key={idx}>
          <Table.Cell  style={{fontSize: '1rem', fontWeight: 'bold'}} >{pl.playerName}</Table.Cell>
          <Table.Cell style={{fontSize: '1rem', fontWeight: 'bold', color: pl.color}}>{pl.teamID}</Table.Cell>
          <Table.Cell  style={{fontSize: '1rem', fontWeight: 'bold'}} >{pl.AB}</Table.Cell>
          <Table.Cell  style={{fontSize: '1rem', fontWeight: 'bold'}} >{parseFloat(pl.AVG).toFixed(3)}</Table.Cell>
        </Table.Row>
        )
        })
        }
      </Table.Body>
    </Table>
    </Segment>
  </div>
        )
    } else { return (<div></div>) }
}
function Pitchers(props) {
    if (props.pitcherList) {
        return (
            <div style={{width: '45vw', marginTop: 2, height: 240, overflowY: 'scroll'}}>
      <Segment>
      <Table compact>
      <Table.Header>
        <Table.Row>         
          <Table.HeaderCell style={{fontSize: '1rem', fontWeight: 'bold'}}>Pitcher</Table.HeaderCell>          
          <Table.HeaderCell style={{fontSize: '1rem', fontWeight: 'bold'}}>Team</Table.HeaderCell>          
          <Table.HeaderCell style={{fontSize: '1rem', fontWeight: 'bold'}}>Innings</Table.HeaderCell>                   
          <Table.HeaderCell style={{fontSize: '1rem', fontWeight: 'bold'}}>ERA</Table.HeaderCell>          
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {props.pitcherList.map((pt, idx) => {
        return(
        <Table.Row key={idx}>
          <Table.Cell style={{fontSize: '1rem', fontWeight: 'bold'}}>{pt.playerName}</Table.Cell>
          <Table.Cell style={{fontSize: '1rem', fontWeight: 'bold', color: pt.color}}>{pt.teamID}</Table.Cell>
          <Table.Cell style={{fontSize: '1rem', fontWeight: 'bold'}}>{pt.IP.toFixed(1)}</Table.Cell>
          <Table.Cell style={{fontSize: '1rem', fontWeight: 'bold'}}>{parseFloat(9 * (pt.ER / pt.IP)).toFixed(2)}</Table.Cell>
        </Table.Row>
        )
        })
        }
      </Table.Body>
    </Table>
    </Segment>
    </div>
        )
    } else { return (<div></div>) }
}
function BestPlayers(props) {
    if (props.players.playerList && props.players.pitcherList) {
        return (
            <Container>
  <Table style={{width: '45vw'}} collapsible>
  <Table.Header>
      <Table.Row style={{fontSize: '1rem', fontWeight: 600}}>
         <Table.HeaderCell>Best MLB 2018 Hitter </Table.HeaderCell>
         <Table.HeaderCell>Avg.</Table.HeaderCell>
         <Table.HeaderCell>Hits</Table.HeaderCell>
         <Table.HeaderCell>RBI</Table.HeaderCell>
         <Table.HeaderCell>HR</Table.HeaderCell>
         <Table.HeaderCell>At Bats</Table.HeaderCell>
      </Table.Row> 
      </Table.Header>
    <Table.Body>
      <Table.Row style={{fontSize: '1.2rem'}}>
      <Table.Cell>
      <span>{props.players.playerList[0].playerName}<br/><div style={{color: props.players.pitcherList[0].color}}>{props.players.pitcherList[0].teamName}</div></span>
      </Table.Cell>
      <Table.Cell>{parseFloat(props.players.playerList[0].AVG).toFixed(3)}</Table.Cell>
      <Table.Cell>{props.players.playerList[0].H}</Table.Cell>
      <Table.Cell>{props.players.playerList[0].RBI}</Table.Cell>
      <Table.Cell>{props.players.playerList[0].HR}</Table.Cell>
      <Table.Cell>{props.players.playerList[0].AB}</Table.Cell>
      </Table.Row>
     </Table.Body>
     <Table.Header>
      <Table.Row style={{fontSize: '1rem', fontWeight: 600}}>
         <Table.HeaderCell>Best MLB 2018 Pitcher </Table.HeaderCell>       
         <Table.HeaderCell>Innings</Table.HeaderCell>
         <Table.HeaderCell>ER Avg.</Table.HeaderCell>
         <Table.HeaderCell>Wins</Table.HeaderCell>
         <Table.HeaderCell>Losses</Table.HeaderCell>
         <Table.HeaderCell>Saves</Table.HeaderCell>
      </Table.Row>
      </Table.Header> 
    <Table.Body>
    <Table.Row style={{fontSize: '1.2rem'}}>
      <Table.Cell>
      <span>{props.players.pitcherList[0].playerName}<br/><div style={{color: props.players.playerList[0].color}}>{props.players.playerList[0].teamName}</div></span>
      </Table.Cell>
      <Table.Cell>{parseFloat(props.players.pitcherList[0].IP).toFixed(1)}</Table.Cell>
      <Table.Cell>{parseFloat(9 * (props.players.pitcherList[0].ER / props.players.pitcherList[0].IP)).toFixed(2)}</Table.Cell>
      <Table.Cell>{props.players.pitcherList[0].W}</Table.Cell>
      <Table.Cell>{props.players.pitcherList[0].L}</Table.Cell>
      <Table.Cell>{props.players.pitcherList[0].SV}</Table.Cell>
    </Table.Row>
    </Table.Body>
  </Table>
  </Container>
        )
    } else { return <div></div> }
}
export { BestPlayers, ClassPicker,  Batters, Pitchers, YearPicker };



