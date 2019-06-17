import React from 'react';
import {Grid, Image, Message, Transition} from 'semantic-ui-react'
import Typist from 'react-typist';
import wikiSnippets from './wikiSnippets.js'
import '../App.css'


export default function Banner(props) {
	setTimeout(() => {
		props.hideBanner()
	}, 5000)

	return (

		<div className={`App ${props.theme}`}>
			<span  
				className='banner'
				style={{display: 'flex', flexWrap: 'no-wrap', fontSize: '1.2em'}}
				onTypingDone={() => props.hideBanner()} >
				 <span>Which M<span style={{color: 'cornflowerblue'}}>i</span>LB teams have produced the most successful 2019 MLB Players?
				</span></span>
		</div>

		)
}
