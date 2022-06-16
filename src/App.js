import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import ModSuggest from './pages/modSuggest/ModSuggest';
import ModInfo from './pages/modInfo/ModInfo';
import About from './pages/about/About';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/EZMod' exact element={<Home />} />
        <Route path='/ModInfo' element={<ModInfo />}/>
        <Route path='/ModSuggest' element={<ModSuggest />}/>
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
