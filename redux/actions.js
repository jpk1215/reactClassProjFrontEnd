import axios from 'axios';

export const INPUT_TYPING = 'INPUT_TYPING';
export const GET_LIKE_ARTISTS_START = 'GET_LIKE_ARTISTS_START';
export const GET_LIKE_ARTISTS_SUCCESS = 'GET_LIKE_ARTISTS_SUCCESS';
export const GET_LIKE_ARTISTS_ERROR = 'GET_LIKE_ARTISTS_ERROR';


export function inputTyping(inputValue) {
    return {
        type: INPUT_TYPING,
        payload: { inputValue }
    }
}

function getLikeArtistsStart() {
    return {
        type: GET_LIKE_ARTISTS_START
    }
}

function getLikeArtistsSuccess(artists) {
    return {
        type: GET_LIKE_ARTISTS_SUCCESS,
        artists
    }
}

function getLikeArtistsError(error) {
    return {
        type: GET_LIKE_ARTISTS_ERROR,
        error
    }
}


export function findArtists(artist) {
    return dispatch => {
        dispatch(getLikeArtistsStart());
        findArtistId(artist)
            .then(findRelatedArtists)
            .then(artists => dispatch(getLikeArtistsSuccess(artists)))
            .catch(err => dispatch(getLikeArtistsError(err)))
    }
}

function findArtistId(artist) {
    return axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist&market=us&limit=1`)
        .then(response => {
            if(response.data.artists.items.length > 0) {
                return response.data.artists.items[0].id;
            } else {
                return Promise.reject('please try a different artist');
            }
        })
}

function findRelatedArtists(artistId) {
    return axios.get(`https://api.spotify.com/v1/artists/${artistId}/related-artists`)
        .then(response => response.data.artists)
}
