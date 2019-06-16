import React from 'react';
import {Grid, Image, Message, Transition} from 'semantic-ui-react'
import Typist from 'react-typist';
import wikiSnippets from './wikiSnippets.js'

export default function Banner(props) {

	return (
			<Transition visible={props.bannerVis} animation='slide down' duration={500}>
<Message className={`App ${props.theme}`}>
	<Typist  
	style={{display: 'flex', flexWrap: 'no-wrap'}}
	onTypingDone={() => props.hideBanner()}
	>
		{wikiSnippets[1]}
	</Typist>
</Message>
      </Transition>

		)
}
