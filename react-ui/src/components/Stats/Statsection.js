import React, {Component} from 'react';
import "./Stats.css";

export class Statsection extends Component {
	constructor(props) {
		super(props)
	};

	componentDidMount() {
		const getTotals = this.props.getTotals;
		getTotals()
	};

	render() {
		return (
			<div className="stats">	
				<div className='columns stat-header'>
					<div className='column is-3'>Source</div>
					<div className='column is-3 has-text-centered'>This Week</div>
      				<div className='column is-3 has-text-centered'>%Change</div>
      				<div className='column is-3 has-text-centered'>Last Week</div>      				
      			</div>

				<div className='columns'>
					<div className='column is-3'><i className="fa fa-facebook-square"></i> Checkins</div>
      				<div className='column is-3 has-text-centered'>+5 </div>
      				<div className='column is-3 has-text-centered'><i className="fa fa-arrow-down"></i>5% </div>
      				<div className='column is-3 has-text-centered'>7 </div>      				
      			</div>
      			<div className='columns'>
					<div className='column is-3'><i className="fa fa-facebook-square"></i> Ratings</div>
      				<div className='column is-3 has-text-centered'>+3 </div>
      				<div className='column is-3 has-text-centered'><i className="fa fa-arrow-up"></i>2% </div>
      				<div className='column is-3 has-text-centered'>7 </div>        				
      			</div>   
      			<div className='columns'>
					<div className='column is-3'><i className="fa fa-yelp"></i> Reviews</div>
      				<div className='column is-3 has-text-centered'>+2 </div>
      				<div className='column is-3 has-text-centered'><i className="fa fa-arrow-up"></i>5% </div>
      				<div className='column is-3 has-text-centered'>7 </div>        				
      			</div>         								      		
			</div>
		)
	}	
}
