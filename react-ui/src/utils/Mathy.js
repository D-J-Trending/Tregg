import numjs from 'numjs';
import Round from './Round.js'

export default {
  findDifference: function(arr, name, days) {
    const values = []
    for (var i = 0; i < arr.length; i++) {
      values.push(arr[i][name])
    }
    const diff = []
    for (var i = 0; i < values.length - 1; i++) {
      let difference = values[i+1] - values[i]
      diff.push(difference)
    }

    return diff
  },

  findSum: function(arr, key) {
    var total = 0
    if (key) {
      for(var i = 0; i < arr.length; i++) {
            total += arr[i][key];
      }
    } else {
      for(var i = 0; i < arr.length; i++) {
            total += arr[i];
      }  
    }
    return total
  },

  getMean: function(arr) {
    var total = 0;
    if (arr.length > 0) {
      for(var i = 0; i < arr.length; i++) {
          total += arr[i];
      }
      var avg = total / arr.length;
      return avg

    } else {
      var avg = 0
      return avg

    }
    
  },

  getDiffwithDate: function(arr, name) {
    // returns an arry of obj with date and count
    const values = []
    for (var i = 0; i < arr.length; i++) {
      values.push({
        count: arr[i][name],
        query_date: arr[i]['query_date'],
      })
    }

    const diff = []
    for (var i = 0; i < values.length - 1; i++) {
      let difference = values[i+1]['count'] - values[i]['count']
      let val = difference / values[i]['count']

      let percentChange = Round(val, -5)

      let query_date = values[i+1]['query_date']
      diff.push({
        difference: difference,
        percentChange: percentChange,
        query_date: query_date
      })
    }   
    return diff
  },

  findTotalStats: function(arr) {
    var checkins = [];
    var ratings = [];
    var reviews = [];
    const obj = {}

    for (var i = 0; i < arr.length; i++) {
      checkins.push(this.findRoundedDiffMean(arr[i].checkins, 'checkins'))
      ratings.push(this.findRoundedDiffMean(arr[i].rating_count, 'rating_count'))
      reviews.push(this.findRoundedDiffMean(arr[i].reviews, 'review_count'))
    }

    // checkins = numjs.array(checkins);
    // ratings = numjs.array(ratings);
    // reviews = numjs.array(reviews);

    const checkinsMean = Round(this.getMean(checkins), -2)
    const ratingsMean = Round(this.getMean(ratings), -2)
    const reviewsMean = Round(this.getMean(reviews), -2)
    obj.checkinsMean = checkinsMean
    obj.ratingsMean = ratingsMean
    obj.reviewsMean = reviewsMean

    return obj;
  },

  findAvgVelocity: function(arr) {
    // sums all trendingscore 7day then averages
    const values = []
    arr.forEach(item => {
      values.push(item.trending_score['7day']['checkins'])
    })
    let avgScore = this.getMean(values)
    Round(avgScore, -2)
    avgScore = avgScore * 100 + "%"
    return avgScore
  },

  // finds the mean of the rounded difference
  findRoundedDiffMean: function(arr,name) {
    let diff = this.findDifference(arr, name)
    let mean = this.getMean(diff)
    let roundedMean = Round(mean, -2)
    return roundedMean
  },

  findTotalWeeklyDiff: function(restaurantDetails) {
    // returns the sum and percent change object
    const getWeeklyDiffPercentChange = (diffObjArr) => {
      let lastWeekSliced = diffObjArr.slice(-7)
      let previousWeekSliced = diffObjArr.slice(-14, -7)
      let lastSlicedSum = this.findSum(lastWeekSliced, 'difference')
      let previousSlicedSum = this.findSum(previousWeekSliced, 'difference')
      const percentDiff = lastSlicedSum - previousSlicedSum
      // console.log(lastSlicedSum)
      // console.log(previousSlicedSum)
      let finalPercent = percentDiff / previousSlicedSum
      finalPercent = Round(finalPercent * 100, -1)
      if (isNaN(finalPercent)) {
        finalPercent = "N/A"
      } else {
        finalPercent = finalPercent + '%'
      }
      
      return {thisWeekSum: lastSlicedSum, lastWeekSum: previousSlicedSum, percentChange: finalPercent}
    }
    // use restaurant details to pass into array
    // get difftotals for each category
    let checkinsDiff = this.getDiffwithDate(restaurantDetails.checkins, 'checkins')
    let ratingsDiff = this.getDiffwithDate(restaurantDetails.rating_count, 'rating_count')
    let reviewsDiff = this.getDiffwithDate(restaurantDetails.reviews, 'review_count')
    // sum differences from last 7 days in array

    const checkinsObj = getWeeklyDiffPercentChange(checkinsDiff)
    const ratingsObj = getWeeklyDiffPercentChange(ratingsDiff)
    const reviewsObj = getWeeklyDiffPercentChange(reviewsDiff)
    let enoughData = true
    if (restaurantDetails.checkins.length <= 10) {
      enoughData = false
    }
    return {
        checkins: checkinsObj,
        ratings: ratingsObj,
        reviews: reviewsObj,
        enoughData: enoughData
        }
  }
}
