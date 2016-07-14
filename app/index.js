import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import configureStore from '../redux/store.js';
import {
	inputTyping,
	findArtists
} from '../redux/actions.js'

const store = configureStore();

const styles = {
	title: {fontSize: '30px', color:'blue'}
};

const ArtistTile = ({ artist }) =>
	<div>
		
	</div>;

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	handleInput = (e) => {
		this.props.dispatch(inputTyping(e.target.value));
	};

	handleSearch = () => {
		this.props.dispatch(findArtists(this.props.artists.inputValue));
	};

	render() {
		const artistImages = this.props.artists.likeArtists
			.filter(artist => !!artist.images.length)
			.map((artist,index) => {
			return (
				<div key={index}>
					<img src={artist.images[0].url} />
					<pre>{JSON.stringify(artist, null, 2)}</pre>
				</div>
			)
		});
		return (
			<div>
				<h1 style={styles.title}>Hello World</h1>
				<input onChange={this.handleInput} value={this.props.artists.inputValue}/>
				<button onClick={this.handleSearch}>Find Artist</button>
				<div>
					{this.props.artists.error}
					{this.props.artists.loading ? 'Loading...' : artistImages}
				</div>
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
	</Provider>, document.getElementById('app')
);

