export const INPUT_TYPING = 'INPUT_TYPING';
// export const GET_ARTISTS = 'GET_ARTISTS';

export function inputTyping(inputValue) {
    return {
        type: INPUT_TYPING,
        payload: { inputValue }
    }
}

// function getLikeArtists(artist) {
//     return {
//         type: GET_ARTISTS,
//         payload: { artist }
//     }
// }

// export function handleSearch(todo) {
//     return dispatch => {
//         saveToBackEnd(response => {
//             if(response.success) {
//                 dispatch(saveSuccess(todo));
//             } else {
//                 dispatch(saveError(response.error))
//             }
//         })
//     }
// }