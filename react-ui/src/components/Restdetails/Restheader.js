import React, {Component} from 'react';
import "./Restdetails.css";

export class Restheader extends Component {

constructor(props) {
		super(props)
	};

stars = () => {
	console.log('foo')
	return
}

	render() {
		return (
			<div className='column is-12'>
			  	<div className='columns'>
				<div className='column is-3'>
					<span className='restaurant-header'>{this.props.restaurantName}</span>		
					<p className='restaurant-address'>{this.props.address}, {this.props.city}, {this.props.state}</p>		      						
				</div>
				<div className='column auto'>
					<span className='rank-section'>Trending Rank: <span className='rank-number'>{this.props.rank}</span></span><br/>
					<span><a target='blank' href={this.props.yelpURL}> Yelp Stars</a>:{this.stars()}<img src='yelp_stars/web_and_ios/regular/regular_1.png' alt='yelpimg'/>{this.props.yelpRating} &#124; </span>
					<span><a target='blank' href={this.props.fb_url}> FB Rating</a>: {this.props.fbRating}</span>				
				</div>		
				</div>		
			</div>
		)
	}	
}