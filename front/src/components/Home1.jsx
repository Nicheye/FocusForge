import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import code from '../assets/timer.py'
import { redirect } from "react-router-dom";
const Home = () => {
  const [userData,setUserData] = useState('');

  useEffect(() => {
    if(localStorage.getItem('access_token') ===null){
      return redirect("/login");

    }
    else{
      (async () =>{
        try{
          const {data} = await axios.get(
            'http://localhost:8000/api/v1/home/',{
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
          `http://127.0.0.1:8000/api/v1/main/leaderboard/two_weeks/`,
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
      <div className="container">
      
      <div className="hello-block">
        <div className="hello-top">
          Hello {userData.username}
        </div>
        <div className="your_key_title">your personal key</div>
        <div className="your_key_value">{userData.personal_key}</div>
      </div>


      <div className="hello-block">
        <div className="hello-top">
        RUN THIS CODE ON YOUR PC
        </div>
        
        <div className="your_key_value code">Code</div>

        <div >
        <a href={code} download="code" target='_blank'>
        <button className='auth_btn'>Download code</button>
        </a>
          </div>
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
    </section>
    
    
  )
}

export default Home