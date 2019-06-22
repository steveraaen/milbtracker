import React, { useState, useEffect } from 'react';
import { Container, Form, Grid, Icon, Image, Label, List, Popup, Segment } from 'semantic-ui-react'
import ReactTooltip from 'react-tooltip'
import ReactTable from 'react-table'
import tmsLogos from '../lgos/namesAndLogos.js'

export default function CurrentTeam(props) {
var optAAA =[], optAA =[], optAP =[], optA =[], optAM =[], optRk =[]

function handleTeamSelect(lcl, mycl, tm) {
	mycl(tm)
	localStorage.setItem(lcl, tm)
	props.getTeamYears(tm)
}

if(props.minorMaster) {
	for(let i = 0; i < props.minorMaster.length; i++) {
	switch(props.minorMaster[i].class) {
	case 'AAA':
	optAAA.push({
		key: i, 
		text: props.minorMaster[i].tmName,
		value:props.minorMaster[i].tmName,
		logo: props.minorMaster[i].logoPNG,
		onClick: () => handleTeamSelect('myAAA', props.setMyAAA, props.minorMaster[i].tmName)})
	break
	case 'AA':
	optAA.push({
		key: i, 
		text: props.minorMaster[i].tmName,
		 value:props.minorMaster[i].tmName,
		 logo: props.minorMaster[i].logoPNG,
		 onClick: () => handleTeamSelect('myAA', props.setMyAA, props.minorMaster[i].tmName)})
	break
	case 'A+':
	optAP.push({
		key: i, 
		text: props.minorMaster[i].tmName,
		 value:props.minorMaster[i].tmName,
		 logo: props.minorMaster[i].logoPNG,
		 onClick: () => handleTeamSelect('myAPlus', props.setMyAPlus, props.minorMaster[i].tmName)})
	break
	case 'A':
	optA.push({
		key: i, 
		text: props.minorMaster[i].tmName,
		 value:props.minorMaster[i].tmName,
		 logo: props.minorMaster[i].logoPNG,
		 onClick: () => handleTeamSelect('myA', props.setMyA, props.minorMaster[i].tmName)})
	break
	case 'A-':
	optAM.push({
		key: i, 
		text: props.minorMaster[i].tmName,
		 value:props.minorMaster[i].tmName,
		 logo: props.minorMaster[i].logoPNG,
		 onClick: () => handleTeamSelect('myAMinus', props.setMyAMinus, props.minorMaster[i].tmName)})
	break
	case 'Rk':
	optRk.push({
		key: i, 
		text: props.minorMaster[i].tmName,
		 value:props.minorMaster[i].tmName,
		 logo: props.minorMaster[i].logoPNG,
		 onClick: () => handleTeamSelect('myRk', props.setMyRk, props.minorMaster[i].tmName)})
	break
		}
	}
}
const classObj = [optAAA,optAA,optAP,optA,optAM,optRk]
var classCols = [{
            headerClassName: `App ${props.theme}`,
            headerStyle: {tabindex: 0, fontSize: '.9em', backgroundColor: props.borderCol , backgroundColor: props.borderCol },
            Header: 'Triple A',
            className: `App ${props.theme}`,
            accessor: 'optAAA',
        },{
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol , backgroundColor: props.borderCol },
            Header: 'Double A',
            className: `App ${props.theme}`,
            accessor: 'optAA',
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: 'Advanced A',
            className: `App ${props.theme}`,
            accessor: 'optAP',       
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: 'Class A',
            className: `App ${props.theme}`,
            accessor: 'optA',
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: 'Short A',
            className: `App ${props.theme}`,
            accessor: 'optAM',        
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: 'Rookie',
            className: `App ${props.theme}`,
            accessor: 'optRk',        
        }]
	return(
		<Container>			
	    		<ReactTable
                    resizable={false} 				 
	    			className={`-highlight App ${props.theme}`}
		    		showPagination={false}
		    		style={{fontSize: '.9em', backgroundColor: props.borderCol ,   fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
		    		defaultPageSize={30}
	    			data={classObj}	    		
	    			columns={classCols}
	    			showPageSizeOptions={false}	    				    			
	    		
	    		/>
		</Container>
		)
}