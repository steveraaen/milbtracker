import React, { useEffect } from 'react';
import { Card, Container,  Form, Grid, Image, Label, Loader, Segment,  Table } from 'semantic-ui-react'
import '../App.css'

function Teams(props) {
return (
  <div>
  {props.topTenBatting && props.allMLB && props.topTenBatting.map((crd, idx) => {
    return(
       <Card key={idx}>
       <Card.Header>            
       <Card.Meta>{crd.yr}</Card.Meta>
         <div style={{display: 'flex', flrxDirection: 'row', justifyContent: 'space-between'}}>
         <div>
         {crd.milbTeam}
        </div>
        {props.allMLB && props.allMLB.map((mjr, ix) => {
          if(mjr.teamCode === crd.majteam) {
            return (mjr.teamName)
          } else{return null}
        })}
        
        </div>
        </Card.Header>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

         </div>
          <Card.Content>
            <Card.Description> <div>At Bats:  {crd.bAB}</div></Card.Description>
            <Card.Description> <div>Average:  {crd.bBA}</div></Card.Description>
            <Card.Description> <div>Hits:  {crd.bH}</div></Card.Description>
          </Card.Content>
          <Card.Content extra>

          </Card.Content>
        </Card>
      )
  })}
</div>
)

}

function YearPicker(props) {
    function handleChange(e, { value, label }) {
        console.log(e.target)
        /* props.getBestMinors(props.selectedClass.code, props.selectedDivision.value, props.selectedClass.regex, value) */
        props.setSelectedYear(value)
        props.getTopTen(props.selectedClass.code, value.value, props.timeframe)
        props.toggleFormSidebar()
       /* props.setSelectedMiLBTeam(props.topTen.topTenBatting[0])*/
        /*  props.getPlayerList(props.selectedClass.regex, props.selectedMiLBTeam.franchise, value, props.selectedMiLBTeam.name)
         */
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
        /*      props.getBestMinors(JSON.parse(value).code, props.selectedDivision.value, JSON.parse(value).regex, props.selectedYear) 
         */
        props.setSelectedClass(value)
        props.getTopTen(value.code, props.selectedYear.value, props.timeframe)
        props.toggleFormSidebar()
        /*        props.getPlayerList(value.regex, props.selectedMiLBTeam.franchise, props.selectedYear, props.selectedMiLBTeam.name)
         */
    }
    var tempObj = {
        displayName: "All MiLB Classes",
        name: "%%",
        code: "%%",
        regex: "%"
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

function BestFive(props) {

    if (props.topTen && props.allMLB && props.selectedClass /*&& props.selectedMiLBTeam*/ ) {
        useEffect(() => {
            props.setSelectedMiLBTeam({ name: props.topTen.topTenBatting[0].milbTeam, logo: props.topTen.topTenBatting[0].logo, franchise: props.topTen.topTenBatting[0].majteam, franchiseLogo: props.topTen.topTenBatting[0].franchiseLogo, color: props.topTen.topTenBatting[0].color })
            /*       props.getPlayerList(props.selectedClass.regex, props.topTen.topTenBatting[0].majteam, props.topTen.topTenBatting[0].yr, props.topTen.topTenBatting[0].milbTeam)
             */
            /*  props.setSelectedYear(props.topTen.topTenBatting[0].yr) */
        }, {})
        const handleClick = (e) => {
            console.log(e)
            props.getPlayerList(props.selectedClass.code, props.selectedClass.regex, e.majteam, e.yr, e.milbTeam)
            props.setSelectedMiLBTeam({ name: e.milbTeam, logo: e.logo, franchise: e.majteam, franchiseLogo: e.franchiseLogo, color: e.color, t_id: e.id })
            props.setModalOpen(true)
            /* props.setSelectedYear(e.yr) */
        }
        const handleBSort = (e) => {
            console.log(e)
            props.sortBTable(e)
        }
        const handlePSort = (e) => {
            console.log(e)
            props.sortPTable(e)
        }
        return (
            <Grid>  
   <Grid.Row columns="2">
   <Grid.Column  style={{display: 'flex', flexDirection: 'row'}}>
   <div style={{minWidth: '45vw', maxHeight: 500, overflowY: 'scroll'}}>
        <Table style={{backgroundColor: 'seashell'}} collapsible='true'>
      
          <Table.Header>
          
          <Table.Row   style={{fontSize: '.7rem'}}>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell  
            onClick={() => handleBSort('bBA')}
           >AVG
            
            </Table.HeaderCell>
            <Table.HeaderCell  
            onClick={() => handleBSort('bHR')}
           >HRs
            
            </Table.HeaderCell>
            <Table.HeaderCell  
            onClick={() => handleBSort('bH')}
           >Hits
            
            </Table.HeaderCell>
            <Table.HeaderCell  
            onClick={() => handleBSort('bBB')}
           >Walks
            
            </Table.HeaderCell>
            <Table.HeaderCell  
            onClick={() => handleBSort('bAB')}
           >At Bats
            
            </Table.HeaderCell>
          </Table.Row>
          
        </Table.Header>
        
        <Table.Body>
          { props.topTenHit && props.topTenHit.map((btm, idx) => {
            btm.id=idx
            return(
              <Table.Row                 
                    onClick={(e) => {   
                      handleClick(btm, props.selectedMiLBTeam)                                  
                    }}   
                    active={props.selectedMiLBTeam.t_id === idx}             
                     key={idx}>
              <Table.Cell>
              {idx + 1}
              </Table.Cell>
              <Table.Cell value={btm}>
             
                <p>{btm.cl}</p>
              </Table.Cell>
                <Table.Cell value={btm}>
                  <p style={{fontSize: '.8rem', fontWeight: 600}}>{btm.yr}</p>
                  <p style={{color: btm.color, fontSize: '.8rem', fontWeight: 600}}>
                    {btm.milbTeam}
                   </p>
                  <p style={{fontSize: '1rem'}}>
                    {props.allMLB.map(nm => {
                      if(nm.teamCode === btm.majteam) {
                        return nm.teamName
                      } else {return null}
                    })}
                  </p>
                </Table.Cell>
                <Table.Cell value={btm}>{btm.bBA}</Table.Cell>
                <Table.Cell value={btm}>{btm.bHR}</Table.Cell>
                <Table.Cell value={btm}>{btm.bH}</Table.Cell>
                <Table.Cell value={btm}>{btm.bBB}</Table.Cell>
                <Table.Cell value={btm}>{btm.bAB}</Table.Cell>
              </Table.Row>
              )
          })}
        </Table.Body>
        </Table>        
        </div>
        </Grid.Column>
        <Grid.Column>
          <div style={{minWidth: '45vw', maxHeight: 500, overflowY: 'scroll'}}>
        <Table style={{backgroundColor: 'seashell'}} collapsible='true'>
     
          <Table.Header>
          <Table.Row style={{fontSize: '.7rem'}}>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell onClick={() => handlePSort('pERA')}>ERA</Table.HeaderCell>
            <Table.HeaderCell onClick={() => handlePSort('pW')}>Wins</Table.HeaderCell>
            <Table.HeaderCell onClick={() => handlePSort('pL')}>Losses</Table.HeaderCell>
            <Table.HeaderCell onClick={() => handlePSort('pSV')}>Saves</Table.HeaderCell>
            <Table.HeaderCell onClick={() => handlePSort('pIP')}>Innings </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.topTenPitch && props.topTenPitch.map((ptm, ix) => {
            ptm.id=ix + 5
            return(

              <Table.Row                 
                    onClick={(e) => {   
                      handleClick(ptm, props.selectedMiLBTeam)                                  
                    }}   
                    active={props.selectedMiLBTeam.t_id === ix + 5}             
                     key={ix}>
              <Table.Cell>{ix + 1}</Table.Cell>
              <Table.Cell>
                <p>{ptm.cl}</p>
              </Table.Cell>
                <Table.Cell>
                <p style={{fontSize: '.8rem', fontWeight: 600}}>{ptm.yr}</p>
                  <p style={{color: ptm.color, fontSize: '.8rem', fontWeight: 600}}>
                    {ptm.milbTeam}
                   </p>
                  <p style={{fontSize: '1rem'}}>
                    {props.allMLB.map(nm => {
                      if(nm.teamCode === ptm.majteam) {
                        return nm.teamName
                      } else {return null}
                    })}
                  </p>
                </Table.Cell>
                <Table.Cell>{ptm.pERA}</Table.Cell>
                <Table.Cell>{ptm.pW}</Table.Cell>
                <Table.Cell>{ptm.pL}</Table.Cell>
                <Table.Cell>{ptm.pSV}</Table.Cell>
                <Table.Cell>{ptm.pIP}</Table.Cell>
              </Table.Row>
              )
          })}
        </Table.Body>
        </Table>
        </div>
        </Grid.Column>
        </Grid.Row>
       </Grid>
        )
    } else { return <div>...</div> }
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


export { BestFive, BestPlayers, ClassPicker,  Batters, Pitchers, /*Stats,*/ Teams, YearPicker };



