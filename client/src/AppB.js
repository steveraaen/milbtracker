
import React, { useState, useEffect} from 'react';
import { Button,  Icon,  Modal, Segment, Sidebar} from 'semantic-ui-react'
import axios from 'axios'
import { ClassPicker, YearPicker } from './components/Selections.js'
import SeasonResults from './components/SeasonResults.js'
import PlayerList from './components/PlayerList.js'
import IsLoading from './components/IsLoading.js'
import Explain from './components/Explain.js'
import Switch from './components/Switch.js'
import CurrentTeamB from './components/CurrentTeamB.js'
import './App.css'
import classes from './classes.js'
import mlbTeams from './mlbTeams.js'

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
localStorage.clear()

localStorage.setItem('myAAA', 'Please select a team and year')
localStorage.setItem('myAA', 'Please select a team and year')
localStorage.setItem('myAMinus', 'Please select a team and year')
localStorage.setItem('myA', 'Please select a team and year') 
localStorage.setItem('myAPlus', 'Please select a team and year') 
localStorage.setItem('myRk', 'Please select a team and year')

function AppB() {
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [years] = useState(yrs);
  const [allMLB] = useState(mlbTeams);
  const [selectedYear, setSelectedYear] = useState(yrs[0]);
  const [playerList, setPlayerList] = useState({});
  const [pitcherList, setPitcherList] = useState({});
  const [selectedDivision] = useState({ value: "%L%", display: "All Major League Teams" });

  const [bestBat, setBestBat] = useState();
  const [yestBat, setYestBat] = useState();
  const [bestPitch, setBestPitch] = useState();
  const [yestPitch, setYestPitch] = useState();
  const [timeframe, setTimeframe] = useState('season');
  const [tfObj] = useState({});
  const [modalOpen, setModalOpen] = useState();
  const [formVisible, setFormVisible] = useState(false);
  const [playersVisible, setPlayersVisible] = useState();
  const [timeBatURL, setTimeBatURL] = useState('/api/playerBatSeason');
  const [timePitchURL, setTimePitchURL] = useState('/api/playerPitchSeason');
  const [loading, setLoading] = useState(true);
  const [borderCol, setBorderCol] = useState();
  const [theme, setTheme] = useState('dark');
  const [franchise, setFranchise] = useState();
  const [selectedMiLBName, setSelectedMiLBName] = useState();
  const [selectedMiLBYr, setSelectedMiLBYr] = useState();
  const [selectedMiLBClass, setSelectedMiLBClass] = useState();
  const [selectedMiLBLogo, setSelectedMiLBLogo] = useState();
  const [selectedMiLBParentLogo, setSelectedMiLBParentLogo] = useState();
  const [selectedMiLBParentLg, setSelectedMiLBParentLg] = useState();
  const [showTRMenu, setShowTRMenu] = useState();
  const [myAAA, setMyAAA] = useState(() => localStorage.getItem('myAAA' || ''));
  const [myAA, setMyAA] = useState(() => localStorage.getItem('myAA' || ''));
  const [myAPlus, setMyAPlus] = useState(() => localStorage.getItem('myAPlus' || ''));
  const [myA, setMyA] = useState(() => localStorage.getItem('myA' || ''));
  const [myAMinus, setMyAMinus] = useState(() => localStorage.getItem('myAMinus' || ''));
  const [myRk, setMyRk] = useState(() => localStorage.getItem('myRk' || ''));
  const [my2018, setMy2018] = useState(() => localStorage.getItem('my2018' || ''));
  const [my2017, setMy2017] = useState(() => localStorage.getItem('my2017' || ''));
  const [my2016, setMy2016] = useState(() => localStorage.getItem('my2016' || ''));
  const [my2015, setMy2015] = useState(() => localStorage.getItem('my2015' || ''));
  const [my2014, setMy2014] = useState(() => localStorage.getItem('my2014' || ''));
  const [my2013, setMy2013] = useState(() => localStorage.getItem('my2013' || ''));

  const [minorMaster, setMinorMaster] = useState();
  const [minorArray, setMinorArray] = useState();
  const [showTeamSelect, setShowTeamSelect] = useState(false);
  const [showYearSelect, setShowYearSelect] = useState(false);
  const [selectedTmYrs, setSelectedTmYrs] = useState();
  const [mousePos, setMousePos] = useState();

  const toggleTheme = (th) => {
      localStorage.setItem("theme", th);
      setTheme(th);
  };
async function getMousePos(e) {
  await setMousePos({
   x: e.clientX,
   y: e.clientY
  })

}


    function toggleFormSidebar() {
        !formVisible ? setFormVisible(true) : setFormVisible(false)
    }
    function showPlayersSidebar() {
        setPlayersVisible(true) 
    }
async function getMinorMaster() {
  try {
    const minorMasterPromise = axios('/api/minorMaster')
    const minorYearsPromise = axios('/api/minorYears')
    const [mmstr,mYrs] = await Promise.all ([minorMasterPromise,minorYearsPromise]) 

    var tmYrObjArr = []
    for(let i = 0; i < mmstr.data.length; i++) {
      var tmObj = {}
      var yrArr =[]
       tmObj.tm = mmstr.data[i].tmName


      for(let j = 0; j < mYrs.data.length; j++) {
        if (mYrs.data[j].tmName === tmObj.tm) {
           yrArr.push(mYrs.data[j].yr)
        }
      }
      tmObj.years = yrArr
      mmstr.data[i].years = yrArr
      tmYrObjArr.push(tmObj)
    }

        setMinorArray(tmYrObjArr)
        setMinorMaster(mmstr.data)
          }   catch (e) {
            console.error(e);
        };
    }
async function getTeamYears(tm) {
  try {
    const tmYearsPromise = axios('/api/teamYrs', {params: {tm}})
    const tmYrs = await tmYearsPromise
   console.log(tmYrs.data)
    setSelectedTmYrs(tmYrs.data)
      }   catch (e) {
        console.error(e);
    };
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
    playersVisible ? setPlayersVisible(false) : console.log('window wasnt open')
  /*  playersVisible ? getPlayerList(franchise, selectedClass.code, selectedYear.value) : console.log('window wasnt open')*/
        if(value === 'season') {
              setTimeBatURL('/api/playerBatSeason')
              setTimePitchURL('/api/playerPitchSeason')
              } 
        if(value === 'yesterday'){
              setTimeBatURL('/api/playerBatYest')
              setTimePitchURL('/api/playerPitchYest')
            }
}

/*async function handleFirstVisit() {

  await  localStorage.setItem('showModal', false)
    setModalOpen(false)  
}*/
  useEffect(() => {
      getMinorMaster()
}, {})


    useEffect(() => {
       setMyAAA(localStorage.getItem('myAAA'))
       setMyAA(localStorage.getItem('myAA'))
       setMyAPlus(localStorage.getItem('myAPlus'))
       setMyA(localStorage.getItem('myA'))
       setMyAMinus(localStorage.getItem('myAMinus'))
       setMyRk(localStorage.getItem('myRk'))

    }, {})
/*    useEffect(() => {
       setTheme(localStorage.getItem('theme'))
    }, {})*/
    useEffect(() => {
      localStorage.getItem('showModal', false) ? setModalOpen(false) : console.log('show')
    }, {})
    useEffect(() => {
        getTopTen(selectedClass.code, selectedYear.value, timeframe)
    }, {});
    useEffect(() => {
      setBorderCol(timeframe === 'yesterday' ? '#3E85CA' : '#ABBB3D'
      )

    })
if(loading) {
  return (    <IsLoading
                theme={theme}
                loading={loading}
                {...bestBat}
                {...bestPitch}
                />)
} else {
return (

<div className={`App ${theme}`}> 
  <heading><div style={{marginBottom: '1.5vh', marginTop: '2.5vh',fontSize: '1.2em'}}>Farm Team Fantasy</div></heading>

    <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-around', textAlign: 'center'}}>
      <div style={{ display: 'flex',flexDirection: 'row', width: '10vw', justifyContent: 'space-between'}}>
        <Icon bordered  corner='top left' name="setting" size='large' disabled={formVisible} onClick={toggleFormSidebar} />
  <Modal   

    open={modalOpen}
    trigger={<Icon bordered  corner='top left' name="info" size='large' onClick={() => setModalOpen(true)}/>}>
      <Modal.Header style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'gray'}}>
        <div style={{marginRight:'1vw', fontSize: '1em', fontWeight: 600, color: 'white'}}> </div>
        <Icon bordered name="close" color="yellow" onClick={() => setModalOpen(false)}/>
        </Modal.Header>
    <Explain
      theme={theme}
      />
 
  </Modal>       
      </div>
    <div>
       <Switch 
        toggleTheme={toggleTheme}
        theme={theme}
      >       
      </Switch>   
    </div>

      <div style={{marginTop: '1vh', marginRight: '2vw', opacity: 1}}>

      <Button.Group>
        <Button
        active
          size='mini'          
          color='olive'
          value="season"
          onClick={handleClick}
    
        >Season</Button>
         <Button.Or style={{color: 'black'}} />
        <Button
            size='mini'        
            color='blue'
            value="yesterday"
            onClick={handleClick}  
        >Latest
        </Button>
          </Button.Group>

      </div>
      <Icon onClick={() =>setShowTeamSelect(true)} bordered name="edit" size="large"/>
    </div>
        <Sidebar.Pushable 
            as={Segment}>
          <Sidebar                   
            animation="push"
            style={{marginRight: '1vw'}}          
            onHide={() => setFormVisible(false)}
            vertical='true'
            visible={formVisible}           
          >       
           <Segment>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end'}}>
          <Icon bordered color="grey" name="close" onClick={() => setFormVisible()}/>
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
              selectedMiLBName={selectedMiLBName}
              setSelectedMiLBName={setSelectedMiLBName}
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
              selectedMiLBName={selectedMiLBName}
              setSelectedMiLBName={setSelectedMiLBName}

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
    
    > 
    <div>
     <div style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end'}}>
     <Icon bordered  name="close" onClick={() => {setPlayersVisible(false)}}/>
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
          selectedMiLBLogo={selectedMiLBLogo} 
          selectedMiLBName={selectedMiLBName} 
          selectedMiLBYr={selectedMiLBYr} 
          timeframe={timeframe} 
          timeBatURL={timeBatURL}    
          timePitchURL={timePitchURL}  
          playersVisible={playersVisible}
          setShowTRMenu={setShowTRMenu}
          showTRMenu={showTRMenu}

    />
</div>
          </Sidebar>    
            <Sidebar.Pusher>  
              <div>
                <SeasonResults 
                  franchise={franchise}
                  setFranchise={setFranchise}
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
                  selectedYear={selectedYear}    
                  selectedDivision={selectedDivision}
                  selectedClass={selectedClass} 
                  timeframe={timeframe}    
                  timeBatURL={timeBatURL}    
                  timePitchURL={timePitchURL}
                  selectedMiLBName={selectedMiLBName}
                  setSelectedMiLBName={setSelectedMiLBName } 
                  setSelectedMiLBLogo={setSelectedMiLBLogo}
                  selectedMiLBLogo={selectedMiLBLogo}
                  setSelectedMiLBClass={setSelectedMiLBClass}
                  selectedMiLBClass={selectedMiLBClass}
                  setSelectedMiLBYr={setSelectedMiLBYr}
                  selectedMiLBYr={selectedMiLBYr}
                  setSelectedMiLBParentLogo={setSelectedMiLBParentLogo}
                  selectedMiLBParentLogo={selectedMiLBParentLogo}
                  setSelectedMiLBParentLg={setSelectedMiLBParentLg}
                  selectedMiLBParentLg={selectedMiLBParentLg}
                  setShowTRMenu={setShowTRMenu}
                  showTRMenu={showTRMenu}
                  myAAA={myAAA}
                  setMyAAA={setMyAAA}
                  myAA={myAA}
                  setMyAA={setMyAA}
                  myAPlus={myAPlus}
                  setMyAPlus={setMyAPlus}  
                  myA={myA}
                  setMyA={setMyA}                  
                  myAMinus={myAMinus}
                  setMyAMinus={setMyAMinus}
                  myRk={myRk}
                  setMyRk={setMyRk}
                />
        </div>
      </Sidebar.Pusher>
   </Sidebar.Pushable>
     <Modal   
    centered={false}

    open={showTeamSelect}
   >
      <Modal.Header style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'gray'}}>
        <div style={{marginRight:'1vw', fontSize: '1em', fontWeight: 600, color: 'white'}}> Select one team and year for each class</div>
        <Icon bordered  name="close" color="yellow" onClick={() => setShowTeamSelect(false)}/>
        </Modal.Header>
        <Modal.Content className='goLeft'>
             <CurrentTeamB
             getMousePos={getMousePos}
             mousePos={mousePos}
             setShowYearSelect={setShowYearSelect}
             showYearSelect={showYearSelect}
             theme={theme}
             setSelectedMiLBName={setSelectedMiLBName}
             selectedMiLBName={selectedMiLBName}
             selectedTmYrs={selectedTmYrs}
             getTeamYears={getTeamYears}
               minorMaster={minorMaster}
                myAAA={myAAA}
                setMyAAA={setMyAAA}
                myAA={myAA}
                setMyAA={setMyAA}
                myAPlus={myAPlus}
                setMyAPlus={setMyAPlus}  
                myA={myA}
                setMyA={setMyA}                  
                myAMinus={myAMinus}
                setMyAMinus={setMyAMinus}
                myRk={myRk}
                setMyRk={setMyRk}
                my2018={my2018}
                setMy2018={setMy2018}
                my2017={my2017}
                setMy2017={setMy2017}
                my2016={my2016}
                setMy2016={setMy2016}
                my2015={my2015}
                setMy2015={setMy2015}
                my2014={my2014}
                setMy2014={setMy2014}
                my2013={my2013}
                setMy2013={setMy2013}
                />
 </Modal.Content>
  </Modal>

    <div>data thanks to <a href='https://www.baseball-reference.com/'>Baseball Reference</a></div>
   </div>
    )}
}

export default AppB

























