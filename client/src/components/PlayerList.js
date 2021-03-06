import React, { useEffect } from 'react';
import {Grid, Image} from 'semantic-ui-react'
import ReactTable from 'react-table'
import ReactTooltip from 'react-tooltip'
import "react-table/react-table.css";
import mlbLogos from '../franchiseLogos.json'

export default function PlayerList(props) {
	
	useEffect(() =>  ReactTooltip.rebuild()) 

		var batterColumns = [
		{
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: 'Pitching',
		className: `App ${props.theme}`,
		accessor: 'tmStr',
		minWidth: 60,
		},
				{
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: 'Batting',
		className: `App ${props.theme}`,
		accessor: 'tmStr2',
		minWidth: 140,
		}, 
		{
		headerClassName: `App ${props.theme}`,
			headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: () => {
			return (
				<span data-tip="Offensive metric: Total Bases plus RBIs">TB + RBI</span>
				)
		},
		className: `App ${props.theme}`,
		accessor: 'TBRBI',
		width: 60  
		},
		 {
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: () => {
			return (
				<span data-tip="At Bats">AB</span>
				)
		},
		className: `App ${props.theme}`,			
		accessor: 'AB',
		width: 60  
		}, {
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: () => {
			return (
				<span data-tip="Batting Average">AVG</span>
				)
		},
		className: `App ${props.theme}`,
		accessor: 'AVG',
		width: 60  
		}, {
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: () => {
			return (
				<span data-tip="Hits">H</span>
				)
		},
		className: `App ${props.theme}`,
		accessor: 'H',
		width: 60  
		}, {
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: () => {
			return (
				<span data-tip="Home Runs">HR</span>
				)
		},
		className: `App ${props.theme}`,
		accessor: 'HR',
		width: 60  
		}, {
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: () => {
			return (
				<span data-tip="Stolen Bases">SB</span>
				)
		},
		className: `App ${props.theme}`,
		accessor: 'SB',
		width: 60  
	}];
		var pitcherColumns = [
				{
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: '',
		className: `App ${props.theme}`,
		accessor: 'tmStr',
		minWidth: 60,
		},
		{
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: 'Pitching',
		className: `App ${props.theme}`,
		accessor: 'tmStr2',
		minWidth: 140,
		},

		{
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: () => {
			return (
				<span data-tip={`The main metric:  Innings Pitched minus Earned Runs - a measure of durability and run prevention`}>IP - ER</span>
				)
		},
		className: `App ${props.theme}`,
		accessor: 'IPER',
		width: 60  
		},

		  {
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: () => {
			return (
				<span data-tip={`Wins`}>W</span>
				)
		},
		className: `App ${props.theme}`,
		accessor: 'W',
		width: 60  
		}, {
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: () => {
			return (
				<span data-tip={`Losses`}>L</span>
				)
		},
		className: `App ${props.theme}`,
		accessor: 'L',
		width: 60  
		}, {
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: () => {
			return (
				<span data-tip={`Saves`}>SV</span>
				)
		},
		className: `App ${props.theme}`,
		accessor: 'SV',
		width: 60  
		}, {
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: () => {
			return (
				<span data-tip={`Strikeouts`}>SO</span>
				)
		},
		className: `App ${props.theme}`,
		accessor: 'SO',
		width: 60  
		}, {
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: () => {
			return (
				<span data-tip={`Walks`}>BB</span>
				)
		},
		className: `App ${props.theme}`,
		accessor: 'BB',
		width: 60  
		}]
   const onRowClick = (state, rowInfo, column, instance) => {           
      return {
          onClick: e => {
              window.open(rowInfo.original.playerURL)              
          }
      }
  }
		if(props.playerList && mlbLogos) {

	var plyrSum =	<div style={{display: 'flex', flexDirection: 'row', marginBottom: '1.6vh', marginTop: '-2vh', justifyContent: 'space-around'}}>
							<div style={{marginLeft: '2vw', marginRight: '1vw', fontSize: '1.8em', fontWeight: 600}}>{props.selectedMiLBYr}</div>
							<div style={{marginLeft: '1vw', marginRight: '1vw', fontSize: '1.8em', fontWeight: 600}}>{props.playerList[0].class}</div>
							<Image size="tiny" rounded src={props.selectedMiLBLogo} />
							<div style={{fontSize: "1.8em", fontWeight: 600}}>{props.selectedMiLBName}</div>
						</div>					

			for(let i =0; i < props.playerList.length; i++) {
				props.playerList[i].playerURL = `https://www.baseball-reference.com/players/${props.playerList[i].playerID[0]}/${props.playerList[i].playerID}.shtml`
				for(let j =0; j < mlbLogos.length; j++) {
					if(props.playerList[i].curTeam === mlbLogos[j].majteam) {
						props.playerList[i].curLogo = mlbLogos[j].picurl
						props.playerList[i].curColor = props.playerList[i].lg === "AL" ? 'al' : 'nl';
				}
			}
		}
		props.playerList.map( tm => {
			tm.tmStr = <Image size='tiny' height='4%' rounded src={tm.curLogo} alt="players current team logo"/>
			tm.tmStr2 = <div  className={`App ${props.theme}`}><div style={{fontSize: '1.1em'}}>
			<span  className={`lg ${tm.curColor} ${props.theme}`}>{tm.playerName}</span>
			</div></div>
			console.log(tm)
			return tm
		})
} else {return(<div></div>)}
// ---------------------------------------------------------------------
	if(props.pitcherList && mlbLogos) {
			var ptchrSum =	<div style={{visibility: 'hidden', display: 'flex', flexDirection: 'row', marginBottom: '1.6vh', marginTop: '-2vh', justifyContent: 'space-around'}}>
							<div style={{marginLeft: '2vw', marginRight: '1vw', fontSize: '1.8em', fontWeight: 600}}>{props.selectedMiLBYr}</div>
							<div style={{marginLeft: '1vw', marginRight: '1vw', fontSize: '1.8em', fontWeight: 600}}>{props.playerList[0].class}</div>
							<Image size="tiny" rounded src={props.selectedMiLBLogo} />
							<div style={{fontSize: "1.8em", fontWeight: 600}}>{props.selectedMiLBName}</div>
						</div>
			for(let i =0; i < props.pitcherList.length; i++) {
				props.pitcherList[i].playerURL = `https://www.baseball-reference.com/players/${props.pitcherList[i].playerID[0]}/${props.pitcherList[i].playerID}.shtml`
				for(let j =0; j < mlbLogos.length; j++) {
					if(props.pitcherList[i].curTeam === mlbLogos[j].majteam) {
						props.pitcherList[i].curLogo = mlbLogos[j].picurl
						props.pitcherList[i].curColor = props.pitcherList[i].lg === "AL" ? 'al' : 'nl';
				}
			}
		}
			props.pitcherList.map( ptm => {
			ptm.tmStr = <Image size='tiny' rounded src={ptm.curLogo} alt="Current major league team logo"/>
			ptm.tmStr2 = <div>
			<span  className={`lg ${ptm.curColor} ${props.theme}`}>{ptm.playerName}</span>
			</div>
			return ptm
		})

	}	 else {return(<div></div>)}	
	if(props.pitcherList || props.playerList) {
	    return (
	 <div className={`App ${props.theme}`}>
 	    	<ReactTooltip
	    		place="bottom"
	    		offset={{bottom: 10, right: 10}}
	    		multiline />
	    	<Grid  
	    		stackable columns={2}> 
	    	 <Grid.Column>
	    	 {plyrSum}	   
	    		<ReactTable 
	    			minRows={10}
	    			multiSort={true}
	    			className={`-highlight App ${props.theme}`}	    	
		    		showPagination={false}
		    		style={{fontSize: '.9em', fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
	    			data={props.playerList}
	    			columns={batterColumns}
	    			showPageSizeOptions={false} 
	    			getTrProps={onRowClick}
	    		/>
  		
	    		</Grid.Column>
	    		<Grid.Column>	  
	    			{ptchrSum}
	    		<ReactTable
	    			minRows={10}
	    			multiSort={true}
	    			className={`-highlight App ${props.theme}`}
		    		showPagination={false}
		    		style={{fontSize: '.9em', fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
	    			data={props.pitcherList}
	    			columns={pitcherColumns}
	    			showPageSizeOptions={false}
	    			getTrProps={onRowClick}	    			
	    		/>
	  
	    	 </Grid.Column>
	    	 </Grid>
	    	 </div>
          )
	 } else { return(<div> no results</div>)
		}
	 }
