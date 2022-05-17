/*
import Header from "./components/Header";
import Navigation from './components/Navigation';
import MainArea from './components/MainArea';
import Footer from './components/Footer';
import './App.css';
*/
import MainPage from "./components/MainPage";
import React from 'react'
import Home from "./components/Home";
import About from "./components/About";
import Planner from "./components/Planner";
import { Link } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function App() {
  return (
    // <div className="App">
    //   
    // </div>
    <BrowserRouter> 
      <MainPage />
      <nav> 
			{/* <h1>Home</h1> */}
			<br />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/planner">Planner</Link>
        </li>
      </ul>
		</nav>
      <Routes>
        <Route exact path="/" components={<Home />} />
        <Route path="/about" components={<About />} />
        <Route path="/planner" components={<Planner />} />
        {/* <Navigate to="/" /> */}
      </Routes>
    </BrowserRouter>
  );
}
/*
<section id="page">
        <header><Header /></header>
        <main><MainArea /></main>
        <nav><Navigation /></nav>
        <footer><Footer /></footer>
      </section>
*/
export default App;
