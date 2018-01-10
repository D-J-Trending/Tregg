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
      				<div className='column auto has-text-centered'>+5 </div>
      				<div className='column auto has-text-centered'><i className="fa fa-arrow-down"></i>5% </div>
                              <div className='column is-3 has-text-centered'>9 </div>        				     				
      			</div>
      			<div className='columns'>
					<div className='column auto'><i className="fa fa-facebook-square"></i> Ratings</div>
      				<div className='column auto has-text-centered'>+3 </div>
      				<div className='column auto has-text-centered'><i className="fa fa-arrow-up"></i>2% </div>
      				<div className='column auto has-text-centered'>1 </div>        				
      			</div>   
      			<div className='columns'>
					<div className='column auto'><i className="fa fa-yelp"></i> Reviews</div>
      				<div className='column auto has-text-centered'>+2 </div>
      				<div className='column auto has-text-centered'><i className="fa fa-arrow-up"></i>5% </div>
      				<div className='column auto has-text-centered'>3 </div>        				
      			</div>         								      		
			</div>
		)
	}	
}
