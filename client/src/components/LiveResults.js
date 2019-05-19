import React, { useState, useEffect } from 'react';
import {Image} from 'semantic-ui-react'

import ReactTable from 'react-table'
import "react-table/react-table.css";
export default function LiveResults(props) {
	if(props.bestBatTeams && props.bestPitchTeams && props.selectedClass && props.selectedDivision && props.selectedYear) {
		var { bestBatTeams: bBatTeams, bestPitchTeams: bPitchTeams } = props
		bBatTeams = bBatTeams.map( tm => {
			tm.tmStr = <div><Image size='mini' src={tm.imgURL}/><div style={{fontSize: '.8em'}}>{tm.yr}</div></div>
			tm.tmStr2 = <div><div>{tm.team}</div><div style={{display: 'flex', flexDirection: 'row',fontSize: ".8em", fontWeight: 600}}><div style={{ marginRight: '1vw'}}>{tm.class}</div><div>{tm.franchiseName}</div></div></div>
			return tm
		})
		bPitchTeams = bPitchTeams.map( ptm => {
			ptm.ptmStr = <div><Image size='mini' src={ptm.imgURL}/><div style={{fontSize: '.8em'}}>{ptm.yr}</div></div>
			ptm.ptmStr2 = <div><div>{ptm.team}</div><div style={{display: 'flex', flexDirection: 'row',fontSize: ".8em", fontWeight: 600}}><div style={{ marginRight: '1vw'}}>{ptm.class}</div><div>{ptm.franchiseName}</div></div></div>
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
	    width: 40,
		}, {
			Header: 'Team',
			accessor: 'tmStr2', 
			minWidth: 120
		},  {
			Header: 'Players',
			accessor: 'players',
	    	width: 50,
		},{
			Header: 'TB',
			accessor: 'TB',
	    	width: 40,
		}, {
			Header: 'AB',
			accessor: 'AB',
	    	width: 40,
		}, {
			Header: 'AVG',
			accessor: 'AVG',
	    	width: 50,
		}, {
			Header: 'H',
			accessor: 'H',
	    	width: 40,
		}, {
			Header: 'HR',
			accessor: 'HR',
	    	width: 40,
		}, {
			Header: 'BB',
			accessor: 'BB',
	    	width: 40,
		}];
		var pitchColumns = [
		{
	    Header: '',
	    accessor: 'ptmStr',
	    width: 40,
		}, {
			Header: 'Team',
			accessor: 'ptmStr2', 
			minWidth: 120
		}, {
			Header: 'Players',
			accessor: 'players',
	    width: 50,
		},{
			Header: 'IP-ER',
			accessor: 'IPER',
	    width: 40,
		},  {
			Header: 'W',
			accessor: 'W',
	    width: 40,
		}, {
			Header: 'L',
			accessor: 'L',
	    width: 40,
		}, {
			Header: 'SO',
			accessor: 'SO',
	    width: 40,
		}, {
			Header: 'HR',
			accessor: 'HR',
	    width: 40,
		}, {
			Header: 'BB',
			accessor: 'BB',
	    width: 40,
		}]
	    return (
	    	<div>
	    	<div>Top Batting MiLB Teams
	    		<ReactTable 
	    		style={{fontSize: '.8em'}}
	    			data={props.bestBatTeams}
	    			columns={batColumns}
	    			showPageSizeOptions={false}
	    			defaultPageSize={5}
	    			getTrProps={onRowClick}
	    		/>
	    		</div>
	    		<div>Top Pitching MiLB Teams
	    		<ReactTable 
	    		style={{fontSize: '.8em'}}
	    			data={props.bestPitchTeams}
	    			columns={pitchColumns}
	    			showPageSizeOptions={false}
	    			defaultPageSize={5}	    			
	    			getTrProps={onRowClick}
	    		/>
	    	</div>
	    	</div>
          )
		} else {
			return <div style={{marginLeft: '3vw'}}>no</div>
		}

}