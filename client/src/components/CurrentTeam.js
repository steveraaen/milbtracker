import React, {useState, useEffect } from 'react';
import { Button, Card, Container, Dropdown, Form, Grid, Header, Icon, Item, Image, Label, Modal, Segment } from 'semantic-ui-react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import ReactTable from 'react-table'

import MyTeam from './MyTeam.js'
import tmsLogos from '../lgos/namesAndLogos.js'

import '../App.css'

export default function CurrentTeam(props) {

/*function deleteTeam() {
  var teamSplit = props.myAAA.split(' ') 
  var splitYr = teamSplit[0]
  `props.setMy${splitYr}(null)`
  props.setMyAAA(null)
}
*/
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
    function handleYearClick(yr, tm, cl) {
      props.getMyPlayers(yr, tm)
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
            props.setMyAAA(`${yr} ${tm}`)
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
       localStorage.setItem(`my${yr}`, `${yr} ${tm}`) 
    }
 function hideButtons (yr) {
    var btns = document.getElementsByClassName(`ui button my${yr}`)  
    btns = [...btns].map((bt, ix) => {
      bt.disabled =true
    })

 }  
    return (
    <Container  >      
  <Tabs>
    <TabList>
      <Tab>My Teams</Tab>
      <Tab>Triple A</Tab>
      <Tab>Double A</Tab>
      <Tab>Advanced A</Tab>
      <Tab>Class A</Tab>
      <Tab>Short A</Tab>
      <Tab>Rookie</Tab>
    </TabList>

<TabPanel>
    <Grid columns={4}>
    {props.myAAA &&
    <Grid.Row style={{height: '15%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Triple A</span>
</Grid.Column>
<Grid.Column width='6'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myAAA}</span>
 </Grid.Column>
 <Grid.Column width='6'>
      <Button size="tiny" onClick={() => props.setMyAAA()}>Change</Button>
 </Grid.Column>  
   </Grid.Row>

}    {props.myAA &&
    <Grid.Row style={{height: '15%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Double A</span>
 </Grid.Column>
 <Grid.Column width='6'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myAA}</span>
  </Grid.Column>
  <Grid.Column width='6'>
      <Button size="tiny">Change</Button>
 </Grid.Column>  
   </Grid.Row> 

}{props.myAPlus &&
    <Grid.Row style={{height: '15%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Advanced A</span>
</Grid.Column>
<Grid.Column width='6'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myAPlus}</span>
 </Grid.Column> 
 <Grid.Column width='6'>
      <Button size="tiny">Change</Button>
 </Grid.Column> 
   </Grid.Row> 

}{props.myA &&
    <Grid.Row style={{height: '15%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Class A</span>
</Grid.Column>
<Grid.Column width='6'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myA}</span>
 </Grid.Column>
 <Grid.Column width='6'>
      <Button size="tiny">Change</Button>
 </Grid.Column>  
   </Grid.Row> 

}{props.myAMinus &&
    <Grid.Row style={{height: '15%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Short A</span>
 </Grid.Column>
 <Grid.Column width='6'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myAMinus}</span>
</Grid.Column>
<Grid.Column width='6'>
      <Button size="tiny">Change</Button>
 </Grid.Column> 
    </Grid.Row> 

}{props.myRk &&
    <Grid.Row style={{height: '15%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Rookie</span>
</Grid.Column>
<Grid.Column width='6'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myRk}</span>
</Grid.Column>
<Grid.Column width='6'>
      <Button size="tiny">Change</Button>
 </Grid.Column> 
    </Grid.Row>     
}
  </Grid>
</TabPanel>
  
    <TabPanel>

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
       {props.myAAA && 
<div className={`App ${props.theme}`} style={{display: 'flex', flexDirection: 'column'}}>
<Button size="tiny" onClick={() => props.setMyAAA()}>Change</Button>
          <span style={{fontSize: '1.2em'}}>{` Current Triple A:  ${props.myAAA}`}</span>
          <Grid>
                <Grid.Row>
                  <Grid.Column width='3'>
                   <div>MLB Team</div>
                  </Grid.Column>
                  <Grid.Column width='3'>
                    <span>Player</span>
                  </Grid.Column>
                  <Grid.Column width='3'>
                    <span>AVG </span>
                  </Grid.Column>
                 <Grid.Column width='3'>
                    <span>AB</span>
                  </Grid.Column>
                 <Grid.Column width='3'>
                    <span>TB</span>
                  </Grid.Column>
                </Grid.Row>
          {props.myPlayers && 
            props.myPlayers.map((plyr, idx)=> {
              return(
                <Grid.Row>
                  <Grid.Column width='3'>
                    <Image size='mini' src={plyr.curTeamLogo} />
                  </Grid.Column>
                  <Grid.Column width='3'>
                    <span>{plyr.playerName}</span>
                  </Grid.Column>
                  <Grid.Column width='3'>
                    <span>{plyr.AVG} </span>
                  </Grid.Column>
                 <Grid.Column width='3'>
                    <span>{plyr.AB} </span>
                  </Grid.Column>
                 <Grid.Column width='3'>
                    <span>{plyr.TB} </span>
                  </Grid.Column>
                </Grid.Row>
                )
            })

            }
          </Grid>        
</div>          
        }              
          
      </Grid>
    </TabPanel>

    <TabPanel>
     <Grid className={`App ${props.theme}`}>

          {props.allAA && props.allAA.map((tm, ix) => {
              return(             
              <Grid.Row  key={tm.tmName} className="row">
                  <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini'  rounded src={tm.curLogo}/></Grid.Column>
                  <Grid.Column width={3}>{tm.tmName}</Grid.Column>
                  <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini'  rounded src={tm.franchLogo}/></Grid.Column>
                  <Grid.Column width={9}>
                      {tm.years.map((yr, idx) => {
                          return(
                      <Button.Group key={tm.tmName + idx} size='mini' widths='16'> 
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

          {props.allAPlus && props.allAPlus.map((tm, ix) => {
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

          {props.allA && props.allA.map((tm, ix) => {
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

          {props.allAMinus && props.allAMinus.map((tm, ix) => {

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

          {props.allRk && props.allRk.map((tm, ix) => {
  
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