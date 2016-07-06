import React from 'react';
import { Link } from 'react-router';

export default class Counter extends React.Component {
	render() {
		return (
			<div>
				<h2> Product Details </h2>
				{this.props.children ? React.cloneElement(this.props.children , { products: this.props.products }) : ''}
			</div>
		);
	}
}