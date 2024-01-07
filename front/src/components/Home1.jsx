import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import code from '../assets/timer.py'
import Navigate from './Navigate'
const Home = () => {
  const [userData,setUserData] = useState('');

  useEffect(() => {
    if(localStorage.getItem('access_token') ===null){
      window.location.href = '/login'

    }
    else{
      (async () =>{
        try{
          const {data} = await axios.get(
            'https://codium123.pythonanywhere.com/api/v1/home/',{
              headers:{
                'Content-Type':'application/json'
              },
              withCredentials:true,
            }
          );
          setUserData(data.user);
        }
        catch (e){
          console.log('not auth')
        }
      })()};
  },[]);


  const [leaders, setLeaders] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://codium123.pythonanywhere.com/api/v1/main/leaderboard/two_weeks/`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        setLeaders(data);
      } catch (e) {
        console.log('not auth');
      }
    };

    fetchData();
  }, []);

  return (
    
    <section>
      <Navigate/>
      

      
      <div className="big-block">
      
      <div className="hello-wrapper">

     
      <div className="hello-block">
        <div className="hello-top">
          Hello {userData.username}
        </div>
        <div className="your_key_title">your personal key</div>
        <div className="your_key_value">{userData.personal_key}</div>
      </div>


      <div className="hello-block" style={{marginTop:"29px"}}>
        <div className="hello-top code">
        Run this code on your PC
        </div>
        
        <a href={code} download="code" target='_blank'className='your_key_value code' >
         Download code
        </a>
        
      </div>
      </div>
    
    <div className="side-table">

    <div className="leaderboard">
		<div className="leader_board_titlee">Best workers for two weeks</div>
        {leaders.map((leader,id) => {
         // Initialize hours variable
         
          return (
            <div className="leaderboard-item" key={leader.user}>
              <div className="leader-place">{id+1}</div>
              <div className="leader-name">{leader.user}</div>
              <div className="leader-hours">{leader.hours}</div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
    
    </section>
    
    
  )
}

export default Home