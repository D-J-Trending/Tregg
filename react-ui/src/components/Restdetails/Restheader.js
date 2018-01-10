import React, {Component} from 'react';
import "./Restdetails.css";

export class Restheader extends Component {

constructor(props) {
		super(props)
	};

stars = () => {
	console.log('foo')
	console.log(this.props.yelpRating)
	switch (this.props.yelpRating) {
		case 4:
			return <img src='yelp_stars/web_and_ios/regular/regular_4.png' alt='yelpimg'/>
		case 4.5: 
			return <img src='yelp_stars/web_and_ios/regular/regular_4_half.png' alt='yelpimg'/>
	}
	
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
					<span><a target='blank' href={this.props.yelpURL}> Yelp Stars</a>:{this.stars()} &#124; </span>
					<span><a target='blank' href={this.props.fb_url}> FB Rating</a>: {this.props.fbRating}</span>				
				</div>		
				</div>		
			</div>
		)
	}	
}