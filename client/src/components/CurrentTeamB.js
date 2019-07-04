import React, {useState, useEffect } from 'react';
import { Button, Container, Dropdown, Form, Grid, Icon, Image, Modal, Segment, Tab } from 'semantic-ui-react'
import ReactTable from 'react-table'

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
    function handleYearClick(yr, tm, cl) {
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
            break;
            case 'AA':
            props.setMyAA(`${yr} ${tm}`)
            break;
            case 'A+':
            props.setMyAPlus(`${yr} ${tm}`)
            break;
            case 'A':
            props.setMyA(`${yr} ${tm}`)
            break;            
            case 'A-':
            props.setMyAMinus(`${yr} ${tm}`)
            break;
            case 'Rk':
            props.setMyRk(`${yr} ${tm}`)
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


const panes = [
  { menuItem: 'Triple A', 
      render: () => <Tab.Pane   >
 
      
{props.myAAA &&  
<Container>
      <Segment>
      {`Your current Triple A selection: ${props.myAAA}`}
      </Segment>
</Container>
}
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
                         onClick={() => handleYearClick(yr, tm.tmName, tm.class )}
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
  </Tab.Pane> },
  { menuItem: 'Double A', render: () => <Tab.Pane>      
  <Grid className={`App ${props.theme}`}>
    {aa && aa.map((tm, ix) => {
        return(
            <Grid.Row className="row">
                <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini'  rounded src={tm.curLogo}/></Grid.Column>
                <Grid.Column width={4}>{tm.tmName}</Grid.Column>
                <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini'  rounded src={tm.franchLogo}/></Grid.Column>
                <Grid.Column width={8}>
                    {tm.years.map((yr, idx) => {
                      var show18 = tm.yr === 2018 && props.my2018 ? true : false

                        return(
                    <Button.Group size='mini'>
                       <Button 
                         key={idx} 
                         className={`my${yr}`}   
                         onClick={() => handleYearClick(yr, tm.tmName, tm.class )}
                         /*onClick={() => hideButtons(`my${yr}`)}*/
                         >
                         {yr}</Button>
                    </Button.Group>
                            )
                    })}
                </Grid.Column>
            </Grid.Row>
            )
          })}
      </Grid></Tab.Pane> },
  { menuItem: 'Advanced A', render: () => <Tab.Pane>      
  <Grid className={`App ${props.theme}`}>
          {aplus && aplus.map((tm, ix) => {
              return(
                  <Grid.Row className="row">
                      <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini'  rounded src={tm.curLogo}/></Grid.Column>
                      <Grid.Column width={4}>{tm.tmName}</Grid.Column>
                      <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini'  rounded src={tm.franchLogo}/></Grid.Column>
                      <Grid.Column width={8}>
                          {tm.years.map((yr, idx) => {
                              return(
                          <Button.Group size='mini'>
                       <Button 
                         key={idx} 
                         className={`my${yr}`}   
                         onClick={() => handleYearClick(yr, tm.tmName, tm.class )}
                         /*onClick={() => hideButtons(`my${yr}`)}*/
                         >
                         {yr}</Button>
                          </Button.Group>
                                  )
                          })}
                      </Grid.Column>
                  </Grid.Row>
                  )
          })}
      </Grid></Tab.Pane> },
  { menuItem: 'Class A', render: () => <Tab.Pane>      
  <Grid className={`App ${props.theme}`}>
          {a && a.map((tm, ix) => {
              return(
                  <Grid.Row className="row">
                      <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini'  rounded src={tm.curLogo}/></Grid.Column>
                      <Grid.Column width={4}>{tm.tmName}</Grid.Column>
                      <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini'  rounded src={tm.franchLogo}/></Grid.Column>
                      <Grid.Column width={8}>
                          {tm.years.map((yr, idx) => {
                              return(
                          <Button.Group size='mini'>
                         <Button 
                         key={idx} 
                         className={`my${yr}`}   
                         onClick={() => handleYearClick(yr, tm.tmName, tm.class )}
                         /*onClick={() => hideButtons(`my${yr}`)}*/
                         >
                         {yr}</Button>
                          </Button.Group>
                                  )
                          })}
                      </Grid.Column>
                  </Grid.Row>
                  )
          })}
      </Grid></Tab.Pane> },
  { menuItem: 'Short A', render: () => <Tab.Pane>      
  <Grid className={`App ${props.theme}`}>
          {aminus && aminus.map((tm, ix) => {
              return(
                  <Grid.Row className="row">
                      <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini'  rounded src={tm.curLogo}/></Grid.Column>
                      <Grid.Column width={4}>{tm.tmName}</Grid.Column>
                      <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini'  rounded src={tm.franchLogo}/></Grid.Column>
                      <Grid.Column width={8}>
                          {tm.years.map((yr, idx) => {
                              return(
                          <Button.Group size='mini'>
                       <Button 
                         key={idx} 
                         className={`my${yr}`}   
                         onClick={() => handleYearClick(yr, tm.tmName, tm.class )}
                         /*onClick={() => hideButtons(`my${yr}`)}*/
                         >
                         {yr}</Button>
                          </Button.Group>
                                  )
                          })}
                      </Grid.Column>
                  </Grid.Row>
                  )
          })}
      </Grid></Tab.Pane> },
  { menuItem: 'Rookie', render: () => <Tab.Pane>      
  <Grid className={`App ${props.theme}`}>
          {rk && rk.map((tm, ix) => {
              return(
                  <Grid.Row className="row">
                      <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini'  rounded src={tm.curLogo}/></Grid.Column>
                      <Grid.Column width={4}>{tm.tmName}</Grid.Column>
                      <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini'  rounded src={tm.franchLogo}/></Grid.Column>
                      <Grid.Column width={8}>
                          {tm.years.map((yr, idx) => {
                              return(
                          <Button.Group size='mini'>
                       <Button 
                         key={idx} 
                         className={`my${yr}`}   
                         onClick={() => handleYearClick(yr, tm.tmName, tm.class )}
                         /*onClick={() => hideButtons(`my${yr}`)}*/
                         >
                         {yr}</Button>
                          </Button.Group>
                                  )
                          })}
                      </Grid.Column>
                  </Grid.Row>
                  )
          })}
      </Grid></Tab.Pane> },
]
    const Tabs = () => <Tab  
                        panes={panes}
                        onTabChange={()=> console.log('blah')}

                        />
    return (
    <Container  >      
      <Tabs/>
    </Container>
    )
}