import React, { useState, useEffect } from 'react';
import {Image} from 'semantic-ui-react'

import ReactTable from 'react-table'
import "react-table/react-table.css";
export default function LiveResults(props) {
	if(props.bestBatTeams && props.selectedClass && props.selectedDivision && props.selectedYear) {
		var { bestBatTeams: bBatTeams } = props
		bBatTeams = bBatTeams.map( tm => {
			tm.tmStr = <span><Image size='mini' src={tm.logo}/><div>{tm.yr}</div></span>
			tm.tmStr2 = <span><div>{tm.team}</div><div>{tm.class}</div></span>
			return tm
		})

console.log(bBatTeams)

		var columns = [
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
		}]
	    return (
	    	<div>
	    		<ReactTable 
	    			data={props.bestBatTeams}
	    			columns={columns}
	    			defaultPageSize='5'
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