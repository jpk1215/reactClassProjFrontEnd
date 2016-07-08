import {
    SAVE_BEGIN,
    SAVE_ERROR,
    SAVE_SUCCESS
} from './actions.js';

import { combineReducers } from 'redux';

function todos(state = todoInitialState, action) {
    switch (action.type) {
        case SAVE_SUCCESS:
            return Object.assign({}, state, {
                inputValue: '',
                todos: [...state.todos,action.payload.todo],
                saveError: null,
                startSaving: false,
                pendingSave: null
            });
        case SAVE_BEGIN:
            return Object.assign({}, state, {
                startSaving: true,
                saveError: null,
                pendingSave: action.payload.todo
            });
        case SAVE_ERROR:
            return Object.assign({}, state, {
                startsaving: false,
                saveError: action.payload.error,
                pendingSave: null
            });
        default:
            return state
    }
}

const rootReducer = combineReducers({
    todos
});

export default rootReducer