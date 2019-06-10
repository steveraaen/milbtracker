import React, {useState, useEffect} from 'react';
import {Grid, Image, Transition} from 'semantic-ui-react'
import ball from '../ball.png'
import '../App.css'
import tmsLogos from'../lgos/namesAndLogos.js'

export default function IsLoading(props) {
	const [ curLogo, setCurLogo ] = useState()
	const [ visible, setVisible ] = useState()

 useEffect(() => {
 		var i = 0;

    const interval = setInterval(() => {
    setVisible(true) 
      setCurLogo(tmsLogos[i].logoPNG); 
      setVisible(false)    
      i++

    }, 400);
 
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
	<Transition visible={visible} animation='fade' duration={200}>
			<div className="anim" style={{top: '40vh', left: '40vw', position: 'absolute', fontSize:'2em'}}>{<Image src={curLogo} />}</div>
      </Transition>
	</div>
		)

}