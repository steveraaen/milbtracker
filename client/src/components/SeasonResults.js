import React, {useState, useEffect} from 'react';
import {Grid, Image, Popup} from 'semantic-ui-react'
import ReactTooltip from 'react-tooltip'

import ReactTable from 'react-table'
import "react-table/react-table.css";
import "../App.css"
import tmsLogos from'../lgos/namesAndLogos.js'

export default function SeasonResults(props) {
	useEffect(() =>  ReactTooltip.rebuild()) 

	if( props.timeframe && props.bestBatTeams && props.bestPitchTeams && props.yestBatTeams && props.yestPitchTeams && props.selectedClass  && props.selectedYear) {

var currentBatData = props.timeframe === 'season' ? props.bestBatTeams : props.yestBatTeams
var currentPitchData = props.timeframe === 'season' ? props.bestPitchTeams : props.yestPitchTeams



		currentBatData.map( tm => {
			tm.color = tm.majLg === "A" ? 'crimson' : 'indigo'
			for(let i = 0; i < tmsLogos.length; i++) {
				if(tmsLogos[i].tmName === tm.tmName) {
					tm.lgo = tmsLogos[i].logoPNG
					tm.tmStr = <Image rounded size='mini' src={tm.lgo}/>
				}
			}
			

			tm.tmStr2 = <div style={{color: tm.majLg === "A" ? 'crimson' : 'indigo'}}>							
								<div style={{fontSize: '1.1em'}}>{tm.tmName}</div>
								<div style={{display: 'flex', flexDirection: 'row',fontSize: ".9em", fontWeight: 600}}>
									<div style={{ marginRight: '1vw'}}>{tm.yr}</div>
									<div style={{ marginRight: '1vw'}}>{tm.class}</div>
									<div style={{ marginRight: '1vw', fontSize: '1em', fontWeight: 600}}>{tm.franchise}</div>									
								</div>
							</div>
			tm.ttp = <Popup content="Total Bases" trigger={<th></th>}/>
			return tm
		})




		currentPitchData.map( ptm => {
			ptm.color = ptm.majLg === "A" ? 'crimson' : 'indigo'
			for(let i = 0; i < tmsLogos.length; i++) {
				if(tmsLogos[i].tmName === ptm.tmName) {
					ptm.lgo = tmsLogos[i].logoPNG
					ptm.ptmStr = <Image rounded size='mini' src={ptm.lgo}/>
				}
			}
			ptm.ptmStr2 = <div style={{color: ptm.majLg === "A" ? 'crimson' : 'indigo'}}>						
								<div style={{fontSize: '1.1em'}}>{ptm.tmName}</div>
								<div style={{display: 'flex', flexDirection: 'row',fontSize: ".9em", fontWeight: 600}}>
									<div style={{ marginRight: '1vw'}}>{ptm.yr}</div>
									<div style={{ marginRight: '1vw'}}>{ptm.class}</div>
									<div style={{ marginRight: '1vw', fontSize: '1em', fontWeight: 600}}>{ptm.franchise}</div>									
								</div>
							</div>
			return ptm
		})

const onRowClick = (state, rowInfo, column, instance) => {

    return {
        onClick: e => {

        	props.getPlayerList(rowInfo.original.franchise,rowInfo.original.class,rowInfo.original.yr)
           /* console.log(rowInfo.original.franchise,rowInfo.original.class,rowInfo.original.yr)   */       
        }
    }
}
		var batColumns = [
		{	
			headerStyle: {fontSize: '.9em'},
			Header: '',
			accessor: 'tmStr',
			description: '',
			width: 50,
		},{
			headerStyle: {fontSize: '.9em'},
			Header: 'Team',
			accessor: 'tmStr2',
			description: '',
			width: 130
		},  {
		
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Number of current major league players">Players</span>
					)
			},
			accessor: 'players',
			description: 'Number of current major league players',
			width: 60
		},{
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Offensive metric: Total Bases plus RBIs.">TB + RBI</span>
					)
			},
			accessor: 'TBRBI',
			description: 'Total Bases',
			width: 56,

		}, {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Runs Batted In">RBI</span>
					)
			},
			accessor: 'RBI',
			description: 'Runs Batted In',
			width: 56
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Batting Average">H</span>
					)
			},
			accessor: 'H',
			description: 'Hits',
			width: 56
		},{
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Batting Average">AVG</span>
					)
			},
			accessor: 'AVG',
			description: 'Batting Average',
			width: 56
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Home Runs">HR</span>
					)
			},
			accessor: 'HR',
			description: 'Home Runs',
			width: 56
		}];
		var pitchColumns = [
		{
			headerStyle: {fontSize: '.9em'},
			Header: '',
			accessor: 'ptmStr',
			description: '',
			width: 50
		},{
			headerStyle: {fontSize: '.9em'},
			Header: 'Team',
			accessor: 'ptmStr2',
			description: '',
			width: 130
		},	{
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Number of current major league players">Players</span>
					)
			},
			accessor: 'players',
			description: 'Number of current major league players',
			width: 60
		},	{
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip={`The main metric:  Innings Pitched minus Earned Runs - a measure of durability and run prevention`}>IP - ER</span>
					)
			},
			accessor: 'IPER',
			description: 'Innings Pitched minus Earned Runs',
			width: 56
		},  {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Wins">W</span>
					)
			},
			accessor: 'W',
			description: 'Wins',
			width: 56
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Losses">L</span>
					)
			},
			accessor: 'L',
			description: 'Losses',
			width: 56
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Saves">SV</span>
					)
			},
			accessor: 'SV',
			description: 'Saves',
			width: 56
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: () => {
				return (
					<span data-tip="Strikeouts">SO</span>
					)
			},
			accessor: 'SO',
			description: 'Strikeouts',
			width: 56
		}]
	    return (
<div style={{borderStyle: 'ridge', borderWidth: '4pt', borderColor: props.borderCol}}>
	    	<ReactTooltip
	    	place="bottom"
	    	offset={{bottom: 10, right: 10}}
	    	multiline />
	    	<Grid stackable columns={2}>

	    	 <Grid.Column>
	    	<div>
	    	<div style={{display: 'flex', flexDirection: 'row', fontWeight: 600}}>
	    		<div style={{fontSize: '1.1em', marginLeft: '2vw'}}>Top Batting</div>
	    		<div onClick={()=> props.toggleFormSidebar()} style={{fontSize: '1.1em', fontWeight: 600, fontStyle: 'italic', marginLeft: '5vw'}}>{props.selectedClass.displayName}</div>
	    		<div onClick={()=> props.toggleFormSidebar()} style={{fontSize: '1.1em', fontWeight: 600, fontStyle: 'italic', marginLeft: '5vw'}}>{props.selectedYear.text}</div>
	    	</div>
	    		<ReactTable
	    			resizable={false} 
	    			className="-highlight"
		    		showPagination={false}
		    		style={{fontSize: '.9em', fontWeight: 600, height: '76vh', backgroundColor: 'white'}}
		    		defaultPageSize={30}
	    			data={currentBatData}    			
	    			columns={batColumns}
	    			showPageSizeOptions={false}	    			
	    			getTrProps={onRowClick}
	    		/> 
	    		</div>
	    		 </Grid.Column>
	    		  <Grid.Column>
	    		<div>
	    	<div style={{display: 'flex', flexDirection: 'row', fontWeight: 600}}>
	    		<div style={{fontSize: '1.1em', marginLeft: '2vw'}}>Top Pitching</div>
	    		<div onClick={()=> props.toggleFormSidebar()} style={{fontSize: '1.1em', fontWeight: 600, fontStyle: 'italic', marginLeft: '5vw'}}>{props.selectedClass.displayName}</div>
	    		<div onClick={()=> props.toggleFormSidebar()} style={{fontSize: '1.1em', fontWeight: 600, fontStyle: 'italic', marginLeft: '5vw'}}>{props.selectedYear.text}</div>
	    	</div>
	    		<ReactTable 
	    			multiSort={false}	 
	    			className="-highlight"
		    		showPagination={false}
		    		style={{fontSize: '.9em',   fontWeight: 600, height: '76vh', backgroundColor: 'white'}}
		    		defaultPageSize={30}
	    			data={currentPitchData}	    		
	    			columns={pitchColumns}
	    			showPageSizeOptions={false}	    				    			
	    			getTrProps={onRowClick}
	    		/>
	    	</div> 

	    	 </Grid.Column> 
	    	</Grid>
	    	</div>
          )
		} else {
			return null
		}

}