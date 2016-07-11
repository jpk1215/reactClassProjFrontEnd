import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./reducers', () => {
  //     const nextReducer = require('./reducers');
  //     store.replaceReducer(nextReducer)
  //   })
  // }

  return store
}