import * as actions from './actions';

import { combineReducers } from 'redux';

const initialState = {
    inputValue: '',
    likeArtists: []
};

function artists(state = initialState, action) {
    switch (action.type) {
        case actions.INPUT_TYPING:
            return Object.assign({}, state, {
                inputValue: action.payload.inputValue
            });
        case actions.GET_LIKE_ARTISTS_START:
            return Object.assign({}, state, {
                error: null,
                loading: true
            });
        case actions.GET_LIKE_ARTISTS_SUCCESS:
            return Object.assign({}, state, {
                likeArtists: action.artists,
                loading: false
            });
        case actions.GET_LIKE_ARTISTS_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            });
        default:
            return state
    }
}

const rootReducer = combineReducers({
    artists
});

export default rootReducer