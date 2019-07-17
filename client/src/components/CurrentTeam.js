import React, {useState, useEffect} from 'react';
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
/*
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
)()*/
    function handleYearClick(yr, tm, cl,team) {
   /*   props.getMyPlayers(yr, tm)*/
      hideButtons(yr)
          console.log(yr, tm, cl)
        switch(yr) {
            case 2018:
            props.setMy2018(`${team.yr} ${team.tmName}`)
            break;
            case 2017:
            props.setMy2017(`${team.yr} ${team.tmName}`)
            break;
            case 2016:
            props.setMy2016(`${team.yr} ${team.tmName}`)
            break;
            case 2015:
            props.setMy2015(`${team.yr} ${team.tmName}`)
            break;            
            case 2014:
            props.setMy2014(`${team.yr} ${team.tmName}`)
            break;
            case 2013:
            props.setMy2013(`${team.yr} ${team.tmName}`)
            break;    
            default:
            console.log('huh?')        
        }
        switch(cl) {
            case 'AAA':
            props.setMyAAA(`${team.yr} ${team.tmName}`)
         /*   localStorage.setItem('myAAA', `${team.yr} ${team.tmName}`)*/
            break;
            case 'AA':
            props.setMyAA(`${team.yr} ${team.tmName}`)
     /*       localStorage.setItem('myAA', `${team.yr} ${team.tmName}`)*/
            break;
            case 'A+':
            props.setMyAPlus(`${team.yr} ${team.tmName}`)
        /*    localStorage.setItem('myAPlus', `${team.yr} ${team.tmName}`)*/
            break;
            case 'A':
            props.setMyA(`${team.yr} ${team.tmName}`)
        /*    localStorage.setItem('myA', `${team.yr} ${team.tmName}`)*/
            break;            
            case 'A-':
            props.setMyAMinus(`${team.yr} ${team.tmName}`)
       /*     localStorage.setItem('myAMinus', `${team.yr} ${team.tmName}`)*/
            break;
            case 'Rk':
            props.setMyRk(`${team.yr} ${team.tmName}`)
        /*    localStorage.setItem('myRk', `${yr} ${tm}`)*/
            break;    
            default:                  
        }

       localStorage.setItem(`my${cl}`, `${team.yr} ${team.tmName}`) 
       localStorage.setItem(`my${yr}`, `${team.yr} ${team.tmName}`, function(){
      
       }) 
 console.log(props.aaaObj)
    }
 function hideButtons (yr) {
document.querySelectorAll(`.ui.button.my${yr}`).forEach(elem => {
  elem.disabled = true;
});
 }  

    return (
    <Container className={`App ${props.theme}`} >      
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

<TabPanel>
{ props.myPlayers && 
  <MyPlayers 
    theme={props.theme}
    myPlayers={props.myPlayers}
    />
    }
</TabPanel> 

<TabPanel>
    <Grid padded={false} columns={4}>
    {props.myAAA && props.allAAA &&
    <Grid.Row style={{height: '12%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Triple A</span>
</Grid.Column>
{tmsLogos.map((tm, ix) => {
  if(props.myAAA.slice(5) === tm.tmName) {
    return <Grid.Column key={ix} width="3">  
    <Image size='mini' rounded src={tm.logoPNG} />
    </Grid.Column>    
  }
})}
<Grid.Column width='4'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myAAA}</span>
 </Grid.Column>
  {props.allAAA.map((tm, ix) => {
  if(props.myAAA.slice(5) === tm.tmName) {
    return <Grid.Column key={ix} width="3">  
    <Image size='mini' rounded src={tm.franchLogo} />
    </Grid.Column>    
  }
})}
 <Grid.Column width='2'>
      <Button size="mini" rounded onClick={() => props.setMyAAA()}>Change</Button>
 </Grid.Column>  
   </Grid.Row>

}    {props.myAA && props.allAA &&
    <Grid.Row style={{height: '12%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Double A</span>
 </Grid.Column>
 {tmsLogos.map((tm, ix) => {
  if(props.myAA.slice(5) === tm.tmName) {
    return <Grid.Column key={ix} width="3">  
    <Image size='mini' rounded src={tm.logoPNG} />
    </Grid.Column>    
  }
})}
 <Grid.Column width='4'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myAA}</span>
  </Grid.Column>
  {props.allAA.map((tm, ix) => {
  if(props.myAA.slice(5) === tm.tmName) {
    return <Grid.Column key={ix} width="3">  
    <Image size='mini' rounded src={tm.franchLogo} />
    </Grid.Column>    
  }
})}
  <Grid.Column width='2'>
      <Button size="mini" rounded onClick={() => props.setMyAA()}>Change</Button>
 </Grid.Column>  
   </Grid.Row> 

}{props.myAPlus && props.allAPlus &&
    <Grid.Row style={{height: '12%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Advanced A</span>
</Grid.Column>
 {tmsLogos.map((tm, ix) => {
  if(props.myAPlus.slice(5) === tm.tmName) {
    return <Grid.Column key={ix} width="3">  
    <Image size='mini' rounded src={tm.logoPNG} />
    </Grid.Column>    
  }
})}
<Grid.Column width='4'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myAPlus}</span>
 </Grid.Column> 
  {props.allAPlus.map((tm, ix) => {
  if(props.myAPlus.slice(5) === tm.tmName) {
    return <Grid.Column key={ix} width="3">  
    <Image size='mini' rounded src={tm.franchLogo} />
    </Grid.Column>    
  }
})}
 <Grid.Column width='2'>
      <Button size="mini" rounded onClick={() => props.setMyAPlus()}>Change</Button>
 </Grid.Column> 
   </Grid.Row> 

}{props.myA && props.allA &&
    <Grid.Row style={{height: '12%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Class A</span>
</Grid.Column>
 {tmsLogos.map((tm, ix) => {
  if(props.myA.slice(5) === tm.tmName) {
    return <Grid.Column key={ix} width="3">  
    <Image size='mini' rounded src={tm.logoPNG} />
    </Grid.Column>    
  }
})}
<Grid.Column width='4'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myA}</span>
 </Grid.Column>
   {props.allA.map((tm, ix) => {
  if(props.myA.slice(5) === tm.tmName) {
    return <Grid.Column key={ix} width="3">  
    <Image size='mini' rounded src={tm.franchLogo} />
    </Grid.Column>    
  }
})}
 <Grid.Column width='2'>
      <Button size="mini" rounded onClick={() => props.setMyA()}>Change</Button>
 </Grid.Column>  
   </Grid.Row> 

}{props.myAMinus && props.allAMinus &&
    <Grid.Row style={{height: '12%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Short A</span>
 </Grid.Column>
  {tmsLogos.map((tm, ix) => {
  if(props.myAMinus.slice(5) === tm.tmName) {
    return <Grid.Column key={ix} width="3">  
    <Image size='mini' rounded src={tm.logoPNG} />
    </Grid.Column>    
  }
})}
 <Grid.Column width='4'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myAMinus}</span>
</Grid.Column>
  {props.allAMinus.map((tm, ix) => {
  if(props.myAMinus.slice(5) === tm.tmName) {
    return <Grid.Column key={ix} width="3">  
    <Image size='mini' rounded src={tm.franchLogo} />
    </Grid.Column>    
  }
})}
<Grid.Column width='2'>
      <Button size="mini" rounded onClick={() => props.setMyAMinus()}>Change</Button>
 </Grid.Column> 
    </Grid.Row> 

}{props.myRk && props.allRk &&
    <Grid.Row style={{height: '12%'}}>
<Grid.Column width="3">  
      <span style={{marginRight: '2vw'}}>Rookie</span>
</Grid.Column>
 {tmsLogos.map((tm, ix) => {
  if(props.myRk.slice(5) === tm.tmName) {
    return <Grid.Column key={ix} width="3">  
    <Image size='mini' rounded src={tm.logoPNG} />
    </Grid.Column>    
  }
})}
<Grid.Column width='4'>
      <span style={{fontSize: '1em', fontWeight: 600}}>{props.myRk}</span>
</Grid.Column>
  {props.allRk.map((tm, ix) => {
  if(props.myRk.slice(5) === tm.tmName) {
    return <Grid.Column key={ix} width="3">  
    <Image size='mini' rounded src={tm.franchLogo} />
    </Grid.Column>    
  }
})}
<Grid.Column width='2'>
      <Button size="mini" rounded onClick={() => props.setMyRk()}>Change</Button>
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
                  <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini' rounded  rounded src={tm.curLogo}/></Grid.Column>
                  <Grid.Column width={3}>{tm.tmName}</Grid.Column>
                  <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini' rounded  rounded src={tm.franchLogo}/></Grid.Column>
                  <Grid.Column width={9}>
                      {tm.years.map((yr, idx) => {
                          return(
                  
                      <Button.Group key={tm.tmName + idx} size='mini' rounded widths='16'> 
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
                  <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini' rounded  rounded src={tm.curLogo}/></Grid.Column>
                  <Grid.Column width={3}>{tm.tmName}</Grid.Column>
                  <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini' rounded  rounded src={tm.franchLogo}/></Grid.Column>
                  <Grid.Column width={9}>
                      {tm.years.map((yr, idx) => {
                          return(
                      <Button.Group floated="left" key={tm.tmName + idx} size='mini' rounded widths='16'> 
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
                  <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini' rounded  rounded src={tm.curLogo}/></Grid.Column>
                  <Grid.Column width={3}>{tm.tmName}</Grid.Column>
                  <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini' rounded  rounded src={tm.franchLogo}/></Grid.Column>
                  <Grid.Column width={9}>
                      {tm.years.map((yr, idx) => {
                          return(
                      <Button.Group key={tm.tmName + idx} size='mini' rounded widths='16'> 
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
                  <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini' rounded  rounded src={tm.curLogo}/></Grid.Column>
                  <Grid.Column width={3}>{tm.tmName}</Grid.Column>
                  <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini' rounded  rounded src={tm.franchLogo}/></Grid.Column>
                  <Grid.Column width={9}>
                      {tm.years.map((yr, idx) => {
                          return(
                      <Button.Group key={tm.tmName + idx} size='mini' rounded widths='16'> 
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
                  <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini' rounded  rounded src={tm.curLogo}/></Grid.Column>
                  <Grid.Column width={3}>{tm.tmName}</Grid.Column>
                  <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini' rounded  rounded src={tm.franchLogo}/></Grid.Column>
                  <Grid.Column width={9}>
                      {tm.years.map((yr, idx) => {
                          return(
                      <Button.Group key={tm.tmName + idx} size='mini' rounded widths='16'> 
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
                  <Grid.Column width={2}><Image key={`${tm.tmName}${ix}`} size='mini' rounded  rounded src={tm.curLogo}/></Grid.Column>
                  <Grid.Column width={3}>{tm.tmName}</Grid.Column>
                  <Grid.Column width={2}><Image key={`${tm.franchLogo}${ix}`} size='mini' rounded  rounded src={tm.franchLogo}/></Grid.Column>
                  <Grid.Column width={9}>
                      {tm.years.map((yr, idx) => {
                          return(
                      <Button.Group key={tm.tmName + idx} size='mini' rounded widths='16'> 
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




