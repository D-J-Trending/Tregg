import React, {Component} from 'react';
import "./Stats.css";

export class Statsection extends Component {
	constructor(props) {
		super(props)
	};

  getLastElement = (arr, filter) => {
    var lastItem = arr.pop();
    return lastItem[filter]
  }

  arrows = (value) => {
    const numberWithoutPercent = value.slice(0, -1)
    

    if(numberWithoutPercent > 0) {
      return <i className="fa fa-sort-asc"></i>
    } else if(numberWithoutPercent < 0) {
      return <i className="fa fa-sort-desc"></i>
    } else{

      return
    }
  }

	render() {
		return (
			<div className="stats">	
				<div className='columns stat-header'>
					<div className='column auto'>Source</div>
					<div className='column auto has-text-centered'>This Week</div>
  				<div className='column auto has-text-centered'>%Change</div>
  				<div className='column auto has-text-centered'>Last Week</div>
          <div className='column auto has-text-centered'>Daily Avg</div>
          <div className='column auto has-text-centered'>All-Time</div>
                          {/*<div className='column auto has-text-centered'>Lowest Day</div>  
                          <div className='column auto has-text-centered'>Highest Day</div>  
                          <div className='column auto has-text-centered'>Daily Avg</div>
                          <div className='column auto has-text-centered'>All Time Total </div>*/}        				
  			</div>

				<div className='columns'>
					<div className='column auto'><i className="fa fa-facebook-official"></i> Checkins</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.checkins.thisWeekSum} </div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.checkins.percentChange}{this.arrows(this.props.weeklyStats.checkins.percentChange)}</div>
              <div className='column auto has-text-centered'>{this.props.weeklyStats.checkins.lastWeekSum}</div>
              <div className='column auto has-text-centered'>{this.props.detailsAvgs.checkinsAvg}</div>  
              <div className='column auto has-text-centered'>{this.getLastElement(this.props.restaurantDetails.checkins, 'checkins')}</div>
                       				     				
      			</div>
      		<div className='columns'>
					<div className='column auto'><i className="fa fa-facebook-official"></i> Ratings</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.ratings.thisWeekSum}</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.ratings.percentChange}{this.arrows(this.props.weeklyStats.ratings.percentChange)}</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.ratings.lastWeekSum}</div>
              <div className='column auto has-text-centered'>{this.props.detailsAvgs.ratingsAvg}</div>
              <div className='column auto has-text-centered'>{this.getLastElement(this.props.restaurantDetails.rating_count, 'rating_count')}</div>        				
      			</div>   
      		<div className='columns'>
					<div className='column auto'><i className="fa fa-yelp"></i> Reviews</div>
    				<div className='column auto has-text-centered'>{this.props.weeklyStats.reviews.thisWeekSum}</div>
    				<div className='column auto has-text-centered'>{this.props.weeklyStats.reviews.percentChange}{this.arrows(this.props.weeklyStats.reviews.percentChange)}</div>
    				<div className='column auto has-text-centered'>{this.props.weeklyStats.reviews.lastWeekSum}</div>
            <div className='column auto has-text-centered'>{this.props.detailsAvgs.reviewsAvg}</div>
            <div className='column auto has-text-centered'>{this.getLastElement(this.props.restaurantDetails.reviews, 'review_count')}</div>           				
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
            <div className='column auto has-text-centered'>{this.props.allTotals.checkinsMean}</div>
            <div className='column auto has-text-centered'>{this.props.allTotals.ratingsMean}</div>
            <div className='column auto has-text-centered'>{this.props.allTotals.reviewsMean}</div>                
          </div>  
			</div>
		)
	}	
}
