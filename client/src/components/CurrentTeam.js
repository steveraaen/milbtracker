import React, { useState, useEffect } from 'react';
import { Container, Form, Grid, Icon, Image, Label, Popup, Segment } from 'semantic-ui-react'
import ReactTooltip from 'react-tooltip'
import ReactTable from 'react-table'


export default function CurrentTeam(props) {
var optAAA =[], optAA =[], optAP =[], optA =[], optAM =[], optRk =[]

function handleTeamSelect(lcl, mycl, tm) {
	mycl(tm)
	localStorage.setItem(lcl, tm)
	props.getTeamYears(tm)
}

if(props.minorMaster) {
	for(let i = 0; i < props.minorMaster.length; i++) {
	switch(props.minorMaster[i].class) {
	case 'AAA':
	optAAA.push({
		key: i, 
		text: props.minorMaster[i].tmName,
		 value:props.minorMaster[i].tmName,
		 onClick: () => handleTeamSelect('myAAA', props.setMyAAA, props.minorMaster[i].tmName)})
	break
	case 'AA':
	optAA.push({
		key: i, 
		text: props.minorMaster[i].tmName,
		 value:props.minorMaster[i].tmName,
		 onClick: () => handleTeamSelect('myAA', props.setMyAA, props.minorMaster[i].tmName)})
	break
	case 'A+':
	optAP.push({
		key: i, 
		text: props.minorMaster[i].tmName,
		 value:props.minorMaster[i].tmName,
		 onClick: () => handleTeamSelect('myAPlus', props.setMyAPlus, props.minorMaster[i].tmName)})
	break
	case 'A':
	optA.push({
		key: i, 
		text: props.minorMaster[i].tmName,
		 value:props.minorMaster[i].tmName,
		 onClick: () => handleTeamSelect('myA', props.setMyA, props.minorMaster[i].tmName)})
	break
	case 'A-':
	optAM.push({
		key: i, 
		text: props.minorMaster[i].tmName,
		 value:props.minorMaster[i].tmName,
		 onClick: () => handleTeamSelect('myAMinus', props.setMyAMinus, props.minorMaster[i].tmName)})
	break
	case 'Rk':
	optRk.push({
		key: i, 
		text: props.minorMaster[i].tmName,
		 value:props.minorMaster[i].tmName,
		 onClick: () => handleTeamSelect('myRk', props.setMyRk, props.minorMaster[i].tmName)})
	break
		}
	}
}
const yrs = ['2013', '2014', '2015', '2016', '2017', '2018', ]
	return(
		<Form >			
				 <div style={{display: 'flex', flexDirection: 'row'}}>
				 <Form.Select  label="Triple A" options={optAAA} placeholder='Triple A' />
				 <Form.Select  options={yrs} placeholder='Triple A' />
				 <div>{props.myAAA}</div>
				 </div>
				 <div style={{display: 'flex', flexDirection: 'row'}}>
				 <Form.Select  label="Double A" options={optAA} placeholder='Double A' />
				 <Form.Select   options={yrs} placeholder='Double A' />
				 <div>{props.myAA}</div>
				 </div>
				 <div style={{display: 'flex', flexDirection: 'row'}}>
				 <Form.Select  label="A Advanced" options={optAP} placeholder='A Advanced' />
				 <Form.Select options={yrs} placeholder='A Advanced' />
				 <div>{props.myAPlus}</div>
				 </div>
				 <div style={{display: 'flex', flexDirection: 'row'}}>
				 <Form.Select  label="Class A" options={optA} placeholder='Class A' />
				 <Form.Select   options={yrs} placeholder='Class A' />
				 <div>{props.myA}</div>
				 </div>
				 <div style={{display: 'flex', flexDirection: 'row'}}>
				 <Form.Select  label="A Short" options={optAM} placeholder='A Short' />
				 <Form.Select  options={yrs} placeholder='A Short' />
				 <div>{props.myAMinus}</div>
				 </div>
				 <div style={{display: 'flex', flexDirection: 'row'}}>
				 <Form.Select  label="Rookie" options={optRk} placeholder='Rookie' />
				 <Form.Select   options={yrs} placeholder='Rookie' />
				 <div>{props.myRk}</div>
				 </div>
		
		</Form>
		)
}