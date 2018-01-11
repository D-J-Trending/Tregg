import React, {Component} from 'react';
import './Details.css'

export class Details extends Component {
	constructor(props) {
		super(props)
	};

	componentDidMount() {
		this.props.getTotals();
	};

	getLastElement = (arr, filter) => {
		var lastItem = arr.pop();
		return lastItem[filter]
	}

	render() {
		return (
	
			<div className="details">

				<h4>
				{this.props.restaurantDetails.name}
				</h4>
				<img className="detailsImg"src={this.props.restaurantDetails.yelpImg} />
				
				<h3> Total *FBLOGO* Checkins </h3>
				<p>{this.getLastElement(this.props.restaurantDetails.checkins, 'checkins')}</p>
				<h3> Total *FBLOGO* Ratings </h3>
				<p>{this.getLastElement(this.props.restaurantDetails.rating_count, 'rating_count')}</p>
				<h3> Total *YelpLOGO* Reviews </h3>
				<p>{this.getLastElement(this.props.restaurantDetails.reviews, 'review_count')}</p>	
				<h3> Avg Diff </h3>	
				<h3>
					Avg Checkins </h3>
				<p>{this.props.detailsAvgs.checkinsAvg}</p>
				<h3>
					Avg rating count </h3>
				<p>{this.props.detailsAvgs.ratingsAvg}</p>
				<h3>
					Avg review count </h3>
				<p>{this.props.detailsAvgs.reviewsAvg}</p>

				<h3> Total Checkins Mean</h3>
					<p>{this.props.allTotals.checkinsMean}</p>
				<h3> Total Ratings Mean</h3>
					<p>{this.props.allTotals.ratingsMean}</p>
				<h3> Total Reviews Mean</h3>
					<p>{this.props.allTotals.reviewsMean}</p>
					{this.props.yelpReviews.map(item=> {
						<h5>
							item.text
						</h5>
						<p> item.user.name </p>
						item.time_created
					})}
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
