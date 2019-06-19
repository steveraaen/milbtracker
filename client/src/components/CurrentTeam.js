import React, { useState, useEffect } from 'react';
import { Container, Form, Grid, Icon, Image, Label, Popup, Segment } from 'semantic-ui-react'
import ReactTooltip from 'react-tooltip'
import ReactTable from 'react-table'


export default function CurrentTeam(props) {
var optAAA =[], optAA =[], optAP =[], optA =[], optAM =[], optRk =[]
if(props.minorMaster) {
	for(let i = 0; i < props.minorMaster.length; i++) {
	switch(props.minorMaster[i].class) {
	case 'AAA':
	optAAA.push({key: i, text: props.minorMaster[i].tmName, value:props.minorMaster[i].tmName})
	break
	case 'AA':
	optAA.push({key: i, text: props.minorMaster[i].tmName, value:props.minorMaster[i].tmName})
	break
	case 'A+':
	optAP.push({key: i, text: props.minorMaster[i].tmName, value:props.minorMaster[i].tmName})
	break
	case 'A':
	optA.push({key: i, text: props.minorMaster[i].tmName, value:props.minorMaster[i].tmName})
	break
	case 'A-':
	optAM.push({key: i, text: props.minorMaster[i].tmName, value:props.minorMaster[i].tmName})
	break
	case 'Rk':
	optRk.push({key: i, text: props.minorMaster[i].tmName, value:props.minorMaster[i].tmName})
	break
}
}
}
console.log(optAAA)
const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]
	return(
		<Form size='mini'>
			<Form.Group >
				 <Form.Select label="Triple A" options={optAAA} placeholder='Triple A' error />
				 <Form.Select label="Double A" options={optAA} placeholder='Double A' error />
				 <Form.Select label="A Advanced" options={optAP} placeholder='A Advanced' error />
				 <Form.Select label="Class A" options={optA} placeholder='Class A' error />
				 <Form.Select label="A Short" options={optAM} placeholder='A Short' error />
				 <Form.Select label="Rookie" options={optRk} placeholder='Rookie' error />
			</Form.Group>
		</Form>
		)
}