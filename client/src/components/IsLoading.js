import React, {useEffect} from 'react';
import {Grid, Image, Popup} from 'semantic-ui-react'
import ball from '../ball.png'
import mlblogo from '../data/squaremlb.png'
import milblogo from '../data/squaremilb.png'
import '../App.css'

export default function IsLoading(props) {
	return(
	<div style={{display: 'flex', flexDirection:'column'}}>
		<div className='ball'>
			<Image circular src={ball} />
		</div>
		<div className='blurb'>
			Farm Team Fantasy
			<div style={{marginTop: '3vh', fontSize: '.5em', fontWeight: 400, fontStyle: 'italic'}}> Is gathering the latest stats ..</div>
		</div>
	</div>
		)

}