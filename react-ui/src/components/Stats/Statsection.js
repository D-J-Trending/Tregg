import React, {Component} from 'react';
import "./Stats.css";

export class Statsection extends Component {
	constructor(props) {
		super(props)
	};
	render() {
		return (
			<div className="stats">	
				<div className='columns stat-header'>
					<div className='column auto'>Source</div>
					<div className='column auto has-text-centered'>This Week</div>
      				<div className='column auto has-text-centered'>%Change</div>
      				<div className='column auto has-text-centered'>Last Week</div>
                              {/*<div className='column auto has-text-centered'>Lowest Day</div>  
                              <div className='column auto has-text-centered'>Highest Day</div>  
                              <div className='column auto has-text-centered'>Daily Avg</div>
                              <div className='column auto has-text-centered'>All Time Total </div>*/}        				
      			</div>

				<div className='columns'>
					<div className='column auto'><i className="fa fa-facebook-square"></i> Checkins</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.checkins.thisWeekSum} </div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.checkins.percentChange}<i className="fa fa-sort-desc"></i></div>
                              <div className='column is-3 has-text-centered'>{this.props.weeklyStats.checkins.lastWeekSum}</div>        				     				
      			</div>
      			<div className='columns'>
					<div className='column auto'><i className="fa fa-facebook-square"></i> Ratings</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.ratings.thisWeekSum}</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.ratings.percentChange}<i className="fa fa-sort-asc"></i></div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.ratings.lastWeekSum}</div>        				
      			</div>   
      			<div className='columns'>
					<div className='column auto'><i className="fa fa-yelp"></i> Reviews</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.reviews.thisWeekSum}</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.reviews.percentChange}<i className="fa fa-sort-desc"></i></div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.reviews.lastWeekSum}</div>        				
      			</div>         								      		
			</div>
		)
	}	
}
