import React, {useState, useEffect} from 'react';
import {Grid, Image, Transition} from 'semantic-ui-react'
import ball from '../ball.png'
import '../App.css'


export default function IsLoading(props) {
	const [ curSnippet, setCurSnippet ] = useState()
	const [ visible, setVisible ] = useState()

var wikiSnippets = [
'Minor League Baseball (MiLB) provides opportunities for player development and a way to prepare for the major leagues.',
'MiLB operates under the Commissioner of Baseball',
'The term "Farm League" started in the 1930s',
'All of the minor leagues are operated as independent businesses',
'The Atlanta Braves own all of their affiliates except for the Florida Fire Frogs',
'There are 14 MLB-affiliated minor leagues with a total of 160 revenue-generating teams',
'The first true minor league is traditionally considered to be the Northwestern League of 1883',
'There are six classes of minor league teams: Triple-A, Double-A, Class A-Advanced, Class A, Class A Short Season, and Rookie',
'Minor - Major League affiliations can change every two years',
'Most leagues at Double-A and below play a split season, where the standings are reset at the halfway mark, and the winners of both halves qualify for post-season play',
'AAA teams usually hold many of the remaining 15 players of the 40-man major league roster',
'Short-season leagues play 76 games, starting in mid-June and ending in early September',
'Minor League Umpires are overseen by Minor League Baseball Umpire Development',
'The parent major league club pays the salaries and benefits of uniformed personnel, and provides bats and balls',
'The minor league club pays for in-season travel and other operational expenses'

]


 useEffect(() => {
 	    setCurSnippet(wikiSnippets[Math.floor((Math.random() * wikiSnippets.length) + 1)]); 
 		var i = 0;

    const interval = setInterval(() => {
    setVisible(true) 
      setCurSnippet(wikiSnippets[Math.floor((Math.random() * wikiSnippets.length) + 1)]); 
  /*    setVisible(false)   */ 
      i++

    }, 2400);
 
    return () => {
      clearInterval(interval);
    };
  }, []);

	return(
	<div style={{display: 'flex', flexDirection:'column'}}>
		<div className='ball'>
			<Image circular src={ball} />
		</div>
		<div className='blurb'>
			Farm Team Fantasy
			<div style={{marginTop: '3vh', fontSize: '.5em', fontWeight: 400, fontStyle: 'italic'}}> Is gathering the latest stats ..</div>
		</div>
	<Transition visible={visible} animation='fade' duration={2000}>
			<p className="anim" style={{width: '70vw', top: '40vh', left: '20vw', position: 'absolute', fontSize:'2em'}}>{curSnippet}</p>
      </Transition>
	</div>
		)

}