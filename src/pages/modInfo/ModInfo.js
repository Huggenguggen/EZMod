import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModInfo() {
  const [modsInfo, setmodsInfo] = useState(null);
  const [modName, setModName] = useState("");

  function handleSearchMod(event) {
		event.preventDefault();
		setModName(modName);
    let validMod = false;
    for (var i = 0; i < modsInfo.length; i++) {
      if (modsInfo[i].moduleCode === modName.toUpperCase()) {
        validMod = true;
      }
    }
    if (validMod) {
      console.log(modName);
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
      if (modsInfo[i].moduleCode === moduleName.toUpperCase()) {
        return modsInfo[i];
      }
    }
    return {};
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
          value={modName}
          onChange={(event) => setModName(event.target.value)}/>
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
            <div><h4>Title: </h4>{searchForModInfo(modName).title}</div>
            <div><h4>Description: </h4>{searchForModInfo(modName).description}</div>
            <div><h4>Prerequisites: </h4>{searchForModInfo(modName).prerequisite 
                                          ? searchForModInfo(modName).prerequisite
                                          : "No corequisites"}</div>
            <div><h4>Preclusion: </h4>{searchForModInfo(modName).preclusion 
                                          ? searchForModInfo(modName).preclusion
                                          : "No corequisites"}</div>
            <div><h4>Corequisite: </h4>{searchForModInfo(modName).corequisite 
                                          ? searchForModInfo(modName).corequisite
                                          : "No corequisites"}</div>
            <div><h4>Module Credit: </h4> {searchForModInfo(modName).moduleCredit}</div>
            </div>} 
      </div>
      <ToastContainer
        position="top-right"
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