import React from 'react';
import { render } from 'react-dom';
import TodoApp from './component.js';
import Counter from './counter.js';
import SubCounter from './SubCounter.js';
import { Router, Route, Link } from 'react-router';
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
	}

	componentDidMount() {
		axios.get('http://reactjs102.herokuapp.com/products')
			.then((response) => {
				this.setState({products:response.data})
			})
	}

	render() {
		const items = this.state.products.map((item,index) =>
			<div key={index}>
				<Link to={`/product/${item.id}`}>
					<h4>{item.product}</h4>
					<img src={item.image} width={100}/>
				</Link>
			</div>
		);
		return (
			<div>
				<h1> Welcome to my site </h1>
				<ul>
					<li><Link to="/">Home page </Link></li>
					<li><Link to="/todo">Todo </Link></li>
					<li><Link to="/counter">Counter </Link></li>
				</ul>
				{this.props.children ? React.cloneElement(this.props.children , { products: this.state.products }) : items}
			</div>
		);
	}
}


render(
	<Router>
		<Route path="/" component={App}>
			<Route path="/product" component={Counter}>
				<Route path=":id" component={SubCounter} />
			</Route>
		</Route>
	</Router>
	,document.getElementById('app'));
