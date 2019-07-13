import React from 'react';
import { Button,  Container, Header, Icon,Image } from 'semantic-ui-react'
import "react-tabs/style/react-tabs.css";
import ReactTable from 'react-table'
import tmsLogos from '../lgos/namesAndLogos.js'

import '../App.css'

export default function MyPlayers(props) {
	console.log(props)
			var myBatCols = [
		{
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: 'Name',
		className: `App ${props.theme}`,
		accessor: 'playerName',
		minWidth: 60,
		},
				{
		headerClassName: `App ${props.theme}`,
		headerStyle: {fontSize: '.9em', backgroundColor: props.borderCol},
		Header: 'player ID',
		className: `App ${props.theme}`,
		accessor: 'playerID',
		minWidth: 60,
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