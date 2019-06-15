import React from 'react';
import {Grid, Image, Transition} from 'semantic-ui-react'
import Typist from 'react-typist';
import wikiSnippets from './wikiSnippets.js'

export default function Banner(props) {

	return (
<div >
	<Typist  style={{display: 'flex', flexWrap: 'no-wrap'}}>
		{wikiSnippets[0]}
	</Typist>
</div>
		)
}
