import React, {Component} from 'react';
import './Details.css'

export class Details extends Component {
	constructor(props) {
		super(props)
	};

	componentDidMount() {
		this.props.getTotals();
		console.log(this.props.restaurantDetails)
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
		<h3>
			Avg Checkins </h3>
		<p>2552</p>
		<h3>
			Avg rating count </h3>
		<p>2727</p>
		<h3>
			Avg review count </h3>
		<p>29929</p>
		<h3> Total Checkins Mean</h3>
			<p></p>
		<h3> Total Ratings Mean</h3>
			<p></p>
		<h3> Total Reviews Mean</h3>
			<p></p>
		<select
		onChange={this.props.loadFilter}
		>
			<option value="all">All</option>
		  <option value="price">Price</option>
		  <option value="category">Category</option>
		</select>
	</div>
		)
	}	
}
