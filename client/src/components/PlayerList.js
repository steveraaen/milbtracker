import React, { useState, useEffect } from 'react';
import {Image} from 'semantic-ui-react'

import ReactTable from 'react-table'
import "react-table/react-table.css";

import mlbLogos from '../data/franchiseLogos.json'
export default function PlayerList(props) {
		var batterColumns = [
				{
	    Header: 'Current Team',
	    accessor: 'tmStr',
	    width: 110,
		},
		{
	    Header: 'Player',
	    accessor: 'playerName',
	    width: 100,
		}, {
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
		}, {
			Header: 'SB',
			accessor: 'SB',
	    	width: 40,
		}];
		var pitcherColumns = [
		{
	    Header: 'Current Team',
	    accessor: 'tmStr',
	    width: 110,
		},
		{
	    Header: 'Player',
	    accessor: 'playerName',
	    width: 110,
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
		if(props.playerList && props.pitcherList && mlbLogos) {
			for(let i =0; i < props.playerList.length; i++) {
				for(let j =0; j < mlbLogos.length; j++) {
					if(props.playerList[i].curTeam === mlbLogos[j].majteam) {
						props.playerList[i].curLogo = mlbLogos[j].picurl
					}
			}
		}
			for(let i =0; i < props.pitcherList.length; i++) {
				for(let j =0; j < mlbLogos.length; j++) {
					if(props.pitcherList[i].curTeam === mlbLogos[j].majteam) {
						props.pitcherList[i].curLogo = mlbLogos[j].picurl
					}
			}
		}
		props.playerList.map( tm => {
			tm.tmStr = <div><Image size='mini' src={tm.curLogo}/><div style={{fontSize: '.8em'}}>{tm.franchiseName}</div></div>
			return tm
		})
		props.pitcherList.map( ptm => {
			ptm.tmStr = <div><Image size='mini' src={ptm.curLogo}/><div style={{fontSize: '.8em'}}>{ptm.franchiseName}</div></div>
			return ptm
		})
	    return (
	    	<div>
	    		<ReactTable 
	    		style={{fontSize: '.8em'}}
	    			data={props.playerList}
	    			columns={batterColumns}
	    			showPageSizeOptions={false}
	    			defaultPageSize={5}
	    		/>
	    		<ReactTable 
	    		style={{fontSize: '.8em'}}
	    			data={props.pitcherList}
	    			columns={pitcherColumns}
	    			showPageSizeOptions={false}
	    			defaultPageSize={5}
	    		/>
	    	</div>
          )
	} else {
			return <div style={{marginLeft: '3vw'}}>no</div>
			}
		}
