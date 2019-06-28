'use strict'

import React from 'react';
import { Button, Container, Dropdown, Form, Icon, Image, Modal, Tab } from 'semantic-ui-react'
import ReactTable from 'react-table'

import tmsLogos from '../lgos/namesAndLogos.js'
import '../App.css'

const justYears=[2018, 2017, 2016, 2015, 2014, 2013]
export default function CurrentTeam(props) {


function handleTeamClick(tm) {
/*	mycl(tm)
	localStorage.setItem(lcl, tm)*/
	props.getTeamYears(tm)
}
  			for(let i =0; i < props.minorMaster.length; i++) {
				for(let j =0; j < tmsLogos.length; j++) {
					if(props.minorMaster[i].tmName === tmsLogos[j].tmName) {
						props.minorMaster[i].curLogo = tmsLogos[j].logoPNG				
				} 
			}	
		}
		props.minorMaster.map((lgo, idx) => {
			lgo.logoCell =  <Image key={`${lgo.tmName}${idx}`} size='tiny' rounded src={lgo.curLogo} />
			lgo.logoMaj =  <Image key={`${lgo.tmName}${idx}`} size='tiny' rounded src={lgo.franchLogo} />	
			return lgo
		});
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
                handleTeamClick(rowInfo.original.tmName) 
             

          }
      }
  }
var yrArr = []
 
		
        var tmCols = [{
            headerClassName: `App ${props.theme}`,
            headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol },
            Header: '',
            className: `App ${props.theme}`,
            accessor: 'logoCell',
            width: 60
    					
        },{
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol },
            Header: 'Team',
            className: `App ${props.theme}`,
            accessor: 'tmName',
            width: 140
    			
        },{
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: 'Franchise',
            className: `App ${props.theme}`,
            accessor: 'logoMaj',
            width: 60
    			
        }/*,{
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: '',
            className: `App ${props.theme}`,
            accessor: 'yrArr'
    			
        }*/]
         	if(props.selectedTmYrs) {		
 			props.selectedTmYrs.map((yr, ix) => {
	 				tmCols.push({
	 				id: yr.yr,
	 				headerClassName: `App ${props.theme}`,
	            headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol },
	            Header: '',
	            className: `App ${props.theme}`,
	            accessor: () => yr.yr,
	            width: 40
	 				})
	 			})    
 			
}
 console.log([...tmCols])
        		const panes = [
  { menuItem: 'Triple A', render: () => {return (

 		<ReactTable
 		
         resizable={false} 				 
 			className={`-highlight App ${props.theme}`}
    		showPagination={false}
    		style={{fontSize: '.9em',fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
    		defaultPageSize={40}
 			data={aaa}	    		
 			columns={[...tmCols]}
 			showPageSizeOptions={false}	
 			  filtered={[{ // the current filters model
			    class: 'AAA'
			  }]}    				    			
			getTrProps={onRowClick}	
 		/>
  	)} },
  { menuItem: 'Double A', render: () => <Tab.Pane>
  	 		<ReactTable
 		
         resizable={false} 				 
 			className={`-highlight App ${props.theme}`}
    		showPagination={false}
    		style={{fontSize: '.9em',fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
    		defaultPageSize={40}
 			data={aa}	    		
 			columns={tmCols}
 			showPageSizeOptions={false}	
 			  filtered={[{ // the current filters model
			    class: 'AA'
			  }]}    				    			
			getTrProps={onRowClick}	
 		/>
  </Tab.Pane> },
  { menuItem: 'Advanced A', render: () => <Tab.Pane>
  	 		<ReactTable
 		
         resizable={false} 				 
 			className={`-highlight App ${props.theme}`}
    		showPagination={false}
    		style={{fontSize: '.9em',fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
    		defaultPageSize={40}
 			data={aplus}	    		
 			columns={tmCols}
 			showPageSizeOptions={false}	
 			  filtered={[{ // the current filters model
			    class: 'A+'
			  }]}    				    			
			getTrProps={onRowClick}	
 		/>
  </Tab.Pane> },
  { menuItem: 'Class A', render: () => <Tab.Pane>
  	 		<ReactTable
 		
         resizable={false} 				 
 			className={`-highlight App ${props.theme}`}
    		showPagination={false}
    		style={{fontSize: '.9em',fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
    		defaultPageSize={40}
 			data={a}	    		
 			columns={tmCols}
 			showPageSizeOptions={false}	
 			  filtered={[{ // the current filters model
			    class: 'A'
			  }]}    				    			
			getTrProps={onRowClick}	
 		/>
  </Tab.Pane> },
  { menuItem: 'Short Class A', render: () => <Tab.Pane>
  	 		<ReactTable
 		
         resizable={false} 				 
 			className={`-highlight App ${props.theme}`}
    		showPagination={false}
    		style={{fontSize: '.9em',fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
    		defaultPageSize={40}
 			data={aminus}	    		
 			columns={tmCols}
 			showPageSizeOptions={false}	
 			  filtered={[{ // the current filters model
			    class: 'A-'
			  }]}    				    			
			getTrProps={onRowClick}	
 		/>
  </Tab.Pane> },
  { menuItem: 'Rookie', render: () => <Tab.Pane>
  	 		<ReactTable
 		
         resizable={false} 				 
 			className={`-highlight App ${props.theme}`}
    		showPagination={false}
    		style={{fontSize: '.9em',fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
    		defaultPageSize={40}
 			data={rk}	    		
 			columns={tmCols}
 			showPageSizeOptions={false}	
 			  filtered={[{ // the current filters model
			    class: 'Rk'
			  }]}    				    			
			getTrProps={onRowClick}	
 		/>
  </Tab.Pane> },
]
const Tabs = () => <Tab panes={panes} />
	return(
		<Container>			

			<Tabs />
		</Container>
		)
}























