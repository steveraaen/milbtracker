import React, { useState, useEffect } from 'react';
import {Button, Container, Grid, Header, Icon, Image,  Segment, Sidebar} from 'semantic-ui-react'
import axios from 'axios'
import Collapsible from 'react-collapsible';
import { BestFive, ClassPicker,  YearPicker, Divisions, /*Stats,*/ Teams } from './components/Selections.js'
import  LiveResults  from './components/LiveResults.js'
import  PlayerList  from './components/PlayerList.js'
import  ftflogo  from './assets/ftflogo.png'


import './App.css'
import classes from './classes.js'
import mlbTeams from './mlbTeams.js'
import newMinors from './newMinors.json'
/*import leagues from './assets/leagues.js'*/
console.log(newMinors)
const yrs = [
    { text: "All Years", value: "20%", key: "20%" },
    { text: "2013", value: 2013, key: "2013" },
    { text: "2014", value: 2014, key: "2014" },
    { text: "2015", value: 2015, key: "2015" },
    { text: "2016", value: 2016, key: "2016" },
    { text: "2017", value: 2017, key: "2017" },
    { text: "2018", value: 2018, key: "2018" }
]

function AppB() {

   /* const [allMiLB, setAllMiLB] = useState(allMinorTeams);*/
    const [selectedClass, setSelectedClass] = useState(classes[0]);
    const [minors, setMinors] = useState(newMinors);
    const [years] = useState(yrs);
    const [/*bestMinors,*/ setBestMinors] = useState();
    const [allMLB] = useState(mlbTeams);
    const [selectedYear, setSelectedYear] = useState(yrs[0]);
    const [playerList, setPlayerList] = useState();
    const [pitcherList, setPitcherList] = useState();
    const [classIcon] = useState('angle down');
    const [allDivisions, setAllDivisions] = useState();
    const [selectedDivision, setSelectedDivision] = useState({value: "%L%", display: "All Major League Teams"});
    const [/*radialData,*/ setRadialData] = useState();
    const [synthStats, setSynthStats] = useState();
    const [selectedMiLBTeam, setSelectedMiLBTeam] = useState();
  /*  const [statsToDb, setStatsToDb] = useState();*/
    const [topTenHit, setTopTenHit] = useState();
    const [topTenPitch, setTopTenPitch] = useState();
    const [topTen, setTopTen] = useState();
    const [bestBat, setBestBat] = useState();
    const [bestPitch, setBestPitch] = useState();
/*    const [classStats, setClassStats] = useState();*/
   /* const [column, setColumn] = useState();*/
 /*   const [direction, setDirection] = useState();*/
/*    const [curSortB, setCurSortB] = useState({bsrt: "bBA", bsDir: "desc"});
    const [curSortP, setCurSortP] = useState({psrt: "bBA", bsDir: "desc"});*/
    const [modalOpen, setModalOpen] = useState();
    const [visible, setVisible] = useState(false);

    function toggleSidebar() {
      !visible ? setVisible({ visible: true}) : setVisible({ visible: false})
    }

    function sortBTable(e) {  
      let { topTenBatting } = topTen
       var newArr = topTenBatting.sort((a,b) => {      
        return b[e] - a[e]
      })
       setTopTenHit({
         topTenHit: newArr
       })
   }

    function sortPTable(e) {  
      let { topTenPitching } = topTen
       var newArr = topTenPitching.sort((a,b) => {      
        return b[e] - a[e]
      })
       setTopTenPitch({
         topTenPitch: newArr
       })
   } 
   
    async function getTopTen(cl, yr, dv) {
      try {
               
        const bestPitchPromise = axios('/api/teamPitch', { params: { cl, yr } })
        const bestBatPromise = axios('/api/teamBat', { params: { cl, yr } })
        const bestPitch = await bestPitchPromise; 
        const bestBat = await bestBatPromise; 
     
        bestBat.data.map(ba =>  ba.AVG = parseFloat((ba.AVG / 10).toFixed(3)))



        setBestBat({
          bestBatTeams: bestBat.data
        })
        setBestPitch({
          bestPitchTeams: bestPitch.data
        })
  /*      setTopTen({
          topTenBatting: topTen.data[1],
          topTenPitching: topTen.data[0]
        })
         setTopTenHit({
          topTenHit: topTen.data[1]
        })
         setTopTenPitch({
          topTenPitch: topTen.data[0]
        })*/
/*                 setPlayerList({
                    playerList: null
                })
                 setPitcherList({
                    pitcherList: null
                })
                 setSelectedMiLBTeam({
                    selectedMiLBTeam: null
                })
                 setSynthStats({
                    synthStats: null
                })*/
      }
    catch (e) {
    console.error(e);  
  };
    }
    function makeDivs() {
      var uniqueDivisions = allMLB.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.league === thing.league && t.color === thing.color
      ))
    )
  return setAllDivisions({allDivisions: uniqueDivisions})
    }
/*    async function saveStats(tm, yr, dv, cl, ba, pi) {
        await axios.get('/api/sendStats', { params: {tm, yr, dv, cl, ba, pi}})
            .catch(err => {
                console.log(err);
                return null;
            });
    }*/
/*    async function getMinors() {
        await axios.get('/api/allMinors')
            .then(res => {
                console.log(res)
                setMinors({
                    minors: res.data
                })
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    }*/
/*    async function getBestMinors(p, d, m, y) {
      console.log(p,d, m,y)
        await axios.get('/api/bestMinors', { params: { p, d, m, y } })
            .then(res => {
              console.log(res.data)
                var radialFormatted = res.data.map((tm, idx) => {
                var radObj = {}
                for(let i = 0; i < allMLB.length; i++) {
                  if(tm.franchise === allMLB[i].teamCode) {
                    radObj.fill = allMLB[i].color
                    radObj.franchiseLogo = allMLB[i].picUrl
                    radObj.division= allMLB[i].display
                    radObj.franchise= allMLB[i].teamCode
                    }
                }
                  radObj.name = tm.team
                  radObj.value= tm.playerCount
                  radObj.logo= tm.logo
                  
                  return radObj
                })
                 setRadialData({
                   radialData: radialFormatted.sort((a, b) => (a.value < b.value) ? 1 : -1)
                 })
              
                setBestMinors({
                    bestMinors: res.data
                })
                 setPlayerList({
                    playerList: null
                })
                 setPitcherList({
                    pitcherList: null
                })
                 setSelectedMiLBTeam({
                    selectedMiLBTeam: null
                })
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    }*/


    async function getPlayerList(f, c, y) {
      console.log(f, c, y)
      try {
/*        const batterPromise = axios('/api/batterList', { params: { r, f, y, t } })
        const pitcherPromise = axios('/api/newPitchers', { params: { r, f, y, t } })*/
        const newBatterPromise = axios('/api/newBatList', { params: {f,c,y} })
        const newPitcherPromise = axios('/api/newPitchList', { params: {f,c,y} })
        const [newBatters, newPitchers] = await Promise.all([newBatterPromise, newPitcherPromise]);    

        console.log(newBatters)                
           var batStats = {}
           batStats.bat = newBatters.data.reduce((a, b) => ({
               AB: a.AB + b.AB,
               H: a.H + b.H,
               AVG: ((a.H + b.H) /(a.AB + b.AB)).toFixed(3),
               SB: a.SB = b.SB,
               SO: a.SO + b.SO,
               HR: a.HR + b.HR,
               HBP: a.HBP + b.HBP,
               BB: a.BB + b.BB,
               G: a.G + b.G,
               RBI: a.RBI + b.RBI,
               YR: a.YR

             })
           )
           var pitStats = {}
           pitStats.pit = newPitchers.data.reduce((a, b) => ({
               ERA: (9 * (a.ER + b.ER) / (a.IP + b.IP)).toFixed(2),
               IP: a.IP + b.IP,
               SO: a.SO + b.SO,
               BB: a.BB + b.BB,
               ER: a.ER + b.ER,
               H: a.H + b.H,
               SV: a.SV + b.SV,
               W: a.W + b.W,
               L: a.L + b.L,
               G: a.G + b.G,
               GS: a.GS + b.GS,
               HBP: a.HBP + b.HBP,
               IBB: a.IBB + b.IBB,
               YR: a.YR
             })
           )              
          setSynthStats({
            synthStats: {
              batting: batStats,
              pitching: pitStats,
              allPlayers: { ...batStats, ...pitStats}
            }
          })

           newBatters.data.map((plyr, idx) => {               
             for(let i = 0; i < allMLB.length; i++) {
               if(plyr.teamID === allMLB[i].teamCode) {
                 plyr.color = allMLB[i].color
                 plyr.teamName = allMLB[i].teamName
               } else{ return null}
             }
           })
           newPitchers.data.map((ptchr, idx) => {               
             for(let i = 0; i < allMLB.length; i++) {
               if(ptchr.teamID === allMLB[i].teamCode) {
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
      }
             catch (e) {
    console.error(e);  
  };
    }
    
    useEffect(() => {
        getTopTen(selectedClass.code, selectedYear.value, selectedDivision.value)
    }, {});

    useEffect(() => {
        makeDivs()
    }, {});
/*    useEffect(() => {
        getBestMinors(selectedClass.code, selectedDivision.value, selectedClass.regex, selectedYear)
    }, {});*/


    return (  
<div>
<div style={{display: 'flex',flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
      <Image src={ftflogo} width={150} height={80} />
                Current Major League Performance of Recent Minor league Teams
</div>
            <div style={{fontSize:'1rem', backgroundColor: 'lightBlue'}} > 

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <Icon name="bars" disabled={visible} onClick={toggleSidebar} />
            <div style={{alignContent: 'center', fontSize: '1.2em', fontWeight: 600}}>

             </div> 
             </div> 
             <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
             </div>
            <Sidebar.Pushable as={Segment}>
          <Sidebar
            animation='uncover'
            icon='labeled'
            inverted='true'
            onHide={() => setVisible(false)}
            vertical='true'
            visible={visible}
           
          >       
           <Segment>
            <ClassPicker
        
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
<div>
    <LiveResults 
      {...bestBat}
      {...bestPitch}
      {...playerList}
      {...pitcherList}
      getPlayerList={getPlayerList}
      getTopTen={getTopTen}
      setModalOpen ={setModalOpen}
      modalOpen={modalOpen}
      selectedMiLBTeam={selectedMiLBTeam} 
      selectedYear={selectedYear}    
      selectedDivision={selectedDivision}
      selectedClass={selectedClass}      
    />
</div>
<div>
<PlayerList 
      {...playerList}
      {...pitcherList}
      selectedClass={selectedClass} 
      selectedYear={selectedYear} 
      selectedDivision={selectedDivision} 
      selectedMiLBTeam={selectedMiLBTeam} 
/>

<div>Data derived from <a href="https://www.baseball-reference.com/">Baseball Reference</a></div>
<div>Logos provided by <a href="http://www.sportslogos.net/">Chris Creamer's Sportslogos.net</a></div>
</div>
</div>
  </Sidebar.Pusher>
   </Sidebar.Pushable>
   </div>
   </div>
    );
}


export default AppB