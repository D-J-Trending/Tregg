
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

			// console.log(data);

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

