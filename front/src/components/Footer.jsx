import React from 'react'
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom'
const Footer = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
		setCurrentTime(new Date());
		}, 1000);

		// Clear the interval when the component unmounts
		return () => clearInterval(intervalId);
	}, []);


  return (
	<footer className=''>
		<div className="footer-code-link">BY <a href='https://www.youtube.com/channel/UCDg5H-rTvMSUPVwrtsPQATw'>codium</a></div>
		<a className="designer-code-link" href='https://vk.com/artsharov_design'> & artsharov_design</a>
		
		<div className="current-time">{currentTime.toLocaleTimeString()}</div>
	</footer>
  )
}

export default Footer