import React,{useState} from 'react'
import axios from 'axios'
import img from '../assets/images/auth_banner.png'
import { Link } from 'react-router-dom';
// Define the Login function.
const Register = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
// Create the submit method.
  const submit = async e =>{
    e.preventDefault()

    const user = {
      username:username,
      password:password
    };
// Create the POST requuest


    await fetch('https://codium123.pythonanywhere.com/api/v1/register/',{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body: JSON.stringify(
        {
          username,
          password
        }
      )
    });
    window.location.href='/login'
  
  }

  return (
    <section>

   
    <div className='container'>
      <div className="auth_form">
        <div className="auto-top-form">log in: code tracker</div>
        <img src={img} alt="" className="auth-img" />
        <form action="auth_form" onSubmit={submit}>
        <div className="auth-form-in-wrapper">
        <div className="auth-form-label">Login:</div>
        <input className="auth_form_input" 
             placeholder="Enter Username" 
             name='username'  
             type='text' value={username}
             required 
             onChange={e => setUsername(e.target.value)}/>
        </div>
          
        
         
        <div className="auth-form-in-wrapper">
        <div className="auth-form-label">Password:</div>
        <input name='password' 
             type="password"     
             className="auth_form_input"
             placeholder="Enter password"
             value={password}
             required
             onChange={e => setPassword(e.target.value)}/>
        </div>
          
         <Link to='/login' className="register_link"> have acc? login</Link>
         <button className="auth_btn">Enter</button>
        </form>
      </div>
    </div>
    </section>
  )
}

export default Register