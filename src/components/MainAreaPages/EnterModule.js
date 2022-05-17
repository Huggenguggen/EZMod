import "./EnterModule.css";

function EnterModule() {
  return (
      <div>
        <h4>Add Module</h4>
          <label>
            Module: 
            <input
              className="moduleInput"
              type="text"
            />
          </label>
          <button type="button">Add</button>
      </div>
  )
}

export default EnterModule;