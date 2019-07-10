
import React, { useState, useEffect} from 'react';
import * as firebase from 'firebase';
import { Button,  Icon,  Modal, Segment, Sidebar} from 'semantic-ui-react'
import axios from 'axios'

import { ClassPicker, YearPicker } from './components/Selections.js'
import SeasonResults from './components/SeasonResults.js'
import PlayerList from './components/PlayerList.js'
import IsLoading from './components/IsLoading.js'
import Explain from './components/Explain.js'
import Switch from './components/Switch.js'
import CurrentTeam from './components/CurrentTeam.js'
import Login from './components/Login.js'
import './App.css'
import classes from './classes.js'
import mlbTeams from './mlbTeams.js'

 var firebaseConfig = {
    apiKey: 'AIzaSyBbsausI3K8uWLkCSxOlpR6fnmldVklLvU',
    authDomain: 'milb-5cd63.firebaseapp.com',
    databaseURL: 'https://milb-5cd63.firebaseio.com',
    projectId: 'milb-5cd63',
    storageBucket: '',
    messagingSenderId: '553001988373',
    appId: '1:553001988373:web:1a53e8b3b46703a0'
  };


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
/*localStorage.clear()*/
/*
localStorage.setItem('myAAA', '')
localStorage.setItem('myAA', '')
localStorage.setItem('myAMinus', '')
localStorage.setItem('myA', '') 
localStorage.setItem('myAPlus', '') 
localStorage.setItem('myRk', '')*/
 const firebaseApp = firebase.initializeApp(firebaseConfig);
 var database= firebase.database()
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  var email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    email = window.prompt('Please provide your email for confirmation');
  }

  firebase.auth().signInWithEmailLink(email, window.location.href)
    .then(function(result) {
    /*  window.localStorage.removeItem('emailForSignIn');*/
      console.log(result.user)
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
    })
    .catch(function(error) {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
}
/* firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
   console.log(uid)
   console.log(isAnonymous)
  } else {
    // User is signed out.
    // ...
  }
  // ...
});*/
function AppB() {
/*firebase.auth().signInAnonymously().catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
});*/
function requestEmailLink(email) {
var actionCodeSettings = {
  url: 'http://localhost:3000/',
  // This must be true.
  handleCodeInApp: true,
};
firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  .then(function() {
    window.localStorage.setItem('emailForSignIn', email);
  })
  .catch(function(error) {
  });
}

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
  const [loginVisible, setLoginVisible] = useState(false);
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
  const [myAPlus, setMyAPlus] = useState(() => localStorage.getItem('myA+' || ''));
  const [myA, setMyA] = useState(() => localStorage.getItem('myA' || ''));
  const [myAMinus, setMyAMinus] = useState(() => localStorage.getItem('myA-' || ''));
  const [myRk, setMyRk] = useState(() => localStorage.getItem('myRk' || ''));
  const [myPlayers, setMyPlayers] = useState();
  const [my2018, setMy2018] = useState(() => localStorage.getItem('my2018' || ''));
  const [my2017, setMy2017] = useState(() => localStorage.getItem('my2017' || ''));
  const [my2016, setMy2016] = useState(() => localStorage.getItem('my2016' || ''));
  const [my2015, setMy2015] = useState(() => localStorage.getItem('my2015' || ''));
  const [my2014, setMy2014] = useState(() => localStorage.getItem('my2014' || ''));
  const [my2013, setMy2013] = useState(() => localStorage.getItem('my2013' || ''));

  const [minorMaster, setMinorMaster] = useState();
  const [allAAA, setAllAAA] = useState();
  const [allAA, setAllAA] = useState();
  const [allAPlus, setAllAPlus] = useState();
  const [allA, setAllA] = useState();
  const [allAMinus, setAllAMinus] = useState();
  const [allRk, setAllRk] = useState();
  const [minorArray, setMinorArray] = useState();
  const [showTeamSelect, setShowTeamSelect] = useState(false);
  const [showYearSelect, setShowYearSelect] = useState(false);
  const [selectedTmYrs, setSelectedTmYrs] = useState();
  const [mousePos, setMousePos] = useState();
  const [openConfirm, setOpenConfirm] = useState()
  const [myEmail, setMyEmail] = useState(()=> localStorage.getItem('emailForSignIn' || ''))
  const [myUserName, setMyUserName] = useState(()=> localStorage.getItem('myUserName' || ''))


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
async function getMyPlayers(yr, tm) {
  const myPlayersPromise = axios('/api/getMyTeam', {params: {yr, tm}})
  var myPlayers = await myPlayersPromise
  for(let i = 0; i < myPlayers.data.length; i++) {
    for(let j = 0; j < mlbTeams.length; j++) {
      if(myPlayers.data[i].curTeam === mlbTeams[j].teamCode){
        myPlayers.data[i].curTeamLogo = mlbTeams[j].picUrl
        myPlayers.data[i].curTeamName = mlbTeams[j].teamName
      }
    }
  }
  setMyPlayers(myPlayers.data)
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
    setAllAAA(mmstr.data.filter(tm => tm.class === 'AAA'))
    setAllAA(mmstr.data.filter(tm => tm.class === 'AA'))
    setAllAPlus(mmstr.data.filter(tm => tm.class === 'A+'))
    setAllA(mmstr.data.filter(tm => tm.class === 'A'))
    setAllAMinus(mmstr.data.filter(tm => tm.class === 'A-'))
    setAllRk(mmstr.data.filter(tm => tm.class === 'Rk'))


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
const areYouLoggedIn = () => {
  if(myEmail) {
  setShowTeamSelect(true)
} else {
  setLoginVisible(true)
}
}
/*
    useEffect(() => {
      if(myAAA && myAA && myAPlus && myA && myAMinus && myRk) {
        
      }
    })*/


     useEffect(() => {
          getMinorMaster()
    }, {})
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
  <header><div style={{marginBottom: '1.5vh', marginTop: '2.5vh',fontSize: '1.2em'}}>Farm Team Fantasy</div></header>

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
<div> <Icon onClick={() => areYouLoggedIn() } bordered name="edit" size="large"/></div>
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
        <Icon bordered name="close" color="yellow" onClick={() => setShowTeamSelect(false)}/>
        </Modal.Header>
        <Modal.Content className='goLeft'>
             <CurrentTeam
              openConfirm={openConfirm}
              setOpenConfirm={setOpenConfirm}
              myPlayers={myPlayers}
              getMyPlayers={getMyPlayers}
              allAAA={allAAA}
              allAA={allAA}
              allAPlus={allAPlus}
              allA={allA}
              allAMinus={allAMinus}
              allRk={allRk}
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
     <Modal   
        open={loginVisible}
     >
      <Modal.Header style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'gray'}}>
        <div style={{marginRight:'1vw', fontSize: '1em', fontWeight: 600, color: 'white'}}>Get a verification link via email</div>

        <Icon bordered  name="close" color="yellow" onClick={() => setLoginVisible(false)}/>
        </Modal.Header>
        <Modal.Content className='goLeft'>
        <p> Signing in is optional.  It enables you compate your teams' success to others, but if you'd like to browse around, dismiss this window.</p>
             <Login
                 requestEmailLink={requestEmailLink}
                 myEmail={myEmail}
                 setMyEmail={setMyEmail}
                 myUserName={myUserName}
                 setMyUserName={setMyUserName}
                 loginVisible={loginVisible}
                 setLoginVisible={setLoginVisible}

                />

 </Modal.Content>
  </Modal>
    <div>data thanks to <a href='https://www.baseball-reference.com/'>Baseball Reference</a></div>
   </div>
    )}
}

export default AppB

























