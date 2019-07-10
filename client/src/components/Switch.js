

import React from 'react';
import {Icon} from 'semantic-ui-react'

export default function Switch(props) {
	var sunOp, moonOp;
	if(props.theme === 'dark') {
		sunOp = 1
		moonOp = .3
	} else {
		sunOp = .3
		moonOp = 1		
	}

	return (
<div style={{display: 'flex', flexDirection: 'row', marginTop: '2vh'}}>
	<Icon size='large' style={{opacity: sunOp}} name="sun" color='yellow' onClick={() => props.toggleTheme('light')}/>
	<Icon size='large' style={{opacity: moonOp}}name="moon" color='teal' onClick={() => props.toggleTheme('dark')}/>	
</div>
)
}