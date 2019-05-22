import React, { useState, useEffect } from 'react';
import {Grid, Image} from 'semantic-ui-react'

import ReactTable from 'react-table'
import "react-table/react-table.css";
export default function LiveResults(props) {
	if(props.bestBatTeams && props.bestPitchTeams && props.selectedClass && props.selectedDivision && props.selectedYear) {
		var { bestBatTeams: bBatTeams, bestPitchTeams: bPitchTeams } = props
		bBatTeams = bBatTeams.map( tm => {
			tm.color = tm.lg === "A" ? 'red' : 'blue'
			tm.tmStr = <div><Image size='mini' src={tm.imgURL}/><div style={{fontSize: '.8em'}}>{tm.yr}</div></div>
			tm.tmStr2 = <div style={{color: tm.lg === "A" ? 'red' : 'blue'}}><div>{tm.team}</div><div style={{display: 'flex', flexDirection: 'row',fontSize: ".8em", fontWeight: 600}}><div style={{ marginRight: '1vw'}}>{tm.class}</div><div>{tm.franchiseName}</div></div></div>
			return tm
		})
		bPitchTeams = bPitchTeams.map( ptm => {
			ptm.color = ptm.lg === "A" ? 'red' : 'blue'
			ptm.ptmStr = <div><Image size='mini' src={ptm.imgURL}/><div style={{fontSize: '.8em'}}>{ptm.yr}</div></div>
			ptm.ptmStr2 = <div style={{color: ptm.lg === "A" ? 'red' : 'blue'}}><div>{ptm.team}</div><div style={{display: 'flex', flexDirection: 'row',fontSize: ".8em", fontWeight: 600}}><div style={{ marginRight: '1vw'}}>{ptm.class}</div><div>{ptm.franchiseName}</div></div></div>
			return ptm
		})
const onRowClick = (state, rowInfo, column, instance) => {
	
    return {
        onClick: e => {
        	props.getPlayerList(rowInfo.original.franchise,rowInfo.original.class,rowInfo.original.yr)
            console.log('It was in this row:', rowInfo.original)
          
        }
    }
}
console.log(bBatTeams)

		var batColumns = [
		{
	    Header: '',
	    accessor: 'tmStr',
	    width: 56,
		}, {
			Header: 'Team',
			accessor: 'tmStr2', 
			minWidth: 124
		},  /*{
			Header: 'Players',
			accessor: 'players',
	    	width: 58,
		},*/{
			Header: 'TB',
			accessor: 'TB',
	    	width: 46,
		}, {
			Header: 'AB',
			accessor: 'AB',
	    	width: 46,
		}, {
			Header: 'AVG',
			accessor: 'AVG',
	    	width: 60,
		}, {
			Header: 'H',
			accessor: 'H',
	    	width: 46,
		}, {
			Header: 'HR',
			accessor: 'HR',
	    	width: 46,
		}, {
			Header: 'BB',
			accessor: 'BB',
	    	width: 46,
		}];
		var pitchColumns = [
		{
	    Header: '',
	    accessor: 'ptmStr',
	    width: 56,
		}, {
			Header: 'Team',
			accessor: 'ptmStr2', 
			minWidth: 124
		}, /*{
			Header: 'Players',
			accessor: 'players',
	    width: 58,
		},*/{
			Header: 'IP-ER',
			accessor: 'IPER',
	    width: 50,
		},  {
			Header: 'W',
			accessor: 'W',
	    width: 50,
		}, {
			Header: 'L',
			accessor: 'L',
	    width: 50,
		}, {
			Header: 'SO',
			accessor: 'SO',
	    width: 50,
		}, {
			Header: 'HR',
			accessor: 'HR',
	    width: 50,
		}, {
			Header: 'BB',
			accessor: 'BB',
	    width: 50,
		}]
	    return (
	    	<Grid stackable columns={2}>
	    	 <Grid.Column>
	    	<div style={{marginRight: '.5vw'}}>
	    	<div style={{display: 'flex', flexDirection: 'row', fontWeight: 600}}>
	    		<div style={{fontSize: '1.1em', marginLeft: '2vw'}}>Top Batting</div>
	    		<div style={{fontSize: '1.1em', fontWeight: 600, marginLeft: '1vw'}}>{props.selectedClass.displayName}</div>
	    		<div style={{fontSize: '1.1em', fontWeight: 600, marginLeft: '1vw'}}>{props.selectedYear.text}</div>
	    	</div>
	    		<ReactTable 
	    		isSelected
	    		showPagination={false}
	    		style={{fontSize: '1em', height: '40vh'}}
	    			data={props.bestBatTeams}
	    			columns={batColumns}
	    			showPageSizeOptions={false}
	    			
	    			getTrProps={onRowClick}
	    		/> 
	    		</div>
	    		 </Grid.Column>
	    		  <Grid.Column>
	    		<div style={{marginLeft: '.5vw'}}>
	    	<div style={{display: 'flex', flexDirection: 'row', fontWeight: 600}}>
	    		<div style={{fontSize: '1.1em', marginLeft: '2vw'}}>Top Pitching</div>
	    		<div style={{fontSize: '1.1em', fontWeight: 600, marginLeft: '1vw'}}>{props.selectedClass.displayName}</div>
	    		<div style={{fontSize: '1.1em', fontWeight: 600, marginLeft: '1vw'}}>{props.selectedYear.text}</div>
	    	</div>
	    		<ReactTable 
	    		showPagination={false}
	    		style={{fontSize: '1em', height: '40vh'}}
	    			data={props.bestPitchTeams}
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