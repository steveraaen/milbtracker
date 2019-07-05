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
    function handleYearClick(yr, tm, cl, team) {
        switch(cl) {
          case 'A+':
          cl="APlus"
          break;
          case 'A-':
          cl="AMinus"
          break;
          default: 
          cl=cl
        }
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

    const aaa = props.minorMaster.filter(tm => tm.class === 'AAA')
    const aa = props.minorMaster.filter(tm => tm.class === 'AA')
    const aplus = props.minorMaster.filter(tm => tm.class === 'A+')
    const a = props.minorMaster.filter(tm => tm.class === 'A')
    const aminus = props.minorMaster.filter(tm => tm.class === 'A-')
    const rk = props.minorMaster.filter(tm => tm.class === 'Rk')


 function hideButtons () {
    var btns = document.getElementsByClassName('ui button')
   
    btns = [...btns].map((bt, ix) => {
      bt.disabled =true
    })
 }  
    return (
    <Container  >      
  <Tabs>
    <TabList>
      <Tab>My Teams</Tab>
{!props.myAAA && <Tab>Triple A</Tab>}
{!props.myAA && <Tab>Double A</Tab>}
{!props.myAPlus && <Tab>Advanced A</Tab>}
{!props.myA && <Tab>Class A</Tab>}
{!props.myAMinus && <Tab>Short A</Tab>}
{!props.myRk && <Tab>Rookie</Tab>}

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
      <Button size="tiny" onClick={() => props.setMyAAA(null)}>Change</Button>
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
 {!props.myAAA && aaa && aaa.map((tm, ix) => {
   return(     
    <TabPanel>
     <Grid className={`App ${props.theme}`}>
         
        
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
                  
          
      </Grid>
    </TabPanel>
    )})}
    <TabPanel>
     <Grid className={`App ${props.theme}`}>

          {!props.myAA && aa && aa.map((tm, ix) => {
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

          {!props.myAPlus && aplus && aplus.map((tm, ix) => {
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

          {!props.myA && a && a.map((tm, ix) => {
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

          {!props.myAMinus && aminus && aminus.map((tm, ix) => {
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

          {!props.myRk && rk && rk.map((tm, ix) => {
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
  </Tabs>
    </Container>
    )
}