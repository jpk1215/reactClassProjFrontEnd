import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import configureStore from '../redux/store.js';
import { handleSave } from './actions.js'
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

// state is Redux state / return props for our component
function mapStateToProps(state) {
	return {
		todos: state.todos
	}
}
// functional programming: higher order components (functions)
let App = connect(mapStateToProps)(App);

render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('app'));

require('../redux/createDevToolWindow.js')(store);
