import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./EnterModule.css";
import Autocomplete from 'react-autocomplete';
import moduleList from '../../ref/moduleList.json';

function EnterModule(props) {
	const { category, mods, onNewMod, onDelete } = props;
  const [newModText, setNewModText] = useState("");

  let filteredMods = [];

  if (mods !== null) {
    filteredMods = mods.filter((mod) => mod.category === category);
  }
  
  function handleAddMod(value) {
		addMod(value);
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
        <h3 id="moduleText">Module: </h3>
        <form 
          onSubmit={(event) => {
            event.preventDefault();
            handleAddMod(newModText);
          }}>
          <label>
            <Autocomplete
            items={moduleList}
            shouldItemRender={(item, modName) => item.moduleCode.toUpperCase().indexOf(modName.toUpperCase()) > -1}
          getItemValue={item => item.moduleCode}
          renderItem={(item, highlighted) =>
            <div
              key={item.moduleCode}
              style={{ backgroundColor: highlighted ? '#eee' : 'transparent', 
                        color: "black"}}
            >
              {item.moduleCode}
            </div>
          }
            value={newModText}
            onChange={(event) => setNewModText(event.target.value)}
            onSelect={(value) => handleAddMod(value)}
            />
          </label>
          <input 
            onSubmit={(event) => {
              event.preventDefault();
              handleAddMod(event.target.value);
            }}
            type="submit" 
            value="Add" 
          />
        </form>
      </div>

      <div id="moduleTable">
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