import React, {Component} from 'react';

class Stats extends Component {
	render() {
		console.log(this.props)
		return (
			<div className="stats">
		    <div className='columns'>
		      <div className='column auto'><i className="fa fa-facebook-official"></i> Checkins</div>
		          <div className='column auto has-text-centered'>{this.props.weeklyStats.checkins.thisWeekSum} </div>
		          <div className='column auto has-text-centered'>{this.props.weeklyStats.checkins.percentChange}{this.props.arrows(this.props.weeklyStats.checkins.percentChange)}</div>
		          <div className='column auto has-text-centered'>{this.props.weeklyStats.checkins.lastWeekSum}</div>
		          <div className='column auto has-text-centered'>{this.props.checkinsAvg}</div>  
		          <div className='column auto has-text-centered'>{this.props.getLastElement(this.props.restaurantDetails.checkins, 'checkins')}</div>
		                                      
		    </div>
		    <div className='columns'>
		      <div className='column auto'><i className="fa fa-facebook-official"></i> Ratings</div>
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

		    <div className='columns stat-header all-restaurant-averages'>
		      <div className='column auto has-text-centered'>All Restaurant Daily Averages</div>
		    </div>
		    <div className='columns stat-header'>
		      <div className='column auto has-text-centered'><i className="fa fa-facebook-square"></i> Checkins</div>
		      <div className='column auto has-text-centered'><i className="fa fa-facebook-square"></i> Ratings</div>
		      <div className='column auto has-text-centered'><i className="fa fa-yelp"></i> Reviews</div>             
		    </div>
		    <div className='columns call-restaurant-numbers'>
		      <div className='column auto has-text-centered'>{this.props.allTotals}</div>
		      <div className='column auto has-text-centered'>{this.props.allTotals}</div>
		      <div className='column auto has-text-centered'>{this.props.allTotals}</div>                
		    </div>
		  </div>
		)
	}
}

export default Stats;