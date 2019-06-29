import React from 'react';
import { Button, Container, Dropdown, Form, Grid, Icon, Image, Modal, Tab } from 'semantic-ui-react'
import ReactTable from 'react-table'

import tmsLogos from '../lgos/namesAndLogos.js'
import '../App.css'

const justYears = [2018, 2017, 2016, 2015, 2014, 2013]
export default function CurrentTeam(props) {

    function handleYearClick(tm, yr, cl) {
        console.log(`"my${cl}", ${tm}_${yr}`)
  
    }
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
    const aaa = props.minorMaster.filter(tm => tm.class === 'AAA')
    const aa = props.minorMaster.filter(tm => tm.class === 'AA')
    const aplus = props.minorMaster.filter(tm => tm.class === 'A+')
    const a = props.minorMaster.filter(tm => tm.class === 'A')
    const aminus = props.minorMaster.filter(tm => tm.class === 'A-')
    const rk = props.minorMaster.filter(tm => tm.class === 'Rk')

const panes = [
  { menuItem: 'Triple A', render: () => <Tab.Pane>
      <Grid className={`App ${props.theme}`}>
          {aaa && aaa.map((tm, ix) => {
              return(
                  <Grid.Row className="row">
                      <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini'  rounded src={tm.curLogo}/></Grid.Column>
                      <Grid.Column width={4}>{tm.tmName}</Grid.Column>
                      <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini'  rounded src={tm.franchLogo}/></Grid.Column>
                      <Grid.Column width={8}>
                          {tm.years.map((yr, idx) => {
                              return(
                          <Button.Group size='mini'>
                           <Button onClick={() => handleYearClick(yr, tm.tmName, tm.class)}>{yr}</Button>
                          </Button.Group>
                                  )
                          })}
                      </Grid.Column>
                  </Grid.Row>
                  )
          })}
      </Grid>
  </Tab.Pane> },
  { menuItem: 'Double A', render: () => <Tab.Pane>      <Grid className={`App ${props.theme}`}>
          {aa && aa.map((tm, ix) => {
              return(
                  <Grid.Row className="row">
                      <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini'  rounded src={tm.curLogo}/></Grid.Column>
                      <Grid.Column width={4}>{tm.tmName}</Grid.Column>
                      <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini'  rounded src={tm.franchLogo}/></Grid.Column>
                      <Grid.Column width={8}>
                          {tm.years.map((yr, idx) => {
                              return(
                          <Button.Group size='mini'>
                           <Button onClick={() => handleYearClick(yr, tm.tmName, tm.class)}>{yr}</Button>
                          </Button.Group>
                                  )
                          })}
                      </Grid.Column>
                  </Grid.Row>
                  )
          })}
      </Grid></Tab.Pane> },
  { menuItem: 'Advanced A', render: () => <Tab.Pane>      <Grid className={`App ${props.theme}`}>
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
                           <Button onClick={() => handleYearClick(yr, tm.tmName, tm.class)}>{yr}</Button>
                          </Button.Group>
                                  )
                          })}
                      </Grid.Column>
                  </Grid.Row>
                  )
          })}
      </Grid></Tab.Pane> },
  { menuItem: 'Class A', render: () => <Tab.Pane>      <Grid className={`App ${props.theme}`}>
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
                           <Button onClick={() => handleYearClick(yr, tm.tmName, tm.class)}>{yr}</Button>
                          </Button.Group>
                                  )
                          })}
                      </Grid.Column>
                  </Grid.Row>
                  )
          })}
      </Grid></Tab.Pane> },
  { menuItem: 'Short A', render: () => <Tab.Pane>      <Grid className={`App ${props.theme}`}>
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
                           <Button onClick={() => handleYearClick(yr, tm.tmName, tm.class)}>{yr}</Button>
                          </Button.Group>
                                  )
                          })}
                      </Grid.Column>
                  </Grid.Row>
                  )
          })}
      </Grid></Tab.Pane> },
  { menuItem: 'Rookie', render: () => <Tab.Pane>      <Grid className={`App ${props.theme}`}>
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
                           <Button onClick={() => handleYearClick(yr, tm.tmName, tm.class)}>{yr}</Button>
                          </Button.Group>
                                  )
                          })}
                      </Grid.Column>
                  </Grid.Row>
                  )
          })}
      </Grid></Tab.Pane> },
]
    const Tabs = () => <Tab  panes={panes}/>
    return (
    <Container  >      
      <Tabs/>
    </Container>
    )
}