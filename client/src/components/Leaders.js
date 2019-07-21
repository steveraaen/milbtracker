import React from 'react';
import { Button,  Container, Header, Icon,Image } from 'semantic-ui-react'
import ReactTable from 'react-table'
import tmsLogos from '../lgos/namesAndLogos.js'

import '../App.css'

export default function Leaders (props) {
const columns = [{
    headerStyle: {color: 'lightGray'},
    Header: 'Rank',
    accessor: 'rank',
    className: 'rank' 
},{
    headerStyle: {color: 'lightGray'},
    Header: 'General Manager',
    accessor: 'userName' 
}, 
    {
        headerStyle: {color: 'lightGray'},
    Header: 'Players',
    accessor: 'players',
  }, {
      headerStyle: {color: 'lightGray'},
    Header: 'Total Bases',
    accessor: 'TB',
  }, {
      headerStyle: {color: 'lightGray'},
    Header: 'RBIs',
    accessor: 'RBI',
  }, {
      headerStyle: {color: 'lightGray'},
    Header: 'AtBats',
    accessor: 'AB',
  }, {
      headerStyle: {color: 'lightGray'},
    Header: 'Hits',
    accessor: 'H',
  }]
const  {leaders} = props
	if(leaders) {
        leaders.map((ldr, ix) => {
            ldr.rank = ix + 1
        })
 return 	<ReactTable
            resizable={false} 				 
    			className={`-highlight App ${props.theme}`}
	    		showPagination={false}
	    		style={{fontSize: '.9em',  fontWeight: 600, height: '76vh'}}
	    		defaultPageSize={30}
    			data={leaders}	    		
    			columns={columns}
    			showPageSizeOptions={false}	    				    			
    	
    		/>

	}


	return <div>hello</div>
}