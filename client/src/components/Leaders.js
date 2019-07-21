import React from 'react';
import { Button,  Container, Header, Icon,Image } from 'semantic-ui-react'
import ReactTable from 'react-table'
import tmsLogos from '../lgos/namesAndLogos.js'

import '../App.css'

export default function Leaders (props) {
const columns = [{
    Header: 'General Manager',
    accessor: 'userName' 
}, 
    {
    Header: 'Players',
    accessor: 'players',
  }, {
    Header: 'Total Bases',
    accessor: 'TB',
  }, {
    Header: 'RBIs',
    accessor: 'RBI',
  }, {
    Header: 'AtBats',
    accessor: 'AB',
  }, {
    Header: 'Hits',
    accessor: 'H',
  }]
const  {leaders} = props
	if(leaders) {
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