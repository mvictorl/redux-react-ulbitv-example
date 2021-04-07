import { applyMiddleware } from 'redux'

const thunkMiddleware = store => next => action =>
	typeof action === 'function' ? action(store.dispatch, store.getState) : next()

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
