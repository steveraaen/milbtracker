import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Header, Icon, Image, Segment, Sidebar, Tab, Visibility } from 'semantic-ui-react'
import axios from 'axios'
import Collapsible from 'react-collapsible';
import { BestFive, ClassPicker, YearPicker, Divisions, /*Stats,*/ Teams } from './components/Selections.js'
import SeasonResults from './components/SeasonResults.js'
import PlayerList from './components/PlayerList.js'

import './App.css'
import classes from './classes.js'
import mlbTeams from './mlbTeams.js'
import newMinors from './newMinors.json'
/*import leagues from './assets/leagues.js'*/


const yrs = [
    { text: "All Years", value: "20%", key: "20%" },
    { text: "2019", value: 2019, key: "2019" },
    { text: "2018", value: 2018, key: "2018" },
    { text: "2017", value: 2017, key: "2017" },
    { text: "2016", value: 2016, key: "2016" },
    { text: "2015", value: 2015, key: "2015" },
    { text: "2014", value: 2014, key: "2014" },
    { text: "2013", value: 2013, key: "2013" },
    { text: "2012", value: 2012, key: "2012" },
    { text: "2011", value: 2011, key: "2011" },
    { text: "2010", value: 2010, key: "2010" },
    { text: "2009", value: 2009, key: "2009" }
]

function AppB() {

    /* const [allMiLB, setAllMiLB] = useState(allMinorTeams);*/
    const [selectedClass, setSelectedClass] = useState(classes[0]);
    const [minors, setMinors] = useState(newMinors);
    const [years] = useState(yrs);
    const [ /*bestMinors,*/ setBestMinors] = useState();
    const [allMLB] = useState(mlbTeams);
    const [selectedYear, setSelectedYear] = useState(yrs[0]);
    const [playerList, setPlayerList] = useState({});
    const [pitcherList, setPitcherList] = useState({});
    const [classIcon] = useState('angle down');
    const [allDivisions, setAllDivisions] = useState();
    const [selectedDivision, setSelectedDivision] = useState({ value: "%L%", display: "All Major League Teams" });
    const [ /*radialData,*/ setRadialData] = useState();
    const [synthStats, setSynthStats] = useState();
    const [selectedMiLBTeam, setSelectedMiLBTeam] = useState();
    /*  const [statsToDb, setStatsToDb] = useState();*/
    const [topTenHit, setTopTenHit] = useState();
    const [topTenPitch, setTopTenPitch] = useState();
    const [topTen, setTopTen] = useState();
    const [bestBat, setBestBat] = useState();
    const [yestBat, setYestBat] = useState();
    const [bestPitch, setBestPitch] = useState();
    const [yestPitch, setYestPitch] = useState();
    const [timeframe, setTimeframe] = useState('season');
    const [tfObj, settfObj] = useState({});
    /*    const [classStats, setClassStats] = useState();*/
    /* const [column, setColumn] = useState();*/
    /*   const [direction, setDirection] = useState();*/
    /*    const [curSortB, setCurSortB] = useState({bsrt: "bBA", bsDir: "desc"});
        const [curSortP, setCurSortP] = useState({psrt: "bBA", bsDir: "desc"});*/
    const [modalOpen, setModalOpen] = useState();
    const [formVisible, setFormVisible] = useState(false);
    const [playersVisible, setPlayersVisible] = useState(false);
   const [timeBatURL, setTimeBatURL] = useState('/api/playerBatSeason');
   const [timePitchURL, setTimePitchURL] = useState('/api/playerPitchSeason');

    function toggleFormSidebar() {
        !formVisible ? setFormVisible({ formVisible: true }) : setFormVisible({ formVisible: false })
    }
    function showPlayersSidebar() {
        setPlayersVisible({ playersVisible: true }) 
    }
    function hidePlayersSideBar(){
    setPlayersVisible({ playersVisible: false })
}
    function sortBTable(e) {
        let { topTenBatting } = topTen
        var newArr = topTenBatting.sort((a, b) => {
            return b[e] - a[e]
        })
        setTopTenHit({
            topTenHit: newArr
        })
    }

    function sortPTable(e) {
        let { topTenPitching } = topTen
        var newArr = topTenPitching.sort((a, b) => {
            return b[e] - a[e]
        })
        setTopTenPitch({
            topTenPitch: newArr
        })
    }
/*    function handleTimeFrame() {
        if(timeframe === 'season') {
              settfObj({
                tfObj: {
               bestBatTeams: bestBat,
                bestPitchTeams: bestPitch
              }
              })
              } else {
             settfObj({
               tfObj: {
                bestBatTeams: yestBat,
                bestPitchTeams: yestPitch
              }
              }) 
            }
    }*/
    async function getTopTen(cl, yr) {
        try {
          console.log(timeframe)
            const tmPitSeasPromise = axios('/api/teamPitchSeason', { params: { cl, yr } })
            const tmPitYestPromise = axios('/api/teamPitchYest' , { params: { cl, yr } })
            const tmBatSeasPromise = axios('/api/teamBatSeason' , { params: { cl, yr } })
            const tmBatYestPromise = axios('/api/teamBatYest' , { params: { cl, yr } })
            
            const [tmPitS, tmPitY,tmBatS, tmBatY] = await Promise.all([tmPitSeasPromise,tmPitYestPromise,tmBatSeasPromise,tmBatYestPromise]);

            console.log(timeframe)
   /*     if(timeframe === 'season') {
              settfObj({
                tfObj: {
               bestBatTeams: tmBatS.data,
                bestPitchTeams: tmPitS.data
              }
              })
              } else {
             settfObj({
               tfObj: {
                bestBatTeams: {},
                bestPitchTeams: {}
              }
              }) 
            }  */    
             setBestBat({
                bestBatTeams: tmBatS.data
            })
            setBestPitch({
                bestPitchTeams: tmPitS.data
            })            
             setYestBat({
                yestBatTeams: tmBatY.data
            })
            setYestPitch({
                yestPitchTeams: tmPitY.data
            })      }        
         catch (e) {
            console.error(e);
        };
    }

    async function getPlayerList(f, c, y) {
    console.log('getPlayerList')
        try {
            const newBatterPromise = axios.get(timeBatURL, { params: { f, c, y } })
            const newPitcherPromise = axios.get(timePitchURL, { params: { f, c, y } })
            const [newBatters, newPitchers] = await Promise.all([newBatterPromise ,newPitcherPromise]);

            newBatters.data.map((plyr, idx) => {
                for (let i = 0; i < allMLB.length; i++) {
                    if (plyr.teamID === allMLB[i].teamCode) {
                        plyr.color = allMLB[i].color
                        plyr.teamName = allMLB[i].teamName
                    } else { return null }
                }
            })
            newPitchers.data.map((ptchr, idx) => {
                for (let i = 0; i < allMLB.length; i++) {
                    if (ptchr.teamID === allMLB[i].teamCode) {
                        ptchr.color = allMLB[i].color
                        ptchr.teamName = allMLB[i].teamName
                    }
                }
            })
            setPlayerList({
                playerList: newBatters.data
            })
            setPitcherList({
                pitcherList: newPitchers.data
            })

            showPlayersSidebar()
        } catch (e) {
            console.error(e);
        };
    }
const handleClick = (e, { value }) => {
  setTimeframe(value)

        if(value === 'season') {
/*              settfObj({
                tfObj: {
               bestBatTeams: bestBat,
                bestPitchTeams: bestPitch
              }
              })*/
              setTimeBatURL('/api/playerBatSeason')
              setTimePitchURL('/api/playerPitchSeason')
              } else if(value === 'yesterday'){
/*             settfObj({
               tfObj: {
                bestBatTeams: yestBat,
                bestPitchTeams: yestPitch
              }
              }) */
              setTimeBatURL('/api/playerBatYest')
              setTimePitchURL('/api/playerPitchYest')
            }
console.log(timeBatURL)
console.log(timePitchURL)

}

    useEffect(() => {
        getTopTen(selectedClass.code, selectedYear.value, timeframe)
    }, {});

    /*    useEffect(() => {
            getBestMinors(selectedClass.code, selectedDivision.value, selectedClass.regex, selectedYear)
        }, {});*/

    return (
<div> 
  <div>
    <Button
      value="season"
      onClick={handleClick}
    >Season</Button>
    <Button
    value="yesterday"
     onClick={handleClick}
    >Yesterday</Button>
  </div>
<div style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center'}}>
<Icon name="bars" disabled={formVisible} onClick={toggleFormSidebar} />
</div>
    
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
           
            <div style={{alignContent: 'center', fontSize: '1.2em', fontWeight: 600}}>

             </div> 
             </div> 
             <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
             </div>
            <Sidebar.Pushable as={Segment}>
          <Sidebar

            icon='labeled'
            inverted='true'
            onHide={() => setFormVisible(false)}
            vertical='true'
            visible={formVisible}           
          >       
           <Segment>
            <ClassPicker
              timeframe={timeframe}
              years={years}
              classes={classes} 
              getTopTen={getTopTen}
              getPlayerList={getPlayerList} 
         
              selectedClass={selectedClass} 
              selectedYear={selectedYear} 
              selectedDivision={selectedDivision} 
              setSelectedYear={setSelectedYear}
              setSelectedClass={setSelectedClass}
              selectedMiLBTeam={selectedMiLBTeam}
              setSelectedMiLBTeam={setSelectedMiLBTeam}
              />   
                
              </Segment>   
         
         <Segment>  
           <YearPicker 
              topTen={topTen}
              years={years} 
              classes={classes} 
               timeframe={timeframe}
              getTopTen={getTopTen}
              getPlayerList={getPlayerList}  
              selectedClass={selectedClass} 
              setSelectedClass={setSelectedClass} 
              selectedYear={selectedYear} 
              selectedDivision={selectedDivision} 
              setSelectedYear={setSelectedYear} 
              selectedMiLBTeam={selectedMiLBTeam}
              setSelectedMiLBTeam={setSelectedMiLBTeam}
              />  
              </Segment>        
           </Sidebar>      
        <Sidebar.Pusher>  
  <div>
    <SeasonResults 
    {...tfObj}
      {...bestBat}
      {...bestPitch}
      {...yestBat}
      {...yestPitch}
      {...playerList}
      {...pitcherList}
      getPlayerList={getPlayerList}
      selectedMiLBTeam={selectedMiLBTeam} 
      selectedYear={selectedYear}    
      selectedDivision={selectedDivision}
      selectedClass={selectedClass} 
      timeframe={timeframe}    
      timeBatURL={timeBatURL}    
      timePitchURL={timePitchURL}    
    />
</div>
<div>



</div>
  </Sidebar.Pusher>
   </Sidebar.Pushable>
             <Sidebar
             width='very wide'
                direction='right'
            animation='scale down'
         
            onHide={() => setPlayersVisible(false)}
         
            visible={playersVisible}           
          > 
          <PlayerList 
      {...playerList}
      {...yestBat}
      {...pitcherList}
      selectedClass={selectedClass} 
      selectedYear={selectedYear} 
      selectedDivision={selectedDivision} 
      selectedMiLBTeam={selectedMiLBTeam} 
      timeframe={timeframe} 
      timeBatURL={timeBatURL}    
      timePitchURL={timePitchURL}  
/>
          </Sidebar>
   </div>
    );
}


export default AppB