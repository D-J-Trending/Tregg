import React from "react";
import "./ChartFilter.css";



export const ChartFilter = props => (


  <div className="chart-filter" {...props}>
  	{props.children}
  	<button className='button chart-filter'{...props}> Similar Categories</button>
  	<div className="prices">
	  	<button className={props.filter1} value='$' onClick={props.checkClick1}> $ </button>
	  	<button className={props.filter2} value='$$' onClick={props.checkClick2}> $$ </button>
	  	<button className='button' value='$$$' onClick={props.checkClick3}> $$$ </button>
	  	<button className='button' value='$$$$' onClick={props.checkClick4}> $$$$ </button>
  	</div>
  </div>
)

export default ChartFilter;

