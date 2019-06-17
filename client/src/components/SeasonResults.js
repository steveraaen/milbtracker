import React, { useState, useEffect } from 'react';
import { Container, Grid, Icon, Image, Label, Popup, Segment } from 'semantic-ui-react'
import ReactTooltip from 'react-tooltip'

import ReactTable from 'react-table'
import "react-table/react-table.css";
import tmsLogos from '../lgos/namesAndLogos.js'

export default function SeasonResults(props) {
   

    useEffect(() => ReactTooltip.rebuild())
    if (props.timeframe && props.bestBatTeams && props.bestPitchTeams /*&& props.yestBatTeams && props.yestPitchTeams*/ && props.selectedClass && props.selectedYear) {
        var currentBatData = props.timeframe === 'season' ? props.bestBatTeams : props.yestBatTeams
        var currentPitchData = props.timeframe === 'season' ? props.bestPitchTeams : props.yestPitchTeams
        currentBatData.map((tm, idx) => {

          tm.rankCol =  idx < 9 ? 'orange' : 'gray'

            tm.rank= idx + 1
            tm.lg = tm.majLg === "A" ? 'al' : 'nl'
            for (let i = 0; i < tmsLogos.length; i++) {
                if (tmsLogos[i].tmName === tm.tmName) {
                    tm.lgo = tmsLogos[i].logoPNG
                    tm.tmStr = <Image rounded size='tiny' src={tm.lgo} alt="team logo"/>
                }
            }
            tm.tmStr2 = <div className={`lg ${tm.lg} ${props.theme}`}>							
							<div style={{fontSize: '1.1em', textAlign: 'left'}}>{tm.tmName}</div>
							<div style={{display: 'flex', flexDirection: 'row',fontSize: ".9em", fontWeight: 600}}>
								<div style={{ marginRight: '1vw'}}>{tm.yr}</div>
								<div style={{ marginRight: '1vw'}}>{tm.class}</div>
								<div style={{ marginRight: '1vw', fontSize: '1em', fontWeight: 600}}>{tm.franchise}</div>									
							</div>
						</div>
            tm.ttp = <Popup content="Total Bases" trigger={<th></th>}/>

            tm.rnk =  <div style={{color: tm.rankCol}}>{tm.rank}</div>                    
            return tm
        })
        currentPitchData.map((ptm, ix) => {
            ptm.rankCol =  ix < 9 ? 'orange' : 'gray'
            ptm.rank= ix + 1
            ptm.lg = ptm.majLg === "A" ? 'al' : 'nl'
            for (let i = 0; i < tmsLogos.length; i++) {
                if (tmsLogos[i].tmName === ptm.tmName) {
                    ptm.lgo = tmsLogos[i].logoPNG
                    ptm.ptmStr = <Image rounded size='tiny' src={ptm.lgo} alt="Pitcher team "/>
                }
            }
            ptm.ptmStr2 = <div className={`lg ${ptm.lg} ${props.theme}`}>					
								<div style={{fontSize: '1.1em', textAlign: 'left'}}>{ptm.tmName}</div>
								<div style={{display: 'flex', flexDirection: 'row',fontSize: ".9em", fontWeight: 600}}>
									<div style={{ marginRight: '1vw'}}>{ptm.yr}</div>
									<div style={{ marginRight: '1vw'}}>{ptm.class}</div>
									<div style={{ marginRight: '1vw', fontSize: '1em', fontWeight: 600}}>{ptm.franchise}</div>									
								</div>
							</div>
             ptm.prnk =  <div style={{color: ptm.rankCol}}>{ptm.rank}</div>  
            return ptm
        })
/*        const getRowInfo = (state, rowInfo, column, instance) => {

        }*/
        let onRowClick = (state, rowInfo, column, instance) => {           
            return {
                onClick: e => {

                    props.getPlayerList(rowInfo.original.franchise, rowInfo.original.class, rowInfo.original.yr)
                }
            }
        }
        var batColumns = [{
            headerClassName: `App ${props.theme}`,
            headerStyle: {tabindex: 0, fontSize: '.9em', backgroundColor: props.borderCol , backgroundColor: props.borderCol },
            Header: 'Rank',
            className: `App ${props.theme}`,
            accessor: 'rnk',
            width: 40
        },{
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol , backgroundColor: props.borderCol },
            Header: '',
            className: `App ${props.theme}`,
            accessor: 'tmStr',
            width: 60
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: 'Team',
            className: `App ${props.theme}`,
            accessor: 'tmStr2',
            minWidth: 150        
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: () => {
                return (
                    <span data-tip="Offensive metric: Total Bases plus RBIs">TB + RBI</span>
                )
            },
            className: `App ${props.theme}`,
            accessor: 'TBRBI',
            width: 60
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: () => {
                return (
                    <span data-tip="Runs Batted In">RBI</span>
                )
            },
            className: `App ${props.theme}`,
            accessor: 'RBI', 
            width: 60       
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: () => {
                return (
                    <span data-tip="Batting Average">H</span>
                )
            },
            className: `App ${props.theme}`,
            accessor: 'H',        
            width: 60
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: () => {
                return (
                    <span data-tip="Batting Average">AVG</span>
                )
            },
            className: `App ${props.theme}`,
            accessor: 'AVG', 
            width: 60       
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: () => {
                return (
                    <span data-tip="Home Runs">HR</span>
                )
            },
            className: `App ${props.theme}`,
            accessor: 'HR', 
            width: 60       
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: () => {
                return (
                    <span data-tip="Stolen Bases">SB</span>
                )
            },
            className: `App ${props.theme}`,
            accessor: 'SB',
            width: 60
        }];
        var pitchColumns = [{
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: 'Rank',
            className: `App ${props.theme}`,
            accessor: 'prnk',
            width: 40        
        },{
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: '',
            className: `App ${props.theme}`,
            accessor: 'ptmStr',
            width: 60        
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: 'Team',
            className: `App ${props.theme}`,
            accessor: 'ptmStr2',
            minWidth: 150        
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: () => {
                return (
                    <span data-tip={`The main metric:  Innings Pitched minus Earned Runs - a measure of durability and run prevention`}>IP - ER</span>
                )
            },
            className: `App ${props.theme}`,
            accessor: 'IPER', 
            width: 60       
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: () => {
                return (
                    <span data-tip="Wins">W</span>
                )
            },
            className: `App ${props.theme}`,
            accessor: 'W',
            width: 60        
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: () => {
                return (
                    <span data-tip="Losses">L</span>
                )
            },
            className: `App ${props.theme}`,
            accessor: 'L',
            width: 60        
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: () => {
                return (
                    <span data-tip="Saves">SV</span>
                )
            },
            className: `App ${props.theme}`,
            accessor: 'SV',
            width: 60        
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: () => {
                return (
                    <span data-tip="Saves">SO</span>
                )
            },
            className: `App ${props.theme}`,
            accessor: 'SO',
            width: 60        
        }, {
            headerClassName: `App ${props.theme}`,
            headerStyle: { fontSize: '.9em', backgroundColor: props.borderCol  },
            Header: () => {
                return (
                    <span data-tip="Walks">BB</span>
                )
            },
            className: `App ${props.theme}`,
            accessor: 'BB',
            width: 60        
        }]
        return (
            <div className={`App ${props.theme}`}>
	    	<ReactTooltip
		    	place="bottom"
		    	offset={{bottom: 10, right: 10}}
		    	multiline />
	    	<Grid stackable columns={2}>
	    	 <Grid.Column>
	    	<div>
	    	<div style={{display: 'flex', flexDirection: 'row', fontWeight: 600}}>
	    		<div style={{fontSize: '1.1em', marginLeft: '2vw'}}>Top Batting</div>
	    		<div onClick={()=> props.toggleFormSidebar()} style={{fontSize: '1.1em', fontWeight: 600, fontStyle: 'italic', marginLeft: '5vw'}}>{props.selectedClass.displayName}</div>
	    		<div onClick={()=> props.toggleFormSidebar()} style={{fontSize: '1.1em', fontWeight: 600, fontStyle: 'italic', marginLeft: '5vw'}}>{props.selectedYear.text}</div>
	    	</div>
	    		<ReactTable
                    resizable={false}	    			    		
	    			className={`-highlight App ${props.theme}`}
		    		showPagination={false}
		    		style={{fontSize: '.9em', backgroundColor: props.borderCol , fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
		    		defaultPageSize={30}
	    			data={currentBatData}    			
	    			columns={batColumns}
	    			showPageSizeOptions={false}	    			
	    			getTrProps={onRowClick}
	    		/> 
	    		</div>
	    		 </Grid.Column>
	    		  <Grid.Column>
	    		<div>
	    	<div style={{display: 'flex', flexDirection: 'row', fontWeight: 600}}>
	    		<div style={{fontSize: '1.1em', marginLeft: '2vw'}}>Top Pitching</div>
	    		<div onClick={()=> props.toggleFormSidebar()} style={{fontSize: '1.1em', fontWeight: 600, fontStyle: 'italic', marginLeft: '5vw'}}>{props.selectedClass.displayName}</div>
	    		<div onClick={()=> props.toggleFormSidebar()} style={{fontSize: '1.1em', fontWeight: 600, fontStyle: 'italic', marginLeft: '5vw'}}>{props.selectedYear.text}</div>
	    	</div>
	    		<ReactTable
                    resizable={false} 
	    				 
	    			className={`-highlight App ${props.theme}`}
		    		showPagination={false}
		    		style={{fontSize: '.9em', backgroundColor: props.borderCol ,   fontWeight: 600, height: '76vh', backgroundColor: props.borderCol}}
		    		defaultPageSize={30}
	    			data={currentPitchData}	    		
	    			columns={pitchColumns}
	    			showPageSizeOptions={false}	    				    			
	    			getTrProps={onRowClick}
	    		/>
	    	</div> 

	    	 </Grid.Column> 
	    	</Grid>
	    	</div>
        )
    } else {
        return null
    }

}