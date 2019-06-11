import React, { useEffect } from 'react';
import {Image} from 'semantic-ui-react'
import ReactTable from 'react-table'
import ReactTooltip from 'react-tooltip'
import "react-table/react-table.css";
import {Grid} from 'semantic-ui-react'
import mlbLogos from '../franchiseLogos.json'
export default function PlayerList(props) {
	useEffect(() =>  ReactTooltip.rebuild()) 
		var batterColumns = [
				{
		 headerStyle: {fontSize: '.9em'},
	    Header: 'Batting',
	    accessor: 'tmStr',
	    width: 144,
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Offensive metric: Total Bases plus RBIs">TB + RBI</span>
					)
			},
			accessor: 'TBRBI',
	    	width: 54,
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="At Bats">AB</span>
					)
			},
			accessor: 'AB',
	    	width: 54,
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Batting Average">AVG</span>
					)
			},
			accessor: 'AVG',
	    	width: 54,
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Hits">H</span>
					)
			},
			accessor: 'H',
	    	width: 54,
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Home Runs">HR</span>
					)
			},
			accessor: 'HR',
	    	width: 54,
		}/*, {
			Header: 'BB',
			accessor: 'BB',
	    	width: 54,
		}, {
			Header: 'SB',
			accessor: 'SB',
	    	width: 54,
		}*/];
		var pitcherColumns = [
		{
			headerStyle: {fontSize: '.9em'},
	    Header: 'Pitching',
	    accessor: 'tmStr',
	    width: 144,
		},{
			Header: () => {
				return (
					<span data-tip={`The main metric:  Innings Pitched minus Earned Runs - a measure of durability and run prevention`}>IP - ER</span>
					)
			},
			accessor: 'IPER',
	    width: 54,
		},  {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip={`Wins`}>W</span>
					)
			},
			accessor: 'W',
	    width: 54,
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip={`Losses`}>L</span>
					)
			},
			accessor: 'L',
	    width: 54,
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip={`Saves`}>SV</span>
					)
			},
			accessor: 'SV',
	    width: 54,
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip={`Strikeouts`}>SO</span>
					)
			},
			accessor: 'SO',
	    width: 54,
		}/*, {
			Header: 'HR',
			accessor: 'HR',
	    width: 54,
		}, {
			Header: 'BB',
			accessor: 'BB',
	    width: 54,
		}*/]
		if(props.playerList && mlbLogos) {

			var plyrSum =	<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', width: '10vw'}}>
									<div style={{marginLeft: '2vw', marginRight: '1vw', fontSize: '1.3em', fontWeight: 600}}>{props.playerList[0].yr}</div>
									<div style={{marginLeft: '1vw', marginRight: '1vw', fontSize: '1.3em', fontWeight: 600}}>{props.playerList[0].class}</div>
									<Image size='tiny' src={props.playerList[0].imgURL} />
									<div style={{flex: 1, marginLeft: '1vw', fontSize: '1.3em', fontWeight: 600}}>{props.playerList[0].tmName}</div>
								</div>
								
								

			for(let i =0; i < props.playerList.length; i++) {
				props.playerList[i].playerURL = `https://www.baseball-reference.com/players/${props.playerList[i].playerID[0]}/${props.playerList[i].playerID}.shtml`
				for(let j =0; j < mlbLogos.length; j++) {
					if(props.playerList[i].curTeam === mlbLogos[j].majteam) {
						props.playerList[i].curLogo = mlbLogos[j].picurl
				}
			}
		}
		props.playerList.map( tm => {
			tm.tmStr = <div style={{fontSize: '1.1em'}}><Image size='mini' src={tm.curLogo}/>
			<a style={{color:   tm.lg === "AL"  ? 'crimson' : 'indigo'}}target="_blank" rel="noopener noreferrer" href={tm.playerURL}>{tm.playerName}</a>
			</div>
			return tm
		})
} else {return(<div></div>)}
// ---------------------------------------------------------------------
	if(props.pitcherList && mlbLogos) {
			var ptchrSum =	<div style={{visibility: 'hidden', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '10vw'}}>
									<div style={{marginLeft: '2vw', marginRight: '1vw', fontSize: '1.3em', fontWeight: 600}}>{props.playerList[0].yr}</div>
									<div style={{marginLeft: '1vw', marginRight: '1vw', fontSize: '1.3em', fontWeight: 600}}>{props.playerList[0].class}</div>
									<Image size='tiny' src={props.playerList[0].imgURL} />
									<div style={{marginLeft: '1vw', marginRight: '1vw', fontSize: '1.3em', fontWeight: 600}}>{props.playerList[0].tmName}</div>
								</div>
			for(let i =0; i < props.pitcherList.length; i++) {
				props.pitcherList[i].playerURL = `https://www.baseball-reference.com/players/${props.pitcherList[i].playerID[0]}/${props.pitcherList[i].playerID}.shtml`
				for(let j =0; j < mlbLogos.length; j++) {
					if(props.pitcherList[i].curTeam === mlbLogos[j].majteam) {
						props.pitcherList[i].curLogo = mlbLogos[j].picurl
				}
			}
		}
			props.pitcherList.map( ptm => {
			ptm.tmStr = <div><Image size='mini' src={ptm.curLogo}/>
			<a style={{color: ptm.lg === "AL" ? 'crimson' : 'indigo'}} target="_blank" rel="noopener noreferrer" href={ptm.playerURL}>{ptm.playerName}</a>
			</div>
			return ptm
		})
	}	 else {return(<div></div>)}	
	if(props.pitcherList || props.playerList) {
	    return (
	 <div>
 	    	<ReactTooltip
	    		place="bottom"
	    		offset={{bottom: 10, right: 10}}
	    		multiline />
	    	<Grid  
	    		stackable columns={2}	    	 
	    	> 
	    	
	    	 <Grid.Column>
	    	 {plyrSum}
	   
	    		<ReactTable 
	    		resizable={false}
	    		multiSort={false}	    	
	    		showPagination={false}
	    		style={{fontSize: '.9em', fontWeight: 600, height: '66vh'}}
    			data={props.playerList}
    			columns={batterColumns}
    			showPageSizeOptions={false} 
	    		/>
	    		</Grid.Column>
	    		<Grid.Column>
	    		{ptchrSum}
	    		<ReactTable
	    		resizable={false}
	    		multiSort={false}
	    		showPagination={false}
	    		style={{fontSize: '.9em', fontWeight: 600, height: '66vh'}}
    			data={props.pitcherList}
    			columns={pitcherColumns}
    			showPageSizeOptions={false}	    			
	    		/>
	  
	    	 </Grid.Column>
	    	 </Grid>
	    	 </div>
          )
	 } else { return(<div> no results</div>)
		}
	 }
