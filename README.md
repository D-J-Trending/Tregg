# Tregg
![Giphy of Site](https://media.giphy.com/media/3oEdTQP7lUwKSlqaQ0/giphy.gif)
>[Site](https://tregg.herokuapp.com)
>[Python Repository](https://github.com/jtung23/python-data-collector)


## Description
An unbiased view on what restaurants are trending in your area. Utilizes python scripts to collect data and Javascript/React.js to display the data to the user. Inspired by the frustrations of ad driven popularity of restaurants, we want to give users and restaurant owners the opportunity to find previously unknown locations.

## Code
- Jonathan
		- Without Flux to handle data flow, it was necessary to use React's lifecycle methods to handle asynchronous functions returning data from the database or APIs.
		e.g.
		```javascript
		  componentWillReceiveProps(nextProps) {
		    const checkinsAvg = Mathy.findRoundedDiffMean(nextProps.restaurantDetails.checkins, 'checkins')
				...

		    this.setState({
		      checkinsAvg: checkinsAvg
		      ...
		    })
		  }
		```
		- Identifying and moving repeating code into seperate utility files which are then used across multiple components. Using `return` to use the end value.
		e.g.
		```javascript
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
		    
		  }
		}
		```


### Things To Do:
- [ ] Add a comparison function between firms. Button to add restaurant to bank to compare then to display on graph on comparison
- [ ] Set up worker dynos to handle a larger database
- [ ] filter function can show difference or percent change
- [ ] Geolocation on start



### Notes

To deploy to Heroku:
```
	yarn build
	git add build
	git commit -m
	git push heroku master
```