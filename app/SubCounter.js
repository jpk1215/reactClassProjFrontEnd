import React from 'react';
import _ from 'lodash';

export default class SubCounter extends React.Component {
	render() {
		const selectedProduct = _.find(this.props.products,(item) => item.id === this.props.params.id);

		return (
			<div>
				<h4> {selectedProduct.product} </h4>
				<img src={selectedProduct.image}/>
				<p>{selectedProduct.description}</p>
			</div>
		)
	}
}