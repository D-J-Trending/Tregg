import React from "react";
import "./Restdetails.css";

export const Restheader = props => (
  <div className='column is-12'>
  	<div className='columns'>
			<div className='column is-3'>
				<span className='restaurant-header'>{props.restaurantName}</span>		
				<p className='restaurant-address'>{props.address}, {props.city}, {props.state}</p>		      						
			</div>
			<div className='column auto'>
				<span className='rank-section'>Trending Rank: <span className='rank-number'>7</span></span><br/>
				<span><a target='blank' href={props.yelpURL}> Yelp Stars</a>: {props.yelpRating} &#124; </span>
				<span> FB Rating: {props.fbRating}</span>				
			</div>		
		</div>		
	</div>
);