import React from "react";
import "./chartFilter.css";

export const chartFilter = props => (
  <div className="chart-filter" {...props}>
  	{props.children}
  	<button className='button'{...props}> Similar Categories</button>
  	<div className="prices">
  	<button className='button' value='$' onClick={props.checkClick}> $ </button>
  	<button className='button' value='$$' onClick={props.checkClick}> $$ </button>
  	<button className='button' value='$$$' onClick={props.checkClick}> $$$ </button>
  	<button className='button' value='$$$$' onClick={props.checkClick}> $$$$ </button>
  	</div>
  </div>
)

export default chartFilter;