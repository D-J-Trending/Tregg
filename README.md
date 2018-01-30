# Tregg
![Giphy of Site](https://media.giphy.com/media/3oEdTQP7lUwKSlqaQ0/giphy.gif)
>[Site](https://tregg.herokuapp.com)
>[Python Repository](https://github.com/jtung23/python-data-collector)


## Description
An unbiased view on what restaurants are trending in your area. Utilizes python scripts to collect data and Javascript/React.js to display the data to the user. Inspired by the frustrations of ad driven popularity of restaurants, we want to give users and restaurant owners the opportunity to find previously unknown locations.

## Code
- Without Flux to handle data flow, it was necessary to use React's lifecycle methods to handle asynchronous functions returning data from the database or APIs.
e.g.

```javascript

// When calculations/api returns data, then the state is changed in the higher level component which reload the component and sends down new props. componentWillReceiveProps receives and sets state based on new data.

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
// returns the difference between values in array of days and returns with the date and difference

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
// returns the sum from array of objects with key as the parameter to target
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
// returns the mean from array of values
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

- Found in `react-ui/src/utils/ChartDataSet.js`...Creates a dataset that is necessary for building the chart. Written in order to modify the chart dynamically.

```javascript
// Returns dataset for chart.js when run
export default {

	createDataSet: function(dataSet, name, dotted) {
		// console.log(dataSet)
		let data = dataSet.map(each => {
		    let dataset = {}
		    let queryDate = each.query_date.replace(/ .*/,'');
		    let checkinDiff = each.difference;
		    dataset = {
		        x: queryDate,
		        y: checkinDiff
		    };
		    return dataset;
		})
		const dynamicColors = function() {
		    var r = Math.floor(Math.random() * 255);
		    var g = Math.floor(Math.random() * 255);
		    var b = Math.floor(Math.random() * 255);
		    return "rgba(" + r + "," + g + "," + b + ", 1)";
		};

		if(dotted) {

			console.log(data);

			return{
				label: name,
				fill: false,
				borderWidth: 3,
				data: data,
				borderDash: [10,10],
				borderColor: ['green']
			}
		} else {
			return {
				label: name,
				fill: false,
				borderWidth: 3,
				data: data,
				borderColor: '#0000ff'
			}
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