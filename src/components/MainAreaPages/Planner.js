import "./Planner.css";
import ModulePlanner from "./ModulePlanner";

function Planner() {
  return (
    <div className="Planner">
      Make ModReg EZ

      <div id="ModulePlan">
        <div id="y1"> 
          <header className="subHead">
            <ModulePlanner year="Year 1"/>
          </header>
        </div>
        <div id="y2"> 
          <header className="subHead">
            <ModulePlanner year="Year 2"/>
          </header>
        </div>
        <div id="y3"> 
          <header className="subHead">
            <ModulePlanner year="Year 3"/>
          </header>
        </div>
        <div id="y4"> 
          <header className="subHead">
            <ModulePlanner year="Year 4"/>
          </header>
        </div>
    </div>
    </div>
  )
}

export default Planner;