import React, {useEffect} from 'react';
import {Grid, Image} from 'semantic-ui-react'

import ReactTable from 'react-table'
import "react-table/react-table.css";

export default function SeasonResults(props) {

	if( props.timeframe && props.bestBatTeams && props.bestPitchTeams && props.yestBatTeams && props.yestPitchTeams && props.selectedClass  && props.selectedYear) {

var currentBatData = props.timeframe === 'season' ? props.bestBatTeams : props.yestBatTeams
var currentPitchData = props.timeframe === 'season' ? props.bestPitchTeams : props.yestPitchTeams

		currentBatData.map( tm => {
			tm.color = tm.majLg === "A" ? 'crimson' : 'indigo'
			tm.tmStr = <div>
								<Image rounded size='mini' src={tm.franchLogo}/>
								<div style={{fontSize: '.8em'}}>{tm.franchiseName}</div>
							</div>
			tm.tmStr2 = <div style={{color: tm.majLg === "A" ? 'crimson' : 'indigo'}}>
								<Image rounded size='mini' src={tm.imgURL}/>
								<div style={{fontSize: '.8em'}}>{tm.tmName}</div>
								<div style={{display: 'flex', flexDirection: 'row',fontSize: ".8em", fontWeight: 600}}>
									<div style={{ marginRight: '1vw'}}>{tm.yr}</div>
									<div style={{ marginRight: '1vw'}}>{tm.class}</div>
									
								</div>
							</div>
			tm.tmStr3 = <div>{tm.AVG.toFixed(3)}</div>
			return tm
		})
		currentPitchData.map( ptm => {
			ptm.color = ptm.majLg === "A" ? 'crimson' : 'indigo'
			ptm.ptmStr = <div>
								<Image rounded size='mini' src={ptm.franchLogo}/>
								<div style={{fontSize: '.8em'}}>{ptm.franchiseName}</div>
							</div>
			ptm.ptmStr2 = <div style={{color: ptm.majLg === "A" ? 'crimson' : 'indigo'}}>
								<Image rounded size='mini' src={ptm.imgURL}/>
								<div style={{fontSize: '.8em'}}>{ptm.tmName}</div>
								<div style={{display: 'flex', flexDirection: 'row',fontSize: ".8em", fontWeight: 600}}>
									<div style={{ marginRight: '1vw'}}>{ptm.yr}</div>
									<div style={{ marginRight: '1vw'}}>{ptm.class}</div>
									
								</div>
							</div>
			return ptm
		})

const onRowClick = (state, rowInfo, column, instance) => {
console.log(rowInfo)
    return {
        onClick: e => {
        	props.getPlayerList(rowInfo.original.franchise,rowInfo.original.class,rowInfo.original.yr)
            console.log(rowInfo.original.franchise,rowInfo.original.class,rowInfo.original.yr)          
        }
    }
}
		var batColumns = [
		{
	    Header: 'Franchise',
	    accessor: 'tmStr',
	    width: 96,

		}, {
			Header: 'Team',
			accessor: 'tmStr2', 
			width: 124
		},  /*{
			Header: 'Players',
			accessor: 'players',
	    	width: 58,
		},*/{
			Header: 'AB',
			accessor: 'AB',
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
	    Header: 'Franchise',
	    accessor: 'ptmStr',
	    width: 96,
		}, {
			Header: 'Team',
			accessor: 'ptmStr2', 
			width: 124
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
	    		<div style={{fontSize: '1.1em', fontWeight: 600, marginLeft: '1vw'}}>{props.selectedClass.displayName}</div>
	    		<div style={{fontSize: '1.1em', fontWeight: 600, marginLeft: '1vw'}}>{props.selectedYear.text}</div>
	    	</div>
	    		<ReactTable 
	    		showPagination={false}
	    		style={{fontSize: '.9em',   fontWeight: 600, height: '76vh', backgroundColor: 'whitesmoke'}}
	    			data={currentPitchData}
	    		
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