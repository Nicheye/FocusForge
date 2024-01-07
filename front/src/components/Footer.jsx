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
		<div className="footer-code-link">BY <span>codium</span></div>
		<div className="designer-code-link"> & artsharov_design</div>
		
		<div className="current-time">{currentTime.toLocaleTimeString()}</div>
	</footer>
  )
}

export default Footer