import React from 'react';
import {Icon, Image} from 'semantic-ui-react'

import ReactTable from 'react-table'
import "react-table/react-table.css";
import {Grid} from 'semantic-ui-react'
import mlbLogos from '../data/franchiseLogos.json'
export default function PlayerList(props) {
		var batterColumns = [
				{
	    Header: 'Batting',
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
		}/*, {
			Header: 'BB',
			accessor: 'BB',
	    	width: 54,
		}, {
			Header: 'SB',
			accessor: 'SB',
	    	width: 54,
		}*/];
		var pitcherColumns = [
		{
	    Header: 'Pitching',
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
		}/*, {
			Header: 'HR',
			accessor: 'HR',
	    width: 54,
		}, {
			Header: 'BB',
			accessor: 'BB',
	    width: 54,
		}*/]
		if(props.playerList && mlbLogos) {

			var plyrSum =	<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '8vh', width: '10vw'}}>
									<div style={{marginLeft: '2vw', marginRight: '1vw', fontSize: '1.3em', fontWeight: 600}}>{props.playerList[0].yr}</div>
									<div style={{marginLeft: '1vw', marginRight: '1vw', fontSize: '1.3em', fontWeight: 600}}>{props.playerList[0].class}</div>
									<Image size='tiny' src={props.playerList[0].imgURL} />
									<div style={{marginLeft: '1vw', marginRight: '1vw', fontSize: '1.3em', fontWeight: 600}}>{props.playerList[0].tmName}</div>
								</div>
								
								

			for(let i =0; i < props.playerList.length; i++) {
				props.playerList[i].playerURL = `https://www.baseball-reference.com/players/${props.playerList[i].playerID[0]}/${props.playerList[i].playerID}.shtml`
				for(let j =0; j < mlbLogos.length; j++) {
					if(props.playerList[i].curTeam === mlbLogos[j].majteam) {
						props.playerList[i].curLogo = mlbLogos[j].picurl
				}
			}
		}
		props.playerList.map( tm => {
			tm.tmStr = <div style={{fontSize: '1.1em'}}><Image size='mini' src={tm.curLogo}/>
			<a style={{color:   tm.lg === "AL" ? 'red' : 'blue'}}target="_blank" rel="noopener noreferrer" href={tm.playerURL}>{tm.playerName}</a>
			</div>
			return tm
		})
}
// ---------------------------------------------------------------------
	if(props.pitcherList && mlbLogos) {

			var ptchrSum =	<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '8vh', width: '10vw'}}>
									<div style={{marginLeft: '10vw', marginRight: '1vw', fontSize: '1.3em', fontWeight: 600}}>{props.playerList[0].yr}</div>
									<div style={{marginLeft: '1vw', marginRight: '1vw', fontSize: '1.3em', fontWeight: 600}}>{props.playerList[0].class}</div>
									<Image size='tiny' src={props.playerList[0].imgURL} />
									<div style={{marginLeft: '1vw', marginRight: '1vw', fontSize: '1.3em', fontWeight: 600}}>{props.playerList[0].tmName}</div>
								</div>

			for(let i =0; i < props.pitcherList.length; i++) {
				props.pitcherList[i].playerURL = `https://www.baseball-reference.com/players/${props.pitcherList[i].playerID[0]}/${props.pitcherList[i].playerID}.shtml`
				for(let j =0; j < mlbLogos.length; j++) {
					if(props.pitcherList[i].curTeam === mlbLogos[j].majteam) {
						props.pitcherList[i].curLogo = mlbLogos[j].picurl
				}
			}
		}
			props.pitcherList.map( ptm => {
			ptm.tmStr = <div><Image size='mini' src={ptm.curLogo}/>
			<a style={{color: ptm.lg === "AL" ? 'red' : 'blue'}} target="_blank" rel="noopener noreferrer" href={ptm.playerURL}>{ptm.playerName}</a>
			</div>
			return ptm
		})
	}		
	if(props.pitcherList || props.playerList) {
	    return (
	 <div>
	    	<Grid columns={1} 
	    	stretched
	    	style={{paddingTop: '7vh' ,backgroundColor: 'rgba(255,255,255,50)'}}
	    	> 
	    	 <Grid.Column>
{plyrSum}

	    	<div>
	    		<ReactTable 	    	
	    		showPagination={false}
	    		style={{fontSize: '.8em', fontWeight: 600, height: '36vh'}}
    			data={props.playerList}
    			columns={batterColumns}
    			showPageSizeOptions={false} 
	    			
	    		/>
	    		</div>




	    		<div>
	    		<div style={{display: 'flex', flexDirection: 'row', fontWeight: 600}}>

	    		</div>
	    		<ReactTable
	    		showPagination={false}
	    		style={{fontSize: '.8em', fontWeight: 600, height: '36vh'}}
    			data={props.pitcherList}
    			columns={pitcherColumns}
    			showPageSizeOptions={false}
	    			
	    		/>
	    	</div>
	    	 </Grid.Column>
	    	 </Grid>
	    	 </div>
          )
	 } else { return(<div> no results</div>)
		}
	 }
