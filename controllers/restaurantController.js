const db = require ("../models");

module.exports = {
	findAll: function(req, res) {
    	db.Restaurants
			.find(req.query)
			.sort({ date: -1 })
			.then(dbModel =>{
				res.json(dbModel)
				// console.log(dbModel);
			})
			.catch(err => res.status(422).json(err));
	},
	nameQuery: function(req, res) {
    	db.Restaurants
			.find({ 
				name: { 
					$regex: req.params.name + '.*',
					$options: 'i'
				}
			})
			.sort({ date: -1 })
			.then(dbModel =>{
				res.json(dbModel)
			})
			.catch(err => res.status(422).json(err));
	},

	returnDetails: function(req, res) {
		db.Restaurants
			.find({
				_id: req.params.id
			})
			.then(dbModel => {
				res.json(dbModel)
			})
			.catch(err => res.status(422).json(err));
	},

	filterSearch: function(req, res) {
		if (req.params.type === 'price') {
			db.Restaurants
				.find({
					[req.params.type]: req.query.filter
				})
				.then(dbModel => {
					res.json(dbModel)
				})
				.catch(err => res.status(422).json(err));
		} else if (req.params.type === 'category') {
			let category = req.query.filter
			console.log(category)
			category = category.split(' ')
			console.log(category)

			const objectAddTitle = (catArr) => {
				catArr.forEach((item,i) => {
					catArr[i] = {alias: item}
				})
				console.log(catArr)
			}
			objectAddTitle(category)
			// turns string into {'alias: ' + string} to each in category 
			db.Restaurants
				.find({
					categories: {
						'$elemMatch': {
							'$or': category
						}
					}
				})
				.then(dbModel => {
					res.json(dbModel)
				})
				.catch(err => res.status(422).json(err));
		}

	},

	postNewRestaurant: function(req, res) {
		console.log(req.body)
		db.Ids
			.create(req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err))
	}

// find by filter
// get difference in array
	// mean
	// avg for all restaurants
	// narrow down avg by filter
};