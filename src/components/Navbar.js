import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [currSem, setCurrSem] = useState("");

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    var finalRes = ""
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    if (today.getMonth() + 1 <= 4) {
      finalRes = (today.getFullYear() - 1) + "-" + (today.getFullYear()) + " SEM 2";
    } else if (today.getMonth() + 1 <= 7) {
      finalRes = (today.getFullYear()) + " SUMMER BREAK";
    } else if (today.getMonth() + 1 <= 11) {
      finalRes = (today.getFullYear()) + "-" + (today.getFullYear() + 1) + " SEM 1";
    } else {
      finalRes = today.getFullYear() + " WINTER BREAK"
    }
    
    setCurrSem(finalRes);
  }, [])

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div id='topline'>
        <div className={sidebar ? "navbar-sidebar" : "navbar"}>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h1 id='appname'>
            EZMOD
          </h1>
        </div>
        <div id='semester'>
          <h1>
            {currSem}
          </h1>
        </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              {/* This box is necessary for visual purpose else the dropdown bar won't look nice */}
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>
                      {item.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;