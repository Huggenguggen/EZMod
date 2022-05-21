import React, { useState } from "react";
import "./EnterModule.css";

function EnterModule() {
  const [mods, setMods] = useState([]);
  const [newModText, setNewModText] = useState("");

  function handleAddMod(event) {
    event.preventDefault();
    addMod(newModText);
  }

  function addMod(description) {
    if (description !== "") {
      const newMods = [
        ...mods,
        {
          description: description,
        }
      ];
      setMods(newMods);
      console.log(newMods);
      setNewModText("");
    }
  }

  return (
    <>
      <div>
        <h2>Add Module</h2>
        <form onSubmit={handleAddMod}>
          <label>
            Module:
            <input
              style={{ margin: "0 1rem" }}
              type="text"
              value={newModText}
              onChange={(event) => setNewModText(event.target.value)}
            />
          </label>
          <input 
            type="submit" 
            value="Add" 
          />
        </form>
      </div>

      <div>
        <table style={{ margin: "0 auto", width: "100%" }}>
          <thead>
            <tr>
              <th>Module</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {mods.map((mod) => (
              <tr key={mod.description}>
                <td>{mod.description}</td>
                <td>
                  <input 
                    type="submit" 
                    value="remove"
                    onClick={() => setNewModText("")} 
                    // Remove button does not work yet 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EnterModule;