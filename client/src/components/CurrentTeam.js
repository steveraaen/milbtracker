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
	optAAA.push({key: i, text: props.minorMaster[i].tmName, value:props.minorMaster[i].tmName, onSelect: () => props.setMyAAA(props.minorMaster[i].tmName)})
	break
	case 'AA':
	optAA.push({key: i, text: props.minorMaster[i].tmName, value:props.minorMaster[i].tmName, onSelect: () => props.setMyAA(props.minorMaster[i].tmName)})
	break
	case 'A+':
	optAP.push({key: i, text: props.minorMaster[i].tmName, value:props.minorMaster[i].tmName, onSelect: () => props.setMyAPlus(props.minorMaster[i].tmName)})
	break
	case 'A':
	optA.push({key: i, text: props.minorMaster[i].tmName, value:props.minorMaster[i].tmName, onSelect: () => props.setMyA(props.minorMaster[i].tmName)})
	break
	case 'A-':
	optAM.push({key: i, text: props.minorMaster[i].tmName, value:props.minorMaster[i].tmName, onSelect: () => props.setMyAMinus(props.minorMaster[i].tmName)})
	break
	case 'Rk':
	optRk.push({key: i, text: props.minorMaster[i].tmName, value:props.minorMaster[i].tmName, onSelect: () => props.setMyRk(props.minorMaster[i].tmName)})
	break
		}
	}
}

	return(
		<Form size='mini'>
			<Form.Group >
				 <Form.Select label="Triple A" options={optAAA} placeholder='Triple A' />
				 <Form.Select label="Double A" options={optAA} placeholder='Double A' />
				 <Form.Select label="A Advanced" options={optAP} placeholder='A Advanced' />
				 <Form.Select label="Class A" options={optA} placeholder='Class A' />
				 <Form.Select label="A Short" options={optAM} placeholder='A Short' />
				 <Form.Select label="Rookie" options={optRk} placeholder='Rookie' />
			</Form.Group>
		</Form>
		)
}