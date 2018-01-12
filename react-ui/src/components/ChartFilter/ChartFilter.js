import React from "react";
import "./ChartFilter.css";



export const ChartFilter = props => (


  <div className="chart-filter" {...props}>
    <div className="filter-header">
      <p className="has-text-centered">Filter</p>
    </div>
  	{props.children}
    <button className={props.green6} onClick={props.averageClick}>All Restaurants Avg</button>
  	<button className={props.green5} onClick={props.categoryClick}> Similar Categories</button>
  	<div className="prices">
	  	<button className={props.green1} style={props.filter1} value='$' onClick={props.checkClick1}> $ </button>
	  	<button className={props.green2} style={props.filter2} value='$$' onClick={props.checkClick2}> $$ </button>
	  	<button className={props.green3} style={props.filter3} value='$$$' onClick={props.checkClick3}> $$$ </button>
	  	<button className={props.green4} style={props.filter4} value='$$$$' onClick={props.checkClick4}> $$$$ </button>
      <button onClick={props.removeSecondLine}>Restaurant Only</button>
  	</div>
  </div>
)

export default ChartFilter;
