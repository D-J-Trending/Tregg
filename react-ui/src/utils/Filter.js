import axios from "axios";
import Mathy from './Mathy.js'
import Round from './Round.js'

var invalidEntries = 0;

function isNumber(obj) {
	return obj!== undefined && typeof(obj) === 'number' && !isNaN(obj);
}

function filterByID(item) {
	if (isNumber(item.new_rank)) {
		return true;
	} 
	invalidEntries++;
		return false; 
}

export default {



	getTop10ByScore: function(sortArr) {

		let top10 = sortArr.filter(filterByID)
		top10.sort((a,b) => {
			return a['new_rank'] - b['new_rank']
		})
		length = 10 - top10.length
		length = length * -1
		for (var i = 0; i < length; i++) {
			top10.pop()
		}
		
		return top10
	},



	// return daily raw difference averages
	// logic: plug in array of restaurants
	// filter by query_date. get an array with each unique day
	// get average for each day.
	convertDate: function(utc) {
		let queryDate = utc.replace(/ .*/,'');
		return queryDate
	},

	getUniqueDatesArr: function(arr) {
		const uniqueDateArr = []
		arr.map(each => {
			each.query_date = this.convertDate(each.query_date)

			let queryDate = each.query_date
			let index = uniqueDateArr.findIndex(x => x === queryDate)

			if (index === -1) {
				uniqueDateArr.push(queryDate)
			}
		})
		return uniqueDateArr
	},

// finds daily avg depending on what array is being thrown into it
	dailyDiffAvg: function(dataArr) {
		let obj = {
			'checkins': {},
			'rating_count': {},
			'reviews': {}
		}
		// loops through passed array of restaurants
		dataArr.forEach(item => {

			// converts each restaurant data into differences, %change, and date
			let diffandDatesCheckins = Mathy.getDiffwithDate(item.checkins, 'checkins');
			let diffandDatesRatings = Mathy.getDiffwithDate(item.rating_count, 'rating_count');
			let diffandDatesReviews = Mathy.getDiffwithDate(item.reviews, 'review_count');

			// loops through converted array to ouput array of unique dates
			const uniqueDateArr = [];
			diffandDatesCheckins.map(each => {
				each.query_date = this.convertDate(each.query_date);

				let queryDate = each.query_date;
				let index = uniqueDateArr.findIndex(x => x === queryDate);

				if (index === -1) {
					uniqueDateArr.push(queryDate);
				}
			})
			// groups array of values into obj by date
			diffandDatesCheckins.forEach(bam => {
				bam.query_date = this.convertDate(bam.query_date)
			})

			diffandDatesRatings.forEach(bam => {
				bam.query_date = this.convertDate(bam.query_date)
			})

			diffandDatesReviews.forEach(bam => {
				bam.query_date = this.convertDate(bam.query_date)
			})

			uniqueDateArr.forEach(value => {
				let checkinsFilteredArr = diffandDatesCheckins.filter(boom => boom.query_date === value)
				let ratingsFilteredArr = diffandDatesRatings.filter(boom => boom.query_date === value)
				let reviewsFilteredArr = diffandDatesReviews.filter(boom => boom.query_date === value)
				
				if (checkinsFilteredArr.length > 0) {
					if (obj['checkins'][value] === undefined) {
						obj['checkins'][value] = []
						obj['checkins'][value].push(checkinsFilteredArr[0].difference)
					} else {
						obj['checkins'][value].push(checkinsFilteredArr[0].difference)
					}
				}
				
				if (ratingsFilteredArr.length > 0) {
					if (obj['rating_count'][value] === undefined) {
						obj['rating_count'][value] = []
						obj['rating_count'][value].push(ratingsFilteredArr[0].difference)
					} else {
						obj['rating_count'][value].push(ratingsFilteredArr[0].difference)
					}
				}
				
				if (reviewsFilteredArr.length > 0) {
					if (obj['reviews'][value] === undefined) {
						obj['reviews'][value] = []
						obj['reviews'][value].push(reviewsFilteredArr[0].difference)
					} else {
							obj['reviews'][value].push(reviewsFilteredArr[0].difference)
					}
				}
			})
		})
		const final_obj = {
			'checkins': [],
			'rating_count': [],
			'reviews': []
		}
		// find avg for each date in obj
		Object.keys(obj.checkins).map((objectKey, index) => {
			let value = obj.checkins[objectKey]
			let diff_avg =	Round(Mathy.getMean(value), -6)
			let checkObj = {
				query_date: objectKey,
				difference: diff_avg
			}
			final_obj.checkins.push(checkObj)
		})
		Object.keys(obj.rating_count).map((objectKey, index) => {
			let value = obj.rating_count[objectKey]
			let diff_avg =	Round(Mathy.getMean(value), -6)
			let ratingObj = {
				query_date: objectKey,
				difference: diff_avg
			}
			final_obj.rating_count.push(ratingObj)
		})
		Object.keys(obj.reviews).map((objectKey, index) => {
			let value = obj.reviews[objectKey]
			let diff_avg =	Round(Mathy.getMean(value), -6)
			let reviewObj = {
				query_date: objectKey,
				difference: diff_avg
			}
			final_obj.reviews.push(reviewObj)
		})
		final_obj.checkins = final_obj.checkins.sort(function(a,b){
			var c = new Date(a.query_date);
			var d = new Date(b.query_date);
			return c-d;
		});
		final_obj.rating_count = final_obj.rating_count.sort(function(a,b){
			var c = new Date(a.query_date);
			var d = new Date(b.query_date);
			return c-d;
		});
		final_obj.reviews = final_obj.reviews.sort(function(a,b){
			var c = new Date(a.query_date);
			var d = new Date(b.query_date);
			return c-d;
		});
		return final_obj
	}

}