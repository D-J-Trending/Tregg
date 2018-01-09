import React from "react";
import "./chartFilter.css";

export const chartFilter = props => (
  <div className="chart-filter" {...props}>
  	{props.children}
  	<button className='button'{...props}> Similar Categories</button>
  	<button className='button' value='$' onClick={props.checkClick}> $ </button>
  	<button className='button' value='$$' onClick={props.checkClick}> $$ </button>
  	<button className='button' value='$$$' onClick={props.checkClick}> $$$ </button>
  	<button className='button' value='$$$$' onClick={props.checkClick}> $$$$ </button>	 
  </div>
)

export default chartFilter;