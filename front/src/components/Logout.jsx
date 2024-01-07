import {useEffect,useState} from 'react'
import axios from 'axios'
const Logout = () => {
  useEffect(()=> {

      (async () => {
        try{
          const config = {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
            };
          const {data} = await axios.post('https://codium123.pythonanywhere.com/api/v1/logout/',{
            refresh_token: localStorage.getItem('refresh_token')
          },config);
          localStorage.clear();
          axios.defaults.headers.common['Authorization'] = null;
          window.location.href = '/login'
        }catch(e){
          console.log('logout not work',e)
        }
      })();
  },[]);
  return (
	<div></div>
  )
}

export default Logout