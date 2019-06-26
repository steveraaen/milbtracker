import React, { useState, useEffect } from 'react';
import { Container, Form, Grid, Icon, Image, Label, List, Popup, Segment, Tab } from 'semantic-ui-react'
import ReactTooltip from 'react-tooltip'
import ReactTable from 'react-table'
import ErrorBoundry from './ErrorBoundry.js'

import tmsLogos from '../lgos/namesAndLogos.js'
import '../App.css'

export default function CurrentTeam(props) {
var optAAA =[], optAA =[], optAP =[], optA =[], optAM =[], optRk =[]

function handleTeamSelect(lcl, mycl, tm) {
	mycl(tm)
	localStorage.setItem(lcl, tm)
	props.getTeamYears(tm)
}

const aaa = props.minorMaster.filter(tm => tm.class === 'AAA')
const aa = props.minorMaster.filter(tm => tm.class === 'AA')
const aplus = props.minorMaster.filter(tm => tm.class === 'A+')
const a = props.minorMaster.filter(tm => tm.class === 'A')
const aminus = props.minorMaster.filter(tm => tm.class === 'A-')
const rk = props.minorMaster.filter(tm => tm.class === 'Rk')

   const onRowClick = (state, rowInfo, column, instance) => {    
    
      return {
          onClick: e => {          
                console.log(rowInfo)             
          }
      }
  }
 
  	
  			for(let i =0; i < aaa.length; i++) {
				for(let j =0; j < tmsLogos.length; j++) {
					if(aaa[i].tmName === tmsLogos[j].tmName) {
						aaa[i].curLogo = tmsLogos[j].logoPNG				
				}
			}
		

		aaa.map((lgo, idx) => {
			lgo.logoCell =  <Image key={idx} size='mini' rounded src={lgo.curLogo} />
			lgo.franchL = <Image key={idx} size='mini' rounded src={lgo.franchLogo} />
			console.log(lgo)
			return lgo
		});
}
		console.log(aaa)
        var tmCols = [{
            headerClassName: `App ${props.theme}`,
            headerStyle: {tabindex: 0, fontSize: '.9em', backgroundColor: props.borderCol , backgroundColor: props.borderCol },
            Header: '',
            className: `App ${props.theme}`,
            accessor: 'logoCell',
            aggregate: (values, rows) => values[0],
    			Aggregated: row => <span> { row.value } </span>	,
    			width: 80			
        },{
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol , backgroundColor: props.borderCol },
            Header: 'Team',
            className: `App ${props.theme}`,
            accessor: 'tmName',
            aggregate: (values, rows) => values[4],
    			Aggregated: row => <span> { row.value } </span>,
    			width: 240
        },{
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol , backgroundColor: props.borderCol },
            Header: '',
            className: `App ${props.theme}`,
            accessor: 'franchL',
            aggregate: (values, rows) => values[4],
    			Aggregated: row => <span> { row.value } </span>,
    			width: 240
        }]
 
        		const panes = [
  { menuItem: 'Triple A', render: () => {return (
<ErrorBoundry>
 		<ReactTable
 		
         resizable={false} 				 
 			className={`-highlight App ${props.theme}`}
    		showPagination={false}
    		style={{fontSize: '.9em', backgroundColor: props.borderCol ,   fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
    		defaultPageSize={40}
 			data={aaa}	    		
 			columns={tmCols}
 			showPageSizeOptions={false}	
 			  filtered={[{ // the current filters model
			    class: 'AAA'
			  }]}    				    			
			getTrProps={onRowClick}	
 		/>
 		</ErrorBoundry>
  	)} },
  { menuItem: 'Double A', render: () => <Tab.Pane>
  <ErrorBoundry>
  	 		<ReactTable
 		
         resizable={false} 				 
 			className={`-highlight App ${props.theme}`}
    		showPagination={false}
    		style={{fontSize: '.9em', backgroundColor: props.borderCol ,   fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
    		defaultPageSize={40}
 			data={aa}	    		
 			columns={tmCols}
 			showPageSizeOptions={false}	
 			  filtered={[{ // the current filters model
			    class: 'AA'
			  }]}    				    			
			getTrProps={onRowClick}	
 		/>
 		</ErrorBoundry>
  </Tab.Pane> },
  { menuItem: 'Advanced A', render: () => <Tab.Pane>
  <ErrorBoundry>
  	 		<ReactTable
 		
         resizable={false} 				 
 			className={`-highlight App ${props.theme}`}
    		showPagination={false}
    		style={{fontSize: '.9em', backgroundColor: props.borderCol ,   fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
    		defaultPageSize={40}
 			data={aplus}	    		
 			columns={tmCols}
 			showPageSizeOptions={false}	
 			  filtered={[{ // the current filters model
			    class: 'A+'
			  }]}    				    			
			getTrProps={onRowClick}	
 		/>
 		</ErrorBoundry>
  </Tab.Pane> },
  { menuItem: 'Class A', render: () => <Tab.Pane>
  <ErrorBoundry>
  	 		<ReactTable
 		
         resizable={false} 				 
 			className={`-highlight App ${props.theme}`}
    		showPagination={false}
    		style={{fontSize: '.9em', backgroundColor: props.borderCol ,   fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
    		defaultPageSize={40}
 			data={a}	    		
 			columns={tmCols}
 			showPageSizeOptions={false}	
 			  filtered={[{ // the current filters model
			    class: 'A'
			  }]}    				    			
			getTrProps={onRowClick}	
 		/>
 		</ErrorBoundry>
  </Tab.Pane> },
  { menuItem: 'Short Class A', render: () => <Tab.Pane>
  <ErrorBoundry>
  	 		<ReactTable
 		
         resizable={false} 				 
 			className={`-highlight App ${props.theme}`}
    		showPagination={false}
    		style={{fontSize: '.9em', backgroundColor: props.borderCol ,   fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
    		defaultPageSize={40}
 			data={aminus}	    		
 			columns={tmCols}
 			showPageSizeOptions={false}	
 			  filtered={[{ // the current filters model
			    class: 'A-'
			  }]}    				    			
			getTrProps={onRowClick}	
 		/>
 		</ErrorBoundry>
  </Tab.Pane> },
  { menuItem: 'Rookie', render: () => <Tab.Pane>
  <ErrorBoundry>
  	 		<ReactTable
 		
         resizable={false} 				 
 			className={`-highlight App ${props.theme}`}
    		showPagination={false}
    		style={{fontSize: '.9em', backgroundColor: props.borderCol ,   fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
    		defaultPageSize={40}
 			data={rk}	    		
 			columns={tmCols}
 			showPageSizeOptions={false}	
 			  filtered={[{ // the current filters model
			    class: 'Rk'
			  }]}    				    			
			getTrProps={onRowClick}	
 		/>
 		</ErrorBoundry>
  </Tab.Pane> },
]
const TabExampleBasic = () => <Tab panes={panes} />
	return(
		<Container>			

		<TabExampleBasic />

		</Container>
		)
}