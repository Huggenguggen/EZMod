import EnterModule from "./EnterModule";
import "./ModulePlanner.css";

function ModulePlanner(props) {
	const { year, category, mods, onNewMod, onDelete } = props;

	return (
		<div className='ModulePlanner'>
			<h1 style={ {fontSize: "25px"} }>{year}</h1>
			<EnterModule
				category={category}
				mods={mods}
        onNewMod={onNewMod}
				onDelete={onDelete}
			/>
		</div>
	);
}

export default ModulePlanner;