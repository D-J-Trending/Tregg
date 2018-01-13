import React, {Component} from 'react';
import API from "../../utils/API.js";
import "./Home.css";
import Filter from '../../utils/Filter';
import Trending from '../../components/Trending';
import { Restheader } from "../../components/Restdetails";
import Round from '../../utils/Round'

class Home extends Component {
	constructor(props) {
		super(props)
	}
	state = {
		restaurantArr: [],
		restaurantName: "Homeroom",
		top10: [],
		showList: false
	};
	componentWillMount() {
  	API.AllReviews()
			.then(res => {
				const data = res.data
				console.log(data)
				const top10Arr = Filter.getTop10ByScore(data)
				top10Arr.forEach(item=>{
					(item.trending_score['7day']['checkins']) = Round(item.trending_score['7day']['checkins'], -2) + "%"
				})
				this.setState({
					top10: top10Arr,
					restaurantArr: res.data
				})
			})
			.catch(err => console.log(err))
	};

	componentDidUpdate(prevProps, prevState) {
		if (!prevState.showList) {
			this.setState({
				showList: true
			})
		};
	}

	showState = () => {
		console.log(this.state)
	}

   // gets top 5 sorted by score
	render() {
		return (
		<div className='homepage'>
			<div className="wrapper home">
				<div className="main container-fluid">				
					  <div className='centered restaurant-info'>	
					  	<p>Top 10 Trending Restaurants</p>
    					<div className='columns restaurant-component'>	      				
    						<div className="content-list">
						      <ul className='centered'>
						      	{this.state.showList ?
						      		this.state.top10.map((item,i) => (
						      		<li>
						      			<Restheader
						      				trendingScore={item.trending_score['7day']['checkins']}
						      				mainColumnClass={'column is-12 top-trending'}
						      				columnClass={'column is-6'}
						      				rank={item.new_rank}
						      				restaurantName={item.name}
			      							address={item.location.address}
			      							city={item.location.city}
			      							state={item.location.state}
			      							yelpURL={item.yelpURL}
			      							fb_url={item.fbURL}
			      							fbRating={item.star_rating[0].overall_star_rating}
			      							yelpRating={item.rating[0].rating}		      									      							
						      			/>	
						      		</li>	      			
						      		))
						      		:
						      		null
						      	}
							      </ul>
						    </div>
					    </div>
		      	</div>		
				</div>
			</div>	
		</div>
		)
	}
}

export default Home;