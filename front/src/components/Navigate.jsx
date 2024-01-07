import React, { useState, useEffect} from 'react';

import {Link} from 'react-router-dom'
import pc from '../assets/images/pc_image.png'
import psp from '../assets/images/psp.png'
import cup from '../assets/images/cup.png'
import logout from '../assets/images/logout.png'
import login from '../assets/images/login.svg'
const Navigate = () => {
	const [isAuth,setIsAuth] = useState(false)
	useEffect(() => {
		if(localStorage.getItem('access_token') !== null){
			setIsAuth(true);
		}
	},[isAuth]);
  return (

  <>
  {/* <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        
        

        {isAuth ? <Link to="/" className='nav-link active'>Home</Link> : null}
        {isAuth ? <Link to="/logout" className='nav-link active'>Logout</Link> :
                  
                  
                  <Link to="/login" className='nav-link active'>Login</Link>}
        {isAuth ? '.' :
                  
                  
                  <Link to="/register" className='nav-link active'> Register</Link>}
                  
                  
      </ul>
    
    </div>
  </div>
</nav> */}
<nav className='navbar'>
  <div className="container">
    <Link to="/" className="navbar-link-group">
      <img src={pc} alt="" className="navbar-link-img" />
      <div className="navbar-link-title">/Main_Page</div>
    </Link>
    <Link to="/stats" className="navbar-link-group">
      <img src={psp } alt="" className="navbar-link-img" />
      <div className="navbar-link-title">/STATISTICS</div>
    </Link>

    <Link to="/leaderboard" className="navbar-link-group">
      <img src={cup} alt="" className="navbar-link-img" />
      <div className="navbar-link-title">/LEADERBOARD</div>
    </Link>
    
    {isAuth ? 
    <Link to="/logout" className="navbar-link-group">
    <img src={logout} alt="" className="navbar-link-img" />
    <div className="navbar-link-title">/LOGOUT</div>
    </Link> :              
    <Link to="/login" className="navbar-link-group">
    <img src={login} alt="" className="navbar-link-img" />
    <div className="navbar-link-title">/LOGIN</div>
    </Link>}
    

  </div>
</nav>
  </>       
  )
}

export default Navigate