import React, {Component} from 'react';
// import { Input, Form, Searchbtn } from "../../components/Form";
import { Searched, FbSearchedItems } from "../../components/Searched";
import Ranking from "../../components/Ranking";
import Chart from "../../components/Chart";
import API from "../../utils/API.js";
import { Details } from "../../components/Details";
import { Restheader } from "../../components/Restdetails";
import { Statsection } from "../../components/Stats";
import ChartFilter from "../../components/ChartFilter";
import Filter from "../../utils/Filter";
import "./findRestaurant.css";
import Mathy from "../../utils/Mathy.js";
import Yelp from "../../utils/Yelp.js";
import { CSSTransitionGroup } from 'react-transition-group'; // ES6
import geolib from 'geolib';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import Map from "../../utils/Map.js";
import Round from '../../utils/Round'
import ChartDataSet from '../../utils/ChartDataSet';
//Need to pass value from input field
//Style chart and info into one element
//Allow to click on element to view stats
//Create separate chart components/arrays for rating, rating count, checkins, review count, star_rating

class findRestaurant extends Component {

	constructor (props) {
		super(props);
		this.state = {
			restaurantArr: [],
			restaurantName: "",
			restaurantLoc: "",
			restaurantInfo: {},
			coordsIdsArr: [],
			restaurantDetails: false,
			restaurantDetailsAvg: {},
			restaurantId: "",
			filter: 'price',
			filterLabel: 'All Restaurants',
			filteredRestaurants: '',
			fbAPIResults: {},
			details: false,
			allTotalAvgs: {},
			totalAvg: "",
			totalVelocityAvg: {},
			totalAvgStatement: " ",
			chartData: [],
			searchedRestaurant: {},
			onSearchClick: false,
			detailsWeeklyStats: {},
			showsidenav: true,
			showline: true,
			showbar: true,
			address: "",
			dropdown: '',
			hidesearch: false,
			searchlogo: false,
			searchHeader:true,
			searchIcon:false,
			active1:'button',
			active2:'button',
			active3:'button',
			active4:'button',
			active5:'button fullwidth',
			active6:'button fullwidth is-success',
			active7:'button fullwidth',
			placeholder: 'Location',
			actualYelpReviews: false,
		};
		this.onChange = (restaurantName) => this.setState({ restaurantName })
    	this.onChange2 = (restaurantLoc) => this.setState({ restaurantLoc })
	}
  
  componentWillMount() {

		API.AllReviews()
		.then(res => {
			const coordsArr = []
			res.data.forEach(item => {
				coordsArr.push({
					yelpId: item.yelpId,
					coordinates: item.coordinates,
					score: Round(item.trending_score)
				})
			})
		const avgLine = this.findDailyDiffAvg(res.data)

		// if (navigator.geolocation) {
		// 	navigator.geolocation.getCurrentPosition(position => {
		// 		// console.log(position)
		// 		let userCoordinates = {
		// 			latitude: position.coords.latitude,
		// 			longitude: position.coords.longitude
		// 		};

        
		// 		this.setState({
		// 			filteredRestaurants: avgLine,
		// 			restaurantInfo: res.data,
		// 			coordsIdsArr: coordsArr,
		// 			userCoordinates: userCoordinates
		// 		})
		// 	})

		// } else {
			this.setState({
				filteredRestaurants: avgLine,
				restaurantInfo: res.data,
				coordsIdsArr: coordsArr,
				userCoordinates: null
			})
		// }

		})
		.catch(err => console.log(err));

  }

    //update state whenever field input changes
  handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
		  [name]: value
		});
	};

	showDetails = (event, callback) => {
		const array = []
		const id = event.currentTarget.getAttribute('value');

		API.returnDetails(id)
			.then(res => {
				// passes in diff array, skips filterlabel, and passes in avg line data
				// to create data set
				let diff = Mathy.getDiffwithDate(res.data[0].checkins, 'checkins');
				const initialChartData = this.createInitialChartDataSet(diff, null, this.state.filteredRestaurants.checkins, res.data[0])

				// let res.trending_score['7day']['checkins']) = Round(item.trending_score['7day']['checkins'], -2) + "%"
				let roundedTrending = Round(res.data[0].trending_score['7day']['checkins'] * 100, -2) + "%"
				// console.log(roundedTrending)

				const obj = {
					restaurantDetails: res.data[0],
					details: true,
					chartData: initialChartData,
					restaurantName: "",
					roundedTrending: roundedTrending					
				}
				this.setState(obj)
				
			})
			.catch(err => console.log(err))
				this.hidesearch();
	};

	createInitialChartDataSet = (diffDateArr, filterLabel, avgLineDataSet, firmDetails) => {
		// creates average line's chart data set
		const avgLineChartData = ChartDataSet.createDataSet(avgLineDataSet, 'All Restaurants Avg', true)
		const diffDataChartData = ChartDataSet.createDataSet(diffDateArr, firmDetails.name)
		let labels = avgLineDataSet.map(checkins => {
			let queryDate = checkins.query_date.replace(/ .*/,'');
			return queryDate;
		})

		return {
			labels: labels,
			datasets: [diffDataChartData, avgLineChartData]
		}
	};

	//create labels and data arrays and sets chartData state
	generateChartData = (res, filterLabel) => {
		const newChartData = ChartDataSet.createDataSet(res, filterLabel, true)
		// Have new chart data, next:
		// determine which length is longer bw current and new
    let labels = res.map(checkins => {
        let queryDate = checkins.query_date.replace(/ .*/,'');
        return queryDate;
    })
    if(labels.length <= this.state.chartData.labels.length) {
        labels = this.state.chartData.labels;
    }
    // replace array with new
    let stateDataSet = this.state.chartData.datasets
    if (this.state.chartData.datasets.length === 2) {
    	stateDataSet.pop()
    }

    stateDataSet.push(newChartData)

    return {
			labels: labels,
			datasets: stateDataSet
		}
	};

	//create an array with differences for all restaurants in restaurantInfo
	findPercentChange = (resData,arraytocheck, arrayvariable) => {
		//array to hold the daily increase in ratings, reviews, checkins
		const allDifferences = []
		//create array with differences for all restaurnts in restaurant info
		resData.forEach(item => {
			let obj = {}
			let diff = Mathy.getDiffwithDate(item[arraytocheck], arrayvariable)
			obj.yelpId = item.yelpId
			obj.diff = diff
			allDifferences.push(obj)
		})
		const compareAll = []
		// find difference week over week
		allDifferences.forEach(item => {
			//object to hold yelpId and weeklyChange
			let compare = {}
			let percentChange1 = 0
			let percentChange2 = 0
			let weeklyChange = 0
			let weeklyChangePercent = 0

			//Switch goes here to determine 7, 14, 21, or 30 days

			//first week
			item.diff.slice(0, 3).map(item => {
				percentChange1 += item.percentChange
			})
			//second week
			item.diff.slice(3, 6).map(item => {
				percentChange2 += item.percentChange
			})
			weeklyChange = percentChange2 - percentChange1
			compare.yelpId = item.yelpId
			compare.weeklyChange = weeklyChange
			compare.weeklyChangePercent = weeklyChange/percentChange1
			compareAll.push(compare)
		})
		const stateParam = arraytocheck + 'change';

		//sort arrays based on weekly percent change in descending order
		let sortedCompare = compareAll.sort(function (a, b) {
				  return b.weeklyChangePercent - a.weeklyChangePercent
				})
				this.setState({
					[stateParam]: sortedCompare
				})
	};

	loadFilter = (ev, filter) => {
		let query
		if (filter) {
			query = filter
		} else {
			query = ev.target.value
		}
		switch(query) {
			// case 'init':
			// 	this.setState({
			// 		totalAvg: this.state.allTotalAvgs.allTotal,
			// 		totalVelocityAvg: this.state.allTotalAvgVelocitys.allVelocity
			// 	})
			// 	break;
			case 'price':
				const price = this.state.restaurantDetails.price
				this.setState({
					totalAvg: this.state.allTotalAvgs.priceTotal,
					totalVelocityAvg: this.state.allTotalAvgVelocitys.priceVelocity,
					totalAvgStatement: "in the same price group, " + price + ", "
				})
				break;
			case 'all':
				this.setState({
					totalAvg: this.state.allTotalAvgs.allTotal,
					totalVelocityAvg: this.state.allTotalAvgVelocitys.allVelocity,
					totalAvgStatement: " "
				})
				break;
			case 'category':
				let categories = ""
				this.state.restaurantDetails.categories.forEach(item=> {
					categories = categories + item.title + ", "
				})
				this.setState({
					totalAvg: this.state.allTotalAvgs.categoryTotal,
					totalVelocityAvg: this.state.allTotalAvgVelocitys.categoryVelocity,
					totalAvgStatement: "in the same categories, " + categories
				})
				break;
		}


	};

	getTotals = () => {
		// gets price total then sends to getalltotal, then getscategoriestotal
		API.filterSearch('price', this.state.restaurantDetails.price)
		.then(res => {
			const priceData = res.data
			let priceTotal = Mathy.findTotalStats(priceData)
			let priceVelocity = Mathy.findAvgVelocity(priceData)
			getAllTotal(priceTotal, priceData, priceVelocity)
			
		})
		.catch(err => console.log('ERROR: ',err))
		
		const getAllTotal = (priceTotal, priceData, priceVelocity) => {
			const allTotal = Mathy.findTotalStats(this.state.restaurantInfo)
			const allVelocity = Mathy.findAvgVelocity(this.state.restaurantInfo)
			getCategoryTotal(priceTotal, allTotal, priceData, priceVelocity, allVelocity)
		}
		
		const getCategoryTotal = (priceTotal, allTotal, priceData, priceVelocity, allVelocity) => {
			let categoryTotal
			let categories = this.state.restaurantDetails.categories
			let arrFirms = []
			let categoryString = ''
			categories.forEach(item => {
				categoryString += item.alias + ' '
			})
			API.filterSearch('category', categoryString)
			.then(res => {
				let categoryData = res.data
				for (var i = 0; i < categoryData.length; i++) {
					var index = arrFirms.findIndex(x => x.name === categoryData[i].name)

					if (index === -1) {
						arrFirms.push(categoryData[i])
					}
				}
				categoryTotal = Mathy.findTotalStats(arrFirms)
				const categoryVelocity = Mathy.findAvgVelocity(arrFirms)
				this.setState({
					detailsCategories: arrFirms,
					allTotalAvgs: {
						priceTotal: priceTotal,
						allTotal: allTotal,
						categoryTotal: categoryTotal
					},
					allTotalAvgVelocitys: {
						priceVelocity: priceVelocity,
						allVelocity: allVelocity,
						categoryVelocity: categoryVelocity
					}
				})
			})
			.catch(err => console.log(err))
		}
	};
									//**************************************//
									//********onClick Functions************//
									//************************************//

	  handleFormSubmit = (event) => {
    event.preventDefault()
};

	onClick = () => {
    		this.setState({ showsidenav: !this.state.showsidenav });
   	};
 

	onSearchClick = () => {
		 	this.setState({ searchIcon: !this.state.searchIcon});
	};

	// showline = () => {
	// 		this.setState({ showline: !this.state.showline });
	// };

	showbar = () => {
			this.setState({ showbar: !this.state.showbar });
	};


	hidesearch = () => {
			this.setState({ hidesearch: !this.state.hidesearch });
	};

	searchlogo = () => {
		this.setState({ searchlogo: !this.state.searchlogo});
	};

	filterClick1 = (ev) => {
		this.setState({
			active1:'button',
			active2:'button',
			active3:'button',
			active4:'button',
			active5:'button fullWidth',
			active6:'button fullWidth',
			active7:'button fullWidth'
		})
		this.setState({active1: 'button is-success'});
		this.priceFilteredRestaurants(ev)
	};

	filterClick2 = (ev) => {
		this.setState({
			active1:'button',
			active2:'button',
			active3:'button',
			active4:'button',
			active5:'button fullWidth',
			active6:'button fullWidth',
			active7:'button fullWidth'
		})
		this.setState({active2: 'button is-success'});
		this.priceFilteredRestaurants(ev)
	};

	filterClick3 = (ev) => {
		this.setState({
			active1:'button',
			active2:'button',
			active3:'button',
			active4:'button',
			active5:'button fullWidth',
			active6:'button fullWidth',
			active7:'button fullWidth'
		})
		this.setState({active3: 'button is-success'});
		this.priceFilteredRestaurants(ev)
	};

	filterClick4 = (ev) => {
		this.setState({
			active1:'button',
			active2:'button',
			active3:'button',
			active4:'button',
			active5:'button fullWidth',
			active6:'button fullWidth',
			active7:'button fullWidth'
		})
		this.setState({active4: 'button is-success'});
		this.priceFilteredRestaurants(ev)
	};

	filterClick5 = (ev) => {
		this.setState({
			active1:'button',
			active2:'button',
			active3:'button',
			active4:'button',
			active5:'button fullWidth',
			active6:'button fullWidth',
			active7:'button fullWidth'
		})
		this.setState({active5: 'button fullwidth is-success'});
		this.categoryFilteredRestaurants(ev)
	};

	filterClick6 = (ev) => {
		this.setState({
			active1:'button',
			active2:'button',
			active3:'button',
			active4:'button',
			active5:'button fullWidth',
			active6:'button fullWidth',
			active7:'button fullWidth'
		})
		this.setState({active6: 'button fullwidth is-success'});
		this.averageFilteredRestaurants(ev)
	};

	filterClick7 = (ev) => {
		this.setState({
			active1:'button',
			active2:'button',
			active3:'button',
			active4:'button',
			active5:'button fullWidth',
			active6:'button fullWidth',
			active7:'button fullWidth'
		})
		this.setState({active7: 'button fullwidth is-success'});
		this.removeSecondLine(ev)
	};

	removeSecondLine = ev => {
		let newChartData = this.state.chartData.datasets
		let labels = this.state.chartData.labels

		if(newChartData.length === 2) {
			newChartData.pop()
		}

		this.setState({
			chartData: {
				datasets: newChartData,
				labels: labels
			} 
		})
	}

	priceFilteredRestaurants = ev => {
		const value = ev.currentTarget.getAttribute('value')
		
	 	API.filterSearch('price', value)
	    .then(res => {
	        let priceAvg = this.findDailyDiffAvg(res.data)
	       	const newChartData = this.generateChartData(priceAvg.checkins, value)
	        this.setState({
	        	chartData: newChartData
	        })
	    })
	    .catch(err => console.log(err))
	};

	categoryFilteredRestaurants = ev => {
		const catArr = []
		let categories = this.state.restaurantDetails.categories
		let categoryString = ''
		categories.forEach(item => {
			categoryString += item.alias + ' '
		})
		API.filterSearch('category', categoryString)
		.then(res => {
			let categoryData = res.data
			for (var i = 0; i < categoryData.length; i++) {
				var index = catArr.findIndex(x => x.name === categoryData[i].name)

				if (index === -1) {
					catArr.push(categoryData[i])
				}	else {
					// console.log('no push')
				}
			}
			let categoriesAvg = this.findDailyDiffAvg(catArr)
			const newChartData = this.generateChartData(categoriesAvg.checkins, 'All Categories')
			this.setState({
				chartData: newChartData
			})
		})
		.catch(err=> console.log(err))
	}

	averageFilteredRestaurants = (ev) => {
   	let newChartData = this.generateChartData(this.state.filteredRestaurants.checkins, 'All Restaurant Avg')
    this.setState({
    	chartData: newChartData
    })
	}

	dropdown = () => {
		if(this.state.dropdown === "dropdown is-active") {
			this.setState({
				dropdown: "dropdown"
			})
		}
		else {
			this.setState({
				dropdown: "dropdown is-active"
			})
		}
	};


// looks for yelpId via information sent from clicking on
// search result. sends to yelpAPI in utils to pull info
// and send to DB

	getYelpAddToDb = (ev) => {
		const id = ev.currentTarget.getAttribute('value')
		const name = ev.currentTarget.getAttribute('data-name')
		const city = ev.currentTarget.getAttribute('data-city')
		const address = ev.currentTarget.getAttribute('data-address')
		let phone
		if (ev.currentTarget.getAttribute('data-phone')) {
			phone = ev.currentTarget.getAttribute('data-phone')
			phone = Yelp.convertPhone(phone)
			this.setState({fbAPIResults:false})
		} else {
			phone = null
		}
		
		Yelp.yelpAPI(id, name, address, phone, city)
	};

 	//handle Submit for searchRestaurant//
 	// pressEnter = (ev) => {
  // 	if(ev.keyCode === 13 || ev.which === 13 ){
  // 	  	this.searchRestaurant();
  // 		ev.preventDefault();
  // 		}
  // 	};
  searchSubmit = (event) => {
    event.preventDefault()
    if (this.state.restaurantLoc) {
    geocodeByAddress(this.state.restaurantLoc)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.searchRestaurant(latLng))
      .catch(error => console.error('Error', error))
    } else {
    	this.setState({placeholder: "Please input a location"})
    }
  };
 	//handle pressing enter to Submit for searchRestaurant//
 	// pressEnter = (ev) => {
  // 	if(ev.keyCode === 13 || ev.which === 13 ){
  // 	  	this.searchRestaurant();
  // 		ev.preventDefault();
  // 		}
  // 	};
  searchSubmit = (event) => {
    event.preventDefault()
    if (this.state.restaurantLoc) {
    geocodeByAddress(this.state.restaurantLoc)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.searchRestaurant(latLng, true))
      .catch(error => console.error('Error', error))
    } else {
    	let location= '37.82306519999999,-122.24868090000001'
    	this.searchRestaurant(location, false)
    }
  };

	searchRestaurant = (address, boolean) => {
		this.onSearchClick();
		this.setState ({
			hidesearch:true,
			searchIcon:false,
			details:false,
			searchHeader:false,
			searchlogo:true
		})
		let location = address
		if (boolean) {
			// console.log('boolean works')
			location = address.lat.toString() + "," + address.lng.toString();
		}
		// console.log(location)
		if (this.state.restaurantName) {
			const nameQue = (data) => {
				API.nameQuery(this.state.restaurantName)
				.then(res => {
					// if no result found, start add new firm functions
					// indexof, if data matches res.data, then take out

					// console.log(res.data);
					let searchedRestaurantTrending = []
					res.data.forEach(item => {
						let roundedTrending = Round(item.trending_score['7day']['checkins'] * 100 , -2) + "%"
						searchedRestaurantTrending.push(roundedTrending)
					})
					// console.log(searchedRestaurantTrending)
					// let roundedTrending = Round(res.data[0].trending_score['7day']['checkins'], -4)*100 + "%"

					let fbResults = []
					if (res.data[0]) {
						data.forEach(item => {			
							if (item.id !== res.data[0].fbId) {
								fbResults.push(item)
							}
						})
					} else {
						fbResults = data
					}
					this.setState({
						fbAPIResults: fbResults,
						searchedRestaurant: res.data,
						searchedRestaurantTrending: searchedRestaurantTrending
					})
					// this.generateChartData(this.state.restaurantInfo)
				})
				.catch(err => console.log(err));
			}
			// console.log(location)
			// searches through fb api before sending it through db api
			const access = 'EAAG0XCqokvMBAPYkq18AYZCRVI1QaWb9HU9ti4PpFL5lZAL32p53Ql1zREzbBi9ikoXwdwgsyZB6Cjv9YjghpfQmWPZCBBtWMnGaqknAecNhQzpBNWKCZCFYM36P0IRP8QSnOlzHdxod6y8mZA3cOpdxlu7XZAtqIv9AhZBXdPyPsAZDZD'
			let url = 'https://graph.facebook.com/v2.7/search'
			let params = {
				type: 'place',
				q: this.state.restaurantName,
				center: location,
				distance: 15000,
				limit: 20,
				fields: 'name,single_line_address,phone, location,is_permanently_closed',
				access_token: access
			}
			API.APIsearch(url, params)
				.then(res => {
					nameQue(res.data.data)
				})
				.catch(err => console.log(err))

		}
  };

	findClosestRestaurants = (query) => {
		var geo
		if (this.state.userCoordinates === null) {
			geo = {latitude: 37.82306519999999, longitude: -122.24868090000001}
		} else {
			geo = this.state.userCoordinates
		}
		const compareArr = this.state.coordsIdsArr
		const newArr = []
		// loops through coordsid array, gets distnace from compare and inputs into new array
		compareArr.forEach(item => {
			let coords = item.coordinates
			let distance = geolib.getDistance(geo, coords)
			newArr.push({
				yelpId: item.yelpId,
				distance: distance,
				coordinates: coords,
				score: item.score['7day']['checkins']
			})
			
		})

		// sort by distance
		newArr.sort((a,b) => {
			return a.distance - b.distance
		})

		// take closest 30 and sort by highest score
		const loop = 30 - newArr.length
		const length = loop*-1

		for (let i = 0; i < length; i++) {
			newArr.pop()
		}
		const top10Arr = Filter.getTop10ByScore(newArr)
		// display to HTML
		this.setState({
			top10Distance: top10Arr
		})
	};

	//create daily avg from array of multiple restaurants
	findDailyDiffAvg = (filtered_arr) => {

		const dailyAvg = Filter.dailyDiffAvg(filtered_arr)
		// this.setState({
		// 	dailyCheckinAvgObj: dailyAvg
		// })
		return dailyAvg
	};

	yelpReviews = () => {
		const id = this.state.restaurantDetails.yelpId
		const url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + id + '/reviews';
		const headers = {
			Authorization: "Bearer Dt0X2kf0ef_hQ5Jc_5FNnxheSlXdFX1-svTZE6AJP0J4lBoVuMFRl66QgPFblxpMN-_AHN9OL3mek81qVap7DEtTMK2MrXxXpTxV31SVTbe-qajxmCEGj_nHwuEuWnYx"
		}
		API.APIsearch(url, null, headers)
			.then(res=> {
				this.setState({
					actualYelpReviews: res.data
				})
			})
	}
	render() {

		const inputProps = {
	      value: this.state.restaurantName,
	      onChange: this.onChange,
	    }
	  const inputProps2 = {
      value: this.state.restaurantLoc,
      onChange: this.onChange2,
      placeholder:"Location"
	  }

		return (
		<div>
		{ this.state.searchHeader ? (
				<CSSTransitionGroup
					transitionName="example"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnter={false}
					transitionLeave={false}>
					<div id="animate-area">
						<section>
							<div className="HeaderTitle"> 
								<h1>TREGG</h1>								
							</div>
							<p className="HeaderTagline">An unbiased visualization of restaurants trending in your area.</p>
							<form onSubmit={this.searchSubmit}>
								<div className="HeaderSearch">
									<div className='columns'>
										<div className="column is-5">
				      				<input
				      					className="searchBar"
												// inputProps={inputProps}
												value={this.state.restaurantName}
												onChange={this.handleInputChange}
												name="restaurantName"
												placeholder="Restaurant Name"
												// onKeyDown={(ev) => this.handleSearchForm(ev)}
											/>
										</div>
										<div className="column is-5">
											<PlacesAutocomplete 
												inputProps={inputProps2}
											/>
										</div>
										<div className="column is-2">
											<button type='submit'>Submit</button>
										</div>
									</div>
								</div>
							</form>
						</section>
					</div>
			</CSSTransitionGroup>
			) : null }
			<div className="wrapper">	
			{ this.state.searchlogo ? (
				<CSSTransitionGroup
					transitionName="example"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnter={false}
					transitionLeave={false}>
				<a onClick={this.onSearchClick}>
					<div className="inPut-with-icon">
						<i className="fa fa-search"></i>
					</div>
				</a>
				</CSSTransitionGroup>
			) : null }
		      	<div className="data-section columns">
		      		<div className="column auto">
		      		{this.state.hidesearch ? (
		      			<div className='columns search-area'>
		      				<div className="column is-12">
										<div id='search-restaurant'>
											{this.state.searchedRestaurant.length ? (
												<CSSTransitionGroup
													transitionName="example"
													transitionAppear={true}
													transitionAppearTimeout={500}
													transitionEnter={false}
													transitionLeave={false}
													>														
													<div className='search-section'>
														<div className="wrapper restaurant-search">
															<p className='homepage-header'>Database Results</p>
															<div className="main container-fluid">				
															  <div className='centered restaurant-info'>																				  	
										    					<div className='columns restaurant-component'>	      				
										    						<div className="content-list">
											    						<ul className='centered'>
																				{this.state.searchedRestaurant.map((restaurant,i) => (								      																				    																		      		      	
																      		<li key={i}>
																      			<Restheader
																      				value={restaurant._id}
																      				key={restaurant._id}
																      				onClick={(ev) => this.showDetails(ev, this.callback)}
																      				trendingScore={this.state.searchedRestaurantTrending[i]}
																      				mainColumnClass={'column is-12 top-trending find-restaurant-search-section'}
																      				columnClass={'column is-6'}
																      				rank={restaurant.new_rank}
																      				restaurantName={restaurant.name}
													      							address={restaurant.location.address}
													      							city={restaurant.location.city}
													      							state={restaurant.location.state}
													      							yelpURL={restaurant.yelpURL}
													      							fb_url={restaurant.fbURL}
													      							fbRating={restaurant.star_rating[0].overall_star_rating}
													      							yelpRating={restaurant.rating[0].rating}
													      							// restaurantDetails={restaurant.yelpImg}
																      			/>	
																      		</li>																																							      	       									      						      		
																				))}
																			</ul> 
																		</div>
															    </div>
												      	</div>		
															</div>
														</div>
													</div>															
												</CSSTransitionGroup>
												) : (
												<h3>No Results to Display</h3>
												)}
												<p className='has-text-centered fb-search-header'> FB API Search results </p>
												{this.state.fbAPIResults.length ? (
													<CSSTransitionGroup
														transitionName="example"
														transitionAppear={true}
														transitionAppearTimeout={500}
														transitionEnter={false}
														transitionLeave={false}
													>
													<div className='blackPage'>
														<Searched>
															{this.state.fbAPIResults.map(restaurant => (
																<FbSearchedItems className='list-group-item searcheditems' key={restaurant.id} getYelpAddToDb={(ev) => this.getYelpAddToDb(ev)}
																	value={restaurant.id}
																	dataName={restaurant.name}
																	dataAddress={restaurant.location.street}
																	dataCity={restaurant.location.city}
																	dataPhone={restaurant.phone}
																	restaurantData={restaurant}
																/>
															))}
														</Searched>
													</div>
													</CSSTransitionGroup>
												) : (
													<div className='blackPage'>
														<h4>No results from Facebook API </h4>
													</div>
												)}
											</div> 		    
		      				</div>
		      			</div>
		      		) : (
										null
									)}
								{this.state.details ? (
		      				<div className='restaurant-info'>	
		      					<div className='columns restaurant-component'>	      				
		      						<Restheader
		      							trendingScore={this.state.roundedTrending}
		      							mainColumnClass={'column is-12'}
		      							columnClass={'column is-3'}
		      							rank={this.state.restaurantDetails.rank}		      							
		      							restaurantName={this.state.restaurantDetails.name}
		      							address={this.state.restaurantDetails.location.address}
		      							city={this.state.restaurantDetails.location.city}
		      							state={this.state.restaurantDetails.location.state}
		      							yelpURL={this.state.restaurantDetails.yelpURL}
		      							fb_url={this.state.restaurantDetails.fbURL}
		      							fbRating={this.state.restaurantDetails.star_rating[0].overall_star_rating}
		      							yelpRating={this.state.restaurantDetails.rating[0].rating}		      					
		      						/>
		      					</div>										
				      			<div className='columns restaurant-component'>		      				
					      			<div className='column is-9 rest-'>			 
							      		<Chart className='charts' chartData={this.state.chartData} chartName="Checkins by Date"
							      		 showline={this.state.showline} showbar={this.state.showbar}legendPosition="top"/>
							      	</div>
							      	<div className='column is-3 data-navigation'>							      		
						      			<div className='columns'>
						      				<ChartFilter 
						      					categoryClick={this.filterClick5}
						      					green1={this.state.active1}
						      					green2={this.state.active2}
						      					green3={this.state.active3}
						      					green4={this.state.active4}
						      					green5={this.state.active5}
						      					green6={this.state.active6}
						      					green7={this.state.active7}
						      					checkClick1={this.filterClick1}
						      					checkClick2={this.filterClick2}
						      					checkClick3={this.filterClick3}
						      					checkClick4={this.filterClick4}
						      					checkClick7={this.filterClick7}						      				
						      					averageArr={this.state.filteredRestaurants}
						      					averageClick={this.filterClick6}
						      					removeSecondLine={this.filterClick7}
						      				/>				      					
						      			</div>					      											
											</div>
										</div>
										<div className='columns restaurant-component margin-top'>
											<div className='column is-12'>
												<div className='stats-section section'>
													<Statsection
													restaurantInfo={this.state.restaurantInfo}
													restaurantDetails={this.state.restaurantDetails}
													allTotals={this.state.totalAvg}
													/>													
												</div>
											</div>
										</div>
										<div className='columns restaurant-component'>
											<div className='column is-12'>
												<div className='section'>
													<Details
													restaurantDetails={this.state.restaurantDetails}
													// getTotals={() => this.getTotals()}
													// loadFilter={(ev, filter) => this.loadFilter(ev, filter)}
													// detailsAvgs={this.state.restaurantDetailsAvg}
													// allTotals={this.state.totalAvg}
													// getMean={(arr) => Mathy.getMean(arr)}
													// totalVelocityAvg={this.state.totalVelocityAvg}
													// totalAvgStatement={this.state.totalAvgStatement}
													actualYelpReviews={this.state.actualYelpReviews}
													yelpReviews={this.yelpReviews}
													/>

												</div>
											</div>
										</div>
									</div>
								) : (
								null
								)}
			    		</div>
			    	</div>
			    	{ this.state.searchIcon ? 
	      			<div className="side-nav column is-12">
		      			<CSSTransitionGroup
							transitionName="example"
							transitionAppear={true}
							transitionAppearTimeout={500}
							transitionEnter={false}
							transitionLeave={false}>
							<div className='searchIcon'>
							<form onSubmit={this.searchSubmit}>
								<div className="searchField">
									<div className='columns'>
										<div className="column is-5">
						      				<input
						      					className="searchBar"
												inputProps={inputProps}
												value={this.state.restaurantName}
												onChange={this.handleInputChange}
												name="restaurantName"
												placeholder="Restaurant Name"
												// onKeyDown={(ev) => this.handleSearchForm(ev)}
											/>
										</div>
										<div className="column is-5">
											<PlacesAutocomplete 
												inputProps={inputProps2}
											/>
										</div>
										<div className="column is-2">
											<button type='submit'>Submit</button>
										</div>
									</div>
								</div>
							</form>							
							</div>
			      		</CSSTransitionGroup>
		      		</div>  		
	      		: null }
				</div>			
		</div>
	)
};
}

export default findRestaurant;