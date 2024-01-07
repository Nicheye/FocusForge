import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navigate from './Navigate';
const LeaderBoard = () => {
  const { type } = useParams();
  const [leaders, setLeaders] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://codium123.pythonanywhere.com/api/v1/main/leaderboard/${type}/`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        setLeaders(data.users);
      } catch (e) {
        console.log('not auth');
      }
    };

    fetchData();
  }, [type]); // Make sure to include 'type' as a dependency
  console.log(leaders)
  return (
    <section>
      <Navigate/>
      <div className="leaderboard">
		<div className="leader_board_titlee">{type}</div>
        {leaders.map((leader,id) => {
          let hours = 0; // Initialize hours variable
         
          if (type === 'coders') {
            hours = leader.code_hr_count;
          } else if (type === 'designers') {
            hours = leader.design_hr_count;
          } else if (type === 'obs') {
            hours = leader.recording_hr_count;
          }

          return (
            <div className="leaderboard-item" key={leader.user}>
              <div className="leader-place">{id+1}</div>
              <div className="leader-name">{leader.user}</div>
              <div className="leader-hours">{hours}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LeaderBoard;