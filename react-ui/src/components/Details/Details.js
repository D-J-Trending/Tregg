import React, {Component} from 'react';
import './Details.css'
import API from '../../utils/API';
import Filter from '../../utils/Filter';

export class Details extends Component {
	constructor(props) {
		super(props)
		this.state = {
			actualYelpReviews: false
		}
	};
	componentWillMount() {
		this.props.yelpReviews()
	}

	getLastElement = (arr, filter) => {
		// if lastitem undefined
		var lastItem = arr.pop();

		return lastItem[filter]
	};

	componentWillReceiveProps(nextProps) {
		console.log(nextProps)
		if (nextProps.actualYelpReviews) {
			this.setState({
				actualYelpReviews: nextProps.actualYelpReviews
			})		
		}

	}
	render() {
		return (
	
			<div className="details">

				<h4>
				{this.props.restaurantDetails.name}
				</h4>
				<img alt="Firm" className="detailsImg"src={this.props.restaurantDetails.yelpImg} />
				{this.state.actualYelpReviews ? 
					this.state.actualYelpReviews.map(item => (
						<h1> {item.text} </h1>
					))
				:
				null
				}
				<select
				onChange={this.props.loadFilter}
				>
					<option value="all">All</option>
				  <option value="price">Price</option>
				  <option value="category">Category</option>
				</select>
				<div>
					<h3> Comparison Statistics </h3>
					<h4> Weekly</h4>
					<p>
						{this.props.restaurantDetails.name + "'s "} trending score is {this.props.restaurantDetails.trending_score['7day']['checkins']}
						while the average for all the other restaurants {this.props.totalAvgStatement} is {this.props.totalVelocityAvg}.
					</p>
					<h4>Daily</h4>
					<p>

					</p>
				</div>
			</div>
		)
	}	
}
