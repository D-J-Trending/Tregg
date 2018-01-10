import React, {Component} from 'react';
import "./Stats.css";

export class Statsection extends Component {
	constructor(props) {
		super(props)
	};

  arrows = (value) => {
    console.log('runs')
    console.log(value)
    const numberWithoutPercent = value.slice(0, -1)
    console.log(numberWithoutPercent)

    if(numberWithoutPercent > 0) {
      console.log('asc')
      return <i className="fa fa-sort-asc"></i>
    } else if(numberWithoutPercent < 0) {
      console.log('desc')
      return <i className="fa fa-sort-desc"></i>
    } else{
      console.log('default')
      return <i className="fa fa-sort-desc"></i>
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
                              {/*<div className='column auto has-text-centered'>Lowest Day</div>  
                              <div className='column auto has-text-centered'>Highest Day</div>  
                              <div className='column auto has-text-centered'>Daily Avg</div>
                              <div className='column auto has-text-centered'>All Time Total </div>*/}        				
      			</div>

				<div className='columns'>
					<div className='column auto'><i className="fa fa-facebook-square"></i> Checkins</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.checkins.thisWeekSum} </div>
      				<div className='column auto has-text-centered'><span>{this.props.weeklyStats.checkins.percentChange}{this.arrows(this.props.weeklyStats.checkins.percentChange)}</span></div>
              <div className='column is-3 has-text-centered'>{this.props.weeklyStats.checkins.lastWeekSum}</div>        				     				
      			</div>
      			<div className='columns'>
					<div className='column auto'><i className="fa fa-facebook-square"></i> Ratings</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.ratings.thisWeekSum}</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.ratings.percentChange}{this.arrows(this.props.weeklyStats.ratings.percentChange)}</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.ratings.lastWeekSum}</div>        				
      			</div>   
      			<div className='columns'>
					<div className='column auto'><i className="fa fa-yelp"></i> Reviews</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.reviews.thisWeekSum}</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.reviews.percentChange}{this.arrows(this.props.weeklyStats.reviews.percentChange)}</div>
      				<div className='column auto has-text-centered'>{this.props.weeklyStats.reviews.lastWeekSum}</div>        				
      			</div>         								      		
			</div>
		)
	}	
}
