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
	title: {fontSize: '30px', color:'blue'},
	image: {height: '100px', width: '100px'},
	artistTile: {display: 'block', padding:'10px', margin:'10px'}
};

// class Header = ({title}) 

class ArtistTile extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
		const {artist, index} = this.props;
		console.log(artist);
		const tweets = artist.data.statuses.map((tweet, index) =>
			<ul>
				<li id={index}>{tweet.text}</li>
			</ul>
		)
		return (
			<div key={index} className={styles.artistTile}>
				<img src={artist.images[0].url} className={styles.image} />
				{tweets}
			</div>
		)
	};
}
const TweetTile =({tweet}) =>
	<div>

	</div>


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
				<ArtistTile artist={artist} index={index} />
			)
		});
		return (
			<div>
				<Header title="Artist and Tweets" />
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

