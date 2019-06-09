
import React, { useState, useEffect, useRef } from 'react';
import { Button, Icon, Image, Modal, Segment, Sidebar} from 'semantic-ui-react'
import axios from 'axios'
import { ClassPicker, YearPicker } from './components/Selections.js'
import SeasonResults from './components/SeasonResults.js'
import PlayerList from './components/PlayerList.js'
import IsLoading from './components/IsLoading.js'
import Explain from './components/Explain.js'
import './App.css'
import classes from './classes.js'
import mlbTeams from './mlbTeams.js'
import ftfLogo from './data/ftflogo.png'

console.disableYellowBox = true;
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

   function useInterval(callback, delay) {
    const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

    function toggleFormSidebar() {
        !formVisible ? setFormVisible(true) : setFormVisible(false)
    }
    function showPlayersSidebar() {
        setPlayersVisible({ playersVisible: true }) 
    }

    async function getTopTen(cl, yr) {
        try {
          console.log(timeframe)
            const tmPitSeasPromise = axios('/api/teamPitchSeason', { params: { cl, yr } })
            const tmPitYestPromise = axios('/api/teamPitchYest' , { params: { cl, yr } })
            const tmBatSeasPromise = axios('/api/teamBatSeason' , { params: { cl, yr } })
            const tmBatYestPromise = axios('/api/teamBatYest' , { params: { cl, yr } })
            
            const [tmPitS, tmPitY,tmBatS, tmBatY] = await Promise.all([tmPitSeasPromise,tmPitYestPromise,tmBatSeasPromise,tmBatYestPromise]);
              if(tmPitS && tmPitY &&tmBatS && tmBatY) {
                setLoading(false)
              }

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
              else if(value === 'yesterday'){

              setTimeBatURL('/api/playerBatYest')
              setTimePitchURL('/api/playerPitchYest')
            }
console.log(timeBatURL)
console.log(timePitchURL)

}

function handleFirstVisit() {
console.log(localStorage)
    localStorage.setItem('showModal', false)
    setModalOpen(false)  
}
function handleModalClose() {
  setModalOpen(false)
}
    useEffect(() => {
      localStorage.getItem('showModal', false) ? setModalOpen(false) : console.log('show')
    }, {})
    useEffect(() => {
        getTopTen(selectedClass.code, selectedYear.value, timeframe)
    }, {});

    /*    useEffect(() => {
            getBestMinors(selectedClass.code, selectedDivision.value, selectedClass.regex, selectedYear)
        }, {});*/
if(loading) {
  return (    <IsLoading
                loading={loading} 
                useInterval={useInterval}/>)
} else {
return (

<div style={{backgroundColor: 'white'}}> 
    <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between', textAlign: 'center'}}>
      <div style={{display: 'flex',flexDirection: 'row', width: '10vw', justifyContent: 'space-between'}}>
        <Icon bordered corner='top left' name="settings" size='large' disabled={formVisible} onClick={toggleFormSidebar} />
  <Modal 
  
  modalOpen={modalOpen}
    open={modalOpen}
    trigger={<Icon bordered corner='top left' name="info" size='large' onClick={() => setModalOpen(true)}/>}>
      <Modal.Header style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'gray'}}>
        <div style={{marginRight:'1vw', fontSize: '1em', fontWeight: 600, color: 'white'}}> From Minors ...</div>
        <Image rounded wrapped size='small' src={ftfLogo} />
        <div style={{marginLeft:'1vw', fontSize: '1em', fontWeight: 600, color: 'white'}}> ... To Majors</div>
        <Icon bordered  name="close" size='large' onClick={() => setModalOpen(false)}/>
        </Modal.Header>
    <Explain />
    <a onClick={() => handleFirstVisit()} style={{display: 'flex',justifyContent: 'center', marginBottom: '1vh', fontSize: '.9em', fontWeight: 700, fontStyle: 'italic'}}>Don't show this again</a>

  </Modal>       
      </div>
    <div>
    <div  style={{fontSize: '1.8em', fontWeight: 600, fontStyle: 'italic'}}>Farm Team Fantasy</div>
      <ul>
        <li style={{color: 'crimson', fontWeight: 600}}>American League</li>
        <li style={{color: 'indigo', fontWeight: 600}}>National League</li>
      </ul>
    </div>
      <div style={{marginTop: '1vh'}}>
      <Button.Group>
        <Button
        style={{backgroundColor: 'cadetblue', color: 'black'}}
        value="season"
        onClick={handleClick}
        active={timeframe === "season"}
        >Full Season</Button>
         <Button.Or style={{colr: 'black'}} />
        <Button
        style={{backgroundColor: 'salmon', color: 'black'}}
        value="yesterday"
       onClick={handleClick}
       active={timeframe === "yesterday"}
        >Last Game</Button>
          </Button.Group>
      </div>
    </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>          
        <div style={{alignContent: 'center', fontSize: '1.2em', fontWeight: 600}}>
         </div> 
         </div> 
         <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      </div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
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
      animation='scale down' 
      width='very wide'
      direction='top' 
      icon='labeled'
      inverted='true'             
      visible={playersVisible}  
      vertical='true'     
      onHide={() => setPlayersVisible(false)}    
    > 
    <Segment>
     <div style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end'}}>
     <Icon bordered color='black' name="close" onClick={() => setPlayersVisible(false)}/>
     </div>
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
</Segment>
          </Sidebar>    
            <Sidebar.Pusher>  
              <div>
                <SeasonResults 
                toggleFormSidebar={toggleFormSidebar}
                  loading={loading}
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