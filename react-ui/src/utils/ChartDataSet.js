
export default {
	createDataSet: function(dataSet, name) {
		console.log(dataSet)
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
		    return "rgba(" + r + "," + g + "," + b + ", 0.2)";
		};

		return {
			label: name,
			data: data,
			backgroundColor: [dynamicColors()]
		}
	}
}

