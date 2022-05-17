import React from "react";
import { Link } from "react-router-dom";

function Home() {
	return(
		<div> 
			<h1>Home</h1>
			<br />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/planner">Planner</Link>
        </li>
      </ul>
		</div>
	);
}

export default Home;