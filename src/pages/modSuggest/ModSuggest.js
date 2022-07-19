import { React, useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import Autocomplete from "react-autocomplete";
import 'react-toastify/dist/ReactToastify.css'; 
import { v4 as uuidv4 } from 'uuid';
import ModCompare from "./ModCompare";

function ModSuggest() {
  const [mods, setMods] = useState([]);
  const [roundSelect, setRoundSelect] = useState("Round 0");
  const [modRegData, setmodRegData] = useState([]);
  const [newModText, setNewModText] = useState("");

  useEffect(() => {
    let mods = [];
    if (localStorage.getItem('modSuggest')) {
      mods = JSON.parse(localStorage.getItem('modSuggest'));
      setMods(mods);
    }
    getModRegData(roundSelect);
  }, [])

  async function getModRegData(query) {
    let api_req = "";
    if (query === "Round 0") {
      api_req += "https://raw.githubusercontent.com/Huggenguggen/modreg-scraper/main/2021-2022%20Sem%202/2021-2022%20Round%200/20212022S2R0mongo.json";
    } else if (query === "Round 1") {
      api_req += "https://raw.githubusercontent.com/Huggenguggen/modreg-scraper/main/2021-2022%20Sem%202/2021-2022%20Round%201/20212022S2R1mongo.json";
    } else if (query === "Round 2") {
      api_req += "https://raw.githubusercontent.com/Huggenguggen/modreg-scraper/main/2021-2022%20Sem%202/2021-2022%20Round%202/20212022S2R2mongo.json";
    } else {
      api_req += "https://raw.githubusercontent.com/Huggenguggen/modreg-scraper/main/2021-2022%20Sem%202/2021-2022%20Round%203/20212022S2R3mongo.json";
    }
    fetch(api_req).then((response) => response.json())
      .then((responseJson) => {
        const item = responseJson;
        setmodRegData(item);
        //console.log("modRegData", modRegData);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  
  function makeMod(modtext) {
    if (modtext !== '') {
			const newMod = {
				id: uuidv4(),
				description: modtext,
			};

      addNewMod(newMod);

      setNewModText('');
    }
    
    
  }

  function handleAddMod(value) {
    //event.preventDefault();
    makeMod(value.toUpperCase())
    getModRegData(roundSelect)
  }

  function addNewMod(newMod) {
    if (modRegData !== [] && modRegData.find((mod) => 
                    mod["Module\rCode"] === newMod.description) !== undefined) {
    if (mods.every((mod) => mod.description !== newMod.description)) {
      let prevMods = [...mods, newMod];
      setMods((prev) => {
        return [...prev, newMod];
      });
      localStorage.setItem('modSuggest', JSON.stringify(prevMods));
    } else {
      console.log("Mod already in plan");
    }
  } else {
    toast.warn('No information on this module in this round', {
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

  function getInfo(modCode) {
    if (modRegData!== []) {
      const module = modRegData.find((mod) => mod["Module\rCode"] === modCode);
      if (module !== undefined) {
        return (module.Demand / module.Vacancy).toFixed(2);
      } else {
        return 0;
      }
    }
    return "loading...";
  }
  
  function removeMod(event) {
    console.log(event.target.id)
    const filteredMods = mods.filter((mod) => mod.id !== event.target.id);
    localStorage.setItem('modSuggest', JSON.stringify(filteredMods));
    setMods(filteredMods);
  }
  
  function handleSelectRound(event) {
    event.preventDefault();
    setRoundSelect(event.target.value);
    //console.log("round Select", roundSelect);
    getModRegData(event.target.value);
  }
  
  
  
  return (
  <div>
    <h1>
      ModSuggest
    </h1>
    <div>
        <form>
          <label>
            Pick the ModReg round!
            <select value={roundSelect} onChange={(event) => {
                          handleSelectRound(event);
                          }}>
              <option value="Round 0">Round 0</option>
              <option value="Round 1">Round 1</option>
              <option value="Round 2">Round 2</option>
              <option value="Round 3">Round 3</option>
              </select> 
          </label>
        </form>
        <label>Modules:</label>
        <Autocomplete
          items={modRegData}
          shouldItemRender={(item, modName) => item["Module\rCode"].toUpperCase().indexOf(modName.toUpperCase()) > -1}
          getItemValue={item => item["Module\rCode"]}
          renderItem={(item, highlighted) =>
            <div
              key={item["id"]}
              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
            >
              {item["Module\rCode"]}
            </div>
          }
          value={newModText}
          onChange={(event) => {
              setNewModText(event.target.value.toUpperCase())
          }}
          onSelect={(value) => {
            setNewModText(value)
            handleAddMod(value)
          }}
        />
        {/* <form onSubmit={handleAddMod}>
          <label>
            Modules:
            <input
              style={{ margin: "0 auto", width: "100%" }}
              type="text"
              value={newModText}
              onChange={(event) => setNewModText(event.target.value)}
            />
          </label>
        </form> */}
      </div>

      <div>
        <table style={{ margin: "0 auto", 
                        width: "100%", 
                        fontSize: "15px", 
                        borderSpacing: "5px"}}>
          <thead>
            <tr>
              <th>Module</th>
              <th>Demand/Vacancy Ratio</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {mods.sort((mod1, mod2) => getInfo(mod2.description) - getInfo(mod1.description)).map((mod) => (
              <tr key={mod.description} style={{textAlign: "center"}}>
                <td>{mod.description}</td>
                <td style={{textAlign: "center"}}>
                  {getInfo(mod.description)}
                </td>
                <td style={{textAlign: "center"}}>
                  <input 
                    className="btn-action"
                    id={mod.id}
                    type="button" 
                    value="remove"
                    onClick={removeMod} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h4>*Demand/Vacancy Ratio: The higher the more in-demand, if the ratio is 0, there is no information for the module for this round</h4>
      </div>
      <div style={{paddingTop: "10rem"}}>
        <ModCompare />
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

export default ModSuggest;