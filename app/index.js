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
	title: {fontSize: '30px', color:'#60a0df', textAlign:'center'},
	tile:{padding: '5px', flex: '1 1 auto'},
	image: {maxHeight: '300px', maxWidth: '100%', margin: '0 auto'},
	container: {display: 'block', padding:'10px', margin:'10px'},
	centeredContainer: {display: 'block', padding:'10px', margin:'0 auto', width: '300px' }
};

 const Header = ({title}) =>
		<div style={styles.centeredContainer}>
			<h1 style={styles.title}> {title} </h1>
		</div>

class SearchArtist extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		const { handleInput, handleClick, text} = this.props;
		return (
			<div style={styles.centeredContainer} >
				<input onChange={handleInput} value={text}/>
				<button onClick={handleClick}>Find Artist</button>
			</div>
		)
	}
}

class ArtistTile extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
		const {artist, index} = this.props;
		const tweets = artist.data.statuses.map((tweet, index1) =>
			<ul>
				<li id={index} key={index1}>{tweet.text}</li>
			</ul>
		);
		return (
			<div key={index} style={styles.tile}>
				<h2>{artist.name}</h2>
				<img src={artist.images[0].url} style={styles.image} />
				{tweets}
			</div>
		)
	};
}

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
				<ArtistTile artist={artist} index={index} key={index} />
			)
		});
		return (
			<div>
				<Header title="Artists and Tweets" />
				<SearchArtist handleInput={this.handleInput} text={this.props.artists.inputValue} handleClick={this.handleSearch} />
				<div style={{display: 'flex', flexDirection:'row', flexWrap: 'wrap'}}>
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

