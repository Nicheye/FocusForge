import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Navigate from '../components/Navigate';
const Stats = () => {
	const [data,setData] = useState('');

	useEffect(() => {
		if(localStorage.getItem('access_token') ===null){
		window.location.href = '/login'

		}
		else{
		(async () =>{
			try{
			const {data} = await axios.get(
				'https://codium123.pythonanywhere.com/api/v1/main/stats',{
				headers:{
					'Content-Type':'application/json'
				},
				withCredentials:true,
				}
			);
			setData(data);
			
			}
			catch (e){
			console.log('not data')
			}
		})()};
	},[]);
	
  return (
	<section>
		<Navigate/>
		<div className="stats">
		<div className="stats_title">Your personal statistics:</div>
		<div className="stats_block_wrapper">
			<div className="stats_block">
				<div className="stat_block_top coding">Coding</div>
				<div className="stat_block_bottom" style={{borderLeft:"3px solid #FFF"}}>
					<div className="stat_block_hint">Time spent:</div>
					<div className="stat_block_hrs">{data.code_hours} hours</div>
					<div className="stat_block_mins">{data.code_mins} mins</div>
				</div>
			</div>

			<div className="stats_block">
				<div className="stat_block_top design">Design</div>
				<div className="stat_block_bottom">
					<div className="stat_block_hint">Time spent:</div>
					<div className="stat_block_hrs">{data.design_hours} hours</div>
					<div className="stat_block_mins">{data.design_mins} mins</div>
				</div>
			</div>

			<div className="stats_block">
				<div className="stat_block_top record">Record</div>
				<div className="stat_block_bottom" style={{borderRight:"3px solid #000"}}>
					<div className="stat_block_hint">Time spent:</div>
					<div className="stat_block_mins">{data.record_hours} hours</div>
					<div className="stat_block_hrs">{data.record_mins} mins</div>
				</div>
			</div>
		</div>
		</div>


		<div className="stats">
		<div className="stats_title">Last Two Weeks:</div>
		<div className="stats_block_wrapper">
			<div className="stats_block">
				<div className="stat_block_top coding">Coding</div>
				<div className="stat_block_bottom" style={{borderLeft:"3px solid #FFF"}}>
					<div className="stat_block_hint">Time spent:</div>
					<div className="stat_block_hrs">{data.coding_hours_last_two_weeks} hours</div>
					<div className="stat_block_mins">{data.coding_last_two_weeks} mins</div>
				</div>
			</div>

			<div className="stats_block">
				<div className="stat_block_top design">Design</div>
				<div className="stat_block_bottom">
					<div className="stat_block_hint">Time spent:</div>
					<div className="stat_block_hrs">{data.designing_hours_last_two_weeks} hours</div>
					<div className="stat_block_mins">{data.designing_last_two_weeks} mins</div>
				</div>
			</div>

			<div className="stats_block">
				<div className="stat_block_top record">Record</div>
				<div className="stat_block_bottom" style={{borderRight:"3px solid #000"}}>
					<div className="stat_block_hint">Time spent:</div>
					<div className="stat_block_mins">{data.recording_hours_last_two_weeks} hours</div>
					<div className="stat_block_hrs">{data.recording_last_two_weeks} mins</div>
				</div>
			</div>
		</div>
		</div>
	</section>
	
  )
}

export default Stats