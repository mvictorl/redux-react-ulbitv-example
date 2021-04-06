import { createStore, combineReducers } from 'redux'
import { cashReducer } from './cashReducer'
import { customerReducer } from './customerReducer'

const rootReducer = combineReducers({
	cash: cashReducer,
	customers: customerReducer
})

export const store = createStore(rootReducer)

// import { composeWithDevTools } from 'redux-devtools-extension'
// export const store = createStore(rootReducer, composeWithDevTools())
// Redux DevTool for Chrome browser (or others)
