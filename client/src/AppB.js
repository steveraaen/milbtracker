
import React, { useState, useEffect, useRef, Stylesheet } from 'react';
import { Button, Icon, Image, Modal, Segment, Sidebar} from 'semantic-ui-react'
import axios from 'axios'
import chalk from 'chalk'
import { ClassPicker, YearPicker } from './components/Selections.js'
import SeasonResults from './components/SeasonResults.js'
import PlayerList from './components/PlayerList.js'
import IsLoading from './components/IsLoading.js'
import Explain from './components/Explain.js'
import Banner from './components/Banner.js'
import './App.css'
import classes from './classes.js'
import mlbTeams from './mlbTeams.js'
import ftfLogo from './ftflogo.png'


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

    const [selectedClass, setSelectedClass] = useState(classes[0]);
    const [years] = useState(yrs);
    const [allMLB] = useState(mlbTeams);
    const [selectedYear, setSelectedYear] = useState(yrs[0]);
    const [playerList, setPlayerList] = useState({});
    const [pitcherList, setPitcherList] = useState({});
    const [selectedDivision] = useState({ value: "%L%", display: "All Major League Teams" });
    const [selectedMiLBTeam, setSelectedMiLBTeam] = useState();
    const [bestBat, setBestBat] = useState();
    const [yestBat, setYestBat] = useState();
    const [bestPitch, setBestPitch] = useState();
    const [yestPitch, setYestPitch] = useState();
    const [timeframe, setTimeframe] = useState('season');
    const [tfObj] = useState({});
    const [modalOpen, setModalOpen] = useState(true);
    const [formVisible, setFormVisible] = useState(false);
    const [playersVisible, setPlayersVisible] = useState(false);
   const [timeBatURL, setTimeBatURL] = useState('/api/playerBatSeason');
   const [timePitchURL, setTimePitchURL] = useState('/api/playerPitchSeason');
   const [loading, setLoading] = useState(true);
   const [borderCol, setBorderCol] = useState();
   const  [ theme, setTheme ] = useState('dark');

   const toggleTheme = () => {
    if (theme !== "dark") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

    function toggleFormSidebar() {
        !formVisible ? setFormVisible(true) : setFormVisible(false)
    }
    function showPlayersSidebar() {
        setPlayersVisible(true) 
    }

    async function getTopTen(cl, yr) {
        try {
            const tmPitSeasPromise = axios('/api/teamPitchSeason', { params: { cl, yr } })
            const tmPitYestPromise = axios('/api/teamPitchYest' , { params: { cl, yr } })
            const tmBatSeasPromise = axios('/api/teamBatSeason' , { params: { cl, yr } })
            const tmBatYestPromise = axios('/api/teamBatYest' , { params: { cl, yr } })
            const [tmPitS, tmPitY,tmBatS, tmBatY] = await Promise.all([tmPitSeasPromise,tmPitYestPromise,tmBatSeasPromise,tmBatYestPromise]);
             
              if(tmPitS && tmPitY &&tmBatS && tmBatY) {
                setLoading(false)
              }
               localStorage.setItem('cachedBatTm', tmBatS.data)
               localStorage.setItem('cachedPitTm', tmPitS.data)
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
                        return plyr
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
              setTimeBatURL('/api/playerBatSeason')
              setTimePitchURL('/api/playerPitchSeason')
              } 
        if(value === 'yesterday'){
              setTimeBatURL('/api/playerBatYest')
              setTimePitchURL('/api/playerPitchYest')
            }
}

async function handleFirstVisit() {

  await  localStorage.setItem('showModal', false)
    setModalOpen(false)  
}
function handleModalClose() {

  setModalOpen(false)
}
    useEffect(() => {
       setTheme(localStorage.getItem('theme'))
    }, {})
    useEffect(() => {
      localStorage.getItem('showModal', false) ? setModalOpen(false) : console.log('show')
    }, {})
    useEffect(() => {
        getTopTen(selectedClass.code, selectedYear.value, timeframe)
    }, {});
    useEffect(() => {
      setBorderCol(timeframe === 'yesterday' ? 'rgba(47, 79, 79,1)' : 'rgba(178, 34, 34,1)'
      )
    })
/*    useEffect(() => {
    if(timeframe==='yesterday') {
        setBtnOpacity({
        ssn: 1,
        ystrdy: .4
         })
      } else if(timeframe==='season') {
        setBtnOpacity({
        ssn: .4,
        ystrdy: 1
         })
      } 
    })*/
if(loading) {
   console.log(chalk.whiteBright('Thank you for visiting Farm Team Fantasy'))
  return (    <IsLoading
                loading={loading}
                {...bestBat}
                {...bestPitch}
                />)
} else {
return (

<div className={`App ${theme}`}> 
   <Banner />
    <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center'}}>
      <div style={{display: 'flex',flexDirection: 'row', width: '10vw', justifyContent: 'space-between'}}>
        <Icon bordered corner='top left' name="settings" size='large' disabled={formVisible} onClick={toggleFormSidebar} />
  <Modal 
  
  modalopen={modalOpen}
    open={modalOpen}
    trigger={<Icon bordered corner='top left' name="info" size='large' onClick={() => setModalOpen(true)}/>}>
      <Modal.Header style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'gray'}}>
        <div style={{marginRight:'1vw', fontSize: '1em', fontWeight: 600, color: 'white'}}> Current MLB players, grouped by former MiLB teams</div>
        <Icon bordered  name="close" color="yellow" onClick={() => setModalOpen(false)}/>
        </Modal.Header>
    <Explain />
    <a onClick={() => handleFirstVisit()} style={{display: 'flex',justifyContent: 'center', marginBottom: '1vh', fontSize: '.9em', fontWeight: 700, fontStyle: 'italic'}}>Don't show this again</a>

  </Modal>       
      </div>
    <div>
    <div style={{marginBottom: '1.5vh', fontSize: '1.8em'}}
    onClick={() => toggleTheme()}>Farm Team Fantasy</div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      </div>
    </div>
      <div style={{marginTop: '1vh'}}>
      <Button.Group>
        <Button
          
          style={{backgroundColor: `rgba(178, 34, 34,1)`, color: 'white'}}
          value="season"
          onClick={handleClick}
    
        >Full Season</Button>
         <Button.Or style={{color: 'black'}} />
        <Button
       
          style={{backgroundColor: `rgba(47, 79, 79,1)`, color: 'white'}}
          value="yesterday"
          onClick={handleClick}
   
        >Last Game</Button>
          </Button.Group>
      </div>
    </div>
        <Sidebar.Pushable 
            as={Segment}>
          <Sidebar 
          className={`App ${theme}`}         
            animation="push"
            style={{marginRight: '1vw'}}
            icon='labeled'
            onHide={() => setFormVisible(false)}
            vertical='true'
            visible={formVisible}           
          >       
           <Segment>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end'}}>
          <Icon bordered color='black' name="close" onClick={() => setFormVisible()}/>
          </div>
            <ClassPicker
              theme={theme}
              toggleFormSidebar={toggleFormSidebar}
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
             theme={theme}
             toggleFormSidebar={toggleFormSidebar}
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
    <Sidebar
    className={`App ${theme}`}
      animation='scale down' 
      width='very wide'
      direction='top' 
      icon='labeled'
      inverted='true'             
      visible={playersVisible}  
      vertical='true'     
      onHide={() => setPlayersVisible(false)}    
    > 
    <div>
     <div style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end'}}>
     <Icon bordered  name="close" onClick={() => setPlayersVisible(false)}/>
     </div>
        <PlayerList 
          theme={theme} 
          borderCol={borderCol}
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
          playersVisible={playersVisible}
    />
</div>
          </Sidebar>    
            <Sidebar.Pusher>  
              <div>
                <SeasonResults  
                theme={theme}       
                borderCol={borderCol}
                toggleFormSidebar={toggleFormSidebar}
                  loading={loading}
                  playersVisible={playersVisible}
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
      </Sidebar.Pusher>
   </Sidebar.Pushable>

          <div>data thanks to <a href='https://www.baseball-reference.com/'>Baseball Reference</a></div>
   </div>
    )}
}

export default AppB