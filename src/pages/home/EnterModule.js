import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./EnterModule.css";

function EnterModule(props) {
	const { category, onNewMod, mods, onDelete } = props;
  const [newModText, setNewModText] = useState("");

  let filteredMods = [];

  if (mods !== null) {
    filteredMods = mods.filter((mod) => mod.category === category);
  }
  
  function handleAddMod(event) {
		event.preventDefault();
		addMod(newModText);
	}

  function removeMod(event) {
    onDelete(event.target.id);
  }

  function addMod(description) {
		if (description !== '') {
			const newMod = {
				id: uuidv4(),
				description: description,
				category: category,
			};

			onNewMod(newMod);

			setNewModText('');
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
            {filteredMods.map((mod) => (
              <tr key={mod.description}>
                <td>{mod.description}</td>
                <td>
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
    </>
  );
}

export default EnterModule;