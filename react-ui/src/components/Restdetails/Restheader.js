import React, {Component} from 'react';
import "./Restdetails.css";

export class Restheader extends Component {

	arrows = (value) => {
	  const numberWithoutPercent = value.slice(0, -1)
	  
	  if(numberWithoutPercent > 0) {
	    return <i className="fa fa-sort-asc"></i>
	  } else if(numberWithoutPercent < 0) {
	    return <i className="fa fa-sort-desc"></i>
	  } else{
	    return
	  }
	};	

	colors = (value) => {
	  const numberWithoutPercent = value.slice(0, -1)
	  
	  if(numberWithoutPercent > 0) {
	    return <span className='green-up'> Trending Score: {this.props.trendingScore}{this.arrows(this.props.trendingScore)}</span>
	  } else if(numberWithoutPercent < 0) {
	    return <span className='red-down'> Trending Score: {this.props.trendingScore}{this.arrows(this.props.trendingScore)}</span>
	  } else{
	    return
	  }
	};	

	stars = () => {
		// console.log(this.props.yelpRating)
		switch (this.props.yelpRating) {
			case 1:
				return <img src='img/yelp_stars/web_and_ios/regular/regular_1.png' alt='yelpimg'/>
			case 1.5:
				return <img src='img/yelp_stars/web_and_ios/regular/regular_1_half.png' alt='yelpimg'/>
			case 2:
				return <img src='img/yelp_stars/web_and_ios/regular/regular_2.png' alt='yelpimg'/>
			case 2.5:
				return <img src='img/yelp_stars/web_and_ios/regular/regular_2_half.png' alt='yelpimg'/>
			case 3:
				return <img src='img/yelp_stars/web_and_ios/regular/regular_3.png' alt='yelpimg'/>
			case 3.5:
				return <img src='img/yelp_stars/web_and_ios/regular/regular_3_half.png' alt='yelpimg'/>							
			case 4:
				return <img src='img/yelp_stars/web_and_ios/regular/regular_4.png' alt='yelpimg'/>
			case 4.5: 
				return <img src='img/yelp_stars/web_and_ios/regular/regular_4_half.png' alt='yelpimg'/>
			case 5: 
				return <img src='img/yelp_stars/web_and_ios/regular/regular_5.png' alt='yelpimg'/>	
		}	
	}

	render() {
		return (
			<div className={this.props.mainColumnClass} value={this.props.value} onClick={this.props.onClick}>
			  	<div className='columns'>
					<div className={this.props.columnClass}>
						<span className='restaurant-header'>{this.props.restaurantName}</span>		
						<p className='restaurant-address'>{this.props.address}, {this.props.city}, {this.props.state}</p>		      						
					</div>
					<div className='column auto'>
						<span className='rank-section'>Rank: {this.props.rank}<span className='rank-number'>{this.colors(this.props.trendingScore)}</span></span><br/>
						<span><a target='blank' href={this.props.yelpURL}> <img className='yelp-trademark' src='img/Yelp_trademark_RGB_outline.png' alt='yelp-trademark'/></a>{this.stars()} &#124; </span>
						<span><a target='blank' href={this.props.fb_url}> <img className='fb-trademark' src='img/FB-f-Logo__blue_29.png' alt='facebook-trademark'/></a> {this.props.fbRating}</span>				
					</div>
							
				</div>		
			</div>
		)
	}	
}