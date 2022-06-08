import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModInfo() {
  //const [modsInfo, setmodsInfo] = useState(null);
  const [modName, setModName] = useState("");
  const [evenMoreInfo, setevenMoreInfo] = useState(null);

  //const url = "https://api.nusmods.com/v2/2021-2022/moduleInfo.json";
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     const item = data;
  //     setmodsInfo(item);
  //   }
  //   fetchData()
  // }, [])

  //queries for even more information from the nusmods API
  async function queryMod(query) {
    let api_req = "https://api.nusmods.com/v2/2021-2022/modules/";
    api_req += query + ".json";
    fetch(api_req).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
    .then((responseJson) => {
      const item = responseJson;
      setevenMoreInfo(item);
      console.log("evenMoreInfo", evenMoreInfo);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function displayPrereqTree(tree) {
    console.log(tree);
    //assumes that there are or options
    function displayOr(subtree) {
      return (
        <div>
          {subtree.or.map(mod => <div><h4>OR</h4><h5>{mod}</h5></div>)}
        </div>
      )
    }
    //top level and
    if (tree.hasOwnProperty('and')) {
      return (
        <div>
          {tree.and.map(mods => mods.hasOwnProperty('or')
                            ? <div><h4>AND</h4>{displayOr(mods)}</div>
                            : <div><h4>AND</h4><h5>{mods}</h5></div>)}
        </div>
      )
    } else {
      return (
        <div>
          {tree.hasOwnProperty('or')
            ? displayOr(tree.or)
            : <h5>{tree[0]}</h5>}
        </div>
      )
    }
  }
  

  return (
    <div className="modInfo">
      <h1>ModInfo</h1>
      <div>
        <form 
        autoComplete="off">
        <input 
          style={{ margin: "0 1rem" }}
          type="text"
          value={modName}
          onChange={(event) => {
            setModName(event.target.value.toUpperCase())
            queryMod(event.target.value.toUpperCase())
            }}/>
        </form>
        
      </div>
      <div>
          <div>
            <h3>
              Fulfill Requirements: {evenMoreInfo !== null && evenMoreInfo.hasOwnProperty('fulfillRequirements') 
                                      ? evenMoreInfo.fulfillRequirements.map(mod => <h4>{mod}</h4>)
                                      : "Does not fulfill any requirements"}
            </h3>
            <h3>
              Prerequisites: {evenMoreInfo !== null && evenMoreInfo.hasOwnProperty('prereqTree')
                              ? displayPrereqTree(evenMoreInfo.prereqTree)
                              : "No Prereqs"}
            </h3>
          </div> 
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