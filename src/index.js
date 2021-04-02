import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.scss'
import App from './App'

const defaultSate = {
	bill: 0
}

const reducer = (state = defaultSate, action) => {
	switch (action.type) {
		case 'ADD_CASH':
			return {
				...state,
				bill: state.bill + action.payload
			}
		case 'TAKE_CASH':
			return {
				...state,
				bill: state.bill - action.payload
			}
		default:
			return state
	}
}

const store = createStore(reducer)

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
