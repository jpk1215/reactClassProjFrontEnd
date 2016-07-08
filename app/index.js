import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import configureStore from '../redux/store.js';
import { inputTyping } from '../redux/actions.js'
import axios from 'axios';

const store = configureStore();

const styles = {
	title: {fontSize: '30px', color:'blue'}
};

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	handleInput = (e) => {
		this.props.dispatch(inputTyping(e.target.value))
	};

	render() {
		return (
			<div>
				<h1 style={styles.title}>Hello World</h1>
				<input onChange={this.handleInput} value={this.props.artists.inputValue}/>
			</div>
		);
	}
}

// state is Redux state / return props for our component
function mapStateToProps(state) {
	return {
		artists: state.artists
	}
}
// functional programming: higher order components (functions)
let ReduxApp = connect(mapStateToProps)(App);

render(
	<Provider store={store}>
		<ReduxApp />
	</Provider>, document.getElementById('app'));

