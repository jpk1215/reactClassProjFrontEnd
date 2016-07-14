import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import configureStore from '../redux/store.js';
import Autolinker from 'autolinker'
import {
	inputTyping,
	findArtists
} from '../redux/actions.js'


const store = configureStore();

const styles = {
	title: {fontSize: '30px', color:'#60a0df', textAlign:'center'},
	tile:{width:'33.333333%', padding: '5px', margin: '0 auto'},
	image: {maxHeight: '300px', maxWidth: '100%', margin: '0 auto', display: 'block'},
	container: {display: 'block', padding:'10px', margin:'10px'},
	centeredContainer: {display: 'block', padding:'10px', margin:'0 auto', width: '30%' },
	input: {display:'inline', float:'left', width: '60%', marginRight: '5%'},
	btn: {width: '35%'},
	tweetBox: {background:'#eee', margin:'5px 5px', borderRadius: '5px', padding: '10px'}
};

 const Header = ({title}) =>
		<div style={styles.centeredContainer}>
			<h1 style={styles.title}> {title} </h1>
		</div>;

class SearchArtist extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { handleInput, handleClick, text} = this.props;
		return (
			<div style={styles.centeredContainer} >
				<input onChange={handleInput} value={text} className="form-control" style={styles.input} />
				<button onClick={handleClick} className={"btn btn-primary"} style={styles.btn}>Find Artist</button>
			</div>
		)
	}
}

class ArtistTile extends React.Component {
	constructor(props) {
		super(props);
	}

	goTwitter = (userName) => window.open(`https://twitter.com/${userName}`,'_blank');

	render(){
		const {artist, index} = this.props;
		const tweets = artist.data.statuses.map((tweet, index1) =>
			<div style={styles.tweetBox}>
				<span><i onClick={() => this.goTwitter(tweet.user.screen_name)} className="fa fa-twitter" style={{color:'#1da1f2', cursor:'pointer', fontSize: '1.5em'}}></i><p id={index} key={index1} style={{display:'inline', marginLeft: '3px'}} dangerouslySetInnerHTML={{__html: Autolinker.link(tweet.text)}}></p></span>
			</div>
		);
		return (
			<div key={index} style={styles.tile}>
				<h2 style={{textAlign:'center'}}>{artist.name}</h2>
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
				<Header title="" />
				<SearchArtist handleInput={this.handleInput} text={this.props.artists.inputValue} handleClick={this.handleSearch} />
				<div style={{display: 'flex', flexDirection:'row', flexWrap: 'wrap', padding: '100px'}}>
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

