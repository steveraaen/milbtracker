import React from 'react';
import {Grid, Image, Message, Transition} from 'semantic-ui-react'
import Typist from 'react-typist';
import wikiSnippets from './wikiSnippets.js'
import '../App.css'

export default function Banner(props) {

	return (

		<div className={`App ${props.theme}`}>
			<Typist  
				className='banner'
				style={{display: 'flex', flexWrap: 'no-wrap', fontSize: '1.4em'}}
				onTypingDone={() => props.hideBanner()} >
				{wikiSnippets[0]}
			</Typist>
		</div>

		)
}
