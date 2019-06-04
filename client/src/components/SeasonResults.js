import React, {useEffect} from 'react';
import {Grid, Image, Popup} from 'semantic-ui-react'

import ReactTable from 'react-table'
import "react-table/react-table.css";

export default function SeasonResults(props) {

	if( props.timeframe && props.bestBatTeams && props.bestPitchTeams && props.yestBatTeams && props.yestPitchTeams && props.selectedClass  && props.selectedYear) {

var currentBatData = props.timeframe === 'season' ? props.bestBatTeams : props.yestBatTeams
var currentPitchData = props.timeframe === 'season' ? props.bestPitchTeams : props.yestPitchTeams

		currentBatData.map( tm => {
			tm.color = tm.majLg === "A" ? 'crimson' : 'indigo'
			tm.tmStr = <Image rounded size='mini' src={tm.imgURL}/>
			tm.tmStr2 = <div style={{color: tm.majLg === "A" ? 'crimson' : 'indigo'}}>
								
								<div style={{fontSize: '.8em'}}>{tm.tmName}</div>
								<div style={{display: 'flex', flexDirection: 'row',fontSize: ".8em", fontWeight: 600}}>
									<div style={{ marginRight: '1vw'}}>{tm.yr}</div>
									<div style={{ marginRight: '1vw'}}>{tm.class}</div>
									<div style={{ marginRight: '1vw'}}>{tm.franchise}</div>
									
								</div>
							</div>

			return tm
		})
		currentPitchData.map( ptm => {
			ptm.color = ptm.majLg === "A" ? 'crimson' : 'indigo'

			ptm.ptmStr = <div style={{justifyContent: 'center'}}>
								<Image rounded size='mini' src={ptm.imgURL}/>
							</div>

			ptm.ptmStr2 = <div style={{color: ptm.majLg === "A" ? 'crimson' : 'indigo'}}>
						
								<div style={{fontSize: '.8em'}}>{ptm.tmName}</div>
								<div style={{display: 'flex', flexDirection: 'row',fontSize: ".8em", fontWeight: 600}}>
									<div style={{ marginRight: '1vw'}}>{ptm.yr}</div>
									<div style={{ marginRight: '1vw'}}>{ptm.class}</div>
									
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
			width: 40
		},{
			headerStyle: {fontSize: '.9em'},
			Header: 'Team',
			accessor: 'tmStr2',
			width: 120
		},  {
			headerStyle: {fontSize: '.9em'},
			Header: 'Players',
			accessor: 'players',
			width: 60
		},{
			headerStyle: {fontSize: '.9em'},
			Header: 'AB',
			accessor: 'AB',
			width: 56
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: 'AVG',
			accessor: 'AVG',
			width: 56
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: 'H',
			accessor: 'H',
			width: 56
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: 'HR',
			accessor: 'HR',
			width: 56
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: 'SB',
			accessor: 'SB',
			width: 56
		}];
		var pitchColumns = [
		{
			headerStyle: {fontSize: '.9em'},
			Header: '',
			accessor: 'ptmStr1',
			width: 40
		},{
			headerStyle: {fontSize: '.9em'},
			Header: 'Team',
			accessor: 'ptmStr2',
			width: 120
		},	{
			headerStyle: {fontSize: '.9em'},
			Header: 'Players',
			accessor: 'players',
			width: 60
		},	{
			headerStyle: {fontSize: '.9em'},
			Header: 'IP-ER',
			accessor: 'IPER',
			width: 56
		},  {
			headerStyle: {fontSize: '.9em'},
			Header: 'W',
			accessor: 'W',
			width: 56
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: 'L',
			accessor: 'L',
			width: 56
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: 'SV',
			accessor: 'SV',
			width: 56
		}, {
			headerStyle: {fontSize: '.9em'},
			Header: 'SO',
			accessor: 'SO',
			width: 56
		}]
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
	    		<div style={{fontSize: '1.1em', fontWeight: 600, marginLeft: '1vw'}}>{props.selectedClass.displayName}</div>
	    		<div style={{fontSize: '1.1em', fontWeight: 600, marginLeft: '1vw'}}>{props.selectedYear.text}</div>
	    	</div>
	    		<ReactTable 
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
          )
		} else {
			return null
		}

}