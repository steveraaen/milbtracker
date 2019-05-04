import React, { useState, useEffect } from 'react';
import {Image} from 'semantic-ui-react'

import ReactTable from 'react-table'
import "react-table/react-table.css";
export default function LiveResults(props) {
	if(props.bestBatTeams && props.bestPitchTeams && props.selectedClass && props.selectedDivision && props.selectedYear) {
		var { bestBatTeams: bBatTeams, bestPitchTeams: bPitchTeams } = props
		bBatTeams = bBatTeams.map( tm => {
			tm.tmStr = <span><Image size='mini' src={tm.logo}/><div>{tm.yr}</div></span>
			tm.tmStr2 = <span><div>{tm.team}</div><div>{tm.class}</div></span>
			return tm
		})
		bPitchTeams = bPitchTeams.map( ptm => {
			ptm.ptmStr = <span><Image size='mini' src={ptm.logo}/><div>{ptm.yr}</div></span>
			ptm.ptmStr2 = <span><div>{ptm.team}</div><div>{ptm.class}</div></span>
			return ptm
		})

console.log(bBatTeams)

		var batColumns = [
		{
	    Header: '',
	    accessor: 'tmStr',
	    width: 50,
		}, {
			Header: 'Team',
			accessor: 'tmStr2', 
			minWidth: 150
		}, {
			Header: 'Total Bases',
			accessor: 'TB'
		}, {
			Header: 'Players',
			accessor: 'players'
		}, {
			Header: 'At Bats',
			accessor: 'AB'
		}, {
			Header: 'AVG',
			accessor: 'AVG'
		}, {
			Header: 'Hits',
			accessor: 'H'
		}, {
			Header: 'HRs',
			accessor: 'HR'
		}, {
			Header: 'Walks',
			accessor: 'BB'
		}];
		var pitchColumns = [
		{
	    Header: '',
	    accessor: 'ptmStr',
	    width: 50,
		}, {
			Header: 'Team',
			accessor: 'ptmStr2', 
			minWidth: 150
		}, {
			Header: 'IP-ER',
			accessor: 'IPER'
		}, {
			Header: 'Players',
			accessor: 'players'
		}, {
			Header: 'W',
			accessor: 'W'
		}, {
			Header: 'L',
			accessor: 'L'
		}, {
			Header: 'SO',
			accessor: 'SO'
		}, {
			Header: 'HR',
			accessor: 'HR'
		}, {
			Header: 'Walks',
			accessor: 'BB'
		}]
	    return (
	    	<div>
	    		<ReactTable 
	    			data={props.bestBatTeams}
	    			columns={batColumns}
	    			showPageSizeOptions={false}
	    			defaultPageSize={5}
	    			SubComponent={row => {
                    return (
                      <div style={{ padding: "20px" }}>
                        Another Sub Component!
                      </div>
                    );
                }}
	    		/>
	    		<ReactTable 
	    			data={props.bestPitchTeams}
	    			columns={pitchColumns}
	    			showPageSizeOptions={false}
	    			defaultPageSize={5}
	    			SubComponent={row => {
                    return (
                      <div style={{ padding: "20px" }}>
                        Another Sub Component!
                      </div>
                    );
                }}
	    		/>
	    	</div>
          )
		} else {
			return <div style={{marginLeft: '3vw'}}>no</div>
		}

}