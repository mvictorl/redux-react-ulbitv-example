import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { cashReducer } from './cashReducer'
import { customerReducer } from './customerReducer'

const rootReducer = combineReducers({
	cash: cashReducer,
	customers: customerReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

// import { composeWithDevTools } from 'redux-devtools-extension'
// export const store = createStore(rootReducer, composeWithDevTools())
// Redux DevTool for Chrome browser (or others)
