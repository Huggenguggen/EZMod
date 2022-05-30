import "./Planner.css";
import ModulePlanner from "./ModulePlanner";
import React, { useState, useEffect } from 'react';

function Planner() {
  //set an overall list for the modules
  const [mods, setMods] = useState([]);

  function newModHandler(newMod) {
    console.log(newMod);
    console.log(mods);
    let prevMods = [...mods, newMod];

    //save the list into local storage
    localStorage.setItem('mods', JSON.stringify(prevMods));
    setMods((prev) => {
      return [...prev, newMod];
    });
  }

  //deletes based on uuid out of the entire list of mods
  function deleteHandler(modID) {
    const filteredMods = mods.filter((mod) => mod.id !== modID);
    localStorage.setItem('mods', JSON.stringify(filteredMods));
    setMods(filteredMods);
  }

  //delete all local storage
  function deleteLocalHandler() {
    const filteredMods = [];
    localStorage.setItem('mods', JSON.stringify(filteredMods));
    setMods(filteredMods);
  }

  useEffect(() => {
    let mods = [];
    if (localStorage.getItem('mods')) {
      mods = JSON.parse(localStorage.getItem('mods'));
      setMods(mods);
    }
  }, []);


  return (
    <div className="Planner">
      <header id="catchphrase">
        Make ModReg EZ
      </header>

      <div className="ModulePlan">
        <div id="y1">
          <header className="subHead">
            <ModulePlanner 
            year="Year 1"
            category='year1'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
        <div id="y2">
          <header className="subHead">
            <ModulePlanner 
            year="Year 2"
            category='year2'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
        <div id="y3">
          <header className="subHead">
            <ModulePlanner
            year="Year 3"
            category='year3'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
        <div id="y4">
          <header className="subHead">
            <ModulePlanner
            year="Year 4"
            category='year4'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
      </div>
      <div>
      <input 
        id="remove-all"
        className="btn-action"
        type="button" 
        value="remove all"
        onClick={deleteLocalHandler} 
        />
      </div>
    </div>
  )
}

export default Planner;