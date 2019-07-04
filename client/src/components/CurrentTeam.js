import React, {useState, useEffect } from 'react';
import { Button, Card, Container, Dropdown, Form, Grid, Header, Icon, Item, Image, Label, Modal, Segment } from 'semantic-ui-react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import ReactTable from 'react-table'

import MyTeam from './MyTeam.js'
import tmsLogos from '../lgos/namesAndLogos.js'
import '../App.css'


export default function CurrentTeam(props) {


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
            props.setMyAAA(team)
         /*   localStorage.setItem('myAAA', team)*/
            break;
            case 'AA':
            props.setMyAA(team)
     /*       localStorage.setItem('myAA', team)*/
            break;
            case 'A+':
            props.setMyAPlus(team)
        /*    localStorage.setItem('myAPlus', team)*/
            break;
            case 'A':
            props.setMyA(team)
        /*    localStorage.setItem('myA', team)*/
            break;            
            case 'A-':
            props.setMyAMinus(team)
       /*     localStorage.setItem('myAMinus', team)*/
            break;
            case 'Rk':
            props.setMyRk(team)
        /*    localStorage.setItem('myRk', team)*/
            break;    
            default:
                    
        }
       localStorage.setItem(`my${cl}`, team) 
       localStorage.setItem(`my${yr}`, team) 

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
      <Tab>Triple A</Tab>
      <Tab>Double A</Tab>
      <Tab>A Advanced</Tab>
      <Tab>Class A</Tab>
      <Tab>A Short</Tab>
      <Tab>Rookie</Tab>
    </TabList>

<TabPanel>
    <Grid columns={4}>
    {props.myAAA &&
    <Grid.Row style={{height: '15%'}}>
      <h2>Triple A</h2>
      <Image size="tiny" src={props.myAAA.curLogo} />
      <div style={{fontSize: '1.4em', fontWeight: 600}}>{props.myAAA.yr + "  " + props.myAAA.tmName}</div>
    </Grid.Row>     
}    {props.myAA &&
    <Grid.Row style={{height: '15%'}}>
      <h2>Double A</h2>
      <Image size="tiny" src={props.myAA.curLogo} />
      <div style={{fontSize: '1.4em', fontWeight: 600}}>{props.myAA.yr + "  " + props.myAA.tmName}</div>
    </Grid.Row>     
}{props.myAPlus &&
    <Grid.Row style={{height: '15%'}}>
      <h2>Advanced A</h2>
      <Image size="tiny" src={props.myAPlus.curLogo} />
      <div style={{fontSize: '1.4em', fontWeight: 600}}>{props.myAPlus.yr + "  " + props.myAPlus.tmName}</div>
    </Grid.Row>     
}{props.myA &&
    <Grid.Row style={{height: '15%'}}>
      <h2>Class A</h2>
      <Image size="tiny" src={props.myA.curLogo} />
      <div style={{fontSize: '1.4em', fontWeight: 600}}>{props.myA.yr + "  " + props.myA.tmName}</div>
    </Grid.Row>     
}{props.myAMinus &&
    <Grid.Row style={{height: '15%'}}>
      <h2>Short A</h2>
      <Image size="tiny" src={props.myAMinus.curLogo} />
      <div style={{fontSize: '1.4em', fontWeight: 600}}>{props.myAMinus.yr + "  " + props.myAMinus.tmName}</div>
    </Grid.Row>     
}{props.myRk &&
    <Grid.Row style={{height: '15%'}}>
      <h2>Rookie</h2>
      <Image size="tiny" src={props.myRk.curLogo} />
      <div style={{fontSize: '1.4em', fontWeight: 600}}>{props.myRk.yr + "  " + props.myRk.tmName}</div>
    </Grid.Row>     
}


  </Grid>
</TabPanel>

 
    <TabPanel>
     <Grid className={`App ${props.theme}`}>
          {!props.myAAA && aaa && aaa.map((tm, ix) => {
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