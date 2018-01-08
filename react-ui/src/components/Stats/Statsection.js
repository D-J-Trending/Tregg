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
				<div className='columns'>
					<div className='column is-2'>FB Checkins </div>
      				<div className='column is-4'>This Week: 5 </div>
      				<div className='column is-2'>up 5% </div>
      				<div className='column is-4'>Last Week: 7 </div>      				
      			</div>
      			<div className='columns'>
					<div className='column is-2'>Yelp Reviews</div>
      				<div className='column is-4'>This Week: 5</div>
      				<div className='column is-2'>up 5% </div>
      				<div className='column is-4'>Last Week: 7</div>      				
      			</div>   
      			<div className='columns'>
					<div className='column is-2'>FB Ratings</div>
      				<div className='column is-4'>This Week: 5</div>
      				<div className='column is-2'>up 5% </div>
      				<div className='column is-4'>Last Week: 7</div>      				
      			</div>         								      		
			</div>
		)
	}	
}
