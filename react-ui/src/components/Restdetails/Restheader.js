import React from "react";
import "./Restdetails.css";

export const Restheader = props => (
  <div className='column is-12'>
		<div>
			<span className='restaurant-header'>{props.restaurantHeader}</span>
			<span className='rank-section'>Trending Rank: <span className='rank-number'>4</span></span>				      						
		</div>
		<p className='restaurant-address'>
			{props.address}, {props.city}, {props.state} &#8226;	
			<a target='blank' href={props.yelpURL}> Yelp Page</a>	
		</p>
	</div>
);