import React, {Component} from 'react';
import "./Stats.css";
import ReactTooltip from 'react-tooltip';

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
    console.log(numberWithoutPercent)

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
  					<div data-tip="React-tooltip" data-for='currentWeek' className='column auto has-text-centered'>Current Week</div>
              <ReactTooltip id='currentWeek' aria-haspopup='true' role='example'>
                <span>This Week</span>
              </ReactTooltip>
        		<div data-tip="React-tooltip" data-for='%change' className='column auto has-text-centered'>%Change</div>
              <ReactTooltip id='%change' aria-haspopup='true' role='example'>
                <span>%Change</span>
              </ReactTooltip>
        		<div data-tip="React-tooltip" data-for='previousWeek' className='column auto has-text-centered'>Previous Week</div>
              <ReactTooltip id='previousWeek' aria-haspopup='true' role='example'>
                <span>Previous Week</span>
              </ReactTooltip>
          <img  className="facebook" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ1NS43MyA0NTUuNzMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1NS43MyA0NTUuNzM7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojM0E1NTlGOyIgZD0iTTAsMHY0NTUuNzNoMjQyLjcwNFYyNzkuNjkxaC01OS4zM3YtNzEuODY0aDU5LjMzdi02MC4zNTNjMC00My44OTMsMzUuNTgyLTc5LjQ3NSw3OS40NzUtNzkuNDc1ICBoNjIuMDI1djY0LjYyMmgtNDQuMzgyYy0xMy45NDcsMC0yNS4yNTQsMTEuMzA3LTI1LjI1NCwyNS4yNTR2NDkuOTUzaDY4LjUyMWwtOS40Nyw3MS44NjRoLTU5LjA1MVY0NTUuNzNINDU1LjczVjBIMHoiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                              {/*<div className='column auto has-text-centered'>Lowest Day</div>  
                              <div className='column auto has-text-centered'>Highest Day</div>  
                              <div className='column auto has-text-centered'>Daily Avg</div>
                              <div className='column auto has-text-centered'>All Time Total </div>*/}        			

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
