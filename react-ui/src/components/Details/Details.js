import React, {Component} from 'react';

export class Details extends Component {
	constructor(props) {
		super(props)
	};

	componentDidMount() {
		this.props.getTotals();
		console.log(this.props.restaurantDetails)
	};

	render() {
		return (
	
	<div className="details">
		<h3>
		{this.props.restaurantDetails.name}
		</h3>
		{this.props.restaurantDetails.checkins.map(item => (

			<p>{item.checkins}</p>
		))}
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
