import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<p>blah</p>
		);
	}
}


render(
	<App/>
	,document.getElementById('app')
);
