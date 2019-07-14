import React from 'react';
import { Button,  Container, Header, Icon,Image } from 'semantic-ui-react'
import "react-tabs/style/react-tabs.css";
import ReactTable from 'react-table'
import _ from "lodash";
import tmsLogos from '../lgos/namesAndLogos.js'

import '../App.css'

export default function MyPlayers(props) {
	console.log(props)



			var myBatCols = [
	{
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: 'Team',
		className: `App ${props.theme}`,
		accessor: 'tmName',
		},		{
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: 'Name',
		className: `App ${props.theme}`,
		accessor: 'playerName',
		    Aggregated: row => {
      // You can even render the cell differently if it's an aggregated cell
      return <span style={{hidden: true}}></span>
    }
		},
				{
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: 'Hits',
		className: `App ${props.theme}`,
		accessor: 'H',
		 aggregate: (values, rows) => _.sum(values)
		},
				{
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: 'AB',
		className: `App ${props.theme}`,
		accessor: 'AB',
		 aggregate: (values, rows) => _.sum(values)
		}]
	return(
	    		<ReactTable 
	    			minRows={10}
	    			multiSort={true}
	    			className={`-highlight App ${props.theme}`}	    	
		    		showPagination={false}
		    		style={{fontSize: '.9em', fontWeight: 600, height: '76vh'}}
	    			data={props.myPlayers}
	    			columns={myBatCols}
	    			showPageSizeOptions={false} 
	    	
	    		
	    		/>
		)
}