import EnterModule from "./EnterModule";

function ModulePlanner(props) {
	const { year, category, onNewMod, mods, onDelete } = props;

	return (
		<div className='ModulePlanner'>
			<h1 style={ {fontSize: "25px"} }>{year}</h1>
			<EnterModule
				category={category}
				onNewMod={onNewMod}
				mods={mods}
				onDelete={onDelete}
			/>
		</div>
	);
}

export default ModulePlanner;