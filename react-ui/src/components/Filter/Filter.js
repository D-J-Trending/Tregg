import React from "react";
import "./Filter.css";

export const Filter = props => (
  <div className="filter" {...props}>
  	{props.children}
  	<button className='button'{...props}> Similar Categories</button>
  	<button className='button'{...props}> $ </button>
  	<button className='button'{...props}> $$ </button>
  	<button className='button'{...props}> $$$ </button>
  	<button className='button'{...props}> $$$$ </button>	 
  </div>
)

export default Filter;