import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import Weather from './component/Weather';
import Quotes from './component/Quotes';
import Movies from './component/Movies';
import Song from './component/Song';

function App() {
  return (
    
      <Routes>
       <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/home/weather" element={<Weather />} />
        <Route path="/register" element={<Register />} />
        <Route path='/home/quote' element={<Quotes/>}/>
        <Route path='/home/movies'element={<Movies/>}/>

      </Routes>
   
  );
}

export default App;
