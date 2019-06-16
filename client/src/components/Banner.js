import React from 'react';
import {Grid, Image, Message, Transition} from 'semantic-ui-react'
/*import { Transition } from 'react-transition-group';*/
import Typist from 'react-typist';
import wikiSnippets from './wikiSnippets.js'

export default function Banner(props) {

	return (

		<Message className={`App ${props.theme}`}>
			<Typist  
				style={{display: 'flex', flexWrap: 'no-wrap', fontSize: '1.4em'}}
				onTypingDone={() => props.hideBanner()} >
				{wikiSnippets[0]}
			</Typist>
		</Message>

		)
}
