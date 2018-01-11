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
    })

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
				<div className='columns stat-header'>
					<div className='column auto'>Source</div>
  					<div data-tip="React-tooltip" data-for='currentWeek' className='column auto has-text-centered'>Current Week</div>
              <ReactTooltip id='currentWeek' aria-haspopup='true' role='example'>
                <span>Sum of the differences daily for the past 7 days</span>
              </ReactTooltip>
        		<div data-tip="React-tooltip" data-for='%change' className='column auto has-text-centered'>%Change</div>
              <ReactTooltip id='%change' aria-haspopup='true' role='example'>
                <span>Percent change from last week to this week</span>
              </ReactTooltip>
        		<div data-tip="React-tooltip" data-for='previousWeek' className='column auto has-text-centered'>Previous Week</div>
              <ReactTooltip id='previousWeek' aria-haspopup='true' role='example'>
                <span>Sum of the differences daily from 7 to 14 days ago</span>
              </ReactTooltip>
            <div data-tip="React-tooltip" data-for='Daily Avg' className='column auto has-text-centered'>Daily Avg</div>
              <ReactTooltip id='Daily Avg' aria-haspopup='true' role='example'>
                <span>Average of the all-time total differences</span>
              </ReactTooltip>
            <div data-tip="React-tooltip" data-for='All-Time' className='column auto has-text-centered'>All-Time</div>
              <ReactTooltip id='All-Time' aria-haspopup='true' role='example'>
                <span>Current Total Count</span>
              </ReactTooltip>    
          <img  className="facebook" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ1NS43MyA0NTUuNzMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1NS43MyA0NTUuNzM7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojM0E1NTlGOyIgZD0iTTAsMHY0NTUuNzNoMjQyLjcwNFYyNzkuNjkxaC01OS4zM3YtNzEuODY0aDU5LjMzdi02MC4zNTNjMC00My44OTMsMzUuNTgyLTc5LjQ3NSw3OS40NzUtNzkuNDc1ICBoNjIuMDI1djY0LjYyMmgtNDQuMzgyYy0xMy45NDcsMC0yNS4yNTQsMTEuMzA3LTI1LjI1NCwyNS4yNTR2NDkuOTUzaDY4LjUyMWwtOS40Nyw3MS44NjRoLTU5LjA1MVY0NTUuNzNINDU1LjczVjBIMHoiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                              {/*<div className='column auto has-text-centered'>Lowest Day</div>  
                              <div className='column auto has-text-centered'>Highest Day</div>  
                              <div className='column auto has-text-centered'>Daily Avg</div>
                              <div className='column auto has-text-centered'>All Time Total </div>*/}        			
                          {/*<div className='column auto has-text-centered'>Lowest Day</div>  
                          <div className='column auto has-text-centered'>Highest Day</div>  
                          <div className='column auto has-text-centered'>Daily Avg</div>
                          <div className='column auto has-text-centered'>All Time Total </div>*/}        				
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
            allTotals= {this.prop}
          />
          :
          null
        }
			</div>
		)
	}	
}
