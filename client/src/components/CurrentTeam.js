import React from 'react';
import { Button, Card, Confirm, Container, Dropdown, Form, Grid, Header, Icon, Item, Image, Label, Modal, Segment } from 'semantic-ui-react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import ReactTable from 'react-table'

import MyPlayers from './MyPlayers.js'
import tmsLogos from '../lgos/namesAndLogos.js'

import '../App.css'

export default function CurrentTeam(props) {
  

  var team = []
  props.myAAA ? team.push(props.myAAA) : console.log('...');
  props.myAA ? team.push(props.myAA) : console.log('...');
  props.myAPlus ? team.push(props.myAPlus) : console.log('...');
  props.myA ? team.push(props.myA) : console.log('...');
  props.myAMinus ? team.push(props.myAMinus) : console.log('...');
  props.myRk ? team.push(props.myRk) : console.log('...');
  var fullTeam;
  if(team.length === 6 ) {
    fullTeam = true;
    
  } else {
    fullTeam =false
  }
console.log(team);

 ( function() {
    for (let i = 0; i < props.minorMaster.length; i++) {
        for (let j = 0; j < tmsLogos.length; j++) {
            if (props.minorMaster[i].tmName === tmsLogos[j].tmName) {
                props.minorMaster[i].curLogo = tmsLogos[j].logoPNG
            }
        }
    }
    props.minorMaster.map((lgo, idx) => {
        lgo.logoCell = <Image key={`${lgo.tmName}${idx}`} size='tiny' rounded src={lgo.curLogo} />
        lgo.logoMaj = <Image key={`${lgo.tmName}${idx}`} size='tiny' rounded src={lgo.franchLogo} />   
        return lgo
    })
    }
)()
    function handleYearClick(yr, tm, cl,team) {
   /*   props.getMyPlayers(yr, tm)*/
      hideButtons(yr)
          console.log(yr, tm, cl)
        switch(yr) {
            case 2018:
            props.setMy2018(`${yr} ${tm}`)
            break;
            case 2017:
            props.setMy2017(`${yr} ${tm}`)
            break;
            case 2016:
            props.setMy2016(`${yr} ${tm}`)
            break;
            case 2015:
            props.setMy2015(`${yr} ${tm}`)
            break;            
            case 2014:
            props.setMy2014(`${yr} ${tm}`)
            break;
            case 2013:
            props.setMy2013(`${yr} ${tm}`)
            break;    
            default:
            console.log('huh?')        
        }
        switch(cl) {
            case 'AAA':
            props.setMyAAA(`${yr} ${tm} , ${team}`)
         /*   localStorage.setItem('myAAA', `${yr} ${tm}`)*/
            break;
            case 'AA':
            props.setMyAA(`${yr} ${tm}`)
     /*       localStorage.setItem('myAA', `${yr} ${tm}`)*/
            break;
            case 'A+':
            props.setMyAPlus(`${yr} ${tm}`)
        /*    localStorage.setItem('myAPlus', `${yr} ${tm}`)*/
            break;
            case 'A':
            props.setMyA(`${yr} ${tm}`)
        /*    localStorage.setItem('myA', `${yr} ${tm}`)*/
            break;            
            case 'A-':
            props.setMyAMinus(`${yr} ${tm}`)
       /*     localStorage.setItem('myAMinus', `${yr} ${tm}`)*/
            break;
            case 'Rk':
            props.setMyRk(`${yr} ${tm}`)
        /*    localStorage.setItem('myRk', `${yr} ${tm}`)*/
            break;    
            default:                  
        }
       localStorage.setItem(`my${cl}`, `${yr} ${tm}`) 
       localStorage.setItem(`my${yr}`, `${yr} ${tm}`, function(){
      
       }) 

    }
 function hideButtons (yr) {
document.querySelectorAll(`.ui.button.my${yr}`).forEach(elem => {
  elem.disabled = true;
});
 }  

    return (
    <Container  >      
  <Tabs 
    forceRenderTabPanel={true}
    disabledTabClassName="noshow">
    <TabList>
    <Tab disabled={!props.myPlayers ? true: false}>My Players</Tab>
    <Tab>My Teams</Tab>
     <Tab disabled={props.myAAA ? true: false} >Triple A</Tab>
     <Tab disabled={props.myAA ? true: false} >Double A</Tab>
     <Tab disabled={props.myAPlus ? true: false} >Advanced A</Tab>
     <Tab disabled={props.myA ? true: false} >Class A</Tab>
     <Tab disabled={props.myAMinus ? true: false} >Short A</Tab>
    <Tab disabled={props.myRk ? true: false} >Rookie</Tab>
    </TabList>

{ props.myPlayers && <TabPanel>
  <MyPlayers 
    theme={props.theme}
    myPlayers={props.myPlayers}
    />
</TabPanel> }

<TabPanel>
    <Grid padded={false} columns={4}>
    {props.myAAA &&
    <Grid.Row style={{height: '12%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Triple A</span>
</Grid.Column>
<Grid.Column width='4'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myAAA}</span>
 </Grid.Column>
 <Grid.Column width='2'>
      <Button size="mini" onClick={() => props.setMyAAA()}>Change</Button>
 </Grid.Column>  
   </Grid.Row>

}    {props.myAA &&
    <Grid.Row style={{height: '12%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Double A</span>
 </Grid.Column>
 <Grid.Column width='4'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myAA}</span>
  </Grid.Column>
  <Grid.Column width='2'>
      <Button size="mini" onClick={() => props.setMyAA()}>Change</Button>
 </Grid.Column>  
   </Grid.Row> 

}{props.myAPlus &&
    <Grid.Row style={{height: '12%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Advanced A</span>
</Grid.Column>
<Grid.Column width='4'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myAPlus}</span>
 </Grid.Column> 
 <Grid.Column width='2'>
      <Button size="mini" onClick={() => props.setMyAPlus()}>Change</Button>
 </Grid.Column> 
   </Grid.Row> 

}{props.myA &&
    <Grid.Row style={{height: '12%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Class A</span>
</Grid.Column>
<Grid.Column width='4'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myA}</span>
 </Grid.Column>
 <Grid.Column width='2'>
      <Button size="mini" onClick={() => props.setMyA()}>Change</Button>
 </Grid.Column>  
   </Grid.Row> 

}{props.myAMinus &&
    <Grid.Row style={{height: '12%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Short A</span>
 </Grid.Column>
 <Grid.Column width='4'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myAMinus}</span>
</Grid.Column>
<Grid.Column width='2'>
      <Button size="mini" onClick={() => props.setMyAMinus()}>Change</Button>
 </Grid.Column> 
    </Grid.Row> 

}{props.myRk &&
    <Grid.Row style={{height: '12%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Rookie</span>
</Grid.Column>
<Grid.Column width='4'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myRk}</span>
</Grid.Column>
<Grid.Column width='2'>
      <Button size="mini" onClick={() => props.setMyRk()}>Change</Button>
 </Grid.Column> 
    </Grid.Row>     
}
  </Grid>
 <Button size="tiny" disabled={!fullTeam} onClick={()=>props.setOpenConfirm(true)}>Save Team</Button>
</TabPanel>

  <Confirm open={props.openConfirm} onCancel={()=>props.setOpenConfirm(false)} onConfirm={()=> props.saveTeamToDb(props.myUserName, props.myEmail, props.myFullTeam)} /> 
    <TabPanel >

     <Grid className={`App ${props.theme}`}>       
  {!props.myAAA && props.allAAA && props.allAAA.map((tm, ix) => {
   return(          
              <Grid.Row  key={tm.tmName} className="row">
                  <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini'  rounded src={tm.curLogo}/></Grid.Column>
                  <Grid.Column width={3}>{tm.tmName}</Grid.Column>
                  <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini'  rounded src={tm.franchLogo}/></Grid.Column>
                  <Grid.Column width={9}>
                      {tm.years.map((yr, idx) => {
                          return(
                  
                      <Button.Group key={tm.tmName + idx} size='mini' widths='16'> 
                       <Button className={`my${yr}`}
                         key={yr[idx]} 
                         onClick={() => handleYearClick(yr, tm.tmName, tm.class, tm )}
                         >
                         {yr}
                       </Button>
                      </Button.Group>  
                                    )
                      })}
                  </Grid.Column>
              </Grid.Row>              
       )})} 
            
          
      </Grid>
    </TabPanel>

    <TabPanel>
     <Grid className={`App ${props.theme}`}>

          {!props.myAA && props.allAA && props.allAA.map((tm, ix) => {
              return(             
              <Grid.Row  key={tm.tmName} className="row">
                  <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini'  rounded src={tm.curLogo}/></Grid.Column>
                  <Grid.Column width={3}>{tm.tmName}</Grid.Column>
                  <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini'  rounded src={tm.franchLogo}/></Grid.Column>
                  <Grid.Column width={9}>
                      {tm.years.map((yr, idx) => {
                          return(
                      <Button.Group floated="left" key={tm.tmName + idx} size='mini' widths='16'> 
                       <Button  className={`my${yr}`}
                         key={yr[idx]} 
                         onClick={() => handleYearClick(yr, tm.tmName, tm.class, tm )}
                         >
                         {yr}
                       </Button>
                      </Button.Group>                            )
                      })}
                  </Grid.Column>
              </Grid.Row>              
                  )
          })}
      </Grid>
    </TabPanel>
    <TabPanel>
     <Grid className={`App ${props.theme}`}>

          {!props.myAPlus && props.allAPlus && props.allAPlus.map((tm, ix) => {
              return(             
              <Grid.Row  key={tm.tmName} className="row">
                  <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini'  rounded src={tm.curLogo}/></Grid.Column>
                  <Grid.Column width={3}>{tm.tmName}</Grid.Column>
                  <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini'  rounded src={tm.franchLogo}/></Grid.Column>
                  <Grid.Column width={9}>
                      {tm.years.map((yr, idx) => {
                          return(
                      <Button.Group key={tm.tmName + idx} size='mini' widths='16'> 
                       <Button 
                         className={`my${yr}`}
                         key={yr[idx]} 
                         onClick={() => handleYearClick(yr, tm.tmName, tm.class, tm )}
                         >
                         {yr}
                       </Button>
                      </Button.Group>                            )
                      })}
                  </Grid.Column>
              </Grid.Row>              
                  )
          })}
      </Grid>
    </TabPanel>
    <TabPanel>
     <Grid className={`App ${props.theme}`}>

          {!props.myA && props.allA && props.allA.map((tm, ix) => {
              return(             
              <Grid.Row  key={tm.tmName} className="row">
                  <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini'  rounded src={tm.curLogo}/></Grid.Column>
                  <Grid.Column width={3}>{tm.tmName}</Grid.Column>
                  <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini'  rounded src={tm.franchLogo}/></Grid.Column>
                  <Grid.Column width={9}>
                      {tm.years.map((yr, idx) => {
                          return(
                      <Button.Group key={tm.tmName + idx} size='mini' widths='16'> 
                       <Button 
                       className={`my${yr}`}
                         key={yr[idx]} 
                         onClick={() => handleYearClick(yr, tm.tmName, tm.class, tm  )}
                         >
                         {yr}
                       </Button>
                      </Button.Group>                            )
                      })}
                  </Grid.Column>
              </Grid.Row>              
                  )
          })}
      </Grid>
    </TabPanel>
    <TabPanel>
     <Grid className={`App ${props.theme}`}>

          {!props.myAMinus && props.allAMinus && props.allAMinus.map((tm, ix) => {

              return(             
              <Grid.Row  key={tm.tmName} className="row">
                  <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini'  rounded src={tm.curLogo}/></Grid.Column>
                  <Grid.Column width={3}>{tm.tmName}</Grid.Column>
                  <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini'  rounded src={tm.franchLogo}/></Grid.Column>
                  <Grid.Column width={9}>
                      {tm.years.map((yr, idx) => {
                          return(
                      <Button.Group key={tm.tmName + idx} size='mini' widths='16'> 
                       <Button 
                       className={`my${yr}`}
                         key={yr[idx]} 
                         onClick={() => handleYearClick(yr, tm.tmName, tm.class, tm  )}
                         >
                         {yr}
                       </Button>
                      </Button.Group>                            )
                      })}
                  </Grid.Column>
              </Grid.Row>              
                  )
          })}
      </Grid>
    </TabPanel>
    <TabPanel>
     <Grid className={`App ${props.theme}`}>

          {!props.myRk && props.allRk && props.allRk.map((tm, ix) => {
  
              return(             
              <Grid.Row  key={tm.tmName} className="row">
                  <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini'  rounded src={tm.curLogo}/></Grid.Column>
                  <Grid.Column width={3}>{tm.tmName}</Grid.Column>
                  <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini'  rounded src={tm.franchLogo}/></Grid.Column>
                  <Grid.Column width={9}>
                      {tm.years.map((yr, idx) => {
                          return(
                      <Button.Group key={tm.tmName + idx} size='mini' widths='16'> 
                       <Button 
                       className={`my${yr}`}
                         key={yr} 
                         onClick={() => handleYearClick(yr, tm.tmName, tm.class, tm  )}
                         >
                         {yr}
                       </Button>
                      </Button.Group>                            )
                      })}
                  </Grid.Column>
              </Grid.Row>              
                  )
          })}
      </Grid>
    </TabPanel>
  </Tabs>
  
    </Container>
    )
}