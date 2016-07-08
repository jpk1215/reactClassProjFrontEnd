export const SAVE_SUCCESS = 'SAVE_SUCCESS';
export const SAVE_ERROR = 'SAVE_ERROR';
export const SAVE_BEGIN = 'SAVE_BEGIN';

function saveSuccess(todo) {
    return {
        type: SAVE_SUCCESS,
        payload: { todo }
    }
}

function saveError(error) {
    return {
        type: SAVE_ERROR,
        payload: { error }
    }
}

function saveBegin(todo) {
    return {
        type: SAVE_BEGIN,
        payload: { todo }
    }
}

export function handleSave(todo) {
    return dispatch => {
        dispatch(saveBegin(todo));
        saveToBackEnd(response => {
            if(response.success) {
                dispatch(saveSuccess(todo));
            } else {
                dispatch(saveError(response.error))
            }
        })
    }
}