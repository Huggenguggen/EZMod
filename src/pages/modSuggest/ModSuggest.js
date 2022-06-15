import { React, useState, useEffect } from "react";
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "./ModSuggest.css";

function ModSuggest() {
  const [modOne, setmodOne] = useState("");
  const [roundSelect, setRoundSelect] = useState("Round 0");
  const [modRegData, setmodRegData] = useState([]);

  useEffect(() => {
    async function getModRegData(query) {
      let api_req = "http://localhost:5000/2021-2022-S2-";
      if (query == "Round 0") {
        api_req += "R0";
      } else if (query == "Round 1") {
        api_req += "R1";
      } else if (query == "Round 2") {
        api_req += "R2";
      } else {
        api_req += "R3";
      }
      console.log(api_req);
      const response = await axios.get(api_req);
      const json = await response.data;
      setmodRegData(json);
      console.log(modRegData);
    }

    getModRegData(roundSelect);
  }, [])
  
  function handleSubmit(event) {
    event.preventDefault();
		setmodOne(modOne.toUpperCase());
    console.log(modOne);
  }


  const options = [
    'Round 0', 
    'Round 1',
    'Round 2',
    'Round 3'
  ]
  const defaultOption = options[0];
  return (
  <div>
    <h1>
      ModSuggest
    </h1>
    <form 
        autoComplete="off">
        <input 
          onSubmit={handleSubmit}
          style={{ margin: "0 1rem" }}
          type="text"
          value={modOne}
          onChange={(event) => setmodOne(event.target.value)}/>
        <input 
          className="btn-action"
          type="button" 
          value="Get info"
          onClick={handleSubmit} 
          />
      </form>
    <Dropdown options={options} onChange={setRoundSelect} value={defaultOption} placeholder="Select an option" />

    <div>
    <div>
      <div>{modRegData !== [] 
              ? <h4>{modRegData[0]["Module\rCode"]}</h4>
              : "loading..."}</div>
    </div>
    </div>
  </div>
  )
}

export default ModSuggest;