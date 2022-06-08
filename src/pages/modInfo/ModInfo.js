import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import "./ModInfo.css";

function ModInfo() {
  const [modName, setModName] = useState("");
  const [evenMoreInfo, setevenMoreInfo] = useState(null);

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
      console.log("OR subtree", subtree);
      return (
        <div>
          {subtree[0].hasOwnProperty('and')
                  ? displayAnd(subtree[0].and)
                  : <h5>{subtree[0]}</h5>}
          {subtree.slice(1).map(mods =>  mods.hasOwnProperty('and')
                        ? <div><h4>OR</h4>{displayAnd(mods.and)}</div>
                        : <div><h4>OR</h4><h5>{mods}</h5></div>)}
        </div>
      )
    }
  
    function displayAnd(subtree) {
      console.log("AND subtree", subtree);
      return (
        <div>
          {subtree[0].hasOwnProperty('or')
                ? displayOr(subtree[0].or)
                : <h5>{subtree[0]}</h5>}
          {subtree.slice(1).map(mods => mods.hasOwnProperty('or')
                                ? <div><h4>AND</h4>{displayOr(mods.or)}</div>
                                : <div><h4>AND</h4><h5>{mods}</h5></div>)}
        </div>
      )
    }
    //top level and
    if (tree.hasOwnProperty('and')) {
      return displayAnd(tree.and);
    } else {
      return (
        <div>
          {tree.hasOwnProperty('or')
            ? displayOr(tree.or)
            : <h5>{tree}</h5>}
        </div>
      )
    }
  }

  function handlePreclusions(preclusions) {
    console.log("preclusions", preclusions);
    const regex = /([A-Z]{2}\d{4}[A-Z]|[A-Z]{2}\d{4}|[A-Z]{3}\d{4})/gi;
    const matches = [...preclusions.matchAll(regex)];
    console.log("preclus matches", matches);
    if (matches.length > 0) {
      return matches.map(mod => <h4>{mod[0]}</h4>)
    }
    else {
      return <h4>Not enough information at this time :(</h4>
    }
  }

  function handleCoreqs(coreqs) {
    console.log("corequisites", coreqs);
    const regex = /([A-Z]{2}\d{4}[A-Z]|[A-Z]{2}\d{4}|[A-Z]{3}\d{4})/gi;
    const matches = [...coreqs.matchAll(regex)];
    console.log("coreq matches", matches);
    if (matches.length > 0) {
      return matches.map(mod => <h4>{mod[0]}</h4>)
    }
    else {
      return <h4>Not enough information at this time :(</h4>
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
      <div className="ModuleInfo">
            <div id="title">
            <h3> Module Title: </h3>
              {evenMoreInfo !== null && evenMoreInfo.hasOwnProperty('title')
                              ? <h4>{evenMoreInfo.title}</h4>
                              : "No title"} 
            </div>
            <div id="description"> 
            <h3> Description: </h3>
              {evenMoreInfo !== null
                ? <h5>{evenMoreInfo.description}</h5>
                : "No description"}
            </div>
            <div id="credits"> 
            <h3> Module Credits: </h3>
              {evenMoreInfo !== null
                ? <h5>{evenMoreInfo.moduleCredit}</h5>
                : "No description"}
            </div>
            <div id="fulfill">
            <h3> Fulfill Requirements: </h3>
             {evenMoreInfo !== null && evenMoreInfo.hasOwnProperty('fulfillRequirements') 
                                      ? evenMoreInfo.fulfillRequirements.map(mod => <h4>{mod}</h4>)
                                      : "Does not fulfill any requirements"}
            </div>
            <div id="prereq">
            <h3> Prerequisites: </h3>
              {evenMoreInfo !== null && evenMoreInfo.hasOwnProperty('prereqTree')
                              ? displayPrereqTree(evenMoreInfo.prereqTree)
                              : "No Prereqs"}
            </div>
            <div id="preclu">
            <h3> Preclusions: </h3>
              {evenMoreInfo !== null && evenMoreInfo.hasOwnProperty('preclusion')
                              ? handlePreclusions(evenMoreInfo.preclusion)
                              : "No Preclusions"}
            </div>
            <div id="coreq">
            <h3> Corequisites: </h3>
              {evenMoreInfo !== null && evenMoreInfo.hasOwnProperty('corequisite')
                              ? handleCoreqs(evenMoreInfo.corequisite)
                              : "No Corequisites"}
            </div>
      </div>
    </div>
  )
}

export default ModInfo;