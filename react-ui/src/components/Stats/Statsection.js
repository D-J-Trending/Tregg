import React, {Component} from 'react';
import "./Stats.css";
import ReactTooltip from 'react-tooltip';
import Mathy from '../../utils/Mathy';
import Stats from './Stats.js';
const obj = {}
export class Statsection extends Component {
	constructor(props) {
		super(props)
    this.state = {
      restaurantDetailsAvg: {},
      weeklyStats: {},
      show: false,
      checkinsAvg: "",
      reviewsAvg: "",
      ratingsAvg: "",
      ratingDiff: "", 
      reviewDiff: "", 
      weeklyStats: "",
      totalAvg: "", 
      totalVelocityAvg: ""
    }
	};



  componentDidMount() {
    // const getTotals = this.props.getTotals;
    // getTotals()

    const checkinsAvg = Mathy.findRoundedDiffMean(this.props.restaurantDetails.checkins, 'checkins')
    const reviewsAvg = Mathy.findRoundedDiffMean(this.props.restaurantDetails.reviews, 'review_count')
    const ratingsAvg = Mathy.findRoundedDiffMean(this.props.restaurantDetails.rating_count, 'rating_count')
    
    const ratingDiff = Mathy.getDiffwithDate(this.props.restaurantDetails.rating_count, 'rating_count');
    const reviewDiff = Mathy.getDiffwithDate(this.props.restaurantDetails.reviews, 'review_count');

    const totalWeeklyDiff = Mathy.findTotalWeeklyDiff(this.props.restaurantDetails)

    const totalAvg = Mathy.findTotalStats(this.props.restaurantInfo)
    const totalVelocityAvg = Mathy.findAvgVelocity(this.props.restaurantInfo)
    this.setState({
      checkinsAvg: checkinsAvg,
      reviewsAvg: reviewsAvg,
      ratingsAvg: ratingsAvg,
      ratingDiff: ratingDiff,
      reviewDiff: reviewDiff,
      weeklyStats: totalWeeklyDiff,
      totalAvg: totalAvg,
      totalVelocityAvg: totalVelocityAvg,
      restaurantDetails: this.props.restaurantDetails
    },()=>console.log(this.state))

  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.show) {
      this.setState({
        show: true
      })
    }
  }

  getLastElement = (arr, filter) => {
    // if lastiem undefined
    const index = arr.length - 1
    const lastItem = arr[index]
    return lastItem[filter]
  }

  arrows = (value) => {
    const numberWithoutPercent = value.slice(0, -1)
    

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
        <p className="stat-header has-text-centered">{this.props.restaurantDetails.name} Statistics</p>	
				<div className='columns'>
					<div className='column auto stat-title'>Source</div>
  					<div data-tip="React-tooltip" data-for='currentWeek' className='column auto has-text-centered stat-title'>Current Week</div>
              <ReactTooltip id='currentWeek' aria-haspopup='true' role='example'>
                <span>Sum of the differences daily for the past 7 days</span>
              </ReactTooltip>
        		<div data-tip="React-tooltip" data-for='%change' className='column auto has-text-centered stat-title'>%Change</div>
              <ReactTooltip id='%change' aria-haspopup='true' role='example'>
                <span>Percent change from last week to this week</span>
              </ReactTooltip>
        		<div data-tip="React-tooltip" data-for='previousWeek' className='column auto has-text-centered stat-title'>Previous Week</div>
              <ReactTooltip id='previousWeek' aria-haspopup='true' role='example'>
                <span>Sum of the differences daily from 7 to 14 days ago</span>
              </ReactTooltip>
            <div data-tip="React-tooltip" data-for='Daily Avg' className='column auto has-text-centered stat-title'>Daily Avg</div>
              <ReactTooltip id='Daily Avg' aria-haspopup='true' role='example'>
                <span>Average of the all-time total differences</span>
              </ReactTooltip>
            <div data-tip="React-tooltip" data-for='All-Time' className='column auto has-text-centered stat-title'>All-Time</div>
              <ReactTooltip id='All-Time' aria-haspopup='true' role='example'>
                <span>Current Total Count</span>
              </ReactTooltip>    
      				
  			</div>
        {this.state.show ? 
          <Stats
            restaurantDetails={this.state.restaurantDetails}
            checkinsAvg={this.state.checkinsAvg}
            reviewsAvg={this.state.reviewsAvg}
            ratingsAvg={this.state.ratingsAvg}
            ratingDiff={this.state.ratingDiff}
            reviewDiff={this.state.reviewDiff}
            weeklyStats={this.state.weeklyStats}
            totalAvg={this.state.totalAvg}
            totalVelocityAvg={this.state.totalVelocityAvg}
            getLastElement={(arr, filter) =>this.getLastElement(arr, filter)}
            arrows={(value) => this.arrows(value)}
          />
          :
          null
        }
			</div>
		)
	}	
}
