import React from "react";
import "./Filter.css";

export const Filter = props => (
  <div className="filter" {...props}>
  	{props.children}
  	<button {...props}> Similar Categories</button>
  	<button {...props}> $ </button>
  	<button {...props}> $$ </button>
  	<button {...props}> $$$ </button>
  	<button {...props}> $$$$ </button>	 
  </div>
)

export default Filter;