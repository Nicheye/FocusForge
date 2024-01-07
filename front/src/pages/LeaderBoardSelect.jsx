import React from 'react'
import LeaderBoard from '../components/LeaderBoard'
import { Link } from 'react-router-dom'
const LeaderBoardSelect = () => {
	
  
  return (
	<section>
		<div className="leader-select">
			<div className="leader_select_title">Select a category:	</div>
			<div className="leader_select_wrapper">
				<Link to="/leader_screen/coders" className="leader_select_option" >
				Coding
				</Link>
				<Link to="/leader_screen/designers" className="leader_select_option" >
				Design
				</Link>
				<Link to="/leader_screen/obs" className="leader_select_option"  style={{borderRight:"None"}}>
				YouTube
				</Link>

			</div>
		</div>
	</section>
  )
}

export default LeaderBoardSelect