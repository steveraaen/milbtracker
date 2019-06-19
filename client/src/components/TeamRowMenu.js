import React, { useState, useEffect } from 'react';
import { Button, Container, Icon, Image, Input, Label, Menu, Popup, Segment, Statistic } from 'semantic-ui-react'
import ReactTooltip from 'react-tooltip'

export default function TeamRowMenu(props) {
	const handleTeamSet = () => {
		switch(props.selectedMiLBClass) {
			case "AAA":
			props.setMyAAA(`${props.selectedMiLBYr} ${props.selectedMiLBName}`)
			localStorage.setItem('AAA', [`${props.selectedMiLBYr} ${props.selectedMiLBName}`])
			break
			case "AA":
			props.setMyAA(`${props.selectedMiLBYr} ${props.selectedMiLBName}`)
			localStorage.setItem('AA', (`${props.selectedMiLBYr} ${props.selectedMiLBName}`))
			break
			case "A+":
			props.setMyAPlus(`${props.selectedMiLBYr} ${props.selectedMiLBName}`)
			localStorage.setItem('APlus', (`${props.selectedMiLBYr} ${props.selectedMiLBName}`))
			break			
			case "A":
			props.setMyA(`${props.selectedMiLBYr} ${props.selectedMiLBName}`)
			localStorage.setItem('A', (`${props.selectedMiLBYr} ${props.selectedMiLBName}`))
			break
			case "A-":
			props.setMyAMinus(`${props.selectedMiLBYr} ${props.selectedMiLBName}`)
			localStorage.setItem('AMinus', (`${props.selectedMiLBYr} ${props.selectedMiLBName}`))
			break
			case "Rk":
			props.setMyRk(`${props.selectedMiLBYr} ${props.selectedMiLBName}`)
			localStorage.setItem('Rk', (`${props.selectedMiLBYr} ${props.selectedMiLBName}`))
			break
		}
	}

	return(
<Segment className={`App ${props.theme}`}>

   <Container className={`lg ${props.selectedMiLBParentLg} ${props.theme}`}>
    <Icon name="close" style={{position: "absolute", right: '2vw'}} onClick={() => props.setShowTRMenu(false)}/>
   <section  

    style={{display:  'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
   <Image rounded src={props.selectedMiLBLogo} size="tiny"/>
   <Statistic size='mini'>
      <Statistic.Label className={`lg ${props.selectedMiLBParentLg} ${props.theme}`}>Year</Statistic.Label>
      <Statistic.Value className={`lg ${props.selectedMiLBParentLg} ${props.theme}`}>{props.selectedMiLBYr}</Statistic.Value>
   </Statistic>
   <Statistic size='mini'>
      <Statistic.Label>Team</Statistic.Label>
      <Statistic.Value className={`lg ${props.selectedMiLBParentLg} ${props.theme}`}>{props.selectedMiLBName}</Statistic.Value>
   </Statistic>
   <Statistic size='mini'>
      <Statistic.Label className={`lg ${props.selectedMiLBParentLg} ${props.theme}`}>Class</Statistic.Label>
      <Statistic.Value className={`lg ${props.selectedMiLBParentLg} ${props.theme}`}>{props.selectedMiLBClass}</Statistic.Value>
   </Statistic>
   <Image rounded src={props.selectedMiLBParentLogo} size="tiny"/>
   </section>
   </Container>
	  <Button.Group >
	    <Button onClick={() => props.getPlayerList(props.franchise, props.selectedMiLBClass, props.selectedMiLBYr)}>View Current MLB Players</Button>
	    <Button.Or />
    <Button animated  onClick={() => handleTeamSet()}>
      <Button.Content visible>{`Select as current ${props.selectedMiLBClass} team`}</Button.Content>
      <Button.Content hidden>
        <div>{`${props.myAA}`}</div>
      </Button.Content>
    </Button>

	  </Button.Group>
</Segment>
		)
}



















