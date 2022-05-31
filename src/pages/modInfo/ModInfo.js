import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModInfo() {
  const [modsInfo, setmodsInfo] = useState(null);
  const [mod, setMod] = useState("");

  function handleSearchMod(event) {
		event.preventDefault();
		setMod(mod);
    let validMod = false;
    for (var i = 0; i < modsInfo.length; i++) {
      if (modsInfo[i].moduleCode === mod) {
        validMod = true;
      }
    }
    if (validMod) {
      console.log(mod);
    } else {
      toast.warn('No such module', {
        position: "bottom-right",
        autoClose: 400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
	}

  function searchForModInfo(moduleName) {
    for (var i = 0; i < modsInfo.length; i++) {
      if (modsInfo[i].moduleCode === moduleName) {
        return modsInfo[i];
      }
    }
    return "No such mod";
  }

  const url = "https://api.nusmods.com/v2/2021-2022/moduleInfo.json";
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      const item = data;
      setmodsInfo(item);
    }
    fetchData()
  }, [])
  

  return (
    <div className="modInfo">
      <h1>ModInfo</h1>
      <div>
        <form 
        autoComplete="off"
        onSubmit={handleSearchMod}>
        <input 
          style={{ margin: "0 1rem" }}
          type="text"
          value={mod}
          onChange={(event) => setMod(event.target.value)}/>
          <input 
            type="submit" 
            value="Add" 
          />
        </form>
        
      </div>
      <div>
          {!modsInfo 
          ? <div>loading...</div>
          : <div>
            <div><h4>Title: </h4>{searchForModInfo(mod).title}</div>
            <div><h4>Description: </h4>{searchForModInfo(mod).description}</div>
            <div><h4>Module Credit: </h4> {searchForModInfo(mod).moduleCredit}</div>
            </div>} 
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
    </div>
  )
}

export default ModInfo;