import {
    INPUT_TYPING
} from './actions.js';

import { combineReducers } from 'redux';

const initialState = {
    inputValue: ''
};

function artists(state = initialState, action) {
    switch (action.type) {
        case INPUT_TYPING:
            return Object.assign({}, state, {
                inputValue: action.payload.inputValue
            });
        default:
            return state
    }
}

const rootReducer = combineReducers({
    artists
});

export default rootReducer