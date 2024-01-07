import React,{useState} from 'react'
import axios from 'axios'
import img from '../assets/images/auth_banner.png'
import { Link } from 'react-router-dom'
// Define the Login function.
const Login = () => {
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
const config = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
};

const { data } = await axios.post('https://codium123.pythonanywhere.com//token/ ', user, config);
  localStorage.clear();
  console.log(data.access)
  localStorage.setItem('access_token',data.access);
  localStorage.setItem('refresh_token',data.refresh);
  axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
  window.location.href = '/'
  }

  return (
//     <div className="Auth-form-container">
//     <form className="Auth-form" onSubmit={submit}>
//       <div className="Auth-form-content">
//         <h3 className="Auth-form-title">Sign In</h3>
//         <div className="form-group mt-3">
//           <label>Username</label>
//           <input className="form-control mt-1" 
//             placeholder="Enter Username" 
//             name='username'  
//             type='text' value={username}
//             required 
//             onChange={e => setUsername(e.target.value)}/>
//         </div>
//         <div className="form-group mt-3">
//           <label>Password</label>
//           <input name='password' 
//             type="password"     
//             className="form-control mt-1"
//             placeholder="Enter password"
//             value={password}
//             required
//             onChange={e => setPassword(e.target.value)}/>
//         </div>
//         <div className="d-grid gap-2 mt-3">
//           <button type="submit" 
//              className="btn btn-primary">Submit</button>
//         </div>
//       </div>
//    </form>
//  </div>
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
          
         <Link to='/register' className="register_link">dont have acc?register</Link>
         <button className="auth_btn">Enter</button>
        </form>
      </div>
    </div>
    </section>
  )
}

export default Login