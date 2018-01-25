import React, {Component} from 'react';
import Round from '../../utils/Round';

class Stats extends Component {
	constructor(props) {
		super(props)
		this.state = {
			velocity: {}
		}
	}
	componentWillMount() {
		const velocity = {
			checkins: Round(this.props.restaurantDetails.trending_score['7day']['checkins'] * 100, -1) + "%",
			rating_count: Round(this.props.restaurantDetails.trending_score['7day']['rating_count'] * 100, -1) + "%",
			review_count: Round(this.props.restaurantDetails.trending_score['7day']['review_count'] * 100, -1) + "%"
		}
		this.setState({
			velocity: velocity
		})
	}
	render() {
		return (
			<div className="stats">
		    <div className='columns'>
		      <div className='column auto'><img alt='fb-logo' src='img/FB-f-Logo__blue_29.png'/> Checkins</div>
	          <div className='column auto has-text-centered'>{this.props.weeklyStats.checkins.thisWeekSum} </div>
	          <div className='column auto has-text-centered'>{this.state.velocity.checkins}{this.props.arrows(this.state.velocity.checkins)}</div>
	          <div className='column auto has-text-centered'>{this.props.weeklyStats.checkins.lastWeekSum}</div>
	          <div className='column auto has-text-centered'>{this.props.checkinsAvg}</div>  
	          <div className='column auto has-text-centered'>{this.props.getLastElement(this.props.restaurantDetails.checkins, 'checkins')}</div>		                                      
		    </div>
		    <div className='columns'>
		      <div className='column auto'><img alt='fb-logo' src='img/FB-f-Logo__blue_29.png'/> Ratings</div>
	          <div className='column auto has-text-centered'>{this.props.weeklyStats.ratings.thisWeekSum}</div>
	          <div className='column auto has-text-centered'>{this.state.velocity.rating_count}{this.props.arrows(this.state.velocity.rating_count)}</div>
	          <div className='column auto has-text-centered'>{this.props.weeklyStats.ratings.lastWeekSum}</div>
	          <div className='column auto has-text-centered'>{this.props.ratingsAvg}</div>
	          <div className='column auto has-text-centered'>{this.props.getLastElement(this.props.restaurantDetails.rating_count, 'rating_count')}</div>               
		    </div>   
		    <div className='columns'>
		      <div className='column auto'><i alt='yelp-logo' className="fa fa-yelp"></i> Reviews</div>
	        <div className='column auto has-text-centered'>{this.props.weeklyStats.reviews.thisWeekSum}</div>
	        <div className='column auto has-text-centered'>{this.state.velocity.review_count}{this.props.arrows(this.state.velocity.review_count)}</div>
	        <div className='column auto has-text-centered'>{this.props.weeklyStats.reviews.lastWeekSum}</div>
	        <div className='column auto has-text-centered'>{this.props.reviewsAvg}</div>
	        <div className='column auto has-text-centered'>{this.props.getLastElement(this.props.restaurantDetails.reviews, 'review_count')}</div>                  
		    </div>  

		    <div className='columns all-restaurant-averages'>
		      <div className='column auto has-text-centered stat-header'>All Restaurant Daily Averages</div>
		    </div>
		    <div className='columns'>
		      <div className='column auto has-text-centered'><img alt='fb-logo' src='img/FB-f-Logo__blue_29.png'/> <span className="stat-title">Checkins</span></div>
		      <div className='column auto has-text-centered'><img alt='fb-logo' src='img/FB-f-Logo__blue_29.png'/> <span className="stat-title">Ratings</span></div>
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