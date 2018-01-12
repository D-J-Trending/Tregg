import React, {Component} from 'react';

class Stats extends Component {
	render() {
		console.log(this.props)
		return (
			<div className="stats">
		    <div className='columns'>
		      <div className='column auto'><img src='img/FB-f-Logo__blue_29.png'/> Checkins</div>
	          <div className='column auto has-text-centered'>{this.props.weeklyStats.checkins.thisWeekSum} </div>
	          <div className='column auto has-text-centered'>{this.props.weeklyStats.checkins.percentChange}{this.props.arrows(this.props.weeklyStats.checkins.percentChange)}</div>
	          <div className='column auto has-text-centered'>{this.props.weeklyStats.checkins.lastWeekSum}</div>
	          <div className='column auto has-text-centered'>{this.props.checkinsAvg}</div>  
	          <div className='column auto has-text-centered'>{this.props.getLastElement(this.props.restaurantDetails.checkins, 'checkins')}</div>		                                      
		    </div>
		    <div className='columns'>
		      <div className='column auto'><img src='img/FB-f-Logo__blue_29.png'/> Ratings</div>
	          <div className='column auto has-text-centered'>{this.props.weeklyStats.ratings.thisWeekSum}</div>
	          <div className='column auto has-text-centered'>{this.props.weeklyStats.ratings.percentChange}{this.props.arrows(this.props.weeklyStats.ratings.percentChange)}</div>
	          <div className='column auto has-text-centered'>{this.props.weeklyStats.ratings.lastWeekSum}</div>
	          <div className='column auto has-text-centered'>{this.props.ratingsAvg}</div>
	          <div className='column auto has-text-centered'>{this.props.getLastElement(this.props.restaurantDetails.rating_count, 'rating_count')}</div>               
		    </div>   
		    <div className='columns'>
		      <div className='column auto'><i className="fa fa-yelp"></i> Reviews</div>
	        <div className='column auto has-text-centered'>{this.props.weeklyStats.reviews.thisWeekSum}</div>
	        <div className='column auto has-text-centered'>{this.props.weeklyStats.reviews.percentChange}{this.props.arrows(this.props.weeklyStats.reviews.percentChange)}</div>
	        <div className='column auto has-text-centered'>{this.props.weeklyStats.reviews.lastWeekSum}</div>
	        <div className='column auto has-text-centered'>{this.props.reviewsAvg}</div>
	        <div className='column auto has-text-centered'>{this.props.getLastElement(this.props.restaurantDetails.reviews, 'review_count')}</div>                  
		    </div>  

		    <div className='columns all-restaurant-averages'>
		      <div className='column auto has-text-centered stat-header'>All Restaurant Daily Averages</div>
		    </div>
		    <div className='columns'>
		      <div className='column auto has-text-centered'><img src='img/FB-f-Logo__blue_29.png'/> <span className="stat-title">Checkins</span></div>
		      <div className='column auto has-text-centered'><img src='img/FB-f-Logo__blue_29.png'/> <span className="stat-title">Ratings</span></div>
		      <div className='column auto has-text-centered'><i className="fa fa-yelp"></i> <span className="stat-title">Reviews</span></div>             
		    </div>
		    <div className='columns'>
		      <div className='column auto has-text-centered all-restaurant-numbers'>{this.props.totalAvg.checkinsMean}</div>
		      <div className='column auto has-text-centered all-restaurant-numbers'>{this.props.totalAvg.ratingsMean}</div>
		      <div className='column auto has-text-centered all-restaurant-numbers'>{this.props.totalAvg.reviewsMean}</div>                
		    </div>
		  </div>
		)
	}
}

export default Stats;