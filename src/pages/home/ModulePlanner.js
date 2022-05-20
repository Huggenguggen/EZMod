import EnterModule from "./EnterModule";

function ModulePlanner(props) {
  const { year } = props;

  return (
    <div className="ModulePlanner">
      <h1>
        {year}
      </h1>
      <EnterModule />
    </div>
  )
}

export default ModulePlanner;