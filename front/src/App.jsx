import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from './components/Home1';
import Logout from './components/Logout';
import Navigate from './components/Navigate'
import Register from './pages/Register'
import Footer from './components/Footer'
import Stats from './pages/Stats'
import LeaderBoardSelect from './pages/LeaderBoardSelect'
import LeaderBoard from './components/LeaderBoard'
function App() {
 

  return (
    <BrowserRouter>
        <Navigate/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/stats" element={<Stats/>}/>
          <Route path="/leaderboard" element={<LeaderBoardSelect/>}/>
          <Route path='/leader_screen/:type' element={<LeaderBoard/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
  
  )
}

export default App
