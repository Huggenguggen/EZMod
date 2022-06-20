import "./Planner.css";
import ModulePlanner from "./ModulePlanner";
import { moduleCheck } from "./ModuleCheck";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function Planner() {

  //set an overall list for the modules
  const [mods, setMods] = useState([]);
  const [modsInfo, setmodsInfo] = useState(null);

  function newModHandler(newMod) {
    //console.log(newMod);
    //console.log(mods);
    let validMod = false;
    for (var i = 0; i < modsInfo.length; i++) {
      if (modsInfo[i].moduleCode === newMod.description) {
        //console.log(newMod.description);
        if (!mods.every((e) => e.description !== newMod.description)) {
          toast.warn('Module already in plan', {
            position: "top-right",
            autoClose: 400,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            validMod = true;

        } else {
          //mod exists and mod not already in plan
          //should run through a function and return an array with error messages
          //then only add
          let prevMods = [...mods, newMod];
          validMod = true;
          //save the list into local storage
          localStorage.setItem('mods', JSON.stringify(prevMods));
          setMods((prev) => {
            return [...prev, newMod];
          });
          let toastmessages = moduleCheck(prevMods);
          if (toastmessages.length > 0) {
            console.log("THINGS");
          }
        }
      }
    }

    if (!validMod) {
      toast.warn('No such module', {
        position: "top-right",
        autoClose: 400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
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

  const url = "https://api.nusmods.com/v2/2021-2022/moduleInfo.json";
  useEffect(() => {
    let mods = [];
    if (localStorage.getItem('mods')) {
      mods = JSON.parse(localStorage.getItem('mods'));
      setMods(mods);
    }

    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      const item = data;
      setmodsInfo(item);
    }
    fetchData()
  }, []);


  return (
    <div className="Planner">
      <header id="catchphrase">
        Make ModReg EZ
      </header>

      <div className="ModulePlan">
        <div id="y1s1">
          <header className="subHead">
            <ModulePlanner 
            year="Year 1 Sem 1"
            category='year1sem1'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
        <div id="y1s2">
          <header className="subHead">
            <ModulePlanner 
            style={{padding: "25px"}}
            year="Year 1 Sem 2"
            category='year1sem2'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
        <div id="y2s1">
          <header className="subHead">
            <ModulePlanner 
            year="Year 2 Sem 1"
            category='year2sem1'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
        <div id="y2s2">
          <header className="subHead">
            <ModulePlanner 
            year="Year 2 Sem 2"
            category='year2sem2'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
        <div id="y3s1">
          <header className="subHead">
            <ModulePlanner 
            year="Year 3 Sem 1"
            category='year3sem1'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
        <div id="y3s2">
          <header className="subHead">
            <ModulePlanner 
            year="Year 3 Sem 2"
            category='year3sem2'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
        <div id="y4s1">
          <header className="subHead">
            <ModulePlanner 
            year="Year 4 Sem 1"
            category='year4sem1'
            mods={mods}
            onNewMod={newModHandler}
            onDelete={deleteHandler}
            />
          </header>
        </div>
        <div id="y4s2">
          <header className="subHead">
            <ModulePlanner 
            year="Year 4 Sem 2"
            category='year4sem2'
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
      <ToastContainer
        position="bottom-right"
        autoClose={400}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick  
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="sidenote">*Remember to always cross check information with your Faculty!</div>
    </div>
  )
}

export default Planner;