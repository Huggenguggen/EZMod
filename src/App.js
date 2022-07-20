import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import ModSuggest from './pages/modSuggest/ModSuggest';
import ModInfo from './pages/modInfo/ModInfo';
import About from './pages/about/About';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "white" : "#1d1d1d";
    document.documentElement.style.backgroundColor = theme === "light" ? "white" : "#1d1d1d";
  }, [])

  const toggleTheme = () => {
    setTheme((curr) => curr === "light" ? "dark" : "light");
    document.html.style.backgroundColor = theme === "light" ? "white" : "#1d1d1d";
  }
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
    <div class="overall" id={theme}>
    <Router>
    <Navbar />
      <Routes>
      <Route path='/EZMod' exact element={<Home />} />
      <Route path='/ModInfo' element={<ModInfo />}/>
      <Route path='/ModSuggest' element={<ModSuggest />}/>
      <Route path='/about' element={<About />} />
      </Routes>
    </Router>
    <div class="ReactToggle">
      <Toggle onChange={toggleTheme} defaultChecked={theme === 'dark'}/>
      <label className="modeLabel"> {theme === "light" ? "Light mode" : "Dark mode"}</label>
    </div>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
