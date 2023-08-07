import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import AllCandies from './components/AllCandies/AllCandies';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/candies' element={<AllCandies/>}/>
      </Routes>
    </Router>
  );
}

export default App;