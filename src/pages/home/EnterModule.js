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
    //console.log(description, description);
		if (description !== '') {
			const newMod = {
				id: uuidv4(),
				description: description.toUpperCase(),
				category: category,
			};

			onNewMod(newMod);

			setNewModText('');
		} else {

    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleAddMod}>
          <label>
            Module:
            <input
              style={{ margin: "0 auto", width: "100%" }}
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
        <table style={{ margin: "0 auto", 
                        width: "100%", 
                        fontSize: "15px", 
                        borderSpacing: "5px" }}>
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