import { React, useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { v4 as uuidv4 } from 'uuid';

function ModCompare() {
  const [mods, setMods] = useState([]);
  const [modReg0Data, setmodReg0Data] = useState([]);
  const [modReg1Data, setmodReg1Data] = useState([]);
  const [modReg2Data, setmodReg2Data] = useState([]);
  const [modReg3Data, setmodReg3Data] = useState([]);
  const [newModText, setNewModText] = useState("");

  useEffect(() => {
    let mods = [];
    if (localStorage.getItem('modCompare')) {
      mods = JSON.parse(localStorage.getItem('modCompare'));
      setMods(mods);
    }
    getModRegData();
  }, [])

  function getModRegData() {
    getModReg0Data();
    getModReg1Data();
    getModReg2Data();
    getModReg3Data();
  }

  async function getModReg0Data() {
    let api_req = "https://raw.githubusercontent.com/Huggenguggen/modreg-scraper/main/2021-2022%20Sem%202/2021-2022%20Round%200/20212022S2R0mongo.json";
    fetch(api_req).then((response) => response.json())
      .then((responseJson) => {
        const item = responseJson;
        setmodReg0Data(item);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async function getModReg1Data() {
    let api_req = "https://raw.githubusercontent.com/Huggenguggen/modreg-scraper/main/2021-2022%20Sem%202/2021-2022%20Round%201/20212022S2R1mongo.json";
    fetch(api_req).then((response) => response.json())
      .then((responseJson) => {
        const item = responseJson;
        setmodReg1Data(item);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async function getModReg2Data() {
    let api_req = "https://raw.githubusercontent.com/Huggenguggen/modreg-scraper/main/2021-2022%20Sem%202/2021-2022%20Round%202/20212022S2R2mongo.json";
    fetch(api_req).then((response) => response.json())
      .then((responseJson) => {
        const item = responseJson;
        setmodReg2Data(item);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async function getModReg3Data() {
    let api_req = "https://raw.githubusercontent.com/Huggenguggen/modreg-scraper/main/2021-2022%20Sem%202/2021-2022%20Round%203/20212022S2R3mongo.json";
    fetch(api_req).then((response) => response.json())
      .then((responseJson) => {
        const item = responseJson;
        setmodReg3Data(item);
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

  function handleAddMod(event) {
    event.preventDefault();
    makeMod(newModText.toUpperCase())
    getModRegData()
  }

  function addNewMod(newMod) {
    if ((modReg0Data !== [] && modReg0Data.find((mod) => 
                    mod["Module\rCode"] === newMod.description) !== undefined) || 
        (modReg1Data !== [] && modReg1Data.find((mod) => 
                    mod["Module\rCode"] === newMod.description) !== undefined) || 
        (modReg2Data !== [] && modReg2Data.find((mod) => 
                    mod["Module\rCode"] === newMod.description) !== undefined) || 
        (modReg3Data !== [] && modReg3Data.find((mod) => 
                      mod["Module\rCode"] === newMod.description) !== undefined)) {
    if (mods.every((mod) => mod.description !== newMod.description)) {
      let prevMods = [...mods, newMod];
      setMods((prev) => {
        return [...prev, newMod];
      });
      localStorage.setItem('modCompare', JSON.stringify(prevMods));
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

  function getRound0Info(modCode) {
    if (modReg0Data!== []) {
      const module = modReg0Data.find((mod) => mod["Module\rCode"] === modCode);
      if (module !== undefined) {
        return (module.Demand / module.Vacancy).toFixed(2);
      } else {
        return 0;
      }
    }
    return "loading...";
  }

  function getRound1Info(modCode) {
    if (modReg1Data!== []) {
      const module = modReg1Data.find((mod) => mod["Module\rCode"] === modCode);
      if (module !== undefined) {
        return (module.Demand / module.Vacancy).toFixed(2);
      } else {
        return 0;
      }
    }
    return "loading...";
  }
  
  function getRound2Info(modCode) {
    if (modReg2Data!== []) {
      const module = modReg2Data.find((mod) => mod["Module\rCode"] === modCode);
      if (module !== undefined) {
        return (module.Demand / module.Vacancy).toFixed(2);
      } else {
        return 0;
      }
    }
    return "loading...";
  }

  function getRound3Info(modCode) {
    if (modReg3Data!== []) {
      const module = modReg3Data.find((mod) => mod["Module\rCode"] === modCode);
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
    localStorage.setItem('modCompare', JSON.stringify(filteredMods));
    setMods(filteredMods);
  }
  
  
  
  return (
  <div>
    <h1>
      ModCompare
    </h1>
    <div>
        <form onSubmit={handleAddMod}>
          <label>
            Modules:
            <input
              style={{ margin: "0 auto", width: "100%" }}
              type="text"
              value={newModText}
              onChange={(event) => setNewModText(event.target.value)}
            />
          </label>
        </form>
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
            {mods.map((mod) => (
              <tr key={mod.description} style={{textAlign: "center"}}>
                <td>{mod.description}</td>
                <td style={{textAlign: "center"}}>
                  <div>
                    <div>
                      Round 0: {getRound0Info(mod.description)}
                    </div>
                    <div>
                      Round 1: {getRound1Info(mod.description)}
                    </div>
                    <div>
                      Round 2: {getRound2Info(mod.description)}
                    </div>
                    <div>
                      Round 3: {getRound3Info(mod.description)}
                    </div>
                  </div>
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

export default ModCompare;