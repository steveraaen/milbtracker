import React, { useState, useEffect } from 'react';
import {Image} from 'semantic-ui-react'

import ReactTable from 'react-table'
import "react-table/react-table.css";
import {Grid} from 'semantic-ui-react'
import mlbLogos from '../data/franchiseLogos.json'
export default function PlayerList(props) {
		var batterColumns = [
				{
	    Header: 'Player',
	    accessor: 'tmStr',
	    width: 144,
		}, {
			Header: 'TB',
			accessor: 'TB',
	    	width: 54,
		}, {
			Header: 'AB',
			accessor: 'AB',
	    	width: 54,
		}, {
			Header: 'AVG',
			accessor: 'AVG',
	    	width: 54,
		}, {
			Header: 'H',
			accessor: 'H',
	    	width: 54,
		}, {
			Header: 'HR',
			accessor: 'HR',
	    	width: 54,
		}, {
			Header: 'BB',
			accessor: 'BB',
	    	width: 54,
		}, {
			Header: 'SB',
			accessor: 'SB',
	    	width: 54,
		}];
		var pitcherColumns = [
		{
	    Header: 'Player',
	    accessor: 'tmStr',
	    width: 144,
		},{
			Header: 'IP-ER',
			accessor: 'IPER',
	    width: 54,
		},  {
			Header: 'W',
			accessor: 'W',
	    width: 54,
		}, {
			Header: 'L',
			accessor: 'L',
	    width: 54,
		}, {
			Header: 'SV',
			accessor: 'SV',
	    width: 54,
		}, {
			Header: 'SO',
			accessor: 'SO',
	    width: 54,
		}, {
			Header: 'HR',
			accessor: 'HR',
	    width: 54,
		}, {
			Header: 'BB',
			accessor: 'BB',
	    width: 54,
		}]
		if(props.playerList && props.pitcherList && mlbLogos) {
			for(let i =0; i < props.playerList.length; i++) {

				props.playerList[i].playerURL = `https://www.baseball-reference.com/players/${props.playerList[i].playerID[0]}/${props.playerList[i].playerID}.shtml`


				for(let j =0; j < mlbLogos.length; j++) {
					if(props.playerList[i].curTeam === mlbLogos[j].majteam) {
						props.playerList[i].curLogo = mlbLogos[j].picurl
					}
			}
		}
			for(let i =0; i < props.pitcherList.length; i++) {
				props.pitcherList[i].playerURL = `https://www.baseball-reference.com/players/${props.pitcherList[i].playerID[0]}/${props.pitcherList[i].playerID}.shtml`
				for(let j =0; j < mlbLogos.length; j++) {
					if(props.pitcherList[i].curTeam === mlbLogos[j].majteam) {
						props.pitcherList[i].curLogo = mlbLogos[j].picurl
					}
			}
		}
		props.playerList.map( tm => {
			tm.tmStr = <div style={{fontSize: '1.1em'}}><Image size='mini' src={tm.curLogo}/>
			<a style={{color:   tm.lg === "AL" ? 'red' : 'blue'}} href={tm.playerURL}>{tm.playerName}</a>
			</div>
			return tm
		})
		props.pitcherList.map( ptm => {
			ptm.tmStr = <div><Image size='mini' src={ptm.curLogo}/>
			<a style={{color: ptm.lg === "AL" ? 'red' : 'blue'}}  href={ptm.playerURL}>{ptm.playerName}</a>
			</div>
			return ptm
		})
	    return (
	    	<Grid stackable columns={2} stretched
	    	>
	    	 <Grid.Column>
	    	<div style={{marginRight: '1vw'}}>
	    		<div style={{display: 'flex', flexDirection: 'row', fontWeight: 600}}>
	    			<div style={{fontSize: '1.1em', fontWeight: 600, marginLeft: '1vw'}}> {props.pitcherList[0].yr}</div>
	    			<div style={{fontSize: '1.1em', fontWeight: 600, marginLeft: '1vw'}}>{props.pitcherList[0].team}</div>
	    		</div>
	    		<ReactTable 

	    		showPagination={false}
	    		style={{fontSize: '1em', height: '40vh'}}
	    			data={props.playerList}
	    			columns={batterColumns}
	    			showPageSizeOptions={false} 
	    			
	    		/>
	    		</div>
	    		 </Grid.Column>
	    		 <Grid.Column>
	    		<div style={{marginLeft: '1vw'}}>
	    		<div style={{display: 'flex', flexDirection: 'row', fontWeight: 600}}>
	    			<div style={{marginRight: '1vw'}}> {props.pitcherList[0].yr}</div>
	    			<div>{props.pitcherList[0].team}</div>
	    		</div>
	    		<ReactTable 
	    		showPagination={false}
	    		style={{fontSize: '1em', height: '40vh'}}
	    			data={props.pitcherList}
	    			columns={pitcherColumns}
	    			showPageSizeOptions={false}
	    			
	    		/>
	    	</div>
	    	 </Grid.Column>
	    	 </Grid>
          )
	} else {
			return <div style={{marginLeft: '3vw'}}>no</div>
			}
		}