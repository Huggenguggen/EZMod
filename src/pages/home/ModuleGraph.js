import React from "react";
import { Tree } from "react-tree-graph";
import "./ModuleGraph.css";

function ModuleGraph() {
  const data = {
    name: "Parent Module",
    children: [
      {
        name: "Module One"
      },
      {
        name: "Module Two"
      }
    ]
  };

  return (
    <div className="custom-container">
      <Tree data={data} height={1000} width={300} />
    </div>
  );
}

export default ModuleGraph;