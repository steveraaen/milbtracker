import React from 'react';
import {Grid, Image} from 'semantic-ui-react'

import ReactTable from 'react-table'
import "react-table/react-table.css";

export default function SeasonResults(props) {
	if(props.tfObj && props.timeframe && props.bestBatTeams && props.bestPitchTeams && props.yestBatTeams && props.yestPitchTeams && props.selectedClass  && props.selectedYear) {

var currentBatData = props.timeframe === 'season' ? props.bestBatTeams : props.yestBatTeams
var currentPitchData = props.timeframe === 'season' ? props.bestPitchTeams : props.yestPitchTeams

		currentBatData.map( tm => {
			tm.color = tm.lg === "A" ? 'crimson' : 'indigo'
			tm.tmStr = <div><Image rounded size='mini' src={tm.imgURL}/><div style={{fontSize: '.8em'}}>{tm.yr}</div></div>
			tm.tmStr2 = <div style={{color: tm.lg === "A" ? 'crimson' : 'indigo'}}><div>{tm.team}</div><div style={{display: 'flex', flexDirection: 'row',fontSize: ".8em", fontWeight: 600}}><div style={{ marginRight: '1vw'}}>{tm.class}</div><div>{tm.franchiseName}</div></div></div>
			return tm
		})
		currentPitchData.map( ptm => {
			ptm.color = ptm.lg === "A" ? 'crimson' : 'indigo'
			ptm.ptmStr = <div><Image size='mini' src={ptm.imgURL}/><div style={{fontSize: '.8em'}}>{ptm.yr}</div></div>
			ptm.ptmStr2 = <div style={{color: ptm.lg === "A" ? 'crimson' : 'indigo'}}><div>{ptm.team}</div><div style={{display: 'flex', flexDirection: 'row',fontSize: ".8em", fontWeight: 600}}><div style={{ marginRight: '1vw'}}>{ptm.class}</div><div>{ptm.franchiseName}</div></div></div>
			return ptm
		})
const onRowClick = (state, rowInfo, column, instance) => {
	
    return {
        onClick: e => {
        	props.getPlayerList(rowInfo.original.franchise,rowInfo.original.class,rowInfo.original.yr)
            console.log(rowInfo.original.franchise,rowInfo.original.class,rowInfo.original.yr)          
        }
    }
}


		var batColumns = [
		{
	    Header: '',
	    accessor: 'tmStr',
	    width: 56,
		}, {
			Header: 'Team',
			accessor: 'tmStr2', 
			minWidth: 14
		},  /*{
			Header: 'Players',
			accessor: 'players',
	    	width: 58,
		},*/{
			Header: 'TB',
			accessor: 'TB',
	    	width: 51,
		},/* {
			Header: 'AB',
			accessor: 'AB',
	    	width: 46,
		},*/ {
			Header: 'AVG',
			accessor: 'AVG',
	    	width: 65,
		}, {
			Header: 'H',
			accessor: 'H',
	    	width: 51,
		}, {
			Header: 'HR',
			accessor: 'HR',
	    	width: 51,
		}/*, {
			Header: 'BB',
			accessor: 'BB',
	    	width: 46,
		}*/];
		var pitchColumns = [
		{
	    Header: '',
	    accessor: 'ptmStr',
	    width: 56,
		}, {
			Header: 'Team',
			accessor: 'ptmStr2', 
			minWidth: 104
		}, /*{
			Header: 'Players',
			accessor: 'players',
	    width: 58,
		},*/{
			Header: 'IP-ER',
			accessor: 'IPER',
	    width: 55,
		},  {
			Header: 'W',
			accessor: 'W',
	    width: 55,
		}, {
			Header: 'L',
			accessor: 'L',
	    width: 55,
		}, {
			Header: 'SO',
			accessor: 'SO',
	    width: 55,
		}/*, {
			Header: 'HR',
			accessor: 'HR',
	    width: 50,
		}, {
			Header: 'BB',
			accessor: 'BB',
	    width: 50,
		}*/]
	    return (
	    	<Grid stackable columns={2}>
	    	 <Grid.Column>
	    	<div>
	    	<div style={{display: 'flex', flexDirection: 'row', fontWeight: 600}}>
	    		<div style={{fontSize: '1.1em', marginLeft: '2vw'}}>Top Batting</div>
	    		<div style={{fontSize: '1.1em', fontWeight: 600, marginLeft: '1vw'}}>{props.selectedClass.displayName}</div>
	    		<div style={{fontSize: '1.1em', fontWeight: 600, marginLeft: '1vw'}}>{props.selectedYear.text}</div>
	    	</div>
	    		<ReactTable 
	    		isSelected
	    		showPagination={false}
	    		style={{fontSize: '.9em', fontWeight: 600, height: '76vh', backgroundColor: 'whitesmoke'}}
	    			data={currentBatData}
	    			resolveData={data => data.map(row => row)}
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
	    		<div style={{fontSize: '1.1em', fontWeight: 600, marginLeft: '1vw'}}>{props.selectedClass.displayName}</div>
	    		<div style={{fontSize: '1.1em', fontWeight: 600, marginLeft: '1vw'}}>{props.selectedYear.text}</div>
	    	</div>
	    		<ReactTable 
	    		showPagination={false}
	    		style={{fontSize: '.9em',   fontWeight: 600, height: '76vh', backgroundColor: 'whitesmoke'}}
	    			data={currentPitchData}
	    			resolveData={data => data.map(row => row)}
	    			columns={pitchColumns}
	    			showPageSizeOptions={false}
	    				    			
	    			getTrProps={onRowClick}
	    		/>
	    	</div> 
	    	 </Grid.Column> 
	    	</Grid>
          )
		} else {
			return <div style={{marginLeft: '3vw'}}>no</div>
		}

}