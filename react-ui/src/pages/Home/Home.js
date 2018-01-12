import React, {Component} from 'react';
import API from "../../utils/API.js";
import "./Home.css";
import Filter from '../../utils/Filter';
import Trending from '../../components/Trending';
//Need to pass value from input field
import { Link } from 'react-router-dom';

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
				const top10Arr = Filter.getTop10ByScore(data)
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

	showRestaurants = () => {
		console.log()
	}

   // gets top 5 sorted by score
	render() {
		return (
		<div>
			<h1>
				Home Home Home
			</h1>
			<div className="wrapper home">
				<div className="main container-fluid">
					<h1>Main Content Goes Here</h1>
					<p>The content</p>
					<div className="card restaurant-list">
					  <header className="card-header">
					    <p className="card-header-title is-centered">
					      Top Trending Restaurants
					    </p>
					    <a href="#" className="card-header-icon" aria-label="more options">   
					    </a>
					  </header>
					  <div className="card-content">
					    <div className="content list">
					      <ul className='centered'>
					      	{this.state.showList ?
					      		this.state.top10.map(item => (
					      			<li onClick={this.props.clickList} value={item._id}> {item.name} </li>
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